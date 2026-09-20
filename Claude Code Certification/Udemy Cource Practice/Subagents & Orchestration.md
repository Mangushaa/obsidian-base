
To allow orchestrator spawn subagents 'Task' tool is used and should be inserted into allowedTools list


We can use hooks same as with claude code, to do some action before/after tool call.


- Case facts bocks - key info for current conversation, should be stored in durable storage outside the model, usually in JSON format.
- Trimmed tool outputs - get only important data from tool output to not pressure model context
- Recovery manifest - store current model progress (last_completed_step, pending_step, what is safe to retry, what to not retry, last tool_call_results)


### 1. Standard Spawn (`Task` Tool Default)

- **Context:** **Empty** (fresh start).
- **How it works:** The parent executes `Task(prompt="...")`. The subagent receives _only_ the string provided in `prompt` (plus its own system prompt and tools).
- **The Failure Mode:** If the subagent needs prior research or citations from the parent, the parent **must manually pass** all those citations into the `Task` prompt string. If the parent forgets, or if the history is too large to fit in the tool parameters, the child agent loses that state.
    
### 2. Forked / Cloned Spawn (`context: fork`)
- **Context:** **Inherited** (full clone of the parent's current conversation state).
- **How it works:** Many multi-agent frameworks allow configuring the `Task` tool or subagent configuration with a **`fork` instruction** (e.g., `context: fork` or passing a parent `session_id`).
- **What happens:** Instead of starting with an empty context window, the engine duplicates the parent's _entire chat transcript and citations_ up to that point into a new `child_session_id`. The subagent then continues from that exact snapshot without losing citations or history.