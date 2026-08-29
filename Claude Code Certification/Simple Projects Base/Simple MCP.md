
To build the **Autonomous Code Auditor**, you will construct a server where the traditional flow of execution is inverted. Instead of the host application executing tools sequentially and feeding prompt results back to the server, your server acts as an autonomous orchestrator using **Roots**, **Sampling**, and **Progress Notifications**.

### Key Architectural Flow

```
+------------------+                    +--------------------+
|    MCP Client    |                    |     MCP Server     |
| (Host / LLM App) |                    |   (Code Auditor)   |
+--------+---------+                    +---------+----------+
         |                                        |
         | --- 1. Call Tool: audit_project() ---->|
         |                                        |
         | <--- 2. Request Roots (roots/list) ----| 
         | ---- Return Approved Workspace Dir --->| [Validate Boundary]
         |                                        |
         | <--- 3. Progress Update (10% Scanned) -|
         |                                        |
         | <--- 4. Sampling Request (LLM Call) ---| [Audits Function A]
         | ---- Return LLM Audit Response -------->|
         |                                        |
         | <--- 5. Progress Update (90% Scanned) -|
         |                                        |
         | <--- 6. Return Final Aggregated Report -|
```

### Core Mechanics & Code Architecture

#### 1. Directory Boundaries via `Roots`

Before reading files from disk, the server asks the host for its active workspace boundaries. This prevents path traversal attacks or auditing files outside the permitted project folder.

  

TypeScript

```
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListRootsResultSchema } from "@modelcontextprotocol/sdk/types.js";
import path from "node:path";

async function validatePathWithinRoots(server: Server, requestedPath: string): Promise<boolean> {
  // 1. Fetch current permitted roots from client
  const rootsResult = await server.request(
    { method: "roots/list" },
    ListRootsResultSchema
  );

  const absoluteTarget = path.resolve(requestedPath);

  // 2. Check if the target file falls under any declared root URI
  return rootsResult.roots.some(root => {
    const rootPath = path.resolve(new URL(root.uri).pathname);
    return absoluteTarget.startsWith(rootPath);
  });
}
```

#### 2. Agentic Analysis via `Sampling`

Instead of sending every single source file back to the host in one giant, token-heavy payload, the server splits the project into chunks, creates focused sub-prompts, and sends `sampling/createMessage` requests back to the host. The host's LLM acts as an processing engine for the server.

  

TypeScript

```
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";

async function auditCodeSnippet(server: Server, fileContent: string, filePath: string) {
  // Construct a sub-sampling request to the client
  const response = await server.request(
    {
      method: "sampling/createMessage",
      params: {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Analyze this code file (${filePath}) for OWASP Top 10 security vulnerabilities:\n\n${fileContent}`
            }
          }
        ],
        // Set model preferences (abstracted, no hardcoded vendor keys needed)
        modelPreferences: {
          hints: [{ name: "claude-3-5-sonnet" }, { name: "gpt-4o" }],
          intelligencePriority: 0.8
        },
        maxTokens: 1000,
        systemPrompt: "You are an expert static application security testing (SAST) bot."
      }
    },
    CreateMessageResultSchema
  );

  return response.content.type === "text" ? response.content.text : "";
}
```

#### 3. Real-Time Feedback via `Progress Notifications`

Because inspecting a full codebase using sequential sampling calls takes time, you can notify the host's UI of progress in real time.

  

TypeScript

```
async function sendProgress(server: Server, progressToken: string | number, current: number, total: number) {
  await server.notification({
    method: "notifications/progress",
    params: {
      progressToken,
      progress: current,
      total: total,
    }
  });
}
```

### Implementation Breakdown

1. **Root Verification Phase:**
    
      
    - User triggers the `audit_project` tool.
        
          
        
    - Server sends `roots/list` request to the client.
        
          
        
    - Server scans directory recursively, ensuring all targeted files reside inside approved roots.
        
          
        
2. **Chunking & Dispatch Phase:**
    
      
    - Server filters for relevant source files (`.ts`, `.py`, `.go`, etc.).
        
          
        
    - Iterates through files and tracks `progressToken` to stream status updates (`1/10 files scanned`, `2/10 files scanned`).
        
          
        
3. **Sub-Sampling Loop:**
    
      
    - For each file, dispatch a `sampling/createMessage` RPC call.
        
          
        
    - The client routes the request through the user's connected AI model and returns structured findings.
        
          
        
4. **Aggregation & Reporting:**
    
      
    - Server compiles all localized findings into a single Markdown audit report with severity levels (High, Medium, Low).
        
          
        
    - Returns the final summary back as the standard response to the original `audit_project` tool call.
        
          
        

### Key Technical Insights Gained

- **Zero API Key Dependencies:** Your server does not require an Anthropic or OpenAI API key. The client supplies the LLM execution power via **Sampling**.
    
      
    
- **Inverted Control Flow:** You transition from passive tool execution to proactive agent execution where your server orchestrates multi-step sub-tasks.
    
      
    
- **Client-Enforced Security:** You gain experience balancing server autonomy with client-side permissions using **Roots**.