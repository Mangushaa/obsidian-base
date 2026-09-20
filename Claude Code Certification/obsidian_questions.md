# Agent SDK / Claude Code Assessment Questions

### Question ID: d1-001

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A support agent's production data shows 12% of cases skip get_customer and call lookup_order using only a stated name, occasionally misidentifying accounts and issuing incorrect refunds. What change most effectively addresses this reliability issue?

- [ ] **A**: Strengthen the system prompt so it states that customer verification via get_customer is mandatory before every lookup.
- [ ] **B**: Add few-shot examples that show the agent always calling get_customer first, before any lookup_order or refund call.
- [x] **C**: Add a programmatic prerequisite blocking lookup_order and process_refund until get_customer returns a verified ID.
- [ ] **D**: Implement a routing classifier that analyzes each request and enables only a relevant subset of the tools.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Critical financial/identity logic needs a deterministic guarantee. Strengthening the prompt or adding few-shot only make compliance more probable; a routing classifier addresses tool availability, not call ordering.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-002

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

A research system on 'impact of AI on creative industries' runs cleanly, but final reports cover only visual arts (digital art, graphic design, photography) and miss music, writing, film. Coordinator logs show it decomposed the topic into 'AI in digital art,' 'AI in graphic design,' 'AI in photography.' Most likely root cause?

- [ ] **A**: The synthesis agent lacks instructions to spot coverage gaps, so it never notices music, writing, and film were missing.
- [ ] **B**: The web search agent's queries simply aren't comprehensive enough to surface the missing creative domains.
- [x] **C**: The coordinator's task decomposition is too narrow, so the subagent assignments never cover all relevant domains.
- [ ] **D**: The document analysis agent filters out non-visual sources through overly restrictive relevance criteria.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The logs name the cause: the coordinator only assigned visual-arts subtasks. The subagents executed their assignments correctly, so blaming the synthesis, search, or document-analysis agents misreads the evidence.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-003

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.2

Two subagents return overlapping but differently-framed findings on the same subtopic. How should the coordinator combine them for the final report?

- [ ] **A**: Return both finding sets to the user verbatim and let them decide which framing they prefer to keep
- [x] **B**: Pass both result sets to the synthesis agent so it can integrate them into one unified, coherent report
- [ ] **C**: Discard the lower-confidence set before synthesis to avoid any redundant or overlapping framing in output
- [ ] **D**: Average the two into a single merged value and store that one reconciled number to avoid duplicated framing

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Synthesis is the stage designed to integrate multiple findings coherently; the coordinator should route both there rather than prematurely discarding or averaging.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-004

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.2

What is the main advantage of keeping the coordinator as a central hub through which all subagent communication flows?

- [ ] **A**: It removes any need for structured error handling inside the individual subagents that report to the hub
- [ ] **B**: It lets subagents call each other directly to cut latency and share a scratchpad, removing the hub bottleneck
- [ ] **C**: It lets all subagents automatically share one common conversation history without the coordinator relaying it across
- [x] **D**: The coordinator observes every interaction, handles errors uniformly, and controls what each subagent receives

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Centralized observation, uniform error handling, and context control are the point of hub-and-spoke. Subagents do not share one history automatically, central coordination doesn't remove the need for structured errors, and direct subagent-to-subagent calls break the pattern.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-005

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

Two research subagents keep covering the same sources and subtopics, wasting effort. Most effective fix?

- [ ] **A**: Reduce the number of research subagents down to one so a single agent owns the entire space and cannot overlap
- [ ] **B**: Add a deduplication pass after synthesis to strip out the repeated sources and subtopics from the merged output
- [ ] **C**: Let the subagents negotiate ownership of sources and subtopics among themselves at runtime as they discover the overlap
- [x] **D**: Have the coordinator partition the research space up front, assigning each agent distinct subtopics or source types

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Duplication is an assignment/decomposition problem, so partition the research space up front. Dropping to a single agent loses parallelism, runtime negotiation is brittle, and a post-hoc dedup pass only treats the symptom.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-006

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

Complex support requests bundle several distinct issues and average 12+ tool calls, with degraded accuracy. Best approach?

- [ ] **A**: Always escalate any multi-issue request straight to a human agent rather than attempting an automated resolution
- [x] **B**: Decompose the request into separate issues, investigate each in parallel with shared customer context, then synthesize
- [ ] **C**: Instruct the agent to handle only the first issue in each request and defer the remaining bundled issues to a later turn
- [ ] **D**: Raise the per-request tool-call limit so the agent has many more calls available to work through every bundled issue

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Parallel decomposition with shared customer context handles independent issues cleanly. Raising the tool-call limit or handling only the first issue dodges the problem, and blanket escalation wastes humans on straightforward work.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-007

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

An agent averages 4+ sequential API loops per resolution because it requests one tool at a time. How to reduce round-trips?

- [ ] **A**: Increase the context window so more tool results fit and the agent needs fewer sequential loops per resolution
- [ ] **B**: Cache previous tool results aggressively so repeated calls return instantly and overall round-trips drop sharply
- [ ] **C**: Switch to the Batch API so every independent tool request is submitted together and processed in one cheaper job
- [x] **D**: Instruct the model to bundle independent tool requests into one turn and return all results before the next call

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Emitting multiple tool_use blocks in a single turn collapses round-trips. Batch can't do interactive multi-turn tool calling; window size and caching don't address loop count.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-008

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.1

What is the correct mechanism for controlling an agentic loop's continuation?

- [ ] **A**: Parse the assistant's text each turn for phrases like 'I'm done' and treat that as the signal to stop the loop
- [ ] **B**: Stop after a fixed maximum of five iterations regardless of the conversation state or whether work remains undone
- [ ] **C**: Continue until the model returns an empty response, since that cleanly signals it has nothing further to add
- [x] **D**: Check the stop_reason field: keep looping while it is tool_use and stop the loop once it becomes end_turn

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** stop_reason is the control signal. Parsing assistant text or waiting for an empty response is unreliable, and a fixed iteration cap should be a safety backstop, not the primary stop condition.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-009

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

Several MCP tools return results in inconsistent shapes, confusing the agent. What deterministically normalizes outputs before the model sees them?

- [ ] **A**: Ask the model to reformat the inconsistent tool outputs itself on every turn before it reasons over the results
- [x] **B**: Use a PostToolUse hook to intercept tool outputs and apply formatting transformations before the agent sees them
- [ ] **C**: Wrap each tool in a retry loop so inconsistent shapes are retried until a usable, consistent result is returned
- [ ] **D**: Add a system-prompt note describing each tool's output format and ask the model to coerce any deviations it spots

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A PostToolUse hook transforms results deterministically every time. Describing formats in the prompt or asking the model to reformat relies on probabilistic compliance, and a retry loop is unrelated to formatting.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d1-010

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A coordinator agent is supposed to spawn specialist subagents but never does; it answers everything itself. Its configuration lists allowedTools as ['Read','Grep','WebSearch']. What is the fix?

- [ ] **A**: Set tool_choice to 'any' so the coordinator is forced to call a tool, including the subagent-spawning capability
- [x] **B**: Add 'Task' to the coordinator's allowedTools list so it gains the capability to spawn the specialist subagents
- [ ] **C**: Increase the coordinator's max tokens so it has plenty of output budget to delegate work to the specialist subagents
- [ ] **D**: Move the subagent definitions into CLAUDE.md so the coordinator discovers them and begins delegating work to them

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Spawning subagents requires the Task tool in allowedTools. Without it the coordinator cannot delegate regardless of prompting.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-011

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A subagent produces off-topic results because it lacks information the parent established earlier in the conversation. Why, and what is the fix?

- [ ] **A**: Enable session forking so the parent's established context is shared into the subagent's working conversation
- [x] **B**: Subagent context is isolated and does not inherit the parent's conversation, so pass needed context in the prompt
- [ ] **C**: Subagents inherit the parent's context automatically, so the parent's conversation history must have been corrupted
- [ ] **D**: The subagent's underlying model is too small to track the topic, so upgrade it to a larger and more capable model

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Subagent context is isolated, so relevant context must be passed explicitly in the delegation prompt. The belief that subagents inherit the parent's history is the common misconception; model size and session forking are unrelated.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-012

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

You want three independent subtopics researched concurrently to cut wall-clock time. How do you spawn the subagents for true parallelism?

- [ ] **A**: Spawn them across three successive turns and wait for each subagent to finish before starting the next one
- [x] **B**: Emit multiple Task calls in a single response so all three subagents are launched and run at the same time
- [ ] **C**: Use fork_session three times from the current transcript, then issue one Task call inside each forked branch
- [ ] **D**: Increase the iteration cap so the loop has enough turns to research all three independent subtopics in sequence

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Parallel subagents come from multiple Task calls in one response. Sequential turns serialize them; forking is for branching one session, not parallel delegation.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-013

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

You want to try two different refactoring approaches from the same starting point without losing the original session. Best mechanism?

- [x] **A**: Use fork_session / --fork-session to branch a new session from the transcript, leaving the original untouched
- [ ] **B**: Edit the transcript file by hand to remove the divergent turns between the two different refactoring attempts
- [ ] **C**: Use --continue twice in succession so each refactoring attempt replays and starts from the same shared baseline
- [ ] **D**: Start a brand-new session with no prior context so each refactoring approach begins from a completely clean slate

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Forking branches from a shared baseline and preserves the original for divergent approaches. Resuming the same session reuses one history, and starting fresh loses the baseline context.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-014

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

After a day's gap you want to keep working on an analysis, but the old session is full of large, now-stale tool results. What's usually best?

- [ ] **A**: Resume the old session as-is and rely on the model to recognize which tool outputs are stale and weight fresh ones
- [ ] **B**: Delete the project and re-clone it from scratch so the new session starts without any of the stale tool results
- [ ] **C**: Switch to a larger-context model and resume the old session so the stale tool results no longer overflow the window
- [x] **D**: Start a fresh session seeded with a structured summary of the relevant findings instead of the stale tool results

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A fresh session with a structured summary beats resuming a transcript bloated with stale tool outputs. Window size doesn't fix stale/irrelevant content.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-015

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.7

In a CI script you need to resume one specific, known prior Claude Code session by its identifier (not just the most recent). Which is correct?

- [ ] **A**: Use --new, which starts a fresh session each run rather than reattaching to any specific prior session by its id
- [ ] **B**: Use --continue, which automatically reattaches to the single most recently used session for the current project
- [x] **C**: Use --resume / -r with the session, or --session-id with the UUID to target a specific session programmatically
- [ ] **D**: Use --fork-session with the prior id, which branches a separate copy instead of reattaching to the original run

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** --continue resumes the most recent session; --resume/-r picks a specific one and --session-id sets/targets a programmatic UUID. Forking branches rather than resumes.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-016

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

Policy says refunds over $500 must go to a human. Refund amounts are decided dynamically by the agent. Where do you enforce the rule reliably?

- [ ] **A**: Add few-shot examples that demonstrate escalating large refunds, so the model learns to route big amounts to a human
- [ ] **B**: Put a strong 'NEVER refund over $500 automatically' instruction near the top of the system prompt for maximum salience
- [x] **C**: Use a tool-call interception hook that blocks or reroutes process_refund whenever the requested amount exceeds $500
- [ ] **D**: Lower the model temperature so its outputs become more deterministic and it is far less likely to exceed the ceiling

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A monetary threshold must be enforced by interception, not by prompt salience or few-shot examples, and sampling temperature has nothing to do with it.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d1-017

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.4

A high-impact action (issuing a credit) is occasionally executed when the agent misreads intent. You want a safety gate without removing autonomy. Best pattern?

- [x] **A**: Preview-then-execute: the agent proposes the action and a single-use token confirms it before the side effect occurs
- [ ] **B**: Lower the refund tool's rate limit so the agent can issue credits less frequently and mistakes are naturally throttled
- [ ] **C**: Have the agent self-report a confidence score and execute automatically whenever that score is above the 8-out-of-10 bar
- [ ] **D**: Tell the agent in its prompt to carefully double-check itself before issuing any credit so it catches misread intent

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Preview-then-execute with a single-use token gates the side effect deterministically. Prompt self-checks and rate limits don't gate the action, and routing on a self-reported confidence score is unreliable.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-018

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

The refund tool currently accepts a max_allowed parameter that the model fills in. Refunds sometimes exceed policy. Most robust fix?

- [x] **A**: Have the tool read the policy threshold server-side and enforce it internally, ignoring any model-supplied limit value
- [ ] **B**: Validate the amount in a follow-up model turn, recomputing it and comparing against the ceiling before the tool commits
- [ ] **C**: Ask the model to always pass the correct max_allowed value so the parameter it fills in matches the current policy cap
- [ ] **D**: Add the policy threshold to CLAUDE.md so the model reliably reads the ceiling from context on every refund it processes

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A limit the model supplies can be wrong; the tool must enforce the threshold from a trusted server-side source. Asking the model to pass it correctly, putting it in CLAUDE.md, or validating in a later turn all leave the model in control of the guardrail.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-019

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.1

Which is an anti-pattern when implementing an agentic loop?

- [ ] **A**: Appending each tool_use result to the message history before making the next call so the model sees prior outcomes
- [ ] **B**: Stopping when stop_reason is end_turn, the natural completion signal that lets the loop exit once tools are no longer asked for
- [x] **C**: Using a hard iteration cap as the PRIMARY stop condition for the loop instead of relying on the model's stop_reason
- [ ] **D**: Bundling several independent tool calls into one turn so they can be dispatched together rather than one at a time

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** An iteration cap is a safety backstop, not the primary control; the loop should be driven by stop_reason. Appending tool results, stopping on end_turn, and bundling independent calls are all correct practices.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-020

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.2

A user asks the multi-agent research system a single, simple factual question the coordinator already knows. What should happen?

- [ ] **A**: Spawn one subagent per word so each handles a single token in parallel and the coordinator reassembles the answer fast
- [ ] **B**: Always run the full search, analysis, and synthesis pipeline for every question so behavior stays perfectly consistent
- [x] **C**: The coordinator answers directly rather than spinning up the full search, analysis, and synthesis pipeline for this one
- [ ] **D**: Escalate the question to a human reviewer who can confirm the fact before any answer is returned back to the user asking

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Don't use a full multi-agent pipeline for something the coordinator can answer directly; orchestration overhead should match task complexity.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-021

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.6

You must process a document through a fixed, well-known sequence of stages (extract, classify, summarize). Which decomposition fits best?

- [ ] **A**: Parallel independent subagents with no coordinator
- [ ] **B**: A single mega-prompt that does everything at once
- [ ] **C**: Dynamic decomposition where each finding reshapes the plan
- [x] **D**: Prompt chaining: a fixed sequence of known steps

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Fixed, predictable multi-step work suits prompt chaining. Dynamic decomposition is for open-ended investigation; the stages here are interdependent and ordered.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-022

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.4

When the agent escalates a case to a human, what must the handoff include to be effective?

- [ ] **A**: Only the customer's latest message, leaving the human to reconstruct everything else about the case on their own
- [x] **B**: Customer ID, issue type, root cause, relevant records, the actions already taken, and a concrete recommendation
- [ ] **C**: A confidence score and detected sentiment so the human can gauge urgency before opening the full conversation log
- [ ] **D**: Nothing at all, on the assumption that the human reviewer can simply re-investigate the entire case from scratch

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A useful handoff carries full context and a recommendation. Sending only the latest message or nothing forces the human to re-investigate, and confidence or sentiment are unreliable signals.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-023

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.2

Subagents follow brittle step-by-step scripts and break on inputs the script didn't anticipate. Better way to define them?

- [ ] **A**: Remove the coordinator entirely and let the subagents free-run, coordinating among themselves without central direction
- [ ] **B**: Replace the subagents with a single monolithic prompt that tries to handle every step of the task in one pass instead
- [x] **C**: Give each subagent a goal plus quality criteria and let it choose how to achieve them on the inputs it encounters
- [ ] **D**: Add more rigid steps that exhaustively cover every anticipated input branch so the script never hits an unhandled case

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** AgentDefinitions should express goals + criteria, not over-prescribed steps; capable models generalize better from intent than from brittle scripts.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-024

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.1

A developer assumes the model 'remembers' a customer's earlier order across API calls without resending it, and is surprised when it doesn't. Why?

- [x] **A**: The Messages API is stateless, so the model only sees the current request and history and tool results must be resent
- [ ] **B**: The earlier order fell below the memory threshold, so it was dropped from what the model automatically retains for you
- [ ] **C**: A session_id must be set on the first request to enable memory, after which the model rehydrates prior orders for you
- [ ] **D**: The model's stored memory of the order simply expired on its own roughly thirty minutes after the original API call

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The API is stateless; your application manages state and re-supplies context each call. session_id does not give the model memory.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-025

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.3

Which statement about coordinator-subagent delegation is correct?

- [ ] **A**: Subagents persist filesystem state for one another, so files written by one are automatically visible to the next one
- [ ] **B**: Delegation requires setting tool_choice to 'any' so the coordinator is forced to hand work off on every single turn
- [x] **C**: The coordinator delegates discrete subtasks and must pass each subagent only the specific context that subtask needs
- [ ] **D**: Subagents automatically inherit the coordinator's full message history, giving each one the entire conversation log

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The coordinator decides what each isolated subagent receives. The claim that subagents see the full history is the inheritance misconception; subagents don't share filesystem state, and delegation doesn't require a particular tool_choice.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-026

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A teammate argues that adding 'IMPORTANT: always verify identity' to the system prompt is equivalent to a hook for guaranteeing a verification step. What's the accurate distinction?

- [ ] **A**: System prompts are strictly stronger than hooks, so an emphatic instruction is the more reliable enforcement mechanism
- [ ] **B**: Hooks only work in CI runs and not during interactive sessions, so a prompt instruction is needed for live verification
- [ ] **C**: They are equivalent, because the model reliably treats emphatic phrasing like IMPORTANT or ALWAYS as a binding rule
- [x] **D**: Hooks enforce deterministically, while CLAUDE.md and system-prompt instructions only guide probabilistically

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Hooks enforce; prompts guide. Emphasis words raise salience but don't guarantee behavior for critical logic.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d2-001

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

Logs show the agent frequently calls get_customer for order queries (e.g. 'check my order #12345') instead of lookup_order. Both tools have minimal descriptions ('Retrieves customer information' / 'Retrieves order details') and accept similar identifiers. Most effective first step?

- [x] **A**: Expand each tool's description with input formats, example queries, edge cases, and when to use it versus the other.
- [ ] **B**: Consolidate both tools into a single lookup_entity tool that internally decides which records to retrieve and return.
- [ ] **C**: Implement a routing layer that pre-selects one of the tools from keywords detected in the user's incoming query.
- [ ] **D**: Add five to eight few-shot examples that route order queries to lookup_order and customer queries elsewhere.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Descriptions are the primary selection mechanism; fixing them is the lowest-effort root-cause fix. Few-shot adds overhead, routing is over-engineered, merging tools is a bigger change.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-002

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A synthesis agent frequently verifies claims by returning to the coordinator, which calls the web-search agent and re-invokes synthesis, adding 2-3 round-trips (+40% latency). 85% of verifications are simple fact-checks; 15% need deeper investigation. Most effective fix?

- [ ] **A**: Have the synthesis agent batch all of its verifications and forward them together to the coordinator in a single round-trip.
- [x] **B**: Give synthesis a scoped verify_fact tool for simple lookups, keeping complex verifications routed via the coordinator.
- [ ] **C**: Give the synthesis agent direct access to the entire set of web-search tools the coordinator can reach.
- [ ] **D**: Have the web-search agent speculatively pre-cache extra context the synthesis agent might later request.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Least privilege: give synthesis a narrow tool for the 85% case and route the rest. Batching verifications still blocks, giving synthesis every web-search tool over-provisions, and speculative pre-caching can't reliably predict needs.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d2-003

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

A PDF-parsing subagent in a multi-agent pipeline sees two distinct failure modes: about 8% of files hit transient network/OCR timeouts that succeed on a quick retry, while a smaller share are genuinely corrupted and never parse. One coordinator orchestrates 12 such subagents. What failure-handling policy keeps the pipeline both resilient and observable?

- [x] **A**: Retry transient failures locally with a bounded limit, and return unrecoverable files as a structured error to the coordinator
- [ ] **B**: Escalate every failure, transient or not, straight to the coordinator so that all error-handling logic lives in one central place
- [ ] **C**: Catch all failures inside the subagent and return an empty result marked successful so the pipeline never stalls on a bad file
- [ ] **D**: On any parse failure, terminate the whole pipeline so that no partial or corrupt data can ever flow to the downstream stages

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Two-part policy: subagents absorb transient failures locally with bounded retry, and propagate only the unrecoverable as a structured error carrying context, letting the coordinator reroute or accept partial results. B floods the coordinator and centralizes what the subagent can fix; C (empty-as-success) hides failure and corrupts downstream results; D over-reacts, sacrificing 11 healthy subagents for one bad file.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-005

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

The web-search tool is named 'search' with description 'searches the web,' and the agent often misroutes between it and the document-analysis tool. Most effective fix?

- [x] **A**: Rename it extract_web_results, described as 'returns information retrieved from web search and URLs,' apart from document analysis
- [ ] **B**: Lower the sampling temperature so the model becomes more deterministic and stops bouncing between the search and document-analysis tools
- [ ] **C**: Add a separate routing classifier in front that inspects each request and decides which of the two tools the agent should then call
- [ ] **D**: Merge the two tools into one combined tool so there is no longer any boundary at all for the agent to misroute across between them

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Differentiating the name/description is the cheapest effective fix for misrouting; routing layers and merges are heavier and unnecessary.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-006

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A document-analysis agent misuses a generic fetch_url tool, passing it non-document URLs and getting garbage. Most effective fix?

- [ ] **A**: Tell the agent in the system prompt to only ever pass document URLs to the fetch_url tool and to skip anything that is not a document
- [x] **B**: Replace fetch_url with a load_document tool that validates the URL points to a document format before fetching its contents
- [ ] **C**: Add retry logic to fetch_url with exponential backoff so the occasional garbage response from a non-document URL is silently retried away
- [ ] **D**: Increase the agent's context window so it has more room to absorb and work around the garbage that the fetch_url tool returns

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A purpose-specific tool with validated input encodes the constraint in the interface. Prompt-only guidance is probabilistic; retry/window don't address misuse.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-007

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

What distinguishes the best error-propagation design for subagent tools?

- [x] **A**: Distinguishing access failures like a timeout, which need a retry, from valid empty results like '0 results' that mean a successful query
- [ ] **B**: Treating all non-200 responses identically and handing the caller the same generic failure no matter what went wrong upstream in the call
- [ ] **C**: Always returning an empty list on any problem, leaving the agent to work out whether that empty payload meant a real failure or a true zero
- [ ] **D**: Throwing an exception for every business condition so the caller must wrap each tool call and then interpret the resulting error stack

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A timeout is a failure needing a retry decision while a zero-result is success. Treating all responses identically or returning empty on any problem conflates them, and throwing exceptions for expected business outcomes hides detail.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-008

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

Six developers need a shared GitHub MCP server in their Claude Code project, with per-developer tokens and no secrets in the repo. Best setup?

- [x] **A**: Add the server to project .mcp.json using env-var substitution (${GITHUB_TOKEN}) and document the required variable in the README
- [ ] **B**: Hardcode each developer's personal token directly in a committed config file so the shared server works the moment anyone clones the repo
- [ ] **C**: Put the server only in each user's ~/.claude.json so every developer keeps a private token locally, then point the project setup at it
- [ ] **D**: Email the tokens to each developer individually and have them paste the value in at runtime whenever the shared MCP server authenticates

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** .mcp.json is shared and version-controlled, and env-var substitution keeps secrets out of the repo while each developer supplies their own token. A user-only config isn't shared, and committed or emailed tokens leak secrets.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d2-009

**Difficulty:** Easy | **Domain:** 2 | **Task:** 2.1

An agent calls the wrong tool for many requests. What should you check FIRST?

- [ ] **A**: Whether the underlying model needs fine-tuning on your tool set before it can reliably distinguish which tool to call for each request
- [ ] **B**: Whether the tool count should be reduced all the way to one so there is no longer any choice left for the agent to get wrong
- [ ] **C**: Whether you should add a routing classifier keyed on request features, since a deterministic pre-selection layer is the most reliable repair
- [x] **D**: Whether the tool descriptions clearly differentiate each tool's purpose so the model has an unambiguous signal for which one to select

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Descriptions are the primary selection signal and the first thing to inspect/fix. The others are heavier interventions tried only after descriptions are sound.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-010

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.1

Analysis shows the agent picks get_customer 78% of the time when the user says 'account' but lookup_order 93% when they don't. Most likely root cause?

- [ ] **A**: The model is fundamentally unable to route between these tools and will keep guessing no matter how the prompt or descriptions are written
- [ ] **B**: The user base drifted toward order-heavy queries, shifting the keyword mix the agent sees and changing which tool the model tends to prefer
- [ ] **C**: The two tools share a backend service, so the calls bleed together and the agent cannot tell which one actually handled a given request
- [x] **D**: The system prompt has keyword-sensitive instructions that steer tool selection on terms like 'account,' creating these unintended patterns

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A strong keyword correlation points at keyword-sensitive prompt instructions steering selection. The data names the cause rather than a model defect.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-011

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

After fixing descriptions, the agent still misroutes on genuinely ambiguous queries. Best next step?

- [ ] **A**: Remove one of the tools entirely so the genuinely ambiguous queries can only ever resolve to the single remaining tool option left
- [ ] **B**: Force tool_choice to a single named tool every time so the model can no longer pick the wrong one on any of the ambiguous cases
- [ ] **C**: Add a confidence threshold gate that withholds the tool call whenever the model's certainty about the routing decision is too low to act on
- [x] **D**: Add 4-6 few-shot examples targeted at the ambiguous scenarios, each with a rationale for why one tool beats the plausible alternatives

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Targeted few-shot with reasoning teaches the boundary for ambiguous cases once descriptions are already clear. Removing a tool or forcing a single tool cripples capability, and a confidence threshold is unrelated.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-012

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

You need to guarantee the model calls extract_metadata before any enrichment, and never just chats. Which tool_choice setting forces a specific tool?

- [ ] **A**: Omit tool_choice entirely and rely on the model to decide on its own that extract_metadata should be the very first call it makes
- [ ] **B**: Set tool_choice to 'any' so the model is required to call some tool, though not necessarily the extract_metadata tool you actually need
- [x] **C**: Set tool_choice to {type:'tool', name:'extract_metadata'} so the model is required to call that specific named tool first
- [ ] **D**: Set tool_choice to 'auto', which lets the model decide whether extract_metadata is the right first call rather than forcing that tool

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Forcing a named tool requires {type:'tool', name:...}. 'auto' may return text, 'any' calls some tool but not necessarily that one, omitting defaults to auto.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d2-013

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

An MCP tool currently returns 'Operation failed' on any problem, and callers can't decide whether to retry. What should the structured error convey?

- [ ] **A**: An empty result so the agent simply moves on, treating the absence of any data as if the operation had completed entirely successfully
- [ ] **B**: A full server-side stack trace so the calling agent can read the internal frames and try to figure out the underlying failure on its own
- [ ] **C**: Just a numeric HTTP status code, leaving the caller to map that single bare number onto whatever recovery behavior it can manage to infer
- [x] **D**: isError plus an errorCategory (transient, validation, business, or permission), an isRetryable flag, a readable message, and a next step

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Structured, categorized, retryability-tagged errors let the caller make recovery decisions. A stack trace or bare status isn't actionable; empty-as-success hides the failure.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-014

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.4

Your MCP server exposes a large, fairly static catalog of available report schemas. Agents waste calls discovering them. Which primitive fits best?

- [ ] **A**: Return the catalog of report schemas only on error, so agents see the available options just when a call has already failed
- [x] **B**: Expose the catalog as an MCP resource, which is application-controlled context, rather than wiring it up as a callable tool
- [ ] **C**: Add a list_schemas tool the agent must call every turn, returning the full schema list each time so the catalog always stays fresh
- [ ] **D**: Embed the whole catalog of report schemas directly into every system prompt so the agent never has to discover them at all

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Catalogs/schemas/docs are classic MCP resources (application-controlled context), reducing exploratory tool calls. A tool for static reference data is the wrong primitive.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d2-015

**Difficulty:** Easy | **Domain:** 2 | **Task:** 2.5

You want to find every file matching **/*.test.tsx across a repo, then search those files for a specific function name. Which built-in tools fit, in order?

- [ ] **A**: Grep for the path pattern first to enumerate the file paths, then run Glob over those results to scan inside each file for the function name
- [ ] **B**: Use Edit to locate the function across the matching test files, relying on its search behavior to surface every place the name appears
- [x] **C**: Use Glob to match the **/*.test.tsx path pattern, then use Grep to search the contents of those files for the function name
- [ ] **D**: Read every matching file in full and scan it manually for the function name rather than relying on the pattern-matching tools

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Glob matches name/path patterns; Grep searches contents. Reading everything is wasteful; Edit replaces unique text, it doesn't search.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d3-001

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.2

You want a custom /review slash command that runs your team's review checklist and is available to every developer who clones or pulls the repo. Where do you create it?

- [ ] **A**: In the root CLAUDE.md under a commands section
- [x] **B**: In the project's .claude/commands/ directory
- [ ] **C**: In each developer's ~/.claude/commands/
- [ ] **D**: In a .claude/config.json commands array

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Project-scoped commands in .claude/commands/ are version-controlled and shared with everyone who clones the repo. A personal commands directory isn't shared, and neither CLAUDE.md nor a config.json array is how commands are defined.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-002

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.4

You must restructure a monolith into microservices: changes across dozens of files and decisions about service boundaries and dependencies. Which approach?

- [ ] **A**: Begin working directly and switch into plan mode only later, if the task turns out to be complex.
- [x] **B**: Enter plan mode to explore the codebase and design the service boundaries before changing any code.
- [ ] **C**: Start direct execution and let the implementation gradually reveal the right service boundaries to adopt.
- [ ] **D**: Use direct execution with detailed upfront instructions written for every individual service.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Large, architectural, multi-approach work is exactly what plan mode is for. The complexity is already known, so deferring to plan mode only if it gets complex is wrong, and the direct-execution options risk costly rework.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d3-003

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

Different areas have different conventions (React hooks, async API handlers, repository-pattern models) and test files are spread throughout (Button.test.tsx beside Button.tsx). You want generated code to follow the right conventions regardless of location. Most maintainable approach?

- [ ] **A**: Put all conventions into the root CLAUDE.md and rely on Claude to infer which of them apply to each file.
- [ ] **B**: Place a separate CLAUDE.md inside each subdirectory so its conventions apply to that area's files.
- [x] **C**: Create rule files in .claude/rules/ with glob patterns that conditionally apply conventions by file path.
- [ ] **D**: Create one skill per code type, keeping that type's conventions inside its own SKILL.md file.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** .claude/rules/ with path globs applies conventions wherever matching files live and only loads then. A root CLAUDE.md relies on inference, per-type skills need manual invocation, and per-directory CLAUDE.md can't span scattered files.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-004

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.6

A pipeline runs `claude "Analyze this PR for security issues"` but hangs indefinitely waiting for interactive input. Correct fix?

- [ ] **A**: Add a --batch flag to the command so the CLI knows not to wait for any interactive input.
- [ ] **B**: Redirect stdin from /dev/null so the command cannot block while waiting on interactive input.
- [x] **C**: Add the -p / --print flag (claude -p "Analyze this PR...") to run non-interactively and exit.
- [ ] **D**: Set CLAUDE_HEADLESS=true in the environment to switch the CLI into a fully non-interactive mode.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** -p/--print is the documented non-interactive mode: process the prompt, print to stdout, and exit. A headless env var and a batch flag are invented, and redirecting stdin is a hack rather than the proper fix.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d3-005

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.6

In CI you need Claude Code's code-review findings as structured data to post as inline GitHub comments. Best approach?

- [ ] **A**: Screenshot the terminal showing the code-review findings and attach the image so reviewers can read it alongside the pull request
- [ ] **B**: Email the raw, unstructured code-review output to the reviewers and let them transcribe the relevant findings into comments by hand
- [ ] **C**: Parse the free-text output with regex against a known pattern library, then post whichever findings happen to parse cleanly as comments
- [x] **D**: Use --output-format json with --json-schema to enforce structured findings, then parse them and post via the GitHub API

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** --output-format json with --json-schema yields machine-parseable, schema-enforced findings to post via the API. Regex over free text is brittle, and screenshots or email aren't programmatic.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d3-006

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

After a developer addresses review comments and pushes again, the automated review repeats already-handled feedback. How do you eliminate redundant comments?

- [ ] **A**: Always restrict the automated review to the very first commit on the branch and ignore every subsequent push the developer makes
- [x] **B**: Pass the prior review findings into context and instruct Claude to report only issues that are new or still unresolved on this push
- [ ] **C**: Switch to a larger model with a bigger context window so it can hold the full diff history and naturally avoid repeating prior feedback
- [ ] **D**: Disable the automated review entirely whenever it runs on a re-push so duplicate comments can never be generated by later runs

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Feeding prior findings and asking for only new/unresolved items prevents duplicate comments. The others disable value or don't address duplication.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d3-007

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.4

You're asked to add a Slack integration but the requirements are ambiguous and several architectures are viable. Best Claude Code approach?

- [ ] **A**: Start coding the first option right away so the developer sees working code and can steer the architecture by reacting to a draft
- [ ] **B**: Ask the user to write the integration code themselves and simply review whatever architecture and implementation they hand back to you
- [ ] **C**: Pick one of the viable architectures at random to save time, then build it out fully before checking any of the choices with the user
- [x] **D**: Use planning mode to explore the integration options and their architectural implications, then recommend one before implementing

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Ambiguous, multi-approach work warrants plan mode to explore and recommend before editing. Jumping straight to code risks costly rework.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d3-008

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

Your CLAUDE.md has grown past 400 lines, mixing universal standards with detailed PR-review, deploy, and migration workflows. Best restructuring?

- [ ] **A**: Split CLAUDE.md into separate files keyed by author so each contributor maintains and owns their own private slice of the conventions
- [ ] **B**: Delete the detailed PR-review, deploy, and migration workflow sections so the file shrinks back below a few hundred lines of standards
- [ ] **C**: Move every workflow and standard into one single giant skill invoked on demand so CLAUDE.md no longer carries project guidance
- [x] **D**: Keep universal standards in CLAUDE.md and move workflow guidance (PR review, deploy, migrations) into Skills with trigger keywords

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Universal, always-needed standards belong in CLAUDE.md (always loaded); workflow-specific guidance belongs in on-demand skills, keeping context lean.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-009

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A custom /analyze-codebase skill dumps huge amounts of exploration into the main conversation, after which the session becomes sluggish and unfocused. Best fix?

- [x] **A**: Add context: fork to the skill frontmatter so the heavy exploration runs in an isolated subagent and only its result returns
- [ ] **B**: Move the skill to ~/.claude/skills so it installs at the user level, which keeps the verbose exploration out of project context
- [ ] **C**: Increase the model's max output tokens so the long exploration fits comfortably and the session stops feeling sluggish or unfocused
- [ ] **D**: Tell the skill to be more concise in its exploration output so far less text lands in the main conversation on each invocation

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** context: fork isolates the skill's verbose work in a subagent, returning only results and protecting the main context. Location/conciseness/token settings don't isolate context.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-010

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.2

Your team ships a shared /commit skill, but you want your own personal variant without changing the team's. How?

- [ ] **A**: Rename the team skill to something distinct, then point your own slash command at the renamed copy so the team invocation still works
- [x] **B**: Create a personal version at ~/.claude/skills/commit/SKILL.md using the same name so it overrides the team skill just for you
- [ ] **C**: Edit the shared project skill directly with your personal preferences and hope none of your teammates notices the behavior change
- [ ] **D**: Delete the team's shared skill from the project so only your own personal commit variant remains available to everyone working there

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A personal skill in ~/.claude/skills with the same name overrides for you without touching the shared project skill.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-011

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A new developer doesn't follow a coding rule the original team always follows. The rule isn't in the project's .claude/CLAUDE.md. Most likely cause and fix?

- [ ] **A**: The new developer is running an outdated Claude model, so updating to the current model version will make them follow the team rule
- [ ] **B**: The rule must be declared in the project's .mcp.json server config, and adding it there is what propagates it to every team member
- [ ] **C**: Reinstall Claude Code on the new developer's machine, since a corrupted local install is why the shared coding rule is not being applied
- [x] **D**: The rule lives in the original developers' user ~/.claude/CLAUDE.md, not the project file; move it to project CLAUDE.md for everyone

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** User-level CLAUDE.md is private/not shared. A team-wide rule must be in the project-level file. Classic scope-diagnosis trap.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-012

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

You have a set of endpoint examples that are only relevant when generating new API endpoints, not for general work. Where should this context live?

- [ ] **A**: Always-loaded in CLAUDE.md so the endpoint examples are present in every session regardless of whether you are building endpoints
- [x] **B**: In a skill that references the endpoint examples and holds pattern-following instructions, invoked on demand via a slash command
- [ ] **C**: Pasted manually into every prompt by the developer whenever endpoints come up, so the examples are only present when truly needed
- [ ] **D**: In .mcp.json as a server entry, so the endpoint examples load automatically whenever the project MCP configuration is read at startup

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Workflow-specific context belongs in an on-demand skill, not always-loaded CLAUDE.md, to avoid bloating every session's context.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-013

**Difficulty:** Hard | **Domain:** 3 | **Task:** 3.2

A migration skill has three problems: it doesn't ask for the required target version, it pollutes the main context with verbose output, and it can run arbitrary tools including deletes. Which frontmatter changes fix all three?

- [ ] **A**: Move the skill to ~/.claude/skills so it installs at the user level, which on its own resolves the parameter, context, and tool issues
- [ ] **B**: Increase the skill's max tokens and add a warning comment about deletes, trusting the operator to supply the target version manually
- [x] **C**: Add argument-hint to request required parameters, use context: fork to isolate execution, and restrict allowed-tools to file writes
- [ ] **D**: Only add argument-hint so the skill prompts for the required target version, leaving the context and tool-capability problems untouched

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** argument-hint solves the missing parameter, context: fork isolates context, allowed-tools restricts capability. Each frontmatter key maps to one stated problem.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-014

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.3

You want to organize a 500+ line CLAUDE.md into focused, topic-scoped convention files. Best structure?

- [ ] **A**: A single appended changelog file where every new convention is added at the bottom over time, growing into one long unscoped list
- [x] **B**: Separate Markdown files under .claude/rules/, each covering one topic (e.g. testing.md, api-conventions.md), scoped with path globs
- [ ] **C**: One file per developer keyed by author name, so each person maintains the conventions for the files they own without any overlap or conflict
- [ ] **D**: Inline everything into package.json so the conventions travel with the project metadata and load alongside the dependency manifest

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Topic-scoped rule files under .claude/rules/ with path globs load conditionally and keep conventions modular and maintainable.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-015

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

Phase 1 of a task is broad codebase discovery whose verbose output fills the context window before implementation begins. Best approach?

- [ ] **A**: Skip discovery and start implementing from assumptions, accepting that some rework may be needed once the codebase reality is clearer
- [ ] **B**: Run all three phases inside one giant prompt so discovery, planning, and implementation share a single continuous main conversation
- [x] **C**: Use an Explore subagent for Phase 1 to isolate verbose discovery and return a summary, then run Phases 2-3 in the main conversation
- [ ] **D**: Increase the context window and read every discovery file inline, relying on the larger window to absorb all of the verbose output

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** An Explore subagent isolates noisy discovery and returns a concise summary, preserving main context for implementation. Bigger windows don't address attention dilution.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d3-016

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.1

Which statement about CLAUDE.md precedence and sharing is correct?

- [ ] **A**: CLAUDE.md only loads when it is explicitly invoked, so none of its content reaches the model unless you reference the file by name
- [ ] **B**: Project CLAUDE.md overrides and hides the user-level CLAUDE.md entirely, so personal user-level instructions stop applying inside projects
- [ ] **C**: All CLAUDE.md files are shared with the team through version control, including the user-level file in each developer's home directory area
- [x] **D**: ~/.claude/CLAUDE.md is private and not shared; project .claude/CLAUDE.md is shared via VCS; directory-level files scope to their subtree

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** User-level is private; project-level is shared; directory-level scopes to its subtree. CLAUDE.md is always loaded (not on-demand).
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-017

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.4

You need to fix a single, well-understood off-by-one bug in one function. Plan mode or direct execution?

- [x] **A**: Direct execution, because the task is small, well-scoped, and has one obvious approach that does not warrant any upfront planning
- [ ] **B**: Spawn five subagents to debate the fix so they cross-check each other's reasoning and converge on the one correct boundary by majority vote
- [ ] **C**: Plan mode, always, for any change no matter how small, since planning every single edit upfront guarantees the most reliable result
- [ ] **D**: Switch to the Batch API to run the fix asynchronously, since offloading even this one-line edit to batch processing is most efficient

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Direct execution fits simple, well-scoped changes. Plan mode is for large/architectural/multi-approach work; the rest are over-engineering.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d4-001

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

A team wants to cut costs by moving two workloads to the Message Batches API (50% cheaper): (1) a blocking pre-merge check developers wait on, and (2) an overnight technical-debt report. How to evaluate?

- [x] **A**: Use the Batches API for the technical-debt reports only and keep the pre-merge check synchronous.
- [ ] **B**: Keep both workloads synchronous, treating the Batches API as unsuitable for automated workflows.
- [ ] **C**: Switch both to batch with a timeout fallback to real-time so the blocking check still returns fast.
- [ ] **D**: Switch both workloads over to the Batches API and use status polling to retrieve each result.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Batch (no latency SLA, up to 24h) suits the non-blocking overnight job, while the blocking pre-merge check must stay synchronous. Rejecting batch entirely is wrong, and polling or a timeout fallback add needless complexity.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d4-002

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.6

A single-pass review of a 14-file PR produces inconsistent results: detailed on some files, superficial on others, and contradictory (flagging a pattern in one file, approving identical code elsewhere). Best restructuring?

- [ ] **A**: Run three independent full-PR passes and flag only the issues that appear in at least two of the three.
- [x] **B**: Split into focused passes: per-file local analysis, then a separate cross-file integration pass.
- [ ] **C**: Switch to a higher-tier model whose larger context window can hold all fourteen files at once.
- [ ] **D**: Require developers to split each PR into smaller three-to-four file submissions for review.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The problem is attention dilution, not context size, so per-file passes plus an integration pass restore consistent depth. A bigger model or window misdiagnoses it, splitting PRs shifts burden to developers, and consensus-across-runs suppresses intermittent issues.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d4-003

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.6

Claude Code generates code and also reviews its own changes, missing non-obvious issues. How do you catch more?

- [ ] **A**: Skip the review step entirely to save time, accepting that some non-obvious issues will simply ship unnoticed
- [ ] **B**: Ask the same instance to try harder and scrutinize its own changes more critically on a second pass, since it knows the intent
- [x] **C**: Run a second independent instance of Claude Code to review the changes without access to the generator's prior reasoning
- [ ] **D**: Increase the temperature on the review pass so the model explores more varied critiques of the generated changes

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** An independent reviewer without the generator's reasoning is less biased toward the original decisions and catches more. Self-review shares the blind spots.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d4-004

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Why can't an iterative code-review flow that calls tools mid-analysis run on the Message Batches API?

- [x] **A**: The asynchronous batch model cannot execute tools mid-request and feed the results back for Claude to continue analyzing
- [ ] **B**: Batch requests are more expensive per token, so an iterative review loop quickly becomes too costly to run on that API
- [ ] **C**: Batch requests cannot accept or return JSON payloads, so the structured tool inputs the review flow needs are unsupported
- [ ] **D**: Batch has a smaller context window than the synchronous Messages API, so the iterative tool loop runs out of room mid-analysis

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Batch requests are single-shot and async; they don't support multi-turn tool calling mid-request. Cost (it's cheaper) and the other claims are wrong.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d4-005

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

A DevTools team runs three Claude workloads: (1) inline PR style checks that block the merge button while a developer waits, with a p95 latency budget of about 8 seconds; (2) a weekly security audit across the full repository; and (3) nightly generation of the test suite. They want to cut API spend without hurting any developer-facing latency. How should they assign the synchronous Messages API versus the Message Batches API?

- [ ] **A**: Move all three workloads to the Message Batches API to capture the 50% discount across the board
- [x] **B**: Keep the PR style checks on the synchronous Messages API; move the weekly audit and nightly test generation to the Message Batches API
- [ ] **C**: Keep all three on the synchronous Messages API, since the Batches API is unsuitable for automated CI workloads
- [ ] **D**: Batch the PR style checks to capture the discount and keep the weekly audit and nightly generation synchronous for freshness

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The decision driver is latency tolerance, not the discount. PR style checks block a waiting developer (an 8s budget), so they must stay on the synchronous Messages API; the weekly audit and nightly generation have no one waiting and can absorb the Batches API's async, up-to-24h turnaround, where the 50% cost cut is the payoff rather than the trigger. A ignores the blocking check's latency need, C wrongly rejects batch for all automation, and D inverts the mapping by batching the one workload a human actually waits on.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d4-006

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Review feedback is inconsistent in form: sometimes vague, sometimes missing a fix suggestion. How do you make it consistently actionable?

- [x] **A**: Add 3-4 few-shot examples showing the exact required format: identified issue, location in code, and a concrete fix suggestion
- [ ] **B**: Lower temperature to 0 so the model becomes deterministic and emits the same structured review fields on every run without drift
- [ ] **C**: Add the instruction 'be more specific' to the prompt so the model knows reviewers want clearer, more detailed feedback each time
- [ ] **D**: Increase the max tokens so the model has more room to fully describe each issue and never truncates its fix suggestions midway

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Few-shot examples demonstrating the exact output format produce consistency that vague instructions cannot. Token/temperature tweaks don't define the format.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-007

**Difficulty:** Easy | **Domain:** 4 | **Task:** 4.5

A 'deep analysis' feature generates a thorough nightly report with no real-time requirement. Which processing mode fits?

- [ ] **A**: Stream the long report to the user as it is produced, which feels faster even though there is no real-time requirement here
- [x] **B**: The Message Batches API, since it is cheaper and async and is well suited to non-urgent overnight turnaround work like this
- [ ] **C**: Synchronous real-time calls that return the full report immediately so the nightly job never has to wait on a queue to finish
- [ ] **D**: Interactive plan mode, letting the model draft and refine the nightly report step by step before emitting the final version

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Non-urgent, scheduled, high-volume work is the canonical batch use case. Real-time/streaming/interactive modes are for latency-sensitive paths.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d4-008

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

A comment-accuracy check flags too many false positives. Most effective prompt change?

- [x] **A**: Specify explicit criteria: flag a comment only when the behavior it claims actually contradicts the code's real behavior
- [ ] **B**: Tell it to 'be conservative and only flag obvious issues', biasing the model toward high-precision findings to suppress borderline ones
- [ ] **C**: Ask the model for a confidence score on each flag and trust it, dropping any comment that falls below a chosen threshold
- [ ] **D**: Increase the number of comment categories checked so the model spreads its attention and flags fewer items in any single category

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A concrete, categorical criterion improves precision; vague 'be conservative' does not, and self-reported confidence is unreliable.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-009

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Developers have lost trust because review categories like style/naming/documentation produce many false positives. Fastest way to restore trust while you improve prompts?

- [ ] **A**: Turn off reviews entirely until the prompts improve, so developers stop seeing any of the noisy false-positive findings
- [ ] **B**: Route every finding to a human reviewer first, so a person filters out the false positives before developers ever see them
- [x] **C**: Temporarily disable the high-false-positive categories like style, naming, and documentation, keeping only precise ones
- [ ] **D**: Add more review categories so the extra useful signal dilutes and offsets the false positives that current categories produce now

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Keeping only high-precision categories restores signal quality immediately; you re-enable the others once their prompts improve. The rest over- or under-correct.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-010

**Difficulty:** Easy | **Domain:** 4 | **Task:** 4.4

An automated test-suggestion step keeps proposing tests that already exist. How do you reduce duplicates?

- [ ] **A**: Run the suggestion step less frequently, so it sees fewer recent additions and is less likely to repropose existing tests
- [ ] **B**: Suppress all test suggestions whenever the file already has tests, so the step never repeats a scenario already covered
- [ ] **C**: Ask the model to be less thorough so it proposes fewer tests overall and therefore lands on fewer already-covered scenarios
- [x] **D**: Include the existing test file in context so Claude can see which scenarios are already covered before suggesting more

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Giving the model the existing coverage lets it propose only gaps. The others reduce value rather than fix the root cause (missing context).
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d4-011

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Reviewers spend ~40% of their time investigating flagged issues that turn out to be non-issues. Lowest-effort change to cut that time?

- [ ] **A**: Disable the review so reviewers stop spending time investigating its findings, removing the wasted effort at its source
- [ ] **B**: Add a second model as an independent reviewer, so reviewers trust a finding only when both models flag the same issue
- [x] **C**: Require Claude to include its rationale and a confidence estimate directly in each finding so reviewers triage faster
- [ ] **D**: Flag fewer issues at random so the overall volume drops and reviewers naturally spend less of their time chasing non-issues

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Inline rationale lets reviewers triage quickly (dismiss weak findings without re-investigating). Note this uses confidence as triage context, not as an automated routing signal.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-012

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

You ask Claude Code to write a Python adapter that maps each upstream vendor's REST JSON into your internal Invoice model. For a few representative endpoints the generated adapter runs but emits the wrong shape - it nests line items under the wrong key and drops the currency field - so downstream validation rejects ~15% of records. The mapping rules are clear to you, but the model keeps guessing the target structure. Most effective fix?

- [x] **A**: Provide 2-3 concrete input/output example pairs: a real upstream payload and the exact target Invoice JSON it should produce
- [ ] **B**: Enforce the response with output_config.format or a strict tool_use JSON schema so the output is constrained to the Invoice shape
- [ ] **C**: Write a longer prose specification of every field-mapping rule and restate the whole thing at the very top of the prompt
- [ ] **D**: Switch to a larger-context model so the full vendor schema fits alongside the target Invoice model definition in one prompt

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Concrete input/output example pairs teach the exact target mapping better than any prose. The trap is B: native Structured Outputs (output_config.format / strict tool_use) constrain the shape of Claude's OWN message or tool call - they do NOT constrain the behavior of source code Claude writes that you compile and run later, so they cannot fix a generated adapter. C (more prose) underperforms examples, and D misdiagnoses a mapping-clarity problem as a context-size one.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-013

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

A support agent's accuracy drops on requests that contain multiple issues requiring a specific tool sequence. Most effective improvement?

- [ ] **A**: Reduce the toolset to one tool, removing routing ambiguity and forcing the single correct sequence the multi-issue case needs
- [ ] **B**: Escalate all multi-issue requests to a human agent, so the tricky multi-step tool sequences never run through the model at all
- [ ] **C**: Increase the tool-call limit so the agent has enough calls available to work through every issue in a multi-issue request
- [x] **D**: Add few-shot examples demonstrating the correct reasoning and tool sequencing for handling multi-issue support requests

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Few-shot examples that model the reasoning and sequencing teach the pattern. Limits/escalation/removal avoid rather than solve the skill gap.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-014

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.6

For complex billing disputes, resolutions are technically correct but customer satisfaction is 15% lower. Most effective change?

- [x] **A**: Add a self-critique stage where the agent checks a draft for completeness: does it resolve the issue and anticipate follow-ups
- [ ] **B**: Add sentiment detection so the agent recognizes frustrated customers and apologizes more warmly in its billing responses
- [ ] **C**: Shorten every response so customers reach the resolution faster and spend less time reading through the agent's explanation
- [ ] **D**: Escalate all billing disputes to a human specialist, so a person handles the satisfaction-sensitive cases the model struggles on

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A self-critique/completeness pass improves response quality where correctness alone wasn't enough. Blanket escalation and shortening responses don't address completeness, and leaning on sentiment detection misses the real gap.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d4-015

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

You enforce extraction output with a JSON schema (via tool_use, output_config.format, or messages.parse), yet some invoices still have line items that don't sum to the stated total. What does the schema guarantee, and what's missing?

- [ ] **A**: Add more required fields to the schema to force correctness, so the model is compelled to make all the line items sum properly
- [x] **B**: The schema guarantees output shape, not semantic correctness; validate values separately, e.g. calculated vs stated total
- [ ] **C**: Switch to a bigger model, which would let the schema also enforce the arithmetic so line items always sum to the stated total
- [ ] **D**: The schema already guarantees correct values, so the only explanation is that the source invoice data was simply misread

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Constrained decoding guarantees shape, not source truth. Semantic checks (totals summing, field correctness) must be added on top.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-016

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.4

Your extractor sometimes invents a vendor tax ID because the schema marks it required, even when the document has none. The validation-retry loop doesn't help. Why, and what's the fix?

- [x] **A**: A required field pressures the model to invent absent data, and retry only fixes format errors; make the field nullable to show absence
- [ ] **B**: Add the vendor tax ID to the system prompt so the model can copy it into the output whenever the document leaves the field empty
- [ ] **C**: Retry the extraction more aggressively, since the model will eventually locate the tax ID somewhere within the document if it keeps trying
- [ ] **D**: Switch to the Batch API, which processes documents asynchronously and reduces the rate of fabricated required fields on extraction

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When info is genuinely absent, a required field forces hallucination and retries can't recover it. Nullable/optional fields let the model report absence honestly.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d5-001

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

A support agent hits 55% first-contact resolution vs an 80% target. Logs show it escalates straightforward cases (standard damage replacements with photo evidence) while attempting complex policy-exception cases autonomously. Most effective way to improve escalation calibration?

- [ ] **A**: Train a separate classifier on historical ticket outcomes to predict which cases should be escalated.
- [x] **B**: Add explicit escalation criteria to the system prompt with few-shot examples of when to escalate.
- [ ] **C**: Use sentiment analysis so the agent escalates whenever it detects negative customer sentiment.
- [ ] **D**: Have the agent self-report a 1-10 confidence score and auto-route any case below a set threshold.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The root cause is unclear decision boundaries; explicit criteria + examples fix it. Self-confidence is miscalibrated, a classifier is over-engineered, sentiment doesn't track complexity.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-002

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A web-search subagent times out on a complex topic. How should the failure flow to the coordinator for intelligent recovery?

- [x] **A**: Return structured error context: the failure type, the query attempted, any partial results, and alternatives.
- [ ] **B**: Propagate the exception to a top-level handler that immediately terminates the entire workflow run.
- [ ] **C**: Retry internally with exponential backoff, then return a generic 'search unavailable' once retries are exhausted.
- [ ] **D**: Catch the timeout and return an empty result marked successful so the coordinator simply moves on.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Structured error context lets the coordinator retry, reroute, or proceed with partial results. A generic 'search unavailable' hides context, empty-as-success masks failure, and terminating the whole workflow over-reacts.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d5-003

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

Two credible sources report contradictory statistics for the same metric. Best handling?

- [ ] **A**: Pick the higher number for the report, because a larger reported figure usually reflects the fuller and more complete underlying dataset
- [ ] **B**: Drop the metric entirely from the analysis, since two credible sources disagreeing means neither figure can be trusted enough to report
- [x] **C**: Complete the analysis with both numbers, annotate the conflict with source attribution, and let the coordinator reconcile them later
- [ ] **D**: Pick the more recent source silently, assuming newer data supersedes older figures and needs no note about the discrepancy in the report

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Annotate both with attribution and surface the conflict rather than arbitrarily choosing or discarding. Silent selection loses information and provenance.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-004

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

The synthesis agent receives mixed-quality upstream inputs: some subtopics well-sourced, others sparse due to failed searches. How should it structure the output?

- [ ] **A**: Omit the weakly-sourced subtopics without comment, presenting only the conclusions that the upstream searches managed to support well
- [ ] **B**: Present everything with equal confidence, treating sparse and well-sourced subtopics the same so the report reads as uniformly authoritative
- [x] **C**: Structure the synthesis with coverage annotations marking which conclusions are well-supported and where gaps exist from missing sources
- [ ] **D**: Refuse to produce a report at all, since mixed-quality inputs cannot yield a synthesis trustworthy enough to hand back to the requester

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Coverage annotations communicate confidence and gaps honestly. Equal confidence misleads; silent omission hides gaps; refusal is unhelpful.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-005

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

The synthesis agent reliably uses the beginning and end of its aggregated input but neglects the middle ('lost in the middle'). Best mitigation?

- [x] **A**: Place a key-findings summary at the start of the aggregated input and organize the details under explicit section headings for navigation
- [ ] **B**: Shuffle the input randomly before each run so no single region is consistently neglected and the middle gets a fair share of attention
- [ ] **C**: Send everything in one unbroken paragraph so the model reads it as a single continuous unit without losing track of section boundaries
- [ ] **D**: Double the context window so the synthesis agent has more room to attend to the middle, which spreads its attention evenly across the input

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Put key findings where attention is strong (the start) and add structure/headers. A bigger window doesn't fix the attention distribution problem.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-006

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Upstream agents send 155K tokens of verbose content and reasoning to a synthesis agent tuned for under 50K. Best fix?

- [ ] **A**: Summarize at synthesis time only, running a compression pass over the 155K tokens just before the synthesis agent reads them to fit budget
- [x] **B**: Modify upstream agents to return structured data (key facts, quotes, relevance scores) rather than verbose content and reasoning chains
- [ ] **C**: Switch synthesis to a 1M-token model and keep the verbosity, letting the larger window absorb the full 155K tokens without any changes
- [ ] **D**: Truncate the aggregated input to the first 50K tokens so it fits the budget, dropping whatever upstream content arrives after the cutoff

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Have upstream agents emit compact structured outputs so the budget is spent on signal. Truncation loses content; just enlarging the window keeps the noise.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-007

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

Which is the most justified escalation trigger?

- [x] **A**: A customer requests competitor price matching, which requires policy interpretation the agent is not authorized to make on its own
- [ ] **B**: The model's self-reported confidence score dropped below 7 out of 10, signaling it is too unsure to keep handling the case alone
- [ ] **C**: The customer used an angry tone in their messages, which suggests the situation needs a human's judgment to de-escalate properly
- [ ] **D**: The conversation exceeded 10 turns, since a long back-and-forth is a reliable indicator the agent is stuck and should hand off to a human

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A genuine policy gap/exception warrants escalation. Tone (sentiment), self-confidence, and turn-count are not valid escalation signals.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-008

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Across a 20+ turn chat, the agent starts misremembering exact amounts and order numbers from early in the conversation. Best fix?

- [ ] **A**: Summarize the conversation history more aggressively so the agent carries fewer tokens and can focus on the most recent exchanges
- [x] **B**: Extract transactional facts (amounts, dates, order numbers, statuses) into a persistent case-facts block in each prompt, outside summary
- [ ] **C**: Remind the model in the system prompt to be careful and double-check the amounts and order numbers it references from earlier in the chat
- [ ] **D**: Increase the context window so the whole conversation stays in view and early amounts and order numbers are never pushed out of memory

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Progressive summarization blurs exact figures; a persistent structured case-facts block keeps them precise. A bigger window and more summarization don't preserve exactness.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-009

**Difficulty:** Easy | **Domain:** 5 | **Task:** 5.2

get_customer returns multiple matching customers for the provided name. What should the agent do before any customer-specific action?

- [ ] **A**: Escalate to a human immediately, since multiple identity matches is exactly the kind of ambiguity a person should resolve before any action
- [x] **B**: Request an additional identifier such as an email, phone, or order number to disambiguate the customer before acting on their account
- [ ] **C**: Pick the most recently active match, assuming the customer who interacted most lately is the one currently making the request
- [ ] **D**: Proceed with the first match returned, treating the top result as the intended customer and continuing with the requested action

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Ambiguous identity must be resolved by asking for another identifier, not by guessing. Acting on a guessed match risks wrong-account changes.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-010

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.5

An extraction pipeline reports 97% aggregate accuracy, but a downstream team finds one field is frequently wrong. What's the lesson and the fix?

- [ ] **A**: Raise the overall accuracy target to 99%, on the assumption that a higher aggregate threshold will pull the weak field up with it
- [ ] **B**: Treat 97% as acceptable and conclude the downstream team is mistaken, since the aggregate number already clears the quality bar
- [x] **C**: Aggregate accuracy masks weak per-field performance; validate by field and document type, using stratified sampling to monitor fields
- [ ] **D**: Trust the model's self-reported confidence per field, auto-accepting fields it rates high and reviewing only the ones it flags uncertain

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A high aggregate can hide a bad field/type. Stratified, field-level evaluation surfaces it; self-reported confidence is unreliable.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d5-011

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

You want to auto-accept only high-confidence extractions and route the rest to a small human-review team. How should 'confidence' be defined?

- [ ] **A**: The model's self-reported confidence number for each field, emitted alongside the value so high numbers can be auto-accepted directly
- [ ] **B**: The length of the response, treating longer extractions as more confident since the model wrote more about the value it produced
- [x] **C**: Field-level confidence calibrated against a labeled validation set, then route the low-confidence items to the human reviewers
- [ ] **D**: Whether the JSON validated against the schema, auto-accepting any output whose shape and types conform to the expected structure

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Reliable routing needs confidence calibrated on labeled data, not self-reports. Schema validity proves shape, not correctness.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d5-012

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

In a long legacy-code exploration session, the agent starts citing 'typical patterns' instead of the specific code it found earlier. Best mitigations?

- [ ] **A**: Restart the task from scratch each time and reseed the run with only the file paths you care about, so stale matching never accumulates
- [x] **B**: Persist key findings to scratchpad files across context boundaries, delegate verbose exploration to a subagent, and /compact to trim
- [ ] **C**: Tell the model to remember harder and stay faithful to the specific code it found earlier rather than falling back on generic patterns
- [ ] **D**: Disable tool use so the agent stops gathering new material and instead relies on the concrete findings already present in its context

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Long sessions degrade; externalizing findings to scratchpads, isolating exploration, and compacting preserve specifics. The others don't address context degradation.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d5-013

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A subagent's database query fails due to a connection error, but it returns an empty list, which the coordinator treats as 'no matching records.' What's wrong and how to fix it?

- [ ] **A**: Have the coordinator assume any empty result is an error and retry, so a genuine zero-result case gets mistaken for a silent backend failure
- [ ] **B**: Treat the empty result as a fine default, since returning an empty list on failure keeps the workflow simple and skips extra error handling
- [ ] **C**: Retry the whole workflow from the top whenever a result comes back empty, rerunning every step so the connection error gets another chance
- [x] **D**: This is the empty-as-success anti-pattern: return a structured error distinguishing access failure from a true zero-result so retries work

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Masking a failure as an empty success prevents recovery; distinguish access failures that need a retry from genuine zero-results. Treating empty as a fine default loses the error, retrying the whole workflow is heavy-handed, and assuming every empty result is an error over-corrects the opposite way.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d5-014

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A synthesis report flags two sources as contradictory, but they actually describe different years. What requirement prevents this misreading?

- [x] **A**: Preserve publication/reporting dates in the claim-source mappings, so different-period figures aren't read as a conflict
- [ ] **B**: Always pick the source reporting the rounder, easier-to-cite number and treat the other figure as the outlier to discard
- [ ] **C**: Trust the model to silently infer each figure's year from surrounding prose without any explicit date field in the mapping
- [ ] **D**: Drop the date fields to simplify the data, since the figures alone are enough to compare the two sources reliably

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Preserving dates in claim-source mappings lets the system see that differing figures reflect different time periods, not a conflict. Dropping/inferring dates causes the error.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d1-027

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A team instruments an Agent SDK agent for production observability: every tool call must be logged with its inputs, outputs, execution time, and any errors. Where should this logging live so it is reliable and independent of the model's behavior?

- [x] **A**: Wrap each tool handler in a logging decorator that records inputs, outputs, timing, and errors in code
- [ ] **B**: Tell Claude in the system prompt to log every tool call with its parameters and timing
- [ ] **C**: Expose a log tool and rely on Claude to call it after each operation
- [ ] **D**: Enable the SDK's verbose debug mode and parse its dev logs in production

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Observability is a code-level concern: a decorator wrapping each handler captures inputs/outputs/timing/errors deterministically, every call, transparently to the model. B and C depend on Claude remembering and add latency/cost; D's debug mode is unstructured and dev-only. Same principle as enforcing safety in code, not prompts.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d1-028

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

An agent serves an English/Spanish/Japanese customer base. The system prompt and all tool results are in English. When a customer writes in Japanese, the agent should reply in Japanese. What is the simplest reliable architecture for the language handling?

- [ ] **A**: Keep a translated system prompt per language and select the matching one per request
- [ ] **B**: Route all input and output through a translation MCP tool before and after Claude processes it
- [x] **C**: Keep the prompt and tool results in English; Claude is natively multilingual and replies in the user's language
- [ ] **D**: Build and maintain a separate agent configuration for each supported language

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Claude is natively multilingual: it understands English system prompts/tool results and responds in the user's detected language with zero translation infrastructure. A/B/D add maintenance, latency, and failure points to solve a problem the model already handles - the over-engineering trap. Don't build for what Claude does natively.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d2-016

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

An MCP server manages Kubernetes clusters with high-impact operations like scale_deployment, delete_pod, and drain_node. These must require confirmation before they execute. What tool design enforces this reliably?

- [ ] **A**: Prefix each description with 'DANGEROUS:' and rely on Claude to warn the user in prose before it actually calls the tool
- [x] **B**: Two-phase tools: the first call returns a dry-run preview plus a confirmation token, and a second call with the token runs it
- [ ] **C**: Require the user to type the literal string 'CONFIRM' as an extra argument on every dangerous operation before it will run
- [ ] **D**: Move the dangerous tools onto a separate MCP server gated behind admin credentials so only privileged operators can reach them

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A preview-then-token pattern enforces confirmation at the tool/code level: the dry run shows exact consequences and the token guarantees the confirmed action is the one executed (expiry prevents stale confirmations). A depends on Claude's behavior; C is a contextless string check with no preview; D adds access control but not intent confirmation. Mirrors terraform plan -> apply.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-017

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.3

An Agent SDK agent must call the search tool before answering, but it often answers from training knowledge without searching. The tool is correctly defined and the system prompt already says to use it. Most effective fix?

- [x] **A**: Force tool_choice {type:'tool',name:'search'} on the first turn, then switch back to 'auto' for every turn after that
- [ ] **B**: Rewrite the system prompt far more emphatically, e.g. 'ALWAYS use the search tool first', and rely on stronger wording
- [ ] **C**: Set tool_choice to 'any' so some tool is forced on every turn, even later turns where answering from retrieved context is correct
- [ ] **D**: Add a PreToolUse hook that blocks the model from answering on any turn until at least one search call has already run

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The failure is on turn 1, so force the named tool there at the API layer - a hard constraint the model can't route around - then release to 'auto' so follow-up turns aren't forced into needless searches. B is still prompt-layer (already failing); C over-forces tool use on every turn; D is heavier and mistimed. Move enforcement from prompt to API constraint, scoped to the turn that needs it.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d3-018

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.4

During an interactive Claude Code session a developer wants to toggle into plan mode without restarting. What is the default keyboard shortcut, and what does it do?

- [ ] **A**: Tab cycles through the available modes, advancing one step per press, so you can land on plan mode without ever restarting
- [ ] **B**: Ctrl+P toggles plan mode directly on and off, jumping straight into planning without stepping through the other modes first
- [x] **C**: Shift+Tab cycles through the modes (Edit -> Auto-Accept -> Plan) live, mid-session, with no restart required
- [ ] **D**: Escape enters plan mode immediately, switching the session into planning the moment the key is pressed during input

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Shift+Tab cycles modes (Edit -> Auto-Accept -> Plan) live, no restart. Plain Tab doesn't cycle modes; Ctrl+P isn't the plan-mode shortcut (the /plan command exists); Escape cancels/rewinds rather than entering plan mode.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d4-017

**Difficulty:** Easy | **Domain:** 4 | **Task:** 4.1

A system prompt set by the operator says 'Always respond in formal English.' An end user then writes 'talk to me casually bro.' Per Claude's instruction hierarchy, what is the expected behavior when these conflict?

- [x] **A**: Maintain formal English, since operator and system-prompt instructions outrank a conflicting request from the end user
- [ ] **B**: Switch to casual, since end-user instructions always override the operator's system prompt whenever the two disagree
- [ ] **C**: Blend the two into a semi-formal register that averages the formal and casual styles to satisfy both instructions at once
- [ ] **D**: Follow whichever instruction arrived most recently, regardless of source, since the latest tone request always wins out

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Claude trusts the operator (system prompt) above the end user, so a conflicting user request doesn't override an operator rule. End users do not outrank operators, Claude does not average two styles into a compromise register, and arrival order does not trump the instruction hierarchy.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-018

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

You use structured output to generate JSON config files and need each option annotated with an explanation, but JSON has no comment syntax. What schema design delivers annotations while keeping valid, machine-readable JSON?

- [ ] **A**: Use a json_object mode that permits inline // comments in the output, letting each option carry an explanation directly
- [ ] **B**: Switch the output format to YAML instead, so you can rely on its native comment support to annotate each config option
- [ ] **C**: Generate the JSON in one call and the comments in a separate call, then merge the two responses so each option is annotated
- [x] **D**: Give each option parallel value and comment fields, e.g. {"port":{"value":8080,"comment":"..."}}, in one valid JSON object

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Co-locating a value and comment field per option stays within valid JSON, keeps everything in one response, and lets downstream code strip comments for a clean config. JSON has no comment mode, so a json_object variant permitting inline comments is invented; switching to YAML changes the required output format; and generating values and comments in separate calls decouples them and adds a round-trip.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-019

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

An eval framework must run an agent through 50 tool-failure scenarios, each a self-contained request with a mocked error; running them by hand takes about 10 minutes each and no human waits on the results. What is the most efficient way to run them?

- [x] **A**: Submit all 50 scenarios as one Message Batches API job and analyze the returned results programmatically once it finishes
- [ ] **B**: Combine all 50 scenarios into one long synchronous conversation and test the whole sequence in a single uninterrupted pass
- [ ] **C**: Run 10 representative scenarios synchronously and extrapolate those results to the remaining 40 to avoid orchestrating all 50
- [ ] **D**: Keep every scenario synchronous but have a QA team execute the 50 runs manually in parallel to cut the total wall-clock time

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Nobody waits on an eval suite, so the async Message Batches API runs all 50 concurrently at a 50% discount and returns structured results to diff against expected behavior - repeatable on every change. B muddies isolation (scenarios interfere in one context); C sacrifices coverage; D is slow and unscalable. No-latency-need workload -> batch.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d5-015

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.5

Before a production launch, a team runs a pre-deployment reliability review of their agent. Which of the following is NOT a recommended pre-deployment check?

- [x] **A**: Ensure 100% test coverage of every possible user-input combination before the agent is allowed to ship to production
- [ ] **B**: Verify that safety-critical rules are enforced via hooks or code rather than relying on prompt instructions alone
- [ ] **C**: Confirm rate limiting and circuit breakers, plus retries, timeouts, and fallbacks, are configured for external tool calls
- [ ] **D**: Validate that context compaction preserves the critical state the agent needs, guided by custom instructions

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** NOT-question: user inputs are effectively infinite, so '100% coverage of all input combinations' is an unachievable, low-value goal - reliability testing is risk-based, not exhaustive. The others are real checks: enforce safety in code not prompts, add rate-limiting/circuit-breakers for external calls, and verify compaction preserves critical state.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d5-016

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Cost analysis shows 60% of an app's API spend is input tokens (mostly repeated context), 25% thinking tokens, and 15% output tokens. Which optimization yields the biggest cost reduction?

- [ ] **A**: Lower max_tokens to trim the 15% spent on output, since output length is the category you most directly control
- [x] **B**: Enable prompt caching so the repeated context bills at the ~10% cache-read rate, cutting the 60% input cost
- [ ] **C**: Reduce the thinking budget to cut into the 25% of spend going to thinking tokens on each request the app makes
- [ ] **D**: Switch to a smaller model with lower per-token rates across input, thinking, and output categories all at once

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Attack the largest cost driver with the tool built for it: input is 60% and mostly repeated context, exactly prompt caching's use case - cache reads cost ~10% of base input, a ~54% total-bill cut. A/C optimize smaller slices and cutting thinking can hurt quality; D is a blunt instrument that sacrifices capability and ignores the repeated-context insight.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-017

**Difficulty:** Easy | **Domain:** 5 | **Task:** 5.2

An eval framework must measure whether an agent asks for clarification on ambiguous requests instead of guessing. Which metric captures this behavior?

- [ ] **A**: Response accuracy, whether final answers are correct, on the theory that good clarifying questions lead to better answers
- [ ] **B**: Response time, treating faster replies as a signal that the agent skipped asking and just made assumptions to answer quickly
- [x] **C**: Clarification rate, the share of known-ambiguous inputs in a labeled set where the agent asks before acting on the request
- [ ] **D**: Token efficiency, treating fewer tokens per response as a signal that the agent answered more decisively without hedging

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Measure the behavior directly: clarification rate against a labeled set of ambiguous inputs captures both failure modes (guessing when it should ask, asking when it shouldn't). Response accuracy measures outcomes rather than the asking behaviour; response time and token efficiency are indirect proxies that never observe whether a clarification was asked for.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-018

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Your multi-agent research pipeline crashed after processing 12 of 28 documents. The web search agent had identified relevant sources, the document analysis agent had partially completed extraction, and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing fidelity of prior findings. What state management approach best balances information fidelity with context efficiency when restoring agent state?

- [ ] **A**: Index all agent outputs in a shared vector store. When resuming, each agent queries the store using semantic search to retrieve relevant prior findings.
- [ ] **B**: Have each agent maintain its own persistent state file and reload it independently at the start of each session.
- [x] **C**: Have each agent persist a structured report to a known location. On resume, the coordinator loads the reports and injects relevant state into agent prompts.
- [ ] **D**: Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Structured per-agent reports keep fidelity (the findings, with schema), let the coordinator stay in charge of orchestration, and keep each subagent's context focused. This is the orchestrator + compact artifact pattern.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-019

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

After the web search agent finds 25 sources (120K tokens of raw content), the document analysis agent extracts key insights (15K tokens), and the synthesis agent produces a coherent narrative draft (3K tokens), the coordinator must pass context to the report generation agent for the final output with proper source citations. What context-passing strategy provides the best balance of completeness and efficiency?

- [ ] **A**: Pass the full accumulated context from every prior agent, including the raw 120K tokens of fetched source content
- [ ] **B**: Pass only the synthesis draft, then run a separate post-processing pipeline to match claims to sources and insert citations
- [x] **C**: Pass the synthesis draft plus a structured source index that maps key claims to their source URLs and relevant excerpts
- [ ] **D**: Pass a condensed summary of all prior stages that preserves the main findings but attributes them to sources by name only

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The synthesis gives the narrative; the source index gives the report generator exactly the binding it needs to cite without re-reading 120K tokens of raw content.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d2-018

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

The document analysis agent has a single analyze_document tool that takes a document and a free-text instruction parameter. During evaluation, requests like "extract the key financial metrics" often return narrative summaries, while "summarize the methodology" sometimes returns raw data tables. The synthesis agent reports that 35% of analysis results require re-requests with clarified instructions. What's the most effective way to improve reliability?

- [ ] **A**: Enhance the tool description with detailed examples showing how different instruction phrasings should map to different output formats.
- [ ] **B**: Keep the single tool but add an analysis_type enum parameter requiring explicit selection between extraction, summarization, and verification modes.
- [x] **C**: Split the generic tool into purpose-specific tools—extract_data_points, summarize_content, verify_claim_against_source—each with defined input/output contracts.
- [ ] **D**: Have the coordinator pre-classify each analysis request before passing instructions to the document analysis agent.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Free-text instructions put the semantics in prose, which the model interprets inconsistently. Purpose-specific tools give the model an explicit, well-typed contract to pick between.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d1-029

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.3

The web search agent has gathered several relevant sources for a research topic. The document analysis agent now needs to examine these sources. How does information typically flow between these two specialized subagents?

- [ ] **A**: Both agents access a shared memory store where the web search agent writes findings and the document analysis agent reads them.
- [x] **B**: The coordinator agent receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent.
- [ ] **C**: The web search agent directly invokes the document analysis agent, passing the discovered sources as parameters.
- [ ] **D**: The agents communicate through an event-driven message queue, with the document analysis agent subscribing to web search completion events.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** In an orchestrator-worker pattern the coordinator is the hub. It collects each subagent's output and explicitly forwards the relevant parts into the next subagent's prompt.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-030

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

In production, you observe that simple fact-checking queries (e.g., "What year was the Paris Climate Agreement signed?") traverse all four subagents sequentially, consuming 40+ seconds and significant tokens per query. Complex comparative research benefits from the full pipeline. Your query distribution is diverse and evolving as users discover new applications. What's the most effective approach to optimize for varying query complexity?

- [ ] **A**: Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination.
- [ ] **B**: Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thoroughness.
- [x] **C**: Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements.
- [ ] **D**: Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Letting the coordinator LLM reason about each query and pick only the subagents it needs adapts naturally to an evolving, diverse query distribution — this is the strength of the orchestrator pattern.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d5-020

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

When researching "renewable energy adoption," the web search agent returns recent statistics (2024: 35% adoption) while the document analysis agent extracts data from internal reports (2022: 18% adoption). The synthesis agent incorrectly flags these as contradictory sources rather than recognizing the data shows growth over time. What change would best enable the synthesis agent to correctly interpret such temporal differences?

- [ ] **A**: Add a conflict-resolution agent that automatically discards the older data whenever newer data exists for the same metric
- [ ] **B**: Instruct the synthesis agent to always treat the most recent data as authoritative and move older findings to an appendix
- [ ] **C**: Configure the web search agent to only return results from the past 6 months so older figures never enter the pipeline
- [x] **D**: Require subagents to include the publication or data-collection date for each figure in their structured outputs

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The synthesis agent misreads the data because it never sees the dates. Making each data point carry its own timestamp in the structured output lets synthesis reason about trends instead of contradictions.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-021

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

The synthesis agent receives summarized findings from the web search and document analysis agents, then passes a consolidated summary to the report generator. During testing, you discover the generated reports make factual claims without proper citations—the report generator cannot attribute statements to their original sources because that metadata was lost during the summarization steps. What's the most effective approach to ensure proper source attribution in the final reports?

- [x] **A**: Have each agent output structured data separating content summaries from source metadata (URLs, document names, page numbers).
- [ ] **B**: Skip summarization and pass full raw outputs from web search and document analysis directly to the report generator.
- [ ] **C**: Instruct the synthesis agent to embed source references inline within its summary text using a consistent citation format.
- [ ] **D**: Have the report generator query the web search agent to re-locate sources for claims in the final report.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Structured content + separate source metadata preserves the mapping end-to-end, so the report generator receives both what was said and where it came from.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-022

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.6

Production reviews reveal inconsistent handling of uncertainty in final reports. Sometimes conflicting subagent findings are synthesized into a single confident statement (losing nuance), while other times reports over-hedge with excessive qualifications (becoming unhelpful). When the web search agent returns "industry analysts estimate $50B market size (methodology varies)" and the document analysis agent returns "peer-reviewed study estimates 35B(±7B, 95% CI)," the coordinator either picks one arbitrarily or produces vague statements like "the market may be 35B−50B depending on factors." What systematic approach best addresses this?

- [ ] **A**: Add a verification subagent that cross-references findings and only passes claims corroborated by two independent sources.
- [ ] **B**: Configure subagents to report only findings above a high-confidence threshold, filtering out uncertainty before the coordinator sees it.
- [ ] **C**: Add a calibration layer normalizing uncertainty to probability scores (0.0-1.0), then weight-average findings by confidence.
- [x] **D**: Have the synthesis agent structure reports into sections separating well-established findings from contested ones.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Report structure that keeps methodological context and separates settled vs. contested claims is how you get nuance without over-hedging.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-023

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

In production, final reports frequently contain claims without proper source attribution. Investigation shows that while the web search and document analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What's the most effective architectural change?

- [ ] **A**: Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.
- [ ] **B**: Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents.
- [ ] **C**: Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation.
- [x] **D**: Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Explicit claim-source mappings are a first-class output the synthesis agent can merge deterministically — no attribution gets dropped during summarization.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d1-031

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.3

After the web search agent and document analysis agent complete their tasks, the coordinator invokes the synthesis agent. However, the synthesis agent responds that it cannot complete the task because no research findings were provided. What is the most likely cause of this issue?

- [ ] **A**: The synthesis agent's context window is not large enough to hold the combined outputs from both previous agents.
- [ ] **B**: The synthesis agent needs tools that can fetch results directly from the other agents' conversation histories.
- [ ] **C**: The subagents need to share a single API connection to enable automatic context sharing between invocations.
- [x] **D**: The coordinator did not include the outputs from the previous agents in the synthesis agent's prompt.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Subagent invocations are isolated — nothing flows between them unless the coordinator explicitly puts it in the prompt. The message 'no findings provided' is exactly what you'd see.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d4-020

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

A user is expanding the research system beyond its single web search agent by adding specialized data sources. They add a financial API agent that returns structured JSON with revenue, margins, and growth rates; a news monitoring agent that returns prose summaries of recent developments; and a patent analysis agent that returns structured lists of technology areas. The synthesis agent combines these into executive briefings. Currently, it converts everything to bullet points, causing financial comparisons to lose tabular clarity and news summaries to lose narrative flow. What change would most improve briefing quality?

- [ ] **A**: Standardize all subagent outputs to prose summaries with inline citations so every section reads uniformly throughout.
- [x] **B**: Update the synthesis agent to render each content type natively: financial data as tables, news developments as prose.
- [ ] **C**: Add a format conversion layer between subagents and synthesis that transforms all outputs to a common representation.
- [ ] **D**: Standardize all subagent outputs to JSON with shared fields for claim, evidence, source, and confidence across every type.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Executive briefings need mixed rendering: tables for numbers, prose for narrative. Asking synthesis to preserve the native format of each input is the right abstraction.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d1-032

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

The coordinator provides detailed step-by-step instructions to the web search subagent, specifying exact search queries, source priorities, and date filters. Production monitoring reveals three issues: (1) the subagent reports "insufficient results" rather than trying alternative approaches when pre-specified searches fail, (2) research quality drops for emerging topics that don't match expected patterns, and (3) the subagent rarely surfaces valuable tangential sources. What's the most effective way to improve subagent adaptability?

- [ ] **A**: Add explicit fallback directives to the detailed instructions: "If specified searches yield fewer than N results, attempt alternative query formulations before reporting failure."
- [x] **B**: Specify research goals and quality criteria (coverage breadth, source diversity, recency) rather than procedural steps, letting the subagent determine its search strategy.
- [ ] **C**: Remove procedural details entirely, delegating with simple goals like "research X thoroughly" and relying on the subagent's general capabilities.
- [ ] **D**: Implement a topic classification step where the coordinator categorizes requests as "well-defined" or "exploratory" and uses different instruction styles for each category.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Delegate intent and quality bars, not procedures. The subagent can then choose queries, follow promising tangents, and recover from dead ends on its own.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-033

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

Production monitoring shows that follow-up queries like "summarize what we learned about market trends" consistently take 40+ seconds. Investigation reveals the coordinator spawns the synthesis subagent for each summarization request, passing 80K+ tokens of accumulated findings. The coordinator already has these findings in its context from orchestrating the research. What's the most effective way to improve response time for these follow-up summaries?

- [ ] **A**: Pre-generate and cache summaries at multiple granularities whenever new findings accumulate.
- [ ] **B**: Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings.
- [ ] **C**: Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on-demand.
- [x] **D**: Let the coordinator answer simple summary requests directly from its existing context; spawn the subagent only for complex analysis.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** If the coordinator already has the findings, spawning a subagent to re-ingest 80K tokens is pure overhead. Let the coordinator answer simple follow-ups itself.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-034

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

When analyzing complex legal cases that cite multiple precedents, the document analysis subagent processes each sequentially. A landmark case citing 12 precedents takes over 3 minutes to analyze completely. What's the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?

- [ ] **A**: Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents.
- [ ] **B**: Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations.
- [ ] **C**: Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reaching single-precedent granularity.
- [x] **D**: Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Coordinator-managed parallelism fans out the work, keeps each subagent's scope tight, and preserves a single hub for monitoring and aggregation.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-035

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.3

The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator correctly reasons about when to delegate—it generates messages like "I'll ask the web search agent to find sources on this topic"—but no subagent execution ever occurs. The coordinator then proceeds as if the delegation happened and continues with incomplete information. Logs show no errors. What is the most likely cause?

- [ ] **A**: The AgentDefinitions are configured correctly, but the coordinator's system prompt doesn't explicitly list the available subagent types, preventing the model from knowing they can be invoked.
- [ ] **B**: Subagent context isolation means task descriptions from the coordinator don't automatically reach subagents; you need to configure explicit context forwarding in ClaudeAgentOptions.
- [x] **C**: The coordinator's allowedTools configuration doesn't include "Task", so while it can reason about delegation, it cannot invoke the tool required to spawn subagents.
- [ ] **D**: The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Without the Task tool in allowedTools, the coordinator can talk about delegating but has no way to actually call a subagent — which matches the 'reasons about it, no execution, no errors' symptom.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d2-019

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

After integrating a local MCP server providing code analysis tools (analyze_dependencies, find_dead_code, calculate_complexity), you verify the server is healthy and tools appear in the tools/list response. However, you observe that the agent consistently uses Grep to search for import statements instead of calling analyze_dependencies—even when users explicitly ask about "code dependencies." Examining tool definitions reveals: MCP: analyze_dependencies - "Analyzes dependency graph" Built-in: Grep - "Search file contents for a pattern using regular expressions. Returns matching lines with line numbers and surrounding context." What's the most effective approach to improve the agent's selection of MCP tools?

- [ ] **A**: Remove Grep from the available tools while the MCP server is connected, eliminating the functional overlap entirely.
- [ ] **B**: Add routing instructions to the system prompt so dependency-related questions are directed to MCP tools rather than Grep.
- [ ] **C**: Split analyze_dependencies into granular tools (list_imports, resolve_transitive_deps, detect_circular_deps) so each stays focused.
- [x] **D**: Expand MCP tool descriptions to detail capabilities, e.g. "Builds a dependency graph of imports, transitive deps, and cycles."

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Tool selection is driven by the descriptions the model sees. A one-line description like 'Analyzes dependency graph' loses against Grep's rich description. Beef up the MCP tool's description.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d5-024

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.4

An engineer asks the agent to find all callers of a function before removing it. The function is defined in a core library but is also exposed through wrapper modules that rename the function for domain-specific use (e.g., calculateTax in the library becomes computeOrderTax in the orders module). What exploration strategy will most reliably identify all callers?

- [ ] **A**: Search for the function name in project documentation to understand usage patterns and reach documented integration points.
- [ ] **B**: Use Grep to find every file importing from the library or wrapper modules, then read each to check whether it uses the function.
- [x] **C**: Read the library and wrapper modules to collect all exposed names for the function, then Grep each name across the codebase.
- [ ] **D**: Use Grep to search for the function's original name across the codebase and treat those matches as the full caller list.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** You have to enumerate every name the function is exposed under — otherwise renamed wrappers hide callers. Read the relevant modules, gather all aliases, then grep for each.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d5-025

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

During testing, you observe that in extended exploration sessions (30+ minutes), the agent starts giving inconsistent answers about code structure it discussed earlier. Engineers report having to repeat context about modules they've already explored. What's the most effective approach to address this?

- [ ] **A**: Create summaries of all source files before exploration begins, loading only these compressed representations into context.
- [ ] **B**: Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context.
- [x] **C**: Have the agent maintain a scratchpad file that records key findings, referencing it for subsequent questions.
- [ ] **D**: Switch to a higher-capacity model tier to provide more context window space for accumulated exploration data.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A scratchpad offloads findings to durable storage the agent can re-read on demand, giving it a stable 'memory' independent of how crowded the context window gets.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-036

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.7

An engineer used Claude Code yesterday to investigate authentication flows in a legacy monolith, building up significant context over a 2-hour session. Today she wants to continue that specific investigation. She's worked on three other codebases since then and knows the session was named "auth-deep-dive". How should she resume?

- [ ] **A**: Use --session-id with the UUID from yesterday's session transcript file
- [ ] **B**: Use --continue to pick up where the most recent conversation left off
- [x] **C**: Use --resume auth-deep-dive to load that specific session by name
- [ ] **D**: Start fresh and re-read the same files

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** --resume with the session name is designed for exactly this: pick a specific prior session out of many, by the name you gave it.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d5-026

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Your agent has spent 25 minutes exploring a game engine's rendering subsystem—reading shader code, buffer management, and frame synchronization logic. An engineer now asks it to understand how the physics engine integrates with rendering for collision debug overlays. You notice recent responses reference "typical rendering patterns" rather than the specific VulkanPipeline and FrameGraph classes it discovered earlier. What's the most effective approach?

- [ ] **A**: Spawn a sub-agent to explore physics independently, then manually merge its findings with the rendering knowledge accumulated so far.
- [x] **B**: Summarize the key rendering findings, then spawn a sub-agent for physics exploration with that summary in its initial context.
- [ ] **C**: Use /clear to reset context completely, then start fresh on physics using the file paths listed in the project's CLAUDE.md.
- [ ] **D**: Continue in the current context with more targeted prompts that reference the specific VulkanPipeline and FrameGraph classes.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Condense what you've learned about rendering into a compact summary, then give a fresh subagent that summary plus the physics task — you preserve the important signal and escape the degraded context.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-037

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

Your codebase exploration tool stores session IDs to allow engineers to continue investigations across work sessions. An engineer spent an hour yesterday analyzing a legacy authentication module, building context about its architecture and dependencies. They want to continue today. The session ID is valid, but version control shows 3 of the 12 files the agent previously read were modified overnight by a teammate's merge. What approach best balances efficiency and accuracy?

- [ ] **A**: Resume the session and immediately have the agent re-read all 12 previously analyzed files
- [x] **B**: Resume the session and inform the agent which specific files changed for targeted re-analysis
- [ ] **C**: Resume the session without informing the agent about the changed files
- [ ] **D**: Start a fresh session to ensure the agent works with current codebase state without stale assumptions

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Keeps the expensive context you already built, while telling the agent exactly which 3 files to re-read — minimum waste, maximum accuracy.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-038

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

An engineer used the agent yesterday to analyze a legacy authentication module, identifying two distinct refactoring approaches: extracting a microservice versus refactoring in-place. Today, they want to explore both approaches in depth—having the agent propose specific code changes for each—before deciding which to implement. What's the most effective way to structure this exploration?

- [x] **A**: Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork.
- [ ] **B**: Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context.
- [ ] **C**: Start two fresh sessions, manually providing a summary of yesterday's analysis findings to establish context.
- [ ] **D**: Resume yesterday's session and explore both approaches sequentially within the same conversation thread.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Forking from yesterday's session gives each approach its own independent context starting from the same analysis baseline — clean, parallel, no contamination.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d5-027

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

An engineer asks the agent to understand how the caching layer works before adding a new cache invalidation trigger. After initial Grep searches, the agent has identified that caching logic spans 15 files including decorators, middleware, and service classes (~8,000 lines total). What's the most effective next step for building understanding while managing context constraints?

- [ ] **A**: Use the Read tool to sequentially load all 15 files, building complete understanding across the full caching implementation. Reading in order builds the picture the same way a developer would.
- [x] **B**: Analyze imports and class hierarchies to identify the base cache class, Read that file to understand the interface, then trace specific invalidation implementations.
- [ ] **C**: Use Glob to find files matching common caching patterns (cache.py, caching/), prioritize the largest files by reading them first, then check smaller files for gaps. File size is a fair proxy for how much logic it holds.
- [ ] **D**: Use Grep to search for "invalidate" and "expire" patterns across all files, then Read only those specific line ranges with minimal surrounding context. Line ranges keep the token cost proportional to the matches.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Start from the architectural root (the interface), then navigate only the specific implementations that matter for invalidation — focused reading, low context cost.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d5-028

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

An engineer asks your agent to identify untested code paths in a legacy payment processing module spanning 45 files. After reading the first 8 source files, the agent's responses are becoming noticeably less accurate—it's forgetting previously discussed code patterns and hasn't yet located all test files or traced critical payment flows. What's the most effective approach to complete this investigation?

- [ ] **A**: Switch to using Grep to search for specific function names instead of reading full files, reducing the content loaded into context for remaining exploration.
- [ ] **B**: Clear context with /clear, then selectively re-read only the most critical files discovered so far, writing key findings to a scratchpad file that persists between context resets.
- [x] **C**: Spawn subagents for specific questions (find payment test files, trace refund-flow deps) while the main agent coordinates findings and holds the high-level picture.
- [ ] **D**: Document all current findings in a summary report, clear context completely, then use that report as the sole reference for continuing the investigation.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Delegate well-scoped investigations to subagents with fresh context, while the main agent keeps the architectural overview. This is the pattern for scaling exploration beyond a single context window.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d1-039

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

A developer asks the agent to investigate why a specific API endpoint intermittently returns 500 errors. The codebase has 200+ files and the developer doesn't know which components are involved. The agent must trace the error through routing, middleware, business logic, and database layers. What task decomposition approach would be most effective?

- [ ] **A**: Have the agent first build a comprehensive plan mapping all code paths through the endpoint before reading any files.
- [x] **B**: Have the agent generate investigation subtasks dynamically from what it finds, adapting the plan as the error path emerges.
- [ ] **C**: Run parallel worker agents that investigate all four layers at once, then synthesize findings to locate the error origin.
- [ ] **D**: Define a fixed sequence upfront, grep errors then read handlers then check queries then examine middleware, regardless of findings.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Debugging is adaptive by nature — each file you read changes the most useful next step. Let the agent follow the evidence.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-040

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

An engineer's exploration subagent spent 30 minutes analyzing a legacy payment system, reading 47 files and documenting data flows. The session was interrupted when the engineer's connection dropped. While away, a teammate merged a PR that renamed two utility functions. The engineer wants to continue the same exploration. What's the most effective approach?

- [ ] **A**: Launch a fresh subagent with a concise summary of the prior findings and let it rebuild context from that starting point.
- [ ] **B**: Resume the subagent from its previous transcript without mentioning the changes, since the architecture understanding still holds.
- [x] **C**: Resume the subagent from its previous transcript and inform it that the two utility functions were renamed by the merged PR.
- [ ] **D**: Launch a fresh subagent and paste the entire prior transcript into the initial prompt to give it full context again.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Keep the accumulated understanding, and give it a targeted delta about the renames so it can update its mental model — minimum waste, maximum accuracy.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d2-020

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

After adding an MCP server with specialized code refactoring tools (extract_function, rename_variable, inline_function), you notice the agent still uses basic text manipulation via Write and Bash sed commands for refactoring tasks. The MCP server is connected and healthy. Examining the configuration, you find each MCP tool has a minimal description like "extract_function: extracts a function from code." What's the most effective way to improve adoption of the MCP refactoring tools?

- [ ] **A**: Accept this as expected behavior since simpler tools like sed are more predictable than specialized refactoring tools.
- [x] **B**: Enhance the MCP tool descriptions to explain when each tool is preferable to text manipulation and clarify expected inputs and outputs.
- [ ] **C**: Remove the Write tool from the agent's configuration for refactoring sessions so it must use the MCP tools for code modifications.
- [ ] **D**: Implement a request classifier that detects refactoring intent and automatically routes those requests to the MCP server before the agent processes them.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Tool selection is driven by the descriptions Claude sees. When the MCP tools say 'extracts a function from code' and Write/sed come with rich documentation, Claude picks Write/sed. Beef up the descriptions.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d1-041

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

Your agent has analyzed a complex service module—reading 23 source files, tracing request flows, and identifying error handling patterns. A developer wants to compare two testing strategies before committing to one: end-to-end tests with mocked external services vs. snapshot tests capturing expected outputs. They need to independently develop both approaches to evaluate trade-offs. How should you manage the sessions?

- [ ] **A**: Start two fresh sessions, having each re-read the relevant source files before beginning.
- [x] **B**: Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.
- [ ] **C**: Export the analysis session's key findings to a file, then create two new sessions that reference this file.
- [ ] **D**: Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Forking gives each strategy its own independent context starting from the exact analysis baseline — no cross-contamination, no re-analysis.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d2-021

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

Your agent needs to insert a new helper function into the middle of a 150-line utility module, between two existing functions. The Edit tool fails because its old_string parameter cannot find unique text to match — the file has repetitive docstrings, variable names, and structural patterns. What's the most reliable way to complete this insertion?

- [ ] **A**: Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text
- [x] **B**: Use Read to load the file, add the function at the appropriate location, then Write the updated file
- [ ] **C**: Use Edit with an extremely long old_string capturing 30+ lines of context to guarantee uniqueness
- [ ] **D**: Use Bash to append the function definition to the end of the file using heredoc syntax

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** When Edit's unique-match contract can't be satisfied in a repetitive file, fall back to Read → modify in memory at the intended line → Write the full file back.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d5-029

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

An engineer who just joined the team asks the agent to help them understand the authentication and authorization architecture before making security improvements. The codebase has 800+ files across multiple services. What exploration strategy will most effectively build understanding, given Claude built-in tools and context limits?

- [ ] **A**: Read any CLAUDE.md and README files first, then ask the engineer to specify which 10-15 files are most important for understanding the auth system.
- [x] **B**: Use Grep to find authentication entry points, read those files, then follow imports and function calls to map the auth flow incrementally.
- [ ] **C**: Launch parallel subagents to explore different services simultaneously, then synthesize their findings into an architectural overview.
- [ ] **D**: Read all files containing "auth", "login", "permission", or "token" in their content or filename.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Start at entry points (login, token verify, middleware), then trace outward following real code edges. Incremental, grounded, fits within context limits.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d5-030

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.1

A customer returns 4 hours after their initial session about the same billing dispute. The previous 32-turn session contains lookup_order results showing "Status: PENDING, Expected resolution: 24-48 hours." In testing, you observe that when resuming sessions with stale tool results, the agent often references the outdated data in responses (e.g., "I see your refund is still being processed") even after subsequent fresh tool calls return different information. What approach most reliably handles returning customers?

- [ ] **A**: Resume with full history and configure the agent to automatically re-call all previously-used tools at session start to ensure data freshness.
- [ ] **B**: Resume with full history but filter out previous tool_result messages before resuming, keeping only the human/assistant turns so the agent must re-fetch needed data.
- [ ] **C**: Resume with full history and add a system prompt instruction telling the agent to always prefer the most recent tool results when multiple calls to the same tool exist in context.
- [x] **D**: Start a new session, inject a structured summary of the previous interaction (issue type, actions taken, resolution status), then make fresh tool calls before engaging.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A clean session with a summary keeps the narrative continuity while guaranteeing the agent isn't reasoning over stale tool results.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-042

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

You're implementing the escalation logic for when the agent should call escalate_to_human. Your team proposes four different approaches for triggering escalation. Which approach will most reliably identify cases that genuinely require human intervention?

- [ ] **A**: Configure the agent to escalate after three consecutive tool calls that fail to resolve the customer's stated issue, ensuring a reasonable attempt before involving a human.
- [ ] **B**: Build a rules engine that maps specific issue types, customer segments, and product categories to escalation decisions, removing the need for model judgment calls.
- [x] **C**: Instruct the agent to escalate when the customer requests a human, when the issue requires policy exceptions, or when the agent cannot make meaningful progress.
- [ ] **D**: Implement sentiment analysis that monitors for frustration indicators (negative language, repeated questions, exclamation marks) and trigger escalation when the frustration score exceeds a configured threshold.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Escalation decisions are judgment calls about intent and progress — exactly what LLMs are good at. Clear criteria in natural language outperform rigid rules for the long tail.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d5-031

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

After investigating a billing dispute over 25+ turns, you've identified that duplicate charges occurred due to a payment gateway timeout triggering retry logic. The required refund ($847) exceeds your $500 authorization limit. You need to call escalate_to_human, and the human agent won't have access to your conversation transcript. What context should you pass to enable effective resolution?

- [ ] **A**: Pass the customer's original complaint verbatim plus the tool-result excerpts that show the duplicate transactions.
- [ ] **B**: Pass only your diagnosis and the refund amount, leaving the human agent to gather identifiers and recommendations.
- [x] **C**: Pass a structured summary with customer ID, root cause, refund amount, and the recommended action for resolution.
- [ ] **D**: Pass the complete conversation transcript with all tool results so the human agent can review everything in full.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A structured handoff with identifiers, cause, amount, and recommended action is what a human agent needs to pick up the case instantly without re-investigating.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d1-043

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

Compliance requires that refunds exceeding $500 must automatically escalate to a human agent—this rule cannot be left to model discretion. Despite clear system prompt instructions, production logs show the agent occasionally processes high-value refunds directly (3% failure rate). How should you achieve guaranteed compliance?

- [ ] **A**: Modify the refund tool to return an error with message "Amount exceeds policy limit—please escalate" when threshold is exceeded.
- [ ] **B**: Add few-shot examples to the prompt showing correct escalation behavior at various refund amounts ($400, $500, $600).
- [x] **C**: Implement a hook to intercept tool calls; when the refund process amount exceeds $500, block it and invoke human escalation.
- [ ] **D**: Strengthen the system prompt with emphatic language: "CRITICAL POLICY: Refunds over $500 MUST trigger human escalation. NEVER process these directly."

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Compliance-grade rules belong outside the model — a deterministic hook on the tool call is guaranteed to fire every time, independent of model behavior.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d5-032

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

During a billing dispute resolution, your agent successfully retrieves customer info via get_customer and order details via lookup_order, but when attempting to call process_refund, the tool returns a timeout error. The agent has enough information to explain the charges and verify refund eligibility, but cannot actually process the refund due to the backend failure. What approach best balances first-contact resolution with appropriate error handling?

- [x] **A**: Explain the billing, confirm eligibility, acknowledge the system issue blocking processing, and offer escalation or retry.
- [ ] **B**: Confirm the refund will be processed and close the conversation, since the system can complete it automatically later.
- [ ] **C**: Implement automatic retries with exponential backoff for process_refund, keeping the conversation open until it finally succeeds.
- [ ] **D**: Escalate immediately to a human agent because the refund action could not be completed due to the backend timeout.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Deliver the partial value you can (explanation + eligibility), be honest about the failure, and let the customer choose between human escalation or a retry. Classic graceful degradation.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d5-033

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

A customer writes: "I've been going back and forth on this return for days. I just want to speak to someone who can actually help me." The agent has confirmed via lookup_order that the return is straightforward—within policy and eligible for immediate processing. What should the agent do?

- [x] **A**: Acknowledge frustration, inform them this is resolvable now, and offer to complete it or escalate
- [ ] **B**: Process the refund via process_refund to resolve the underlying issue, then inform them it's complete
- [ ] **C**: Call escalate_to_human immediately to honor the customer's request
- [ ] **D**: Ask what specifically hasn't worked in previous attempts before deciding whether to escalate or resolve automatically

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Honor the feeling, give them the fast resolution path in writing, and preserve their choice. That's the customer-respect move that still leverages the agent's capability.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-034

**Difficulty:** Easy | **Domain:** 5 | **Task:** 5.1

The agent verifies customer identity through a multi-step process before resetting passwords. During testing, you notice that after the customer answers the third verification question, the agent asks them to provide their name again, as if the earlier exchange never happened. What's the most likely cause of this behavior?

- [x] **A**: The conversation history isn't being passed in subsequent API requests.
- [ ] **B**: The verification tool is clearing the agent's internal state after each successful validation step.
- [ ] **C**: The prompt lacks instructions telling Claude to remember information across multiple exchanges.
- [ ] **D**: Claude's memory retention is limited to two conversational turns by default, requiring explicit configuration to extend it.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The API is stateless. Each request must include the full messages array. If you only send the latest turn, the model has no memory of earlier ones — exactly the 'ask for the name again' symptom.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d2-022

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

Production logs reveal inconsistent error handling: when lookup_order fails, the agent sometimes retries 5+ times (wasteful when the order ID doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes asks users for clarification (inappropriate when the issue is a backend permission error). Investigation shows your MCP tool returns uniform error responses: {"isError": true, "content": [{"type": "text", "text": "Operation failed"}]}. The agent cannot distinguish between error types. What's the most effective improvement?

- [ ] **A**: Add few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.
- [ ] **B**: Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.
- [ ] **C**: Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.
- [x] **D**: Return structured error metadata: errorCategory (transient/validation/permission), an isRetryable flag, and a short cause description.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Give the agent the information it needs to make the right decision: category, retryability, and a human-readable cause. That replaces guessing with deterministic policy.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d1-044

**Difficulty:** Easy | **Domain:** 1 | **Task:** 1.1

When the agent calls lookup_order and receives order details showing the item was purchased 45 days ago, how does the agentic loop determine whether to call process_refund or escalate_to_human next?

- [x] **A**: The order details are added to the conversation and the model reasons about which action to take.
- [ ] **B**: The agent follows a pre-configured decision tree mapping order attributes to specific tool calls.
- [ ] **C**: The agent executes the remaining steps in a tool sequence planned at the start of the request.
- [ ] **D**: The orchestration layer automatically routes to the next tool based on the order's status field.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The agentic loop works by appending tool_result messages to the conversation and letting the model decide the next step on each turn. That's how 45 days → refund vs. escalate gets resolved.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d5-035

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

A customer sends: "This is frustrating. I've explained my issue twice and nothing is being resolved. I want to talk to a real person NOW." The agent has not yet called any tools to investigate their account. What should the agent do?

- [ ] **A**: Immediately call escalate_to_human and attach the full conversation history so a person can take over right away.
- [x] **B**: Acknowledge the frustration and ask one targeted question to pin down the specific issue before deciding to escalate.
- [ ] **C**: Briefly explain what the agent can help with and offer a quick resolution, escalating only if the customer repeats the request.
- [ ] **D**: First call get_customer and lookup_order to gather account context, then escalate the case to a human agent.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The customer has said 'twice' but you have no context yet. One acknowledging, focused question gives you a shot at first-contact resolution without dismissing the frustration or delaying a potential handoff.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-036

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

Your agent is handling a billing dispute. After calling get_customer and lookup_order, it identifies that the dispute involves a promotional pricing error requiring manager approval—beyond the agent's authorization level. How should the workflow handle this mid-process escalation?

- [ ] **A**: Call escalate_to_human passing only the customer's original message.
- [ ] **B**: Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID.
- [ ] **C**: Attempt the refund with process_refund anyway, escalating only if the system rejects the transaction.
- [x] **D**: Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A structured brief (who, what order, what issue, why it exceeds auth) lets the human agent pick up instantly. That's the mid-process escalation pattern.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d5-037

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.1

A customer raises three separate issues during one session: a refund inquiry (turns 1-15), a subscription question (turns 16-30), and a payment method update (turns 31-45). At turn 48, the customer asks "What happened with my refund?" The conversation is approaching context limits. What strategy best maintains the agent's ability to address all issues throughout the session?

- [ ] **A**: Rely on MCP tools to re-fetch relevant information on demand when the customer references earlier issues.
- [ ] **B**: Implement sliding window context that retains the most recent 30 turns.
- [x] **C**: Summarize earlier turns into a narrative description, preserving full message history only for the active issue.
- [ ] **D**: Extract and persist structured issue data (order IDs, amounts, statuses) into a separate context layer.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Progressive summarization compresses stable resolved topics while keeping the active thread verbatim — the classic pattern for long multi-issue conversations near the context limit.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d2-023

**Difficulty:** Easy | **Domain:** 2 | **Task:** 2.2

When implementing your lookup_order MCP tool, the backend sometimes returns errors (e.g., "Order not found" or temporary database failures). What is the correct pattern for communicating these errors back to the agent?

- [x] **A**: Return the error message in the tool result content with the isError flag set to true
- [ ] **B**: Log the error server-side and return an empty result to avoid confusing the model, so the transport stays clean and the failure is recorded where operators look.
- [ ] **C**: Return a success response with a "status" field indicating the error type, which keeps the response shape identical whether the lookup succeeded or not.
- [ ] **D**: Throw an exception from the tool handler so the agent framework can catch and log it The framework log is the audit trail.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** MCP's designed pattern: put the error text in the content field and mark isError=true. Claude sees both the failure flag and a readable message to reason about.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-024

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

Your process_refund tool returns two types of errors: technical errors ("503 Service Unavailable", "Connection timeout") that are transient (5% of calls), and business errors ("Order exceeds 30-day return window", "Item already refunded") that are permanent (12% of calls). Monitoring shows the agent wastes 3-4 turns retrying business errors that can never succeed. Currently, both error types return only a plain text message to Claude. What's the most effective way to reduce wasted retries while improving customer-facing response quality?

- [ ] **A**: Add a check_refund_eligibility tool that must be called before process_refund to prevent business rule violations. The eligibility check is where the business rule belongs.
- [x] **B**: Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use.
- [ ] **C**: Add few-shot examples showing how to distinguish retryable from non-retryable errors by parsing error message text. Message text is the only place the distinction is expressed.
- [ ] **D**: Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries. Claude then sees only the errors it can act on.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A retryable flag tells Claude deterministically 'don't retry,' and a ready-made customer-friendly message improves the outgoing reply. Fixes both problems at once.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d5-038

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Your agent has called lookup_order multiple times while investigating a customer's return requests. Each response includes 40+ fields (items, shipping details, payment info, status history). Tool outputs now represent the majority of the conversation's context. The customer mentions two more orders they want to discuss. What's the most effective approach before making additional lookups?

- [ ] **A**: Have the model write a natural-language summary of each order's key details, replacing the structured responses with prose.
- [x] **B**: Extract only the return-relevant fields (items, purchase date, return window, status) and drop the verbose remainder.
- [ ] **C**: Proceed with the additional lookups without modifying the existing tool-output context already in the conversation.
- [ ] **D**: Move all tool responses into a vector database with semantic indexing, retrieving relevant portions as needed later.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Keep the fields that matter for the task and drop the rest. This directly addresses the context-bloat problem before you add two more lookups.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d4-021

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your extraction system processes two document types: standard monthly reports (archived after processing) and urgent exception reports (must trigger business alerts within 30 minutes of receipt). Both use the same JSON schema. You want to minimize API costs while meeting latency requirements. How should you architect the processing pipeline?

- [ ] **A**: Queue all documents and submit hourly batches, flagging urgent documents for expedited handling when batch results return.
- [ ] **B**: Submit all documents to the Batch API with custom_ids for tracking. When results arrive, immediately process urgent documents and trigger delayed alerts for exceptions.
- [x] **C**: Route standard reports to the Batch API for 50% cost savings, and route urgent exception reports to the real-time Messages API.
- [ ] **D**: Submit all documents to the real-time Messages API to ensure consistent processing latency across document types.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Match latency profile to document urgency: batch for the bulk (cheap), real-time for the latency-sensitive exceptions (fast). Minimizes cost while meeting SLA.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d4-022

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Your schema includes a skills: string[] field. Production monitoring reveals three consistency issues: (1) compound phrases like "Python and SQL" are sometimes kept as one entry, sometimes split; (2) implied but unstated skills occasionally appear in extractions; (3) similar documents produce wildly different array lengths (5-10 vs 40+ entries). Your prompt currently says "Extract all skills mentioned." What's the most effective improvement?

- [x] **A**: Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity.
- [ ] **B**: Enrich the schema to {skill: string, confidence: float, source_quote: string}[] to capture extraction metadata.
- [ ] **C**: Add post-extraction normalization that maps skills to a canonical taxonomy and deduplicates similar entries.
- [ ] **D**: Add constraints: "Extract 10-20 skills maximum, one skill per entry, only explicitly named skills."

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** All three issues are about the model's interpretation of what counts as 'a skill.' Few-shot examples teach the pattern concretely — split vs. not-split, mentioned vs. inferred, appropriate granularity.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d5-039

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

Your system has been operating with 100% human review for 3 months. Analysis shows that extractions with model confidence >90% have 97% accuracy overall. To reduce reviewer workload, you plan to automate high-confidence extractions. Before deploying, what validation step is most critical?

- [ ] **A**: Run a two-week pilot routing 25% of high-confidence extractions directly to downstream systems and monitor error reports. A pilot measures the real error rate before full automation.
- [ ] **B**: Verify that 97% accuracy meets requirements for all downstream systems that consume the extracted data. Downstream tolerance is what decides whether 97% is enough.
- [x] **C**: Analyze accuracy by document type and field to verify high-confidence extractions perform consistently across all segments, not just in aggregate.
- [ ] **D**: Compare accuracy at different confidence thresholds (85%, 90%, 95%) to find the optimal cutoff that maximizes automation while minimizing errors. Live traffic is what sets the real cutoff.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Aggregate accuracy hides segment failures — one document type could be 70% while others are 99%. Auto-routing by overall number alone risks systemic errors in the weak segments.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d4-023

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.3

Your extraction pipeline processes contracts that frequently include amendments. When a contract contains both original terms and later amendments (e.g., original clause specifies "30-day payment terms" while Amendment 1 changes this to "45 days"), the model inconsistently extracts one value or the other with no indication of which applies. What's the most effective approach to improve extraction accuracy for documents with amendments?

- [x] **A**: Redesign the schema so amended fields capture multiple values, each with source location and effective date.
- [ ] **B**: Preprocess documents with a classifier that identifies and removes superseded sections before the main extraction step.
- [ ] **C**: Add prompt instructions to always extract the most recent amendment value and ignore superseded original terms.
- [ ] **D**: Implement post-extraction validation using pattern matching to detect amendments and flag those extractions for manual review.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Amendments are structurally about versioned values. A schema with value + source location + effective date models the domain correctly and stops forcing the model to pick one.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-024

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

Your extraction system implements automatic retries when validation fails. On each retry, the specific validation error is appended to the prompt. This retry-with-error-feedback approach resolves most failures within 2-3 attempts. For which failure pattern would additional retries be LEAST effective?

- [ ] **A**: The model extracts dates as ISO 8601 datetime strings ("2023-03-15T00:00:00Z") when the schema requires only the date portion (YYYY-MM-DD)
- [ ] **B**: The model extracts keywords as a nested object organized by category when the schema requires a flat array of strings
- [ ] **C**: The model extracts citation counts as locale-formatted strings ("1,234") when the schema requires integers
- [x] **D**: The model extracts "et al." for co-authors when the full list exists only in an external document not in the input

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** No amount of retrying teaches the model information that isn't in the input. Retry-with-error-feedback only fixes mistakes the model could have gotten right from the source.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d4-025

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

Your extraction pipeline processes restaurant menus and must output structured JSON with fields for item names, descriptions, prices, and dietary tags. Some menus use inconsistent formatting—prices as "$12" vs "12.00", dietary info as icons vs text. What's the most reliable approach?

- [ ] **A**: Extract data as-is and normalize formats in post-processing code after Claude returns.
- [ ] **B**: Request multiple extraction attempts per document and select the most common format.
- [ ] **C**: Use separate extraction calls for each field to ensure consistent handling of each type.
- [x] **D**: Define a strict output schema and include format normalization rules in your prompt.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Strict schema + explicit normalization rules ('prices as decimal with two places', 'dietary as enumerated tags') lets the model both extract and normalize in one pass.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-026

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Your system extracts event metadata (date, location, organizer, attendee_count) from news articles using a JSON schema with all nullable fields. During evaluation, you observe the model frequently generates plausible but incorrect values for fields not mentioned in the article—for example, outputting "500" for attendee_count when the source contains no attendance information. What's the most effective way to reduce these false extractions?

- [x] **A**: Add prompt instructions to return null for any field where information is not directly stated in the source.
- [ ] **B**: Add a post-processing step using a second LLM call to verify each extracted value exists in the source document.
- [ ] **C**: Make all schema fields required (non-nullable) with strict validation rules to ensure the model only outputs verifiable data.
- [ ] **D**: Upgrade to a more capable model tier with improved instruction-following to reduce hallucination tendencies.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The fields are already nullable; the model just needs an explicit instruction to prefer null over a plausible guess. This is the standard fix for schema-aware hallucination.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-027

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.2

After implementing tool use with strict schema definitions, JSON syntax errors are eliminated, but 5% of extractions still have valid JSON with empty arrays or null values for required fields like citations and methodology. Spot-checking reveals that source documents contain this information, but in varied formats—inline citations vs. bibliographies, methodology sections vs. details embedded in introductions. What's the most effective way to address these failures?

- [x] **A**: Add few-shot examples that show extractions across varied document structures, finding citations and methodology anywhere.
- [ ] **B**: Implement retry logic that re-sends the request whenever validation detects empty values in the required fields.
- [ ] **C**: Make citations and methodology optional in the schema, then flag incomplete records for manual review instead of failing them.
- [ ] **D**: Build a regex post-processing layer that scans documents for citation patterns and methodology keywords to fill gaps.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The failure mode is the model not recognizing varied formats. Concrete examples across the format distribution directly raise recall on the 5%.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-028

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.4

Your extraction pipeline processes invoices and extracts line items, subtotals, tax amounts, and grand totals. During evaluation, you discover that in 18% of extractions, the sum of extracted line item amounts doesn't match the extracted grand total—sometimes due to OCR errors in the source document, sometimes due to extraction mistakes by the model. Downstream accounting systems reject records with mismatched totals. What's the most effective approach to improve extraction reliability?

- [ ] **A**: Add few-shot examples demonstrating invoices where extracted line items sum correctly to the stated total, encouraging the model to produce mathematically consistent extractions.
- [x] **B**: Add a "calculated_total" field where the model sums extracted line items alongside a "stated_total" field. Flag records for human review when values differ.
- [ ] **C**: Extract line items and totals independently, then use a separate validation model to reconcile discrepancies by determining which extracted values are most likely correct.
- [ ] **D**: Implement post-processing that automatically adjusts line item amounts proportionally when their sum doesn't match the stated total.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Capturing both values makes the discrepancy a first-class signal — you catch OCR errors and extraction mistakes uniformly, and you can route only the mismatched 18% to humans.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d2-025

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.3

Your pipeline uses a tool called extract_metadata with a JSON schema for paper details. You've also defined lookup_citations and verify_doi tools for enrichment. During testing, you notice that when users include requests like "extract the metadata and tell me how cited it is," Claude sometimes calls lookup_citations first, which fails because it needs the DOI that extract_metadata would provide. What's the most effective way to ensure structured metadata extraction happens first?

- [ ] **A**: Set tool_choice to "any" so Claude must use a tool, combined with system prompt instructions prioritizing extract_metadata.
- [x] **B**: Set tool_choice to {"type": "tool", "name": "extract_metadata"} and process the enrichment requests in subsequent turns after receiving the extracted metadata.
- [ ] **C**: Set tool_choice to {"type": "tool", "name": "extract_metadata"} for every API call in the pipeline, ensuring Claude always extracts metadata before any enrichment can occur.
- [ ] **D**: Set tool_choice to "auto" and reorder the tool definitions so extract_metadata appears first in the tools array, since Claude prioritizes earlier-listed tools.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** tool_choice=specific-tool deterministically forces extract_metadata on the first turn. Then you hand control back to 'auto' to let the model use citations/DOI enrichment with the metadata in context.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d4-029

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.3

Your extraction uses tool use with a JSON schema where property_type is defined as an enum: ['house', 'apartment', 'condo', 'townhouse']. After deployment, 8% of extractions fail schema validation. Investigation reveals listings mention many uncommon property types—"studio", "loft", "duplex", "mobile home", "tiny house", "converted warehouse"—and new types continue appearing regularly. What's the most effective long-term solution?

- [ ] **A**: Change property_type from an enum to a free-form string and implement a normalization step in post-processing.
- [ ] **B**: Add few-shot examples to your prompt demonstrating how to map unexpected property types to the closest existing enum value.
- [ ] **C**: Continuously expand the enum to include newly observed property types and add monitoring for additional edge cases.
- [x] **D**: Add an "other" value to your enum with a separate property_type_detail string field for specifics when "other" is selected.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Keeps the strong enum for the common cases (clean downstream joins) while giving a well-typed escape hatch that preserves detail. Stable long-term.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-030

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Your extraction system parses e-commerce product descriptions to extract specifications like dimensions, weight, and materials into JSON. Despite having a well-defined schema, the model inconsistently extracts the "materials" field—sometimes returning "cotton blend", other times "Cotton/Polyester mix", and occasionally omitting the field when material information is clearly present in the source. What's the most effective way to improve extraction consistency?

- [x] **A**: Add few-shot examples showing 2-3 complete input-output pairs with standardized material description formats
- [ ] **B**: Set temperature to 0 to eliminate randomness and ensure deterministic outputs
- [ ] **C**: Make the "materials" field required instead of optional in the schema to force the model to always extract a value
- [ ] **D**: Switch to a more capable model tier since inconsistent extraction indicates insufficient model capability

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Few-shot examples demonstrate the exact canonical format you want ('cotton/polyester' as a normalized list), and they also raise recall on material info that was being skipped.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-031

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.5

Documents arrive continuously throughout business hours and need structured data extracted. To reduce costs, you want to use the Message Batches API (50% discount, up-to-24-hour processing window). Your SLA specifies that extraction results must be available within 30 hours of document arrival with 99.9% reliability. Which batching strategy is most appropriate?

- [ ] **A**: Submit a single batch at end of day containing all documents from that day
- [x] **B**: Submit batches every 4 hours containing documents from that window
- [ ] **C**: Submit batches every 6 hours containing documents from that window
- [ ] **D**: Use the real-time API for all documents instead of batch processing

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Max 4-hour wait + up to 24-hour batch SLO = 28-hour worst case, leaving a 2-hour cushion under the 30-hour SLA to absorb batch variance and hit 99.9%.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d5-040

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

After deployment, you find that 12% of extractions contain semantic errors that pass JSON schema validation (e.g., a duration like "30 minutes" incorrectly placed in an ingredient quantity field). Human reviewers have capacity to check only 20% of extractions. Which approach most effectively allocates reviewer attention?

- [x] **A**: Have the model output field-level confidence scores, then calibrate review thresholds using a labeled validation set.
- [ ] **B**: Randomly sample 20% of extractions for review, using corrections to track accuracy and identify error patterns.
- [ ] **C**: Prioritize review of all extractions where required fields are empty or explicitly marked as not found.
- [ ] **D**: Review all extractions from documents with formatting anomalies such as unusual layouts or mixed content types.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Field-level confidence lets you route the low-confidence 20% — which is where the 12% semantic errors concentrate — to humans. Calibration makes the threshold choice data-driven.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d4-032

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

After your daily batch of 10,000 documents completes, 300 documents (3%) failed with "context_length_exceeded" errors. The results file identifies each failure by custom_id. What's the most cost-effective approach to process these failures?

- [x] **A**: Resubmit only the 300 failed documents after chunking them into smaller pieces, then combine the partial extractions
- [ ] **B**: Resubmit the entire 10,000 document batch using a model tier with a larger context window
- [ ] **C**: Increase the max_tokens parameter for the 300 failed documents and resubmit them in a new batch
- [ ] **D**: Reprocess the entire batch with prompt caching enabled to reduce the cost of retrying requests with identical system prompts

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Targeted, and it addresses the actual cause (input too long). Chunk the oversized docs, extract per chunk, then merge — minimum tokens, fixes the specific failure mode.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d3-019

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

In a monorepo, the packages/payments/ service has strict conventions that don't apply elsewhere. You want Claude to follow them automatically whenever it edits files under that directory, without bloating the root CLAUDE.md. Best approach?

- [ ] **A**: Add the conventions to ~/.claude/CLAUDE.md so they are always loaded for every project you work on.
- [ ] **B**: Put all payments conventions in the root .claude/CLAUDE.md under a clearly labeled section so they are always in context.
- [x] **C**: Add a CLAUDE.md inside packages/payments/; Claude loads it on demand when it works with files in that subtree.
- [ ] **D**: Create a /payments-rules slash command that developers must run before touching that service.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Subdirectory CLAUDE.md files load on demand when Claude reads or edits files in that directory, so scoping the rules to packages/payments/CLAUDE.md keeps them automatic where they apply and out of global context elsewhere. Root or user memory applies everywhere (bloat); a slash command relies on humans remembering to run it.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-020

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

Your .claude/CLAUDE.md mixes universal standards with a long testing-conventions section that several other docs also need. You want one source of truth for the testing rules, referenced from CLAUDE.md. What's the idiomatic Claude Code mechanism?

- [ ] **A**: Copy the testing section into each file that needs it and keep the copies in sync by hand.
- [x] **B**: Use an @docs/testing-conventions.md import line in CLAUDE.md so the file is pulled in by reference.
- [ ] **C**: Move the testing rules into settings.json so that they are applied to the project globally.
- [ ] **D**: Put the testing rules in a /test-rules skill and invoke that skill at the start of every session. Invocation is explicit.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** CLAUDE.md supports @path imports, so the testing rules live in one file and are referenced wherever needed — single source of truth, no manual duplication. settings.json holds config/permissions, not instructional memory; a skill is model-invoked tooling, not always-on memory.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-021

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.1

A developer pastes the production database password directly into the shared .claude/CLAUDE.md so the agent can use the team database during local work. Why is this the wrong place, and what's the fix?

- [ ] **A**: It's fine to keep it there, because the project .claude/CLAUDE.md stays local to your own machine and is never shared with or distributed to anyone else.
- [ ] **B**: CLAUDE.md can't hold credentials because the model strips them automatically, so store the password in settings.json instead.
- [ ] **C**: Move it to ~/.claude/CLAUDE.md so that only this one developer can ever see it, which is secure enough.
- [x] **D**: The project .claude/CLAUDE.md is committed and shared with everyone who clones the repo; secrets belong in environment variables or untracked local config.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The shared project .claude/CLAUDE.md is checked into version control and distributed to everyone who clones the repo, so a secret there is a leak. Credentials belong in env vars or untracked local config. settings.json is also shared and equally wrong, and the model does not strip secrets.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-022

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

You want to guarantee Claude can edit application code but never modifies files under infra/terraform/, even when it judges such an edit helpful. What configuration enforces this?

- [x] **A**: Add Edit(infra/terraform/**) to the deny list in .claude/settings.json; deny rules override allow and the model cannot bypass them.
- [ ] **B**: Add a clear instruction to CLAUDE.md stating that the agent must never edit any files under infra/terraform/.
- [ ] **C**: Add the infra/terraform/ directory to .gitignore so that the agent does not load or see those files.
- [ ] **D**: Use plan mode for every session so that no file edits are ever applied automatically.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A deny permission rule is enforced by the harness, not the model: Edit(infra/terraform/**) in the deny list blocks those edits regardless of the model's judgment, and deny wins over allow. A CLAUDE.md instruction is advisory; .gitignore doesn't prevent edits; plan mode blocks all edits, not just the protected path.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-023

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

Your team's shared .claude/settings.json allows Bash(npm run test:*). You personally want to also allow Bash(docker compose up:*) on your machine without changing the shared file or affecting teammates. Where do you put it, and which wins on conflict?

- [ ] **A**: Edit .claude/settings.json directly and add the rule there, since it is the only project settings file available.
- [ ] **B**: Add it to ~/.claude/settings.json, because user-level settings always override project-level settings on conflict.
- [x] **C**: Add it to .claude/settings.local.json, which is personal, gitignored, and takes precedence over the shared project settings.
- [ ] **D**: Pass it as a command-line flag on every session, because there is no per-developer settings file in Claude Code.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** settings.local.json holds personal overrides, is gitignored (teammates unaffected), and sits above the shared project settings.json in precedence. User-level ~/.claude/settings.json is the lowest precedence, not the highest; CLI flags work but a local settings file is the persistent per-developer mechanism.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-024

**Difficulty:** Hard | **Domain:** 3 | **Task:** 3.3

Compliance requires that the agent must never run git push to the main branch under any circumstances, while still allowing pushes to other branches. A system-prompt instruction occasionally fails. What enforces this deterministically?

- [ ] **A**: Add emphatic wording to CLAUDE.md, such as 'CRITICAL: NEVER push to the main branch under any circumstances.'
- [x] **B**: Use a PreToolUse hook matching Bash that inspects the command and blocks (exit code 2) any git push targeting main.
- [ ] **C**: Remove the Bash tool from the agent entirely so that no git commands of any kind can be executed.
- [ ] **D**: Add Bash(git push:*) to the deny permission list so the agent is prevented from pushing.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A PreToolUse hook runs before the tool executes and can block it (exit code 2) based on the actual command string, allowing general pushes while denying pushes to main, independent of the model. A prompt is advisory; removing Bash is far too broad; a deny rule on git push blocks all pushes, not just those to main.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-025

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

You're doing a long, well-scoped refactor and trust the plan, so you no longer want to approve each individual file edit — but you still want to be prompted before any shell command runs. Which permission mode fits?

- [x] **A**: acceptEdits, which auto-approves file edits while still prompting for other actions such as Bash commands.
- [ ] **B**: bypassPermissions, which skips all approval prompts so the refactor can proceed without interruption.
- [ ] **C**: plan mode, so that edits are batched up and then applied together at the very end of the session.
- [ ] **D**: default mode, because Claude Code provides no way to auto-approve only file edits.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** acceptEdits auto-approves file edits but still gates other actions like Bash behind prompts — exactly the requirement. bypassPermissions removes all prompts including shell (broader, riskier); plan mode is read-only and applies no edits; default prompts on every edit.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d3-026

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

You ask Claude to implement a function from a spec and want it to converge on a correct implementation with minimal back-and-forth from you. What setup most improves its ability to self-correct?

- [ ] **A**: Tell it to be careful and to double-check its own work thoroughly before it responds to you.
- [ ] **B**: Ask it to generate three independent implementations up front and then pick whichever one looks best.
- [ ] **C**: Switch to a larger model tier so that it simply makes fewer mistakes in the first place.
- [x] **D**: Give it a way to run the test suite (or a failing test) so it can execute, read real failures, and iterate against them.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A concrete feedback signal — runnable tests — lets the agent execute, observe actual failures, and refine until green, the core of iterative refinement. 'Be careful' is vague; three blind variants without execution aren't grounded in correctness; a bigger model still benefits more from a real test loop than from raw capability.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d3-027

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

Claude is building a UI component and the rendered result looks slightly off, but it has no way to tell. What most reliably lets it iterate toward the intended appearance?

- [ ] **A**: Describe the desired look using more precise adjectives, richer visual detail, and explicit layout guidance in the prompt text you give it.
- [x] **B**: Give it the ability to render the component and capture a screenshot (e.g., via a browser tool) so it can see the output and adjust.
- [ ] **C**: Ask it to keep increasing the CSS specificity of the rules until the component happens to look right.
- [ ] **D**: Switch to plan mode so that it carefully plans all of the styling before it writes any code.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Iteration needs an observable signal. Letting the agent render and screenshot the component closes the loop — it sees the actual output and corrects. More adjectives give no feedback; arbitrary CSS changes aren't grounded; plan mode produces no visual to compare against.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d3-028

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

Your CI job runs claude -p to triage failing tests. Occasionally it gets stuck in a long exploration and burns the CI budget. You want a hard ceiling on the number of agent steps per run. Which flag?

- [ ] **A**: Use --output-format json, which makes the headless run finish faster and avoids the long exploration.
- [ ] **B**: Use --permission-mode plan, which limits what the agent is allowed to do during the run.
- [x] **C**: Use --max-turns N to cap the number of agent turns in the headless run.
- [ ] **D**: Use --dangerously-skip-permissions to remove the approval overhead that is slowing the run down.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** --max-turns sets a hard ceiling on agent turns, bounding cost and time in headless runs. --output-format only changes result serialization; plan mode makes it read-only (changes behavior, not a step cap); skip-permissions removes prompts (irrelevant under -p) and adds risk.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d3-029

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

In a CI pipeline, claude -p halts because it waits for permission to run allowed build commands. You need it to proceed non-interactively but want to limit what it can do to a known-safe set. Best approach?

- [x] **A**: Pass --allowedTools (and/or a scoped --permission-mode) listing exactly the tools the job needs, so it runs unattended within a known boundary.
- [ ] **B**: Pass --dangerously-skip-permissions so that the agent never stops to ask for permission about anything at all for the entire duration of the run.
- [ ] **C**: Run the interactive Claude Code TUI inside CI and script it to automatically press enter at each prompt.
- [ ] **D**: Delete .claude/settings.json in the CI environment so that the permission system is removed entirely.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Granting exactly the tools the job needs via --allowedTools lets it run unattended while staying inside a known-safe boundary — least privilege. --dangerously-skip-permissions removes all guardrails (fine only for fully sandboxed throwaway envs); driving the TUI in CI is fragile; deleting settings.json doesn't grant non-interactive approval and discards your deny rules.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d3-030

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

You want a reusable 'audit dependencies for CVEs' workflow that does a lot of noisy exploration and should not pollute the main conversation's context. Which Claude Code mechanism fits best?

- [ ] **A**: A slash command in .claude/commands/ that inlines the entire audit workflow into the current conversation.
- [ ] **B**: A CLAUDE.md section that describes all of the dependency-audit steps for the agent to follow inline.
- [ ] **C**: A settings.json hook that runs the dependency audit automatically on every user prompt.
- [x] **D**: A subagent in .claude/agents/ that runs the audit in its own separate context window and returns only the summary.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A subagent runs in its own context window and reports back only its result, keeping the noisy exploration out of the main conversation — exactly the isolation wanted. A slash command expands into the current context (pollutes it); CLAUDE.md is passive memory; a per-prompt hook is the wrong primitive.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d1-045

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.2

A document-processing system must, for each incoming request, do an unpredictable amount of work: some requests touch one file, others fan out across dozens of files whose names aren't known until the request is parsed. A central model needs to decide at runtime how to break the job up, hand pieces to workers, and combine their results. Which pattern from Building Effective Agents fits best?

- [ ] **A**: Parallelization (sectioning) — predefine a fixed set of independent subtasks and run them all concurrently.
- [x] **B**: Orchestrator-workers — a lead model decomposes the task at runtime, delegates to workers, and synthesizes results.
- [ ] **C**: Prompt chaining — feed each step's output into the next through a fixed, predetermined sequence.
- [ ] **D**: Routing — classify the incoming request and forward it to a single specialized handler.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The work is unpredictable and not known until parse time, so the decomposition must be decided at runtime — the orchestrator-workers signature. Parallelization requires predefining the subtasks, which is exactly what you can't do here.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-046

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

Your team translates marketing copy into other languages. A single-shot translation is often "correct but flat," and reviewers can articulate exactly what's wrong (tone, idiom, length). You want quality to improve automatically without a human in the loop each time. Which workflow is the best match?

- [ ] **A**: Routing — detect the target language and dispatch to a prompt specialized for that language.
- [ ] **B**: Orchestrator-workers — split the copy into sections and translate each section in parallel.
- [x] **C**: Evaluator-optimizer — a generator translates and an evaluator critiques against explicit criteria, in a loop.
- [ ] **D**: Prompt chaining — translate, then summarize, then expand across fixed sequential steps.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Reviewers can articulate the criteria and iteration improves quality — the evaluator-optimizer signature: generate, evaluate against criteria, revise in a loop. The cookbook gates this pattern on having clear criteria; without them the loop just spins.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-047

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

An incoming-ticket system handles three clearly distinct request types — refunds, technical support, and account changes — and a single mega-prompt that tries to cover all three keeps blurring the instructions, degrading every category. What's the cleanest fix?

- [ ] **A**: Add many more few-shot examples covering all three categories into the single combined prompt.
- [ ] **B**: Switch to an orchestrator that spawns a dedicated worker for every ticket regardless of type.
- [ ] **C**: Run the single combined prompt three times per ticket and vote on the best response.
- [x] **D**: Route — classify the ticket type first, then send it to a prompt specialized for that one category.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Distinct categories that interfere when combined is the textbook routing case: classify first, then dispatch to a specialized prompt. More few-shot fights the symptom; per-ticket orchestration and voting add cost without addressing the conflation.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-048

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

A contract-analysis task naturally splits into fixed ordered steps: extract clauses, check each clause against policy, draft a summary. Each step is reliable on its own, and you can insert a programmatic check between steps that aborts if the extraction looks malformed. You're willing to trade some latency for accuracy. Which pattern is this?

- [x] **A**: Prompt chaining with a gate — fixed sequential LLM calls, with validation between the steps.
- [ ] **B**: Routing — classify the contract up front and dispatch it to a single handler.
- [ ] **C**: Autonomous agent — let the model freely decide each next action at runtime.
- [ ] **D**: Parallelization (voting) — run the whole task several times and take the majority answer. Variance falls sharply.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Fixed ordered steps plus a programmatic check between them plus trading latency for accuracy is prompt chaining with a gate. The fixed known sequence rules out an autonomous agent; there's nothing to classify-and-route or vote on.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-049

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A product manager wants to "make it an agent" for a task whose steps are completely known and fixed in advance, and which a scripted sequence of model calls already handles reliably. What does the cookbook's guidance recommend?

- [ ] **A**: Always prefer an autonomous agent — it generalizes better to unforeseen future requirements.
- [x] **B**: Keep the fixed workflow; add agentic autonomy only when steps must be decided at runtime.
- [ ] **C**: Wrap the existing workflow inside an orchestrator-workers pattern for added safety.
- [ ] **D**: Add an evaluator-optimizer loop so the agent can continuously self-correct its output.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The cookbook's headline guidance: start with the simplest thing that works, add agentic autonomy only when the task needs the model to direct its own steps. Fully-known steps belong in a deterministic workflow; adding autonomy for its own sake adds cost, latency, and failure modes.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d1-050

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

A security team wants higher confidence when flagging code for vulnerabilities: a single pass sometimes misses issues, and they'd rather surface a finding if any of several independent looks catches it. Which parallelization variant fits?

- [ ] **A**: Sectioning — divide the codebase into chunks and review each chunk exactly once.
- [ ] **B**: Orchestrator-workers — let a lead model decide which files to send for review.
- [x] **C**: Voting — run the same review multiple times and flag an issue if enough passes catch it.
- [ ] **D**: Prompt chaining — review, then re-review the output produced by the first review pass. Two passes catch more.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Surfacing a finding if any pass catches it, to raise confidence, is the voting variant of parallelization — run the same task multiple times and aggregate. Sectioning splits different work; it wouldn't give redundant looks at the same code.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d2-026

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.3

You set tool_choice to {"type": "any"} so Claude always calls one of your tools. Afterward you notice Claude no longer emits its usual "let me think through this" reasoning text before the call, which your logging relied on. Why, and what's the right adjustment if you need that reasoning?

- [x] **A**: With "any" or a forced tool Claude must call immediately and can't emit leading reasoning; use "auto" if you need it.
- [ ] **B**: It is a transient API bug; simply retry the request and the reasoning preamble comes back.
- [ ] **C**: The reasoning still exists but moves into the tool's input arguments; parse it out from there.
- [ ] **D**: High temperature is suppressing the preamble text; lower the temperature to restore it.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Documented behavior: with tool_choice "any" or a forced specific tool, Claude must emit a tool call and cannot produce leading text-only reasoning. If you need that reasoning, use "auto", which lets the model talk then optionally call a tool. Not a bug; not hidden in the input; temperature is unrelated.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d2-027

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A long-running agent has accumulated 80+ tools. Loading all their definitions on every call is burning context and Claude increasingly picks the wrong tool. The cookbook's recommended approach?

- [ ] **A**: Concatenate all the tools into a single mega-tool with a mode argument to reduce the count to one.
- [ ] **B**: Set tool_choice to "any" so the model is forced to commit to using some tool.
- [ ] **C**: Raise max_tokens substantially so the full list of tool definitions always fits.
- [x] **D**: Use tool search (embedding retrieval) to surface only the tools relevant to each request.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Too many tools means token bloat and worse selection. Tool search retrieves only the relevant subset per request instead of sending all definitions. A mega-tool just relocates the complexity; forcing "any" doesn't help it pick correctly; max_tokens is the output budget, not the tool-definition cost.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d2-028

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A request needs both the current weather in two different cities. The two lookups don't depend on each other. By default, how does Claude handle this in a single turn, and should you change anything?

- [ ] **A**: Claude can only call one tool per turn, so you must chain two separate sequential requests. Parallel calls need a separate batching API.
- [x] **B**: Claude issues both calls in one turn — parallel tool use is on by default; leave it enabled.
- [ ] **C**: You must set tool_choice to "any" before Claude is allowed to make more than one call. Without it the second call is rejected by the API.
- [ ] **D**: Parallel tool calls require the Batches API; submit the two lookups together as a batch. The Batches API is what accepts more than one call at a time.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Parallel tool use is on by default — Claude can issue both independent calls in one assistant turn. You don't need "any" or the Batches API, and the one-tool-per-turn claim is false. Leave parallel enabled for independent calls.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-029

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.1

An agent makes many tool calls whose large intermediate results (multi-thousand-row tables) are only needed to compute a final number — but every intermediate result currently round-trips back through the model, blowing the context budget. Which approach addresses this?

- [ ] **A**: Summarize each large intermediate table with a separate model call before returning it to the agent.
- [ ] **B**: Disable parallel tool use so the large results arrive back one at a time, not together.
- [x] **C**: Programmatic tool calling — Claude writes code that calls the tools, so bulky results stay in the code environment.
- [ ] **D**: Raise the available context window by switching the agent to a larger model variant.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Large intermediates needed only for a final computation are the programmatic-tool-calling case: Claude writes code that invokes the tools, bulky results stay in the execution environment, and only the final value returns through the model. Summarizing adds calls; disabling parallelism and a bigger model don't address the round-tripping.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d2-030

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A coding agent works across sessions that far exceed a single context window, and it keeps "forgetting" decisions made earlier. Which cookbook capability is designed for this?

- [x] **A**: The memory tool — persist and later retrieve notes, decisions, and progress outside live context.
- [ ] **B**: Prompt caching — cache the running conversation so that none of it is ever lost.
- [ ] **C**: Extended thinking — give the model more room to reason within a single turn.
- [ ] **D**: Increase max_tokens so that more conversation history fits into each response.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Cross-session state that exceeds the window is what the memory tool is for — persist and retrieve notes/decisions outside live context. Prompt caching speeds resending unchanged context but gives nowhere to store new state; extended thinking and max_tokens are within-turn.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d2-031

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

A get_weather tool occasionally fails — the upstream API times out, or the user asks for a city it doesn't recognize. Right now the tool raises an exception, the API request errors out, and the agent abandons the whole turn. What does the cookbook's customer-service / tool pattern recommend so the agent can recover within the same loop?

- [ ] **A**: Drop the tool from the tools array after its first failure so Claude stops attempting it. A tool that has failed once is unlikely to recover in the same turn.
- [ ] **B**: Force tool_choice to "any" so Claude is pushed toward some other available tool instead. Another tool can usually answer the same question adequately.
- [ ] **C**: Retry the identical failing call up to five times, then abort the whole request as failed. Five attempts covers any timeout the API produces.
- [x] **D**: Return the failure as a structured error result (is_error) the model can read and adapt to.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A tool that can fail should hand the failure back as a structured error result (is_error with a readable message) so Claude can read it and adapt within the same loop. Raising an exception that errors the request gives the model nothing to recover from. Dropping the tool over one transient failure, forcing "any", or blind retries don't fix a deterministic "city not found".
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d4-033

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

You need Claude to return paper metadata that always parses as valid JSON with a fixed set of fields. Asking for JSON in the prompt mostly works but occasionally returns prose or a trailing comment that breaks your parser. The cookbook's most reliable approach?

- [ ] **A**: Add "Return ONLY valid JSON, no other text" in capitals and retry whenever parsing fails. Capitals carry weight.
- [ ] **B**: Define a tool with an input_schema and force its use, so the output is a structured payload.
- [ ] **C**: Lower the temperature all the way to 0 so the emitted JSON is always well-formed.
- [ ] **D**: Post-process the prose output with a regex that strips everything that isn't JSON.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The reliable way to guarantee parseable structured output is to define a tool with an input_schema and let the output be the structured payload — not coax JSON from prose and hope. Louder instructions plus retry, temperature, and regex cleanup all still depend on free-text output being well-formed.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-034

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

You're already using a tool/input_schema to extract structured records and want compile-time-ish guarantees that each record matches the expected types before it enters your pipeline. Which cookbook technique fits?

- [ ] **A**: Define the schema with Pydantic models and validate each tool input, repairing nonconforming records.
- [ ] **B**: Trust the schema — any tool call that returns is already guaranteed to be type-correct.
- [ ] **C**: Ask Claude in the prompt to carefully double-check that all the field types are right.
- [ ] **D**: Run the extraction twice and compare the two resulting JSON blobs for any differences.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Pydantic models give typed validation of the tool input, rejecting or repairing nonconforming records. "A returned tool call is guaranteed type-correct" is false — the schema constrains but you still validate at the boundary. Prompt self-checks and double-extraction aren't guarantees.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d4-035

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

You're building a ticket-classifier and a stakeholder asks "is it good enough to ship?" You've been spot-checking a few outputs by eye. What does the cookbook's classification guidance call for instead?

- [ ] **A**: Increase the number of categories so each one is narrower and individually easier to get right.
- [ ] **B**: Ship the classifier now and treat incoming production complaints as the evaluation signal.
- [ ] **C**: Build a labeled eval set and measure accuracy overall and per class against explicit criteria.
- [ ] **D**: Have Claude rate its own confidence and trust every classification above a chosen threshold.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** "Good enough to ship?" is answered with a labeled eval set and measured accuracy against explicit criteria (overall and per class) — not eyeballing, production complaints, or model self-confidence. More categories doesn't establish readiness; self-rated confidence is the no-self-confidence trap.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-036

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.4

An extraction tool returns a record that perfectly matches your JSON schema — every field present, all types correct — yet the total_amount is wrong because the source PDF was misread. A teammate says "the schema validated, so we're good." What's the right mental model?

- [ ] **A**: Schema validation guarantees correctness, so the teammate's conclusion is entirely right.
- [ ] **B**: Re-run the extraction with tool_choice "any" to obtain an independent second opinion.
- [ ] **C**: Raise the temperature so the model considers alternative values for the total.
- [ ] **D**: A schema guarantees shape, not truth — a well-formed record can still be factually wrong.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Schema validation guarantees shape, not truth. A perfectly-formed record can carry a wrong number from a misread source. Values that matter need validation against the source or a cross-check; the schema passing is necessary, not sufficient.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d4-037

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

A summarization feature feeds its output into a downstream UI that renders fixed sections (Key Risks, Obligations, Dates). Free-form summaries keep omitting or reordering these. The cookbook's guided-summarization advice?

- [ ] **A**: Increase max_tokens so the summary is long enough to physically include every section.
- [ ] **B**: Prompt for a structured summary with the exact required sections, so each field is present.
- [ ] **C**: Summarize the document twice and then concatenate the two resulting summaries together.
- [ ] **D**: Lower the temperature so that the produced summary comes out more deterministically.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Downstream consumes fixed fields, so prompt for a structured summary with exactly those sections (or a schema). max_tokens controls length not presence; double-summarizing and temperature don't guarantee the required sections appear.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-038

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.4

Your structured-extraction step sometimes returns a record missing the vendor_tax_id field. Investigation shows that in those cases the source invoice genuinely has no tax ID printed on it. A colleague suggests "just retry until the field comes back." Why is that wrong?

- [ ] **A**: Retrying re-formats output but can't conjure absent info; represent "not present" explicitly.
- [ ] **B**: Retrying works fine — the field is intermittently dropped and reappears within a few tries. Nothing is lost.
- [ ] **C**: Raise the temperature so the model explores harder and eventually finds the missing value.
- [ ] **D**: Switch to prose output instead of JSON, since prose never omits any of the fields.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The field is missing because it's absent from the source. Retrying only re-rolls the formatting of the output; it can't invent input that doesn't exist. The fix is to represent "not present" explicitly (nullable field), not to loop. Retries cure malformed output, never missing information.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d5-041

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

Your RAG system chunks a 200-page financial report and embeds each chunk independently. Retrieval keeps failing on queries like "Q3 revenue" because the chunk that holds the number reads "revenue grew 4%" with no indication of which quarter or company it belongs to. Which cookbook technique directly targets this?

- [ ] **A**: Switch to a larger and more capable text embedding model for the chunks.
- [ ] **B**: Increase the number of chunks returned at query time from five up to fifty.
- [ ] **C**: Contextual Retrieval — prepend a chunk-specific context blurb before embedding each chunk.
- [ ] **D**: Lower the chunk size so each chunk holds less text and is therefore less ambiguous.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Standalone chunks lose the context that disambiguates them. Contextual Retrieval prepends a chunk-specific context blurb before embedding (and pairs contextual embeddings with contextual BM25), the documented fix. A bigger embedder, more chunks, or smaller chunks don't restore the missing context.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-042

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Every request in your support bot sends the same 30-page policy manual as context, followed by the user's short question. Latency and cost are high and most of the payload never changes between requests. What's the cookbook's prompt-caching guidance?

- [ ] **A**: Put the policy manual in the system prompt on the first request only, then omit it after.
- [ ] **B**: Cache the user's question instead, since the question is what repeats across a session.
- [ ] **C**: Summarize the manual once up front and send that summary in place of caching anything.
- [ ] **D**: Mark the static manual with a cache_control breakpoint and place it before the question.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Cache the large static manual with a cache_control breakpoint and put it before the variable question, so the stable prefix is reused. Sending it once then omitting loses the context; caching the question caches the part that changes; summarizing is a different tradeoff that loses detail.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-043

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A research assistant must produce claims that reviewers can trace back to exact spans in the supplied source documents. Instructing it to "cite your sources" in the prompt yields citations that are sometimes fabricated or point to the wrong passage. What's the more reliable mechanism?

- [ ] **A**: Add "do not make up citations" to the system prompt and also lower the temperature.
- [ ] **B**: Use the Citations feature so returned claims carry verifiable references to source spans.
- [ ] **C**: Ask the model to output a numeric confidence score next to each citation it produces.
- [ ] **D**: Run a second model afterward to manually re-check every single citation by hand.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The Citations feature returns claims tied to verifiable spans in the supplied documents — structurally more reliable than prompt-instructed "cite your sources," which is what's already fabricating references. Stronger instructions, self-reported confidence, and manual re-checking don't give grounded, traceable references.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-044

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

A long-horizon coding agent is approaching the context-window limit mid-task. You need it to keep going without losing the key decisions and state it has built up. What does the cookbook's automatic-context-compaction approach do?

- [ ] **A**: Summarize and compact earlier turns into a compact form that preserves the key state.
- [ ] **B**: Hard-truncate the oldest messages to free room, accepting whatever context is lost. Older turns matter least.
- [ ] **C**: Spill the entire conversation history to the Batches API and resume the task later.
- [ ] **D**: Restart the session with an empty context to fully reset the available window.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Automatic context compaction summarizes earlier turns and tool results into a compact form that preserves key state while freeing window space. Hard truncation drops exactly the decisions you need; the Batches API is for async bulk jobs; resetting loses everything.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-045

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A support assistant must answer from a knowledge base that changes weekly (new policies, pricing). Stuffing the whole KB into every prompt is expensive and quickly goes stale, and fine-tuning can't keep pace with weekly edits. Which approach does the cookbook favor for current, grounded answers?

- [ ] **A**: Fine-tune the model every week on the newest snapshot of the knowledge base.
- [ ] **B**: Paste the entire knowledge base into the system prompt and rely on long context.
- [ ] **C**: Use RAG — retrieve the few currently-relevant chunks at query time and ground answers.
- [ ] **D**: Cache the whole knowledge base with prompt caching and then never resend it again.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A weekly-changing KB rules out fine-tuning (can't keep pace) and makes whole-KB stuffing expensive and stale-prone; caching still resends stale content. RAG retrieves the currently-relevant chunks at query time and reflects updates as soon as the store is reindexed.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-046

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.1

You added a cache_control breakpoint but cache hit rates are near zero. You discover each request prepends a per-request timestamp and request-id before the large static document. Why is caching failing, and what's the fix?

- [ ] **A**: The breakpoint type is wrong; switch it from ephemeral to persistent caching.
- [ ] **B**: The 5-minute cache TTL expired; raise it to one hour so the timestamps stop mattering.
- [ ] **C**: Caching can't handle documents longer than a few pages; chunk the document up first.
- [ ] **D**: Variable content before the static block changes the prefix each call; move it after.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Prompt caching matches on an identical prefix. A per-request timestamp/request-id before the static document changes the prefix every call, so nothing is reused. The fix is ordering: variable content goes after the cached static block. It's not a breakpoint-type, TTL, or document-size problem.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-047

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.4

An architect is implementing structured state persistence for a fleet of code-exploration agents. When an agent crashes due to a network timeout, the coordinator needs to resume the agent's work without losing the high-level goal or the specific files already processed. Which implementation best achieves this?

- [ ] **A**: Each agent must continuously append its raw token stream to a Redis cache, allowing the coordinator to perform an exact session replay by feeding the cached tokens back into a new agent instance to restore its precise operational state.
- [ ] **B**: The coordinator should use a /compact endpoint on the crashed agent's full context history, then send the resulting compacted text to a newly spawned subagent that uses the summary to infer the high-level goal and continue the task.
- [ ] **C**: The coordinator should save the agent's API keys and session tokens to a secure vault, using them to re-establish the connection and replay the last known state from its internal transaction log to restore the agent's high-level goal.
- [ ] **D**: Agents should periodically export a JSON manifest containing their current high-level goal, a list of processed files, and key extracted entities; the coordinator injects this JSON into the prompt on resume.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Periodically exporting a JSON manifest with the high-level goal, processed files, and extracted entities creates a structured, semantic checkpoint. The coordinator can inject this manifest into the prompt on resume, allowing the agent to continue efficiently without reprocessing files or losing context.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d4-039

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

A financial services company uses Claude to review marketing copy for non-compliant \"guaranteed return\" claims. While the prompt includes a list of banned phrases, marketers frequently invent novel phrasing (e.g., \"your wealth is locked to go up\") that bypasses the rules, or use safe phrases that Claude incorrectly flags. What is the most effective way to help Claude generalize its judgment to catch novel non-compliant patterns while reducing false positives on safe copy?

- [ ] **A**: Update the system prompt dynamically with a continuously growing list of every new non-compliant phrase discovered by the compliance team.
- [ ] **B**: Instruct Claude to output a confidence score for each flagged phrase and only block the copy if the confidence score is above 95%.
- [ ] **C**: Implement a pre-processing step using a semantic search vector database to find exact matches of known non-compliant phrases before invoking Claude.
- [ ] **D**: Provide 2-4 few-shot examples demonstrating the reasoning behind why certain novel phrases are flagged and why similar-sounding safe phrases are allowed.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Few-shot examples allow Claude to learn the decision boundary from examples of both problematic novel phrasing and similar safe phrasing. By including the reasoning behind these examples, the model can infer the underlying principles and intent of the rules, which significantly improves generalization to new wording while reducing false positives.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d1-051

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

When managing an agentic session for system administration tasks, why might an architect avoid resuming a session that has been inactive for a significant period (e.g., 24 hours) using only the existing conversation history?

- [ ] **A**: Because resuming with stale tool results (like outdated df -h or ls outputs) will confuse the agent and lead to incorrect diagnoses.
- [ ] **B**: Because Claude's session token has a hard-coded 24-hour expiration limit that prevents the agent from resuming its state from the conversation history.
- [ ] **C**: Because fork_session is the only supported method for multi-day tasks, as it properly archives and restores the agent's full operational state.
- [ ] **D**: Because the --resume command does not re-authenticate external SSH tool connections, causing any subsequent system administration commands to fail.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Resuming with stale tool results like outdated df -h or ls outputs can mislead the agent. The environment may have changed significantly, and the model might make incorrect decisions based on artifacts that no longer reflect the current system state.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d4-040

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

A hospital triage application uses Claude to parse raw intake transcripts into a structured JSON format. The downstream system requires exactly four fields: patient_location, chief_complaint, triage_severity, and suggested_action. Even with a strict JSON schema provided in the system prompt, Claude sometimes combines the complaint and action into one field or invents new fields like patient_name. What is the most effective prompt engineering technique to achieve strict adherence to the required fields?

- [ ] **A**: Implement a prefill technique where the assistant's response is hardcoded to start with {\n "patient_location":, forcing the model to complete the rest of the schema.
- [ ] **B**: Instruct Claude to generate the output in XML first, and then use a secondary prompt to translate the XML into the required JSON schema.
- [ ] **C**: Add a negative prompt explicitly listing all the incorrect fields Claude has previously hallucinated and forbidding their use.
- [ ] **D**: Provide 2-4 few-shot examples showing the exact desired JSON output format, demonstrating how to map transcript details strictly into the four required fields.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Few-shot examples are the most effective way to demonstrate pattern matching and mapping logic. By showing multiple transcript-to-JSON pairs that strictly use only the four required fields, Claude learns the specific structural constraints and is much less likely to invent new keys or merge existing ones.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d2-032

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

A financial agent uses an MCP tool to initiate wire transfers. A user requests a transfer of $50,000. The user has the correct role, but transfers over $10,000 require secondary approval via a separate request_manager_approval MCP tool. The wire transfer tool currently returns a generic permission denied error. How should the architect redesign the wire transfer tool's error response to enable agent-driven recovery?

- [ ] **A**: Return isError: false and automatically trigger the request_manager_approval tool from within the wire transfer tool's backend code, bypassing the agent's decision-making and directly initiating the approval workflow.
- [ ] **B**: Return isError: true, errorCategory: "permission", isRetryable: false, and a human-readable description instructing the agent to invoke the request_manager_approval tool before trying again.
- [ ] **C**: Return isError: true, errorCategory: "business", and isRetryable: true with a message telling the user that their account is locked, prompting the agent to attempt unlocking the account before retrying the transfer.
- [ ] **D**: Return isError: true, errorCategory: "transient", and isRetryable: true so the agent interprets the failure as temporary and waits for the manager to approve the transfer out-of-band before retrying.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This response accurately identifies the failure as a permission constraint and provides a clear recovery path by instructing the agent to invoke the request_manager_approval tool. The agent can then autonomously orchestrate the approval and retry the transfer once approved.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d4-041

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

A system for extracting information from insurance claims fails an initial extraction attempt. The validation layer reports two distinct errors: (1) The policy_number field, which should be 10 characters, was extracted as 'ABC-123'. (2) The incident_date was extracted as a date in the future. What is the most effective error feedback to include in the retry prompt?

- [ ] **A**: Error: The data is invalid. The policy_number field must be 10 alphanumeric characters without hyphens, but the extraction produced 'ABC-123' which is only 7 characters and contains hyphens.
- [ ] **B**: Error: The policy number has the wrong format. The policy_number field must be 10 alphanumeric characters without hyphens, but the extraction produced 'ABC-123' which is only 7 characters and contains hyphens.
- [ ] **C**: The JSON output did not match the required schema. The policy_number field must be a 10-character alphanumeric string without hyphens, but the extraction produced 'ABC-123' which is only 7 characters and contains hyphens.
- [ ] **D**: Validation Errors: 1. 'policy_number' must be 10 alphanumeric characters without hyphens. 2. 'incident_date' must be a date in the past. Please correct these fields based on the document.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This feedback is the most effective because it explicitly lists both validation errors with clear, actionable rules: the policy_number must be 10 alphanumeric characters without hyphens, and the incident_date must be in the past. By providing precise, comprehensive guidance, it enables the model to make targeted corrections in a single retry.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d3-031

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A developer is working in a deeply nested directory src/modules/payment/. They want to check which CLAUDE.md files and rules are currently influencing Claude Code's behavior in this specific location, as there are configuration files at the user level, project root, and within the payment/ directory itself. Which action provides the most accurate representation of the active configuration hierarchy?

- [ ] **A**: Open the terminal in src/modules/payment/, launch Claude Code, and execute the /memory command to inspect the actively loaded context.
- [ ] **B**: Inspect the .claude/memory.json file located in the user's home directory to review the global configuration that applies to all projects.
- [ ] **C**: Run claude config --list from the project root to output the resolved hierarchy tree, including all inherited CLAUDE.md files and rules from parent directories.
- [ ] **D**: Execute /config validate to generate a report of all inherited markdown files, listing each CLAUDE.md and its source directory in the hierarchy.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Launching Claude Code from src/modules/payment/ and running /memory shows the actively loaded context for that exact directory, including all inherited CLAUDE.md files from parent directories up to the project root and user home. This provides the most accurate representation of the configuration hierarchy in effect at that location.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d2-033

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

You need to change a setTimeout(..., 1000) call to 2000 inside a specific fetchData function within a 2,000-line api.ts file. There are dozens of identical setTimeout(..., 1000) calls scattered throughout the file. You want to use the Edit tool to minimize token usage and avoid reading the entire file. How should you construct the Edit tool request to ensure success on the first try?

- [ ] **A**: Use the Read tool to load the entire api.ts file into context, then use the Edit tool with a two-line anchor to modify the specific setTimeout call.
- [ ] **B**: Use Grep to find all setTimeout calls, then use the Write tool with the fetchData function block to overwrite its contents with the updated code.
- [ ] **C**: Include the function fetchData() signature and intervening lines in the anchor text to create a globally unique match block.
- [ ] **D**: Provide only the setTimeout(..., 1000) line as the anchor text and specify its exact line number to ensure the Edit tool targets the correct instance.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** To target a specific setTimeout inside fetchData, you must provide enough surrounding context to make the anchor text unique. Including the function signature and intervening lines ensures the Edit tool matches only the intended location, avoiding conflicts with other identical setTimeout calls elsewhere in the file.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d5-048

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.5

A company is using an Anthropic model to automate the initial categorization of customer support tickets. The business has identified that misclassifying a high-priority 'Urgent' ticket is significantly more costly than having a human review a ticket. Given the capabilities of Anthropic's models and the high stakes involved, what is the most effective and reliable methodology for the architect to implement?

- [ ] **A**: Fine-tune a model on the validation set with the sole objective of maximizing the F1-score for the 'Urgent' category, then deploy the fine-tuned model to handle all ticket classification automatically without any human review step. This strategy focuses on improving the model's precision and recall for urgent tickets.
- [ ] **B**: Implement a human-in-the-loop (HITL) workflow where the model performs an initial classification. Design a prompt that instructs the model to flag any potentially 'Urgent' tickets for mandatory human review, ensuring no high-priority ticket is actioned without validation.
- [ ] **C**: Iterate through different confidence thresholds on a validation set, calculate a total cost for each threshold based on the cost of review versus misclassification, and select the threshold that minimizes this total cost for the production pipeline. This process involves systematically varying the model's confidence cutoff.
- [ ] **D**: Fully automate the categorization for all tickets by deploying the model to classify every incoming request without human intervention, and schedule a monthly review of overall accuracy metrics to detect any drift in performance. This approach maximizes throughput by eliminating manual review steps entirely.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Implementing a human-in-the-loop (HITL) workflow is a robust and recommended strategy for high-stakes scenarios. By having the model perform initial classification and flag potentially 'Urgent' tickets for mandatory human review, this approach leverages model efficiency for routine tasks while ensuring human expertise handles critical decisions, directly addressing the high cost of misclassification.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d1-052

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A developer is building an autonomous research agent. To determine when the agent has finished its research, the developer's code checks if the assistant's response contains the phrase 'Research complete:'. If this phrase is found, the agent's main loop terminates. What is the architectural assessment of this approach?

- [ ] **A**: This is an anti-pattern because it relies on parsing non-deterministic natural language for control flow. The developer should instead instruct the model to call a specific tool, such as research_complete(), to signal task completion.
- [ ] **B**: This is an anti-pattern; the developer should instead check for a specific stop_sequence like </research_complete> in the API request, configuring the model to emit that token when research is finished. The API can be set to stop generation upon encountering the sequence.
- [ ] **C**: This is a best practice, provided the system prompt strongly enforces the exact phrasing of 'Research complete:' using XML tags and the agent's main loop parses the response for that exact string to terminate deterministically.
- [ ] **D**: This is an anti-pattern; the developer should instead evaluate if stop_reason equals end_turn to safely and deterministically terminate the loop, checking the API response object after each assistant turn. The stop_reason field is a structured signal provided by the model API.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Anthropic's official documentation explicitly identifies parsing natural language for control flow as an anti-pattern. The recommended approach is to inspect the stop_reason field in the API response object. When stop_reason == \"end_turn\", the assistant has finished its turn and the agentic loop should terminate, providing a deterministic and safe control mechanism.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d4-042

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

A system extracts data from academic transcripts. The schema defines two distinct arrays: undergraduate_courses and graduate_courses. The model successfully outputs valid JSON, but the application's validation logic detects that a course labeled 'Introduction to Biology (100-level)' was placed in the graduate_courses array. How should the architect categorize this error and design the resolution mechanism?

- [ ] **A**: It is a schema syntax error; the architect should update the tool definition to include a regex pattern that rejects 100-level courses in the graduate array by validating course codes against a whitelist of graduate-level prefixes before JSON construction.
- [ ] **B**: It is a semantic validation error; the architect should halt the process immediately because retries cannot correct structural misplacements, and instead implement a pre-processing step that classifies courses by level before extraction.
- [ ] **C**: It is a semantic validation error; the architect should implement a retry loop that provides the failed extraction and the specific error '100-level courses belong in undergraduate_courses' to guide self-correction.
- [ ] **D**: It is a schema syntax error; the architect should rely on Claude's strict tool use capabilities to automatically prevent wrong field placement on subsequent runs by enabling the 'strict' parameter in the tool definition to enforce exact schema adherence.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The error is semantic because the output format is valid but the content violates a business rule. Anthropic's best practices recommend handling semantic validation errors by implementing a retry loop with explicit, actionable feedback (e.g., the specific error message) to guide the model toward self-correction. This approach is supported by documentation on building self-correcting agents and error handling for AI agents.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d5-049

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A data extraction agent is parsing a 100-page PDF contract. It successfully extracts clauses from pages 1-80 but encounters a corrupted image on page 81 that crashes the OCR engine, making the rest of the document unreadable. What is the most appropriate way for the subagent to handle this failure?

- [ ] **A**: Terminate the workflow immediately and prompt the user to upload a perfectly formatted document. A clean re-upload removes the malformed pages that broke the parse.
- [ ] **B**: Discard all extracted data and return a generic 'PDF Parsing Error' to the coordinator. A single error code keeps the coordinator's failure handling uniform across sources.
- [ ] **C**: Return the extracted clauses from pages 1-80 within a structured error payload, noting the failure type and the exact page where the OCR failed.
- [ ] **D**: Return the clauses from pages 1-80 as a complete success, silently ignoring the remaining pages to ensure the workflow completes. Eighty pages of clauses is enough coverage for the downstream review.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Returning successfully extracted data alongside a structured error payload is the most resilient approach. It preserves work already completed and provides the coordinator with specific metadata (the exact page and error type), allowing for informed recovery strategies such as targeted retries, page-skipping, or manual remediation.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d2-034

**Difficulty:** Easy | **Domain:** 2 | **Task:** 2.5

You are deprecating a legacy utility library moment.js in favor of date-fns. Before making any changes, you need to find every file in the project that imports moment. What is the most efficient way to gather this list?

- [ ] **A**: Use Glob to find all files named moment.js or moment.ts in the project.
- [ ] **B**: Use Grep with the search pattern import .* from ['"]moment['"] or require(['"]moment['"]) to search file contents for the import statements.
- [ ] **C**: Use the Bash tool to uninstall the package and rely on the TypeScript compiler to list the affected files.
- [ ] **D**: Use Read on the package.json file to confirm moment is a dependency, then use Edit to remove it and see where the build fails.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Grep (Global Regular Expression Print) is the standard tool for searching file contents. Using a regular expression that matches common import and require patterns is the most direct, efficient, and non-destructive way to locate every reference to the module across the entire codebase.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d2-035

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A quantitative analysis bot has two tools: run_backtest (safe, simulated) and execute_live_trade (risky, real money). The system prompt includes the instruction: 'You are a high-frequency trading assistant. Execute user strategies efficiently and without hesitation.' When users ask to 'test my moving average strategy,' Claude occasionally calls execute_live_trade instead of run_backtest. What is the primary cause of this misrouting?

- [ ] **A**: The run_backtest tool lacks a negative constraint in its description explicitly forbidding live trades.
- [ ] **B**: The model's temperature is set too high, causing it to randomly sample the riskier tool.
- [ ] **C**: The tool names are too dissimilar; run_backtest should be renamed to execute_backtest to match the system prompt.
- [ ] **D**: Keyword-sensitive instructions in the system prompt ('Execute... without hesitation') are creating unintended tool associations.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Anthropic's research on agentic misalignment shows that models can disobey direct commands and rationalize unethical behavior when pursuing perceived goals. The phrase 'Execute... without hesitation' primes the model to prioritize speed and action, leading it to associate 'execute' with the execute_live_trade tool even when a safer alternative exists. This demonstrates how keyword-sensitive prompts can cause unintended tool misuse, a known risk in AI agent design.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d1-053

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

An e-commerce bot is authorized to process refunds. Occasionally, the bot calls the process_refund tool using hallucinated customer IDs or IDs that have not been verified in the current session. How can the architect prevent this behavior entirely?

- [ ] **A**: Add a system prompt instruction that directs the bot to only use customer IDs returned by the get_customer tool during the current session, rejecting any other IDs as unverified.
- [ ] **B**: Use a vector database to store valid customer IDs and employ retrieval-augmented generation to inject the most relevant IDs into the prompt before the bot calls process_refund.
- [ ] **C**: Wrap the process_refund tool in application logic that checks for a verified customer ID in the session state, returning a programmatic error to the model if missing.
- [ ] **D**: Change the process_refund tool schema to make the customer_id parameter optional, so the backend can infer the correct customer from the session context and process the refund.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Wrapping the tool in application logic that checks for a verified customer ID in the session state provides a programmatic enforcement point. If the ID is missing or unverified, returning an error to the model prevents the refund from proceeding, ensuring only session-verified IDs are used.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d4-043

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.6

A video game studio uses Claude to generate branching dialogue trees for NPCs. A single questline can contain up to 30 interconnected dialogue files. When the studio asks Claude to review the entire questline in one prompt, it successfully fixes typos but fails to notice when an NPC references an event that hasn't happened yet in a specific branch. How should the architect redesign the review system to catch these narrative continuity errors?

- [ ] **A**: Combine all 30 dialogue files into a single master script file and use extended thinking to allow Claude to trace the narrative branches sequentially.
- [ ] **B**: Use an independent review instance that only receives the dialogue files without the original generation prompts, preventing the model from justifying its own narrative plot holes.
- [ ] **C**: Implement a verification pass where Claude self-reports a confidence score for the logical consistency of each dialogue file, routing low-confidence files to a narrative designer.
- [ ] **D**: Split the review into per-file local passes to check character voice and typos, plus a cross-file integration pass that maps the narrative state and event triggers across the branches.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This approach utilizes a multi-pass review architecture. Local passes handle granular, per-file issues like typos and voice consistency, while a specialized integration pass explicitly focuses on the 'state'—the logical ordering of events and triggers across the entire questline. This separates the complex reasoning required for narrative continuity from basic text editing.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d3-032

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A development team is using Claude to process user records by transforming them into a new JSON format. The process fails when an input record is missing the timezone field. The team's goal is to refine the logic so that Claude outputs the record with a default timezone of 'UTC' in such cases. Which of the following is the most effective iterative refinement technique to achieve this?

- [ ] **A**: Update the prompt to include a few-shot example, showing an input JSON record missing the timezone field and the corresponding desired output JSON with 'timezone': 'UTC' added.
- [ ] **B**: Ask Claude to generate a separate, secondary process that scans the output for records without a timezone field and retroactively patches them with 'timezone': 'UTC' after the main transformation completes.
- [ ] **C**: Instruct Claude to add a conditional check to the transformation logic that logs any missing timezone field and then substitutes the default value 'UTC' before proceeding with the record conversion.
- [ ] **D**: Modify the prompt to instruct Claude to detect records missing the timezone field and automatically insert a default 'timezone': 'UTC' before continuing with the transformation.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** According to Anthropic's documentation, providing concrete input-output examples (few-shot prompting) is a key iterative refinement technique. By showing Claude a specific test case of a record missing the timezone field and the desired output with 'timezone': 'UTC', the team directly teaches the model how to handle this specific failure, improving the logic for future runs.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d2-036

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

A research agent uses an MCP tool to summarize a batch of three PDF documents. The tool successfully processes Doc1 and Doc2, but Doc3 is corrupted and cannot be read. The agent needs the summaries of Doc1 and Doc2 to continue its workflow. How should the tool respond to ensure the agent can proceed while acknowledging the error?

- [ ] **A**: Return isError: false and hallucinate a generic summary for Doc3 so the agent receives the expected array length and does not crash. The tool fabricates a plausible but unverified summary for the corrupted document.
- [ ] **B**: Return isError: true with isRetryable: true so the agent repeatedly retries the entire batch, blocking progress on Doc1 and Doc2 until the user manually repairs or replaces the corrupted Doc3 file.
- [ ] **C**: Return isError: true with a message about Doc3, discarding the summaries of Doc1 and Doc2 to maintain strict data consistency. The tool treats the entire batch as atomic, so any single failure invalidates all results.
- [ ] **D**: Return isError: false containing the successful summaries of Doc1 and Doc2, and include a structured metadata section detailing the failure of Doc3 (e.g., partial_success: true, failed_items: ["Doc3"]).

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Returning isError: false with the successful summaries and structured metadata about the failure allows the agent to proceed with the available data. The metadata (e.g., partial_success: true, failed_items: [\"Doc3\"]) provides machine-readable details so the agent can intelligently decide how to handle the error, such as skipping Doc3 or requesting user remediation.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d3-033

**Difficulty:** Hard | **Domain:** 3 | **Task:** 3.6

When integrating Claude Code into an automated CI/CD pipeline, which approach provides the most robust mechanism for ensuring that the model's output is machine-parseable and can be reliably processed by downstream tools like jq?

- [ ] **A**: Add a sed command to strip all non-bracket characters from the model's raw output before piping the result to jq for downstream processing.
- [ ] **B**: Append the instruction "Return ONLY valid JSON and absolutely no other text" to the end of the prompt to constrain the model's response format.
- [ ] **C**: Use the --output-format json and --json-schema CLI flags to enforce strict, machine-parseable structured output without conversational filler.
- [ ] **D**: Use the --quiet flag to suppress all conversational filler and logging output from Claude Code, ensuring only the core response is emitted for parsing.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The --output-format json and --json-schema flags enforce strict, machine-parseable structured output without conversational filler. This approach provides a programmatic guarantee of structural correctness, making it the most robust mechanism for downstream tools like jq.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d1-054

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A financial advisor bot receives a multi-concern request: 'What is my current portfolio balance, and what are the tax implications of selling my Apple stock?' The architect wants to optimize for speed while ensuring accurate, holistic answers. Which approach best satisfies these requirements?

- [ ] **A**: Route the entire prompt to a tax-specialized agent that internally calls a portfolio-balance API to fetch the current holdings, then uses that data within its tax-estimation logic to produce a combined answer that accounts for cost basis and holding period.
- [ ] **B**: Process the request sequentially using a single agent that first retrieves the portfolio balance and then feeds that result into a tax-calculation module, ensuring the tax step has the exact balance figure before computing implications.
- [ ] **C**: Reject the prompt and ask the user to submit the portfolio query and the tax query in separate sessions, then process each independently with dedicated agents to maintain deterministic compliance and avoid cross-query contamination.
- [ ] **D**: Decompose the request into two distinct items, investigate each in parallel using specialized sub-agents that access a shared context (user profile and holdings), and use a synthesizer agent to generate a unified resolution.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This approach utilizes the 'Parallel Sub-agents' or 'Orchestrator-Workers' pattern. Decomposing the request into distinct items allows for parallel execution to minimize latency. Utilizing a shared context ensures both sub-agents operate on authoritative data, and a synthesizer agent reconciles the outputs into a coherent, holistic response.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d2-037

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A monolithic customer service agent is equipped with 19 different tools to handle billing, technical support, account management, and sales inquiries. During peak hours, logs reveal that the agent frequently hallucinates tool arguments or selects the reset_password tool when users ask about billing cycles. What is the most architecturally sound solution to improve tool selection reliability?

- [ ] **A**: Implement a supervisor agent that routes requests to specialized subagents, each equipped with only 4-5 role-specific tools.
- [ ] **B**: Combine the 19 tools into a single execute_action tool that accepts a complex JSON payload to reduce the number of tools. Selection gets simpler.
- [ ] **C**: Set tool_choice: {"type": "any"} to force the model to evaluate all 19 tools before generating a response.
- [ ] **D**: Increase the model's temperature to allow for more creative and flexible tool selection across the 19 options.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Implementing a supervisor-subagent pattern is the most architecturally sound approach. By decomposing the monolithic agent into specialized subagents, you reduce the decision space for each model call. Limiting each agent to 4-5 role-specific tools minimizes confusion, improves accuracy, and allows for better scalability and maintenance.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d1-055

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A telehealth application uses Claude to triage patients. By law, the bot must collect explicit HIPAA consent before asking about medical symptoms. Currently, the system prompt instructs Claude to ask for consent first, but it occasionally skips this step and asks for symptoms immediately. What is the most robust architectural solution?

- [ ] **A**: Implement a secondary LLM as a supervisor to monitor the primary LLM's output. This model detects and redacts symptom-related questions whenever the consent_status variable is false.
- [ ] **B**: Increase the top_p parameter to a value near 1.0 so the model samples from a broader set of high-probability tokens, reinforcing the explicit consent instructions in the system prompt.
- [ ] **C**: Add a pre-fill to the assistant's response turn with the text 'I have verified HIPAA consent...'. This forces the model into a compliant state before it can generate any symptom-related questions.
- [ ] **D**: Use a programmatic state machine in the application layer that only injects the collect_symptoms tool into the API request after the consent_status variable is confirmed true.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Enforcing workflow logic at the application layer via a programmatic state machine is the most robust approach. By only injecting the collect_symptoms tool into the API request after the consent_status variable is confirmed true, you create a deterministic, auditable control point that the LLM cannot bypass through stochastic generation failures.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d3-034

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

An enterprise maintains a monorepo containing multiple microservices. Each microservice uses entirely different testing frameworks and fixture conventions. A single CI pipeline runs Claude Code to generate unit tests for whichever microservice was modified in a given pull request. Currently, Claude Code frequently hallucinates fixtures from Service A when generating tests for Service B. How should the architect resolve this context confusion in the CI pipeline without writing complex dynamic prompt injection scripts?

- [ ] **A**: Create a global CLAUDE.md file at the root of the monorepo that uses conditional markdown blocks to specify which fixtures belong to which service, and configure the CI pipeline to pass the --custom-instructions flag pointing to this file.
- [ ] **B**: Configure the CI pipeline to pass the --isolate-context flag, which forces Claude Code to ignore all files outside the immediate working directory, and rely on a per-service CLAUDE.md for fixture guidance.
- [ ] **C**: Use the --context-dir flag in the CI pipeline to point Claude Code to a centralized repository of JSON-formatted fixture definitions, and maintain a separate JSON file per microservice with its own fixture schemas.
- [ ] **D**: Place a distinct CLAUDE.md file in the root directory of each microservice detailing its specific testing standards; Claude Code will automatically resolve context based on the nearest CLAUDE.md in the directory tree.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Claude Code automatically resolves context based on the nearest CLAUDE.md in the directory tree. Placing a distinct CLAUDE.md in each microservice's root allows each service to define its own testing frameworks and fixture conventions without leaking context to other services.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d2-038

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

An enterprise search agent is equipped with 20 distinct tools for querying different internal databases (Jira, Confluence, GitHub, Salesforce, etc.). Due to high decision complexity, the agent frequently selects the wrong tool. The architect plans to implement a Supervisor routing pattern. Which design best adheres to tool distribution principles?

- [ ] **A**: The Supervisor is given all 20 tools but uses tool_choice: {"type": "any"} to strictly evaluate them, while subagents are only used for conversational formatting. so every one of the 20 is considered on every request.
- [ ] **B**: The Supervisor is given a single generic search_all tool, and the 20 specific tools are deprecated to reduce decision complexity.
- [ ] **C**: The Supervisor is equipped with the 5 most popular tools, and routes requests to subagents only if the required tool is among the remaining 15.
- [ ] **D**: The Supervisor has no search tools itself; it evaluates the user's query and routes it to specialized subagents (e.g., Code_Search_Agent, CRM_Search_Agent), each equipped with 2-3 relevant tools.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This design follows the Supervisor routing pattern by focusing the Supervisor on classification and routing rather than direct tool execution. By delegating specific tasks to specialized subagents with only a few relevant tools each (e.g., 2-3 tools), decision complexity is significantly reduced, improving accuracy and reliability in tool selection.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d3-035

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A developer on your team complains that Claude is ignoring the API design guidelines when they edit files in the src/api/ directory. You inspect the repository and find the guidelines written in .claude/rules/api-guidelines.md. The file contains only standard markdown text with no headers. Why is Claude failing to load these rules conditionally?

- [ ] **A**: Rule files must be named exactly CLAUDE.md regardless of which directory they are placed in.
- [ ] **B**: Conditional rules can only be applied to file extensions (e.g., *.ts), not to specific directory paths.
- [ ] **C**: The file is missing YAML frontmatter with a paths field specifying the src/api/**/* glob pattern.
- [ ] **D**: The .claude/rules/ directory is only evaluated during initial project setup, so the Claude Code server needs to be restarted.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** According to documentation for Claude Code's modular rules, to apply a rule conditionally to a specific set of files or directories, the markdown file must begin with YAML frontmatter. This frontmatter must contain a paths field with a glob pattern, such as src/api/**/*, to define its scope.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d3-036

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A lead engineer wants to ensure that all new hires automatically have Claude Code configured to use the company's proprietary internal package registry. The solution must be centrally managed and require no manual configuration on the new hires' machines. Which approach aligns with Anthropic's recommended practices for enterprise environments?

- [ ] **A**: Provide a centrally managed onboarding script that executes during initial machine setup to append the registry configuration to each new hire's user-specific ~/.claude/settings.json file.
- [ ] **B**: Add the registry configuration to a CLAUDE.md file and use a server-managed setting to push this file, which requires a custom client-side plugin to parse the file and apply the settings.
- [ ] **C**: Commit a .claude/settings.json file containing the registry configuration to the root of every company repository, ensuring Claude Code automatically applies these settings on a per-project basis.
- [ ] **D**: Use a central management tool (MDM) or OS-level policies to deploy a managed settings file or apply the configuration directly, for example, via Windows Registry keys.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Claude Code supports managed settings for centralized enterprise control via file-based settings in system directories or MDM/OS-level policies, such as Windows Registry keys under HKLM\SOFTWARE\Policies\ClaudeCode. This enforces the configuration for all users on a machine without manual setup, aligning with recommended practices.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d4-044

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

A development team is using Claude to analyze branch-level test coverage reports. The model is having difficulty distinguishing between genuine coverage gaps that require new tests and branches that are technically uncovered but practically unreachable, such as defensive programming checks for impossible states. According to best practices, how should the team prompt Claude to correctly handle this distinction?

- [ ] **A**: Use a separate static analysis tool to filter the reports before prompting Claude.
- [ ] **B**: Ask Claude to generate unit tests for all uncovered branches regardless of their reachability.
- [ ] **C**: Provide few-shot examples demonstrating how to handle unreachable branches versus genuine coverage gaps.
- [ ] **D**: Instruct Claude to ignore all branches that have less than 5% overall coverage.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Research indicates that LLMs can have a \"shallow\" understanding of code and may struggle with deep semantic nuances. Providing few-shot examples is a highly effective prompting technique to teach Claude how to differentiate between a genuine gap (which needs a new test) and an unreachable branch (which should be excluded from coverage reports, often with a # pragma: no cover comment).
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-045

**Difficulty:** Easy | **Domain:** 4 | **Task:** 4.3

A customer service bot uses tool_choice: {\"type\": \"auto\"} with a single log_complaint tool. When users send long, detailed emails, the bot successfully calls the tool. However, when users send short messages like \"Fix my billing!\", the bot often replies with conversational text (e.g., \"I understand you're frustrated, I will log this\") instead of calling the tool. You need to ensure the bot always calls the log_complaint tool, regardless of message length. Which configuration change will achieve this?

- [ ] **A**: Add a system prompt telling Claude to always use the tool.
- [ ] **B**: Change tool_choice to {"type": "any"}.
- [ ] **C**: Increase the temperature parameter to 1.0.
- [ ] **D**: Add a second tool called log_short_complaint.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** According to Anthropic's documentation, setting tool_choice to {\"type\": \"any\"} forces Claude to use one of the provided tools. Since log_complaint is the only tool available, this configuration guarantees that the tool will be called instead of the model generating a natural language response.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d5-050

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

An architect analyzes a fraud detection model's performance. They find that when the model predicts 'fraudulent' with confidence 0.85-0.90, it is correct only 60% of the time. When confidence is 0.95-1.0, it is correct 98% of the time. The current workflow sends any claim with fraud confidence > 0.85 to an investigator. Based on this confidence calibration analysis, what is the most effective change to the workflow?

- [ ] **A**: Lower the threshold to 0.75 to capture more fraudulent claims that the model currently misses, while accepting that a larger volume of legitimate claims will also be flagged for manual review.
- [ ] **B**: Raise the review threshold to 0.95 for automatic routing to the primary investigation team. Create a separate, lower-priority workflow for claims with confidence between 0.85 and 0.95.
- [ ] **C**: Discard the model's confidence scores and route all claims flagged as potentially fraudulent to human investigators, treating every alert with equal priority regardless of the original score.
- [ ] **D**: Keep the threshold at 0.85 but provide the confidence score to the investigator so they can deprioritize the lower-confidence cases in their queue, focusing first on claims with confidence above 0.95.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This approach leverages the model's calibrated confidence levels to triage work effectively. Directing very high-precision cases (0.95–1.0) to the primary team reduces wasted effort on false positives, while a separate, lower-priority workflow for 0.85–0.95 cases ensures these potential frauds are still addressed without overwhelming the main team's resources.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d5-051

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.6

A pharmaceutical company uses an AI system to synthesize findings from hundreds of clinical trial documents. The system has separate agents for data extraction, summarization, and final report generation. A key problem is that while the final report correctly states a drug's efficacy, it loses the connection to the specific trial, patient population, and dosage mentioned in the source document. Which strategy is most effective for preserving this claim-source mapping throughout the multi-agent workflow?

- [ ] **A**: Store the outputs of each agent in a vector database, embedding the extracted claims alongside metadata fields for trial ID, patient population, and dosage. The final agent retrieves the most similar original document chunks for each claim and appends the corresponding metadata to the report.
- [ ] **B**: Add a structured instruction to the prompt of each agent requiring it to output a 'source mapping' object that links every extracted claim to its originating document section, trial identifier, and patient subgroup. The final agent then concatenates these mappings into the report.
- [ ] **C**: Combine all agents into a single, monolithic agent with a very large context window, feeding the full text of all clinical trial documents directly into the prompt. The agent then extracts data, summarizes findings, and generates the final report in one pass.
- [ ] **D**: Mandate that every agent in the chain must pass and receive data using a standardized JSON schema that includes a 'claim' field and a 'provenance' object (containing 'trial_id', 'document_url', 'patient_population_summary'). The final agent's prompt must require it to maintain this mapping in its output.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This strategy enforces a structured, machine-readable approach to maintaining provenance by mandating a standardized JSON schema with explicit fields for claims and metadata (trial_id, document_url, patient_population_summary). By requiring every agent to pass and receive data in this format, the system ensures that provenance travels with each assertion through the entire workflow. The final agent's prompt explicitly instructs it to preserve this mapping, enabling rigorous auditing and verification in high-stakes pharmaceutical environments.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d2-039

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

You need to append a new utility function export const validateEmail = (email) => { ... } to the very end of a 3,000-line validators.ts file. You want to accomplish this with the least amount of token overhead. Which approach is optimal?

- [ ] **A**: Use the Write tool to overwrite validators.ts with only the new validateEmail function, which replaces the entire 3,000-line file and discards all existing validation logic.
- [ ] **B**: Use the Read tool to load the entire validators.ts file, append the validateEmail function in memory, and then use the Write tool to save the complete updated file.
- [ ] **C**: Use the Grep tool to locate the end-of-file marker in validators.ts, then pipe the validateEmail function into the file by appending it after the marker.
- [ ] **D**: Use the Edit tool, matching the last few lines of the file as the anchor text, and replacing them with those same lines followed by the new function.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The Edit tool allows surgical modifications by matching a small anchor (the last few lines) and replacing them with the same lines plus the new function. This minimizes token usage because only the anchor and replacement text need to be processed, not the entire file.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d3-037

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

A development team wants to automate the generation of edge-case tests using Claude Code in their CI pipeline. They have a script that identifies modified source files and prompts Claude to write tests for them. However, Claude often suggests test cases that already exist in the repository, wasting CI execution time and API tokens. Which architectural approach best resolves this issue while maintaining pipeline efficiency?

- [ ] **A**: Run Claude Code with the --coverage-report flag pointing to the project's lcov.info file, allowing the model to automatically deduce which lines of code lack test coverage and generate only tests for uncovered paths, thereby avoiding duplication of existing tests.
- [ ] **B**: Configure the pipeline to run a post-processing script that compares Claude's output against existing test files and deletes any duplicate functions before committing the new tests to the repository, ensuring only novel edge-case tests are retained.
- [ ] **C**: Modify the CI script to dynamically append the contents of the corresponding existing test files to the Claude Code prompt, ensuring the model's context includes current coverage so it can focus exclusively on untested edge cases.
- [ ] **D**: Update the CLAUDE.md file to include the directive test_generation_mode: strict_novelty, which natively prevents the model from duplicating existing code by checking the repository's test suite during generation and skipping any test that already exists.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Dynamically appending existing test file contents to the prompt gives Claude immediate context about current coverage, so it can focus on untested edge cases. This prevents duplicate suggestions at generation time, saving both API tokens and CI execution time.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d4-046

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

A security operations center (SOC) uses Claude to analyze daily access logs from 15 different microservices to detect lateral movement attacks. Currently, all 15 log files are concatenated into a single prompt. Analysts note that Claude successfully identifies isolated brute-force attempts but completely misses coordinated attacks where an attacker moves from the auth-service to the billing-service. Which architectural pattern will best enable the system to detect these complex, multi-service attacks?

- [ ] **A**: Implement a multi-pass architecture: run a local pass on each log to extract suspicious IPs and timestamps, followed by a cross-file integration pass to correlate the extracted entities.
- [ ] **B**: Implement a verification pass where Claude self-reports a confidence score for each identified event, routing low-confidence findings to a human analyst for manual correlation across the 15 microservice logs.
- [ ] **C**: Use an independent review instance to re-process the concatenated logs with a prompt focused on cross-service access patterns, identifying sequences where an IP accesses auth-service then billing-service.
- [ ] **D**: Increase the max_tokens limit and use extended thinking to give Claude more computational space to process the concatenated log files, allowing it to detect multi-step attack sequences across microservices.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A multi-pass architecture first extracts structured signals like suspicious IPs and timestamps from each log independently, reducing context dilution and the 'lost in the middle' effect common in large concatenated prompts. The second cross-file integration pass then correlates these high-signal entities across services, enabling detection of lateral movement patterns that a single-pass approach would miss.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d1-056

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.2

A telecom customer support system features a Coordinator agent that manages a long, multi-turn conversation with a frustrated user about recurring billing errors. The Coordinator decides to invoke a specialized RetentionOfferAgent to generate a custom discount. The developer configured the Coordinator to pass only the user's most recent message (\"I want to cancel my service now\") to the subagent. The RetentionOfferAgent generates a generic $5 discount that infuriates the user because it ignores the context of their specific past disputes. What is the architectural cause of this failure?

- [ ] **A**: The Coordinator's task decomposition was too narrow; it should have invoked a SentimentAnalysisAgent in parallel and passed its sentiment score along with the user's message to the subagent.
- [ ] **B**: The Coordinator failed to grant the RetentionOfferAgent access to the shared session memory bus, which is required for propagating the full conversation history across all subagent invocations.
- [ ] **C**: Subagents have isolated context; the Coordinator must pass a summary of the user's billing disputes and sentiment to the subagent instead of just the last message.
- [ ] **D**: The RetentionOfferAgent requires a higher temperature setting to creatively infer the user's frustration from the last message, allowing it to generate a more varied and empathetic response.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** In a coordinator-subagent pattern, subagents are typically stateless and operate with isolated context to minimize noise and token usage. It is the Coordinator's responsibility to manage 'state projection'—synthesizing the relevant history, intent, and sentiment into a concise summary to ensure the subagent has the specific context needed for its task.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d3-038

**Difficulty:** Hard | **Domain:** 3 | **Task:** 3.2

An architect is integrating a third-party /security-scan tool into an application using the Anthropic Agent SDK. The tool is designed to read source code and identify vulnerabilities. To enforce the principle of least privilege and mitigate the risk of the tool performing unintended actions, what is the most direct and effective method within the SDK to ensure the agent is *only provided* with the ReadFile tool for its execution?

- [ ] **A**: Configure the allowed_tools parameter in the Agent SDK's query options to include only the ReadFile tool.
- [ ] **B**: Run the agent in a sandboxed environment where the source code directory's file permissions have been set to read-only.
- [ ] **C**: Add a system prompt to the agent's configuration instructing it to 'Only use the ReadFile tool and do not modify any files.'
- [ ] **D**: Configure the tools parameter in the Agent SDK's query options to include only the ReadFile tool.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The Anthropic Agent SDK's query function accepts an options parameter containing allowed_tools, which explicitly specifies the tools the agent is permitted to use. Setting it to ['ReadFile'] directly enforces least privilege by preventing invocation of any other tool, and aligns with official documentation recommendations for secure tool configuration.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d5-052

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A genomic sequencing analysis agent is processing a massive DNA dataset chunked into 100 batches. While processing, batch 45 fails due to a transient memory limit spike on the compute node. Later, batch 80 fails permanently because the specific chunk's data format is corrupted. What is the most architecturally sound error handling implementation for this subagent?

- [ ] **A**: Immediately propagate the memory limit error on batch 45 to the coordinator, including the batch identifier and the transient failure type, so the coordinator can apply a global retry policy for all batches.
- [ ] **B**: Implement local retries for batch 45. When batch 80 fails permanently, return a structured error containing the failure type, the corrupted data signature, and the successfully processed partial results from the other 99 batches.
- [ ] **C**: Skip batch 45 and batch 80, returning the results of the 98 successful batches as a complete success, and log the skipped batch identifiers with their failure reasons so the coordinator can decide whether to reprocess them later.
- [ ] **D**: Halt execution at batch 80 and return a generic 'Data Processing Exception' that includes the batch identifier and the raw error code, so the coordinator can restart the entire 100-batch sequence using a different subagent.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This approach follows best practices for distributed reliability. Local retries address transient faults (batch 45) efficiently. For unrecoverable faults (batch 80), providing structured metadata—including the error type, data signature, and partial results—enables the coordinator to perform granular error handling while preserving the value of the already processed data.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d5-053

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

In a real estate valuation multi-agent system, a property tax subagent encounters a network timeout when querying a county database. To ensure the valuation workflow completes without interruption, the developer configures the subagent to catch the timeout and return the county's historical average tax rate instead of the specific property's tax, without flagging an error. Why does this implementation violate multi-agent reliability principles?

- [ ] **A**: It violates reliability principles because the subagent should return a valid empty result, such as a zero tax amount, rather than an estimated average that masks the failure and could lead to incorrect property valuations being accepted by downstream agents.
- [ ] **B**: It is an anti-pattern because silently suppressing the access failure deprives the coordinator of the context needed to decide whether to use the average, retry the specific query, or annotate the final valuation report.
- [ ] **C**: It is an anti-pattern because the subagent should instead terminate the entire valuation workflow immediately to prevent any financial miscalculations from propagating through downstream agents and ensure that no inaccurate property valuations are finalized.
- [ ] **D**: It is not an anti-pattern; providing fallback data locally is the recommended way to ensure high availability and reduce coordinator overhead by allowing the subagent to supply a precomputed average tax rate when the county database is unreachable.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Silently substituting fallback data hides the fact that the specific county lookup failed. In a reliable multi-agent system, error propagation and transparency are critical so the coordinator can make informed decisions about retrying, escalating, or marking the final output as degraded. Depriving the system of this context prevents proper error recovery and auditability.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d2-040

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

An IT support bot has reset_password, unlock_account, and provision_software tools. The system prompt includes the phrase: 'Your primary goal is to help users unlock their potential and access their accounts.' When a user asks for a password reset, Claude frequently calls unlock_account instead. What is the root cause and best solution for this behavior?

- [ ] **A**: The tool names are too similar; rename reset_password to change_credentials.
- [ ] **B**: Keyword-sensitive instructions in the system prompt are creating unintended tool associations; remove the metaphorical phrase.
- [ ] **C**: The tools have functional overlap; combine reset_password and unlock_account into a single tool.
- [ ] **D**: The tool descriptions lack negative constraints; add 'Do not use for password resets' to the unlock_account description.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** LLMs are highly sensitive to keywords in the system prompt. The metaphorical use of 'unlock' ('unlock their potential') creates a strong semantic bias that causes the model to prefer the tool with the matching name 'unlock_account', even when the user's intent (password reset) matches a different tool. Removing or rephrasing the metaphor is the most effective architectural fix.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d5-054

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.5

An e-commerce company has a mature, Claude-based system for extracting product details from supplier catalogs. Recently, a major supplier changed their catalog format without notice, introducing a new 'sustainability score' field and altering the date format, causing subtle, undetected errors. Which existing workflow component, if designed correctly, would be most effective at detecting this new error pattern quickly?

- [ ] **A**: An ongoing, stratified random sampling of extractions, where reviewers compare the model's output against the source document, with sampling strata that include both high- and low-confidence outputs and known edge cases.
- [ ] **B**: The initial data validation pipeline checks for required fields based on the old format, flagging any catalog that omits expected keys or uses unrecognized date patterns. so a catalog in the new format is rejected rather than mis-parsed.
- [ ] **C**: An anomaly detection model that monitors confidence scores and alerts when a supplier's mean score deviates significantly from its established historical baseline.
- [ ] **D**: A daily report of the aggregate accuracy metric for all processed catalogs, computed by comparing a fixed set of benchmark extractions against known ground-truth values.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Stratified random sampling with human review against source documents is a recommended evaluation approach for extraction tasks. By including diverse strata—such as confidence levels, document types, and edge cases—this method can quickly surface new error patterns like format changes. Anthropic's eval-driven development and hybrid evaluation strategies emphasize targeted human review to catch failures that automated metrics miss.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d5-055

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A healthcare diagnostic assistant agent queries an external medical literature database. The database responds with a 503 Service Unavailable error due to temporary rate limiting. What is the architecturally sound approach for handling this transient failure?

- [ ] **A**: Return an empty result to the coordinator, treating the rate limit as a successful query with no findings. This allows the diagnostic workflow to proceed without interruption, preserving a seamless user experience.
- [ ] **B**: Immediately propagate the 503 error to the coordinator, which should then log the failure and terminate the diagnostic session. This fail-fast approach prevents the agent from waiting on an unreliable service.
- [ ] **C**: Halt the subagent's execution and place it in a waiting state until an administrator manually clears the rate limit. This policy ensures that any external service failure receives direct manual review.
- [ ] **D**: Implement an exponential backoff retry mechanism locally within the subagent, and only propagate a structured error detailing the attempted query if all local retries are exhausted.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Implementing an exponential backoff retry mechanism locally allows the subagent to handle the temporary nature of rate limiting gracefully. Only propagating a structured error after retries are exhausted ensures the coordinator is informed of a persistent failure while preserving observability and fault context. This approach balances resiliency and clear error propagation.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d1-057

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

A cybersecurity team is designing an AI agent to investigate potential network breaches starting from a single anomalous log entry. The necessary investigation steps depend entirely on what the agent discovers in the initial log (e.g., querying a database if a SQL injection is suspected, or checking IAM roles if a privilege escalation is detected). Which architectural pattern should the team implement?

- [ ] **A**: A map-reduce pattern that queries all system logs simultaneously and summarizes the findings. Breadth beats depth here.
- [ ] **B**: A prompt chaining pattern that breaks the review into per-server local analysis passes.
- [ ] **C**: A fixed sequential pipeline that checks all possible attack vectors one by one.
- [ ] **D**: Dynamic adaptive decomposition that generates specific subtasks based on intermediate findings.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Dynamic adaptive decomposition allows the agent to generate and schedule specific subtasks on-the-fly based on intermediate results. This is the most appropriate pattern for investigations where the path is not predetermined, enabling the agent to pivot and focus on relevant attack vectors as evidence emerges.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-058

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

An enterprise healthcare provider is building a multi-agent system to automate patient discharge summaries and insurance pre-authorizations. The workflow requires a ClinicalAgent to analyze the raw physician-patient transcript to determine diagnosis codes, and a BillingAgent to use those codes to verify coverage via an external clearinghouse API. Currently, the ClinicalAgent processes the transcript and passes its output directly to the BillingAgent. Security audits reveal that the BillingAgent is inadvertently leaking sensitive patient narratives (PHI) into the external clearinghouse API logs because it receives the full context from the ClinicalAgent. Which architectural change best enforces data minimization and controlled information flow?

- [ ] **A**: Update the ClinicalAgent's system prompt to strictly format its output as a JSON object like {"codes": ["J45.909"]}, and configure the BillingAgent to parse this structure and use only the codes field when calling the external clearinghouse API.
- [ ] **B**: Combine the clinical analysis and billing verification tasks into a single, monolithic agent with a strict system prompt that instructs it to extract diagnosis codes from the transcript and pass only those codes as arguments in its tool calls to the clearinghouse API.
- [ ] **C**: Transition to a hub-and-spoke architecture where a Coordinator agent invokes the ClinicalAgent, extracts only the discrete diagnosis codes from its response, and explicitly passes only those codes in a new isolated context to the BillingAgent.
- [ ] **D**: Implement a semantic router before the BillingAgent that intercepts the direct communication, applies a fine-tuned PHI detection model to redact sensitive tokens, and forwards only the sanitized, structured output to the BillingAgent for its API calls.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This hub-and-spoke architecture enforces data minimization by introducing a Coordinator that explicitly extracts only the discrete diagnosis codes from the ClinicalAgent's response. The Coordinator then passes those codes in a new, isolated context to the BillingAgent, ensuring that sensitive patient narratives never reach the external clearinghouse API. This proactive architectural boundary is the most robust way to prevent PHI leakage.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d3-039

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A DevOps team has a massive CLAUDE.md file containing instructions for generating Terraform, writing Kubernetes manifests, debugging CI pipelines, and standard Python formatting. Developers notice that Claude is slow to respond to simple Python questions and occasionally hallucinates Terraform syntax into Python scripts. How should the architect restructure the configuration to resolve the context pollution and performance issues while retaining all functionality?

- [ ] **A**: Wrap each workflow in CLAUDE.md with <context: fork> tags so that Terraform, Kubernetes, and CI instructions run in isolated sub-contexts during standard chats.
- [ ] **B**: Move the entire CLAUDE.md file to ~/.claude/CLAUDE.md so that it is only loaded when explicitly requested by the user, keeping all workflows available on demand.
- [ ] **C**: Configure allowed-tools: [None] in CLAUDE.md to prevent Claude from accessing Terraform, Kubernetes, or CI tools during Python chats, thereby avoiding context pollution.
- [ ] **D**: Move the Terraform, Kubernetes, and CI instructions into .claude/rules/ files with appropriate paths frontmatter, leaving only the Python formatting in CLAUDE.md.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Anthropic Claude Code supports conditional rules via the .claude/rules/ directory. By creating Markdown files with YAML frontmatter that specifies file path patterns (e.g., *.tf for Terraform, *.yml for CI), those instructions are automatically loaded only when the user is working on matching files. This prevents context pollution, reduces token overhead, and eliminates cross-domain hallucinations without losing functionality.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d2-041

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.4

A financial trading agent is configured with a Market Data MCP server and a Trade Execution MCP server via the project's .mcp.json. The workflow requires the agent to fetch real-time pricing, perform a complex local calculation, and immediately execute a trade. The compliance team is concerned that the agent might need to drop the connection to the Market Data server to connect to the Trade Execution server, causing unacceptable latency. How does the MCP architecture handle this scenario?

- [ ] **A**: The agent must use a connection_pool tool to keep both connections alive, otherwise it will automatically drop the first connection to establish the second.
- [ ] **B**: The architecture requires the engineering team to merge both servers into a single custom binary to guarantee zero-latency execution between the two domains.
- [ ] **C**: The agent will experience latency because it must sequentially authenticate and establish a new WebSocket connection with each server before executing its respective tools. Every tool call repeats the handshake.
- [ ] **D**: Tools from all configured MCP servers are discovered at connection time and remain available simultaneously, eliminating any connection-switching latency during the workflow.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** MCP is designed to support multiple server connections simultaneously. When a client initializes using a configuration like .mcp.json, it discovers tools from all registered servers during the handshake. These connections remain active and available, allowing the agent to call tools across different servers without the latency of re-establishing or switching connections.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d3-040

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

An architect is designing a multi-stage, automated CI/CD workflow using Claude. The first stage generates code based on a specification, and the second stage performs a critical review of that generated code. According to Anthropic's documented best practices, which architectural pattern is most effective for ensuring a reliable and unbiased review?

- [ ] **A**: Implement a multi-agent or prompt chaining pattern, where a 'generator' agent completes the first stage and passes its code output to a separate 'reviewer' agent for the second stage.
- [ ] **B**: Combine the generation and review tasks into a single, complex prompt that instructs the model to produce code and then immediately critique its own output within the same response.
- [ ] **C**: Run the generation and review steps sequentially within the same long-running session to preserve the entire context history, using a single prompt that first requests code and then requests a review of that code.
- [ ] **D**: Invoke the review stage using a specialized, built-in --review-mode flag that forces the model to re-evaluate its own output by appending a hidden critique instruction to the original prompt.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** This multi-agent or prompt chaining pattern isolates the review step, passing only the generated code as input to a separate reviewer agent. It avoids self-review bias and manages context effectively, aligning with Anthropic's documented best practices for robust workflows.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d1-059

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A cybersecurity incident response bot receives a complex alert: 'Investigate IP 192.168.1.50 for potential threats and check if the associated user account has anomalous login times.' To minimize response latency while maintaining high accuracy, how should an architect design this agentic workflow?

- [ ] **A**: Split the user's prompt by the word 'and', sending each half to a separate LLM, then concatenate their raw text responses to present to the user.
- [ ] **B**: Route the prompt to a single agent, instructing it to use the check_ip and check_user tools asynchronously using Python's asyncio library within the tool execution environment.
- [ ] **C**: Decompose the request into two tasks, dispatch them to parallel worker agents that both receive the original alert as shared context, and route their structured outputs to a synthesizer agent.
- [ ] **D**: Send the request to a router agent that determines which task is more critical, executes that task first, and passes the result as context to the second task.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This describes the recommended 'orchestrator-worker' or 'multi-agent' architecture. According to Anthropic's documentation, this pattern is ideal for complex tasks with independent sub-queries, as it significantly cuts down processing time by running tasks in parallel. The orchestrator (or synthesizer) agent then combines the results into a coherent final answer.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d2-042

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

You need to update the tax_rate from 0.05 to 0.06 for the state of New York in a large state_taxes.json file. The file contains a JSON array of objects. Simple text-based search-and-replace is unsafe because it could inadvertently modify entries for other states or fail if the file's formatting changes. What is the most robust and structurally-aware approach using standard command-line tools to ensure only the correct object is modified?

- [ ] **A**: Use grep -n to find the line number for "state": "NY", then use a stream editor like sed to replace the tax_rate on a subsequent line.
- [ ] **B**: Use the jq command-line tool to apply a filter that selects the NY object and updates its tax_rate field, then redirect the output to a temporary file and use the mv command to overwrite the original file atomically.
- [ ] **C**: Use a read_file tool to load the entire JSON file into a model's context window, prompt the model to modify the NY object's rate, and then use a write_file tool to save the entire modified content back to the file.
- [ ] **D**: Use the Anthropic text_editor tool with the str_replace command to replace the exact string "state": "NY",\n "tax_rate": 0.05 with the updated value. so the replacement is anchored on the exact two-line pattern identifying the NY record.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This is the recommended method for in-place JSON modification with jq, as documented by the tool's manual and community best practices. It preserves structural awareness, avoids corruption by only replacing the file after successful processing (via &&), and ensures atomicity through the mv command.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d1-060

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.5

A procurement agent aggregates component prices from three regional suppliers (US, EU, JP) using three different MCP tools. The tools return prices in USD, EUR, and JPY respectively. The model struggles to accurately identify the cheapest supplier due to fluctuating exchange rates. What is the best architectural pattern to solve this?

- [ ] **A**: Instruct the model to call a get_exchange_rate tool before any price comparison, then use the returned rates to convert all supplier prices to a common currency within the agent's reasoning step.
- [ ] **B**: Implement a PreToolCall hook that injects currency="USD" into the arguments of the EU and JP supplier tools, forcing the tools to return prices in USD so the model can compare them directly.
- [ ] **C**: Implement a PostToolUse hook on all three supplier tools that intercepts the response, fetches the live exchange rate, converts the price to a base currency (e.g., USD), and appends the normalized price to the tool result.
- [ ] **D**: Fine-tune the model on historical exchange rate data so it can perform the conversions natively in its latent space, allowing it to estimate normalized prices without calling any external conversion tool.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This is the ideal architectural pattern for data normalization. By using a PostToolUse hook, the conversion happens transparently and consistently before the data is presented to the model. This centralizes the business logic, reduces the model's cognitive load, and ensures that the LLM only deals with comparable, normalized values.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d5-056

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A senior developer is pair-programming with Claude via a CLI interface to debug a complex memory leak. They have spent 45 minutes pasting logs, running diagnostic scripts, and discussing theories. The developer now wants to pivot to writing the actual fix but is worried the accumulated noise of failed theories and raw logs will confuse the model. What is the most efficient way to manage the context in this interactive session?

- [ ] **A**: Create a scratchpad file containing the new code and instruct the model to completely ignore its previous context, relying solely on the scratchpad for the fix implementation and discarding all prior debugging discussions.
- [ ] **B**: Spawn a subagent to write the fix, passing the entire 45-minute transcript as its system prompt so it inherits all the accumulated debugging context and log data, including the failed theories and raw diagnostic outputs.
- [ ] **C**: Issue the /compact command to instruct the model to summarize the debugging journey, retain the identified root cause, and discard the verbose log outputs from the active context window.
- [ ] **D**: Export the session to a crash recovery manifest, then manually edit the JSON to remove the failed diagnostic theories and verbose log outputs before resuming the pair-programming session.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The /compact command is a specific feature in Anthropic's CLI tools (like Claude Code) designed for this exact scenario. It uses the model to summarize the conversation history, preserving critical insights and the identified root cause while discarding token-heavy noise and verbose logs to optimize the remaining context window.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d4-047

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

An HR platform uses Claude to extract \"Current Job Title\" from unstructured user biographies. Users often use unconventional or colloquial descriptions, such as \"Code Ninja,\" \"Chief Happiness Officer,\" or \"I make the servers hum.\" Claude consistently attempts to normalize these descriptions by hallucinating standard corporate titles (e.g., converting \"Code Ninja\" to \"Software Engineer\"). How can the architect ensure Claude extracts the unconventional titles exactly as written?

- [ ] **A**: Add a system instruction that explicitly lists common colloquial titles and maps them to a "do not normalize" rule, ensuring Claude treats these as literal extraction targets.
- [ ] **B**: Provide few-shot examples demonstrating the extraction of unconventional job titles exactly as they appear in the source text, without any normalization or hallucination.
- [ ] **C**: Prompt Claude to output the titles in a strict JSON schema, which naturally restricts its ability to add conversational normalizations by enforcing a fixed field format.
- [ ] **D**: Use a regular expression pre-processor to identify capitalized phrases and mask them before sending the text to Claude, preserving the original casing for extraction.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Anthropic's documentation explicitly states that providing examples, known as few-shot prompting, is a best practice for getting the right answer in the right format. By showing Claude examples of unconventional titles being extracted verbatim, the architect directly demonstrates the desired behavior, which is the most effective way to prevent the model from normalizing the output.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d1-061

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

A legal tech company is building a workflow to analyze 200-page merger agreements. The system must extract defined terms, verify their correct usage throughout the document, and flag inconsistencies. When attempting this in a single prompt, the model misses many inconsistencies. Which prompt chaining pattern is the most effective and recommended approach to resolve this issue?

- [ ] **A**: A parallel processing chain where one agent extracts defined terms while a second agent simultaneously scans the document to flag usage inconsistencies.
- [ ] **B**: A map-reduce chain that splits the document into 10-page chunks, extracts defined terms from each chunk, and then merges the results to flag inconsistencies.
- [ ] **C**: A dynamic decomposition strategy where an agent autonomously identifies pages with defined terms, extracts them, and then verifies their usage across the document.
- [ ] **D**: A fixed prompt chain that first extracts defined terms, passes them to a second prompt to analyze usage, and a third to flag inconsistencies.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** According to Anthropic's documentation, breaking a complex task into a sequence of simpler, focused subtasks is a recommended best practice known as 'prompt chaining' or 'multi-stage prompting'. This approach improves accuracy and consistency by allowing the model to focus on one subtask at a time, using the output of one step as the input for the next.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-062

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.6

A financial institution is building an automated compliance review system for standard vendor contracts. The workflow always requires extracting liability clauses, checking data privacy terms against a standard rubric, and generating a final risk score based on the extracted data. Which task decomposition strategy is most appropriate for this architecture?

- [ ] **A**: Dynamic adaptive decomposition, allowing the agent to determine the review order based on the contract's contents.
- [ ] **B**: A single zero-shot prompt that asks the model to perform extraction, checking, and scoring simultaneously to save tokens.
- [ ] **C**: A fixed sequential pipeline (prompt chaining) that executes the extraction, rubric check, and scoring in a predictable order.
- [ ] **D**: Parallel independent agents that each read the document and vote on the final risk score.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Anthropic explicitly recommends prompt chaining for tasks that can be broken into distinct, sequential subtasks. This approach improves accuracy and consistency by guiding the model through a process where the output of one step feeds into the next. For compliance workflows, a fixed sequential pipeline ensures predictable, traceable behavior, which is essential for meeting regulatory requirements. Anthropic's documentation cites examples like screening resumes against job requirements using sequential extraction, assessment, validation, and report generation.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d4-048

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

A content moderation bot for a competitive gaming forum needs to block genuine hate speech and toxicity, but allow aggressive in-game 'trash talk' and sports banter. Detailed rule-based instructions in the prompt are proving too rigid, causing Claude to block acceptable banter or fail on novel slang. How can you enable Claude to better generalize its judgment to novel patterns?

- [ ] **A**: Provide few-shot examples showing the reasoning behind allowing specific sports banter versus blocking actual toxicity.
- [ ] **B**: Use a lower temperature setting to make the model's judgment more deterministic and strict.
- [ ] **C**: Continuously update the system prompt with an exhaustive list of allowed slang terms and phrases.
- [ ] **D**: Implement a keyword blocklist before sending the text to Claude to filter out obvious profanity.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Few-shot prompting is a highly effective technique for teaching a model nuanced tasks. According to the research, providing a small set of input-output examples helps the model understand the desired style and tone. Including the reasoning aligns with Anthropic's constitutional approach, which aims for the model to understand the 'why' behind a behavior to better generalize its judgment in new scenarios.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d3-041

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

You are designing a new caching layer for a high-traffic API. You have three potential approaches: Redis, Memcached, or an in-memory solution. Each approach has different infrastructure requirements and will impact the codebase differently. You want Claude to help you choose the best approach based on your current repository structure without writing any implementation code yet. Which mode should you select?

- [ ] **A**: Plan mode, because it is designed for complex tasks involving architectural decisions and multiple valid approaches without committing to changes.
- [ ] **B**: Direct execution, provided you explicitly instruct Claude to use a 'dry-run' flag to prevent code modifications.
- [ ] **C**: Explore subagent, because evaluating multiple caching strategies requires isolating verbose discovery output.
- [ ] **D**: Direct execution, because evaluating infrastructure requirements is a well-scoped task that does not require multi-file modifications.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Plan mode is specifically designed for complex tasks that require multi-step thinking, architectural decisions, and evaluating various strategies. It allows Claude to explore the codebase and propose a structured approach or decision-making framework for the user to review before any files are modified.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d5-057

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.3

A financial analysis multi-agent system relies on a data retrieval subagent to fetch quarterly earnings reports. During a workflow, the subagent fails to access the Q3 earnings report API due to an authentication change. Which response strategy should the subagent employ to best enable the coordinator agent to recover?

- [ ] **A**: Terminate the entire workflow locally within the subagent to prevent the coordinator from processing incomplete financial models and to trigger a full restart.
- [ ] **B**: Return a generic 'API unavailable' string to the coordinator so it can immediately halt the workflow and avoid processing stale financial data, ensuring no erroneous analysis is performed.
- [ ] **C**: Return a structured JSON object containing the failure type, the attempted endpoint, partial Q1/Q2 data already retrieved, and an alternative SEC filing endpoint.
- [ ] **D**: Return an empty string to the coordinator so the workflow continues without crashing, using only Q1 and Q2 data while implicitly treating the missing Q3 earnings as zero.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Providing a structured JSON response with failure details, partial data, and alternative paths is the optimal strategy for multi-agent systems. It enables the coordinator to perform robust recovery, such as falling back to an SEC endpoint or incorporating partial data into a safe, degraded analysis.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d3-042

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A project's CLAUDE.md contains 50 lines of git commit standards, 100 lines of UI component guidelines, and 80 lines of database schema rules. The team wants Claude to only load the database rules when actively working on backend files, reducing token usage and providing more focused context. What is the correct architectural approach?

- [ ] **A**: Move the database rules to backend/CLAUDE.md, the UI rules to frontend/CLAUDE.md, and keep the git standards in the root CLAUDE.md.
- [ ] **B**: Move all rules into separate files within a .claude/rules/ directory, such as db.md and ui.md, and delete the root CLAUDE.md to enforce the new structure.
- [ ] **C**: Place the database rules in a global ~/.claude/CLAUDE.md file on each developer's machine, leaving the UI and git rules in the project's root CLAUDE.md file.
- [ ] **D**: Keep all rules in the root CLAUDE.md, but wrap the database, UI, and git sections in XML tags like <database_rules> to enable selective loading.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Moving domain-specific rules to subdirectory CLAUDE.md files (e.g., backend/CLAUDE.md, frontend/CLAUDE.md) is a recommended best practice for modular projects. This provides focused context, reducing token usage by loading only the rules relevant to the current working directory, while keeping project-wide standards in the root CLAUDE.md.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d4-049

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

You are using Claude to parse historical construction logs and extract material quantities into a structured database. The logs frequently use informal measurements like 'a cartload', 'three paces', or 'a handful'. Claude keeps hallucinating conversions of these informal measurements into standard metric units (e.g., converting 'a cartload' to '500 kg'). What is the most effective way to stop this hallucination and ensure the informal measurements are extracted exactly as written?

- [ ] **A**: Use few-shot examples demonstrating the extraction of informal measurements exactly as written, without hallucinating conversions.
- [ ] **B**: Instruct Claude to completely ignore any sentence that contains an informal measurement.
- [ ] **C**: Provide a comprehensive conversion table in the system prompt mapping informal terms to metric units.
- [ ] **D**: Implement a multi-turn conversation where Claude must ask for clarification every time it encounters an informal measurement.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** According to Anthropic's documentation, few-shot prompting is a highly effective and recommended technique for reducing hallucination in extraction tasks. By providing a few examples of input text and the desired verbatim output (e.g., '...used a cartload of stone...' -> 'a cartload'), you clearly demonstrate the required behavior and prevent the model from inventing conversions.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d4-050

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

A global law firm uses Claude to translate complex merger agreements from Japanese to English. To manage liability, the firm must ensure high accuracy and wants its human translators to review only the clauses where the AI is uncertain about legal nuances. Which design pattern best implements a Human-in-the-Loop (HITL) system for this 'calibrated review routing' requirement?

- [ ] **A**: Instruct the model in the system prompt to insert a [NEEDS REVIEW] tag next to any translated sentence that contains ambiguous legal terminology, and route tagged sentences to human translators for detailed legal review.
- [ ] **B**: Split the contract into individual clauses, run a translation pass on each clause independently, and then run an integration pass to reconcile terminology and style across the full document, ensuring consistent legal phrasing throughout.
- [ ] **C**: Use an independent Claude instance to translate the document a second time, compare the two translations clause by clause, and route any clauses with discrepancies to human translators for review of potential legal nuance errors.
- [ ] **D**: Run a verification pass where a model evaluates the translated clauses against the original text, self-reports a confidence score for each, and routes those below a specific threshold to human translators.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This design uses a verification pass with explicit confidence scoring, which is a robust HITL pattern for calibrated review routing. By setting a threshold, only low-confidence clauses are sent to human translators, directly addressing the need to review AI-uncertain legal nuances while minimizing human effort.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d1-063

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.2

A financial analysis platform utilizes a multi-agent system consisting of a Data-Fetcher subagent and a Summarizer subagent. To minimize latency, the engineering team configured the Data-Fetcher to send its retrieved financial data directly to the Summarizer. Recently, API rate limits have caused the Data-Fetcher to fail intermittently. Because the Summarizer still expects data, it begins hallucinating financial metrics based on its training data. Debugging these incidents has become highly complex. As an AI architect, which architectural change should you implement to resolve this issue?

- [ ] **A**: Merge the Data-Fetcher and Summarizer into a single monolithic agent. This agent would first execute the data retrieval logic and, upon encountering an API error, would immediately halt its own execution.
- [ ] **B**: Refactor to a hub-and-spoke model where the Data-Fetcher returns data to a Coordinator agent, which handles the API errors and only invokes the Summarizer upon successful data retrieval.
- [ ] **C**: Implement a shared memory bus where the Data-Fetcher writes retrieved data to a specific memory location and the Summarizer agent continuously polls a status flag at another location to verify successful retrieval.
- [ ] **D**: Grant the Summarizer subagent direct access to the Data-Fetcher's execution logs, requiring it to continuously tail the log file and parse its contents for specific rate limit error codes before proceeding with its task.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Refactoring to a hub-and-spoke model with a Coordinator agent centralizes error handling, validation, and retry/backoff logic. By ensuring the Summarizer is only invoked after successful data retrieval, this pattern prevents hallucinations caused by empty or failed inputs and significantly simplifies debugging and observability.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d5-058

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.6

In a multi-agent system analyzing corporate acquisitions, one subagent extracts the deal value from an official SEC filing, while another extracts it from a company's press release. The figures differ slightly due to reporting conventions. The final synthesis agent is inconsistently choosing one figure or hallucinating a reconciliation. Which workflow design best handles this conflict?

- [ ] **A**: Always prioritize data from the SEC filing over the press release by hard-coding a source preference rule into the synthesis agent. It is configured to ignore the press release value entirely when both sources are present, treating the SEC filing as the authoritative record of the transaction.
- [ ] **B**: Stop the entire process and flag for human intervention whenever a conflict is detected, routing both extracted values and the source documents to a review queue for manual reconciliation before the synthesis agent proceeds. This ensures that no automated decision is made on conflicting data.
- [ ] **C**: Design the workflow so that subagents output structured data annotated with source and potential conflicts. A separate 'coordinator' agent reviews these outputs, and if a conflict is detected, it passes both annotated values to the synthesis agent with instructions on how to present the discrepancy.
- [ ] **D**: Allow the subagents to communicate with each other to debate and resolve the conflict, sending only a single, agreed-upon value to the synthesis agent. They compare their extraction methods and negotiate a consensus figure based on predefined reconciliation rules.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This approach preserves information provenance by using structured data and annotations. By involving a coordinator to identify conflicts and instructing the synthesis agent to present the discrepancy, the system ensures transparency and prevents hallucinated reconciliations. It allows the final output to reflect the true state of the available information.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d2-043

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

A customer support MCP server receives a request to look up a customer record, but the database connection times out after 30 seconds. The server needs to communicate this failure to the agent. What is the correct way to structure the MCP error response?

- [ ] **A**: Return an empty result with no error flag, and let the agent infer the failure from the missing data.
- [ ] **B**: Throw an unhandled exception to let the MCP framework propagate the error to the agent automatically.
- [ ] **C**: Set isError to true and return errorCategory: 'business', isRetryable: false, since the operation could not be completed.
- [ ] **D**: Set isError to true and return a structured response with errorCategory: 'transient', isRetryable: true, and a message describing the timeout.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A database timeout is a transient error — the database may be available on the next attempt. Setting isError: true signals failure, errorCategory: 'transient' classifies it correctly, and isRetryable: true tells the agent it is safe to retry.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d1-064

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

A consulting firm needs an agent to add a comprehensive test suite to a large legacy codebase. The codebase has no existing tests, unclear dependencies between modules, and the team does not know which areas are most critical. Which task decomposition strategy is most appropriate?

- [ ] **A**: Dynamic adaptive decomposition that starts by mapping the codebase structure, identifies high-impact areas, and creates a prioritised plan that adapts as dependencies emerge
- [ ] **B**: A single-pass analysis that processes the entire codebase at once and generates a complete test plan, since holding every module in one context is what gives the model full visibility into the dependencies between them
- [ ] **C**: A fixed sequential pipeline that reviews each file in alphabetical order and generates tests for each one, so every file receives identical review depth and no module is skipped or left under-tested
- [ ] **D**: A multi-pass architecture with per-file analysis and cross-file integration, identical to a code review pipeline, reusing a two-stage structure that is already proven on unfamiliar code

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Adding tests to a legacy codebase with unknown dependencies is an open-ended investigation task. Dynamic adaptive decomposition generates subtasks based on what is discovered at each step — first mapping the structure, then identifying critical areas, then adapting the test plan as dependency relationships emerge.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d3-043

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

A CI/CD pipeline runs three Claude Code steps in sequence: (1) generate a changelog from git commits, (2) review the changelog for accuracy, and (3) check for breaking changes. The team notices that step 2 never flags inaccuracies and step 3 misses obvious breaking changes that the changelog omits. What is the root cause?

- [ ] **A**: The CLAUDE.md file does not contain changelog formatting standards, so the review step has no criteria to evaluate against and each step ends up inventing its own bar for what counts as accurate
- [ ] **B**: The three steps are sharing session context, so steps 2 and 3 inherit the reasoning from step 1 and do not independently evaluate the changelog; each step should run as an independent session
- [ ] **C**: The -p flag is not being used, causing each step to wait for interactive input, so the pipeline times out silently and reports whatever partial output it had collected before the wait began
- [ ] **D**: The steps need to use --output-format json so that each step can parse the previous step's structured output, since unstructured prose forces every step to re-derive the fields it is supposed to be checking

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** When review and analysis steps share context with the generation step, they inherit the original reasoning and are less likely to identify gaps or errors. Independent sessions force each step to evaluate the changelog from scratch without bias from the generation reasoning. Session context isolation is critical for CI/CD review pipelines.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d5-059

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

A structured data extraction system processes invoices, purchase orders, and contracts. The monitoring dashboard shows 97% overall extraction accuracy and the team considers the system production-ready. A detailed audit reveals: invoices 99.5% accuracy (80% of volume), purchase orders 98% accuracy (15% of volume), contracts 72% accuracy (5% of volume). What does this reveal and what action is required?

- [ ] **A**: The system is performing well. 72% on contracts is acceptable since contracts represent only 5% of volume and barely affect the overall metric, and a slice that small cannot move a volume-weighted mean enough to justify holding the release
- [ ] **B**: The aggregate accuracy metric is masking a severe per-type performance disparity. Contracts need mandatory human review until accuracy improves, and monitoring must report per-type metrics alongside aggregate figures
- [ ] **C**: The training data needs rebalancing so that contracts represent a larger proportion, which will naturally improve contract accuracy, because per-type accuracy tracks the share of examples of that type the extractor has been tuned against
- [ ] **D**: The 97% threshold should be raised to 99% overall to force improvement across all document types, since a single stricter global target concentrates effort on whichever type is dragging the average down

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This is a textbook case of aggregate metrics hiding per-type problems. 97% overall is misleading because high-volume invoice accuracy (99.5%) overwhelms the poor contract performance (72%). Per-type metrics would have surfaced this immediately. Contracts need different treatment until the extraction quality is acceptable.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d1-065

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A customer support agent needs to escalate a complex billing dispute to a human agent. The AI agent compiles a handoff that includes the conversation summary and recommended action, but the human agent reports they cannot effectively resolve the issue because critical information is missing. Which missing element is most likely causing the problem?

- [ ] **A**: The handoff is missing the AI agent's confidence score for its recommendation, and without that figure the human has no way to judge how much of the recommended action to act on directly
- [ ] **B**: The handoff is missing the full conversation transcript so the human agent can review exact customer messages, since a summary always drops the precise wording that a billing dispute usually turns on
- [ ] **C**: The handoff should include links to internal knowledge base articles about the billing issue, because the human needs the same policy references the agent consulted before they can confirm its recommendation
- [ ] **D**: The handoff is missing the customer ID and root cause analysis, making it impossible for the human agent to look up the account or understand the underlying issue

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A structured handoff must include: customer ID, conversation summary, root cause analysis, refund amount (if applicable), and recommended action. Without the customer ID, the human agent cannot access the account. Without root cause analysis, they cannot understand the underlying problem. The human agent lacks the conversation transcript, so the handoff must be self-contained.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d3-044

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A team wants to enforce that all SQL migration files created by Claude Code follow a strict naming convention (YYYYMMDD_HHMMSS_description.sql) and contain a rollback section. Which approach provides deterministic enforcement without relying on the model's judgment?

- [ ] **A**: Use a PreToolUse hook to inject the naming convention into every prompt before file creation occurs The convention then reaches the model at the moment the file is being created.
- [ ] **B**: Document the naming convention and rollback requirement in the project CLAUDE.md with clear examples Project memory is loaded on every turn, so the rule is in context whenever a migration is written.
- [ ] **C**: Create a .claude/rules/migrations.md file with paths: ["**/migrations/**/*.sql"] containing the naming convention, so the convention is scoped to migration files and applies wherever they live
- [ ] **D**: Add a PostToolUse hook on file creation that validates the filename pattern and checks for a rollback section, rejecting files that do not comply

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** PostToolUse hooks run deterministic validation code after tool execution. A hook that checks filename patterns and content requirements provides reliable, automated enforcement that does not depend on the model remembering or correctly interpreting naming conventions.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d4-051

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

An extraction pipeline processes 50-page legal contracts in a single API call. It captures parties and dates from the first few pages but misses key financial terms in later pages, and occasionally contradicts itself across fields. A colleague suggests simply increasing the context window. What is the correct diagnosis and fix?

- [ ] **A**: This is attention dilution; split into per-section extraction passes for each document area followed by a cross-section integration pass that reconciles and validates the combined output
- [ ] **B**: The context window is too small; upgrading to a larger context model will fix the inconsistency, since a model that holds the whole contract at once no longer has to choose which pages to attend to
- [ ] **C**: Run the full extraction three times and take the most common value for each field, so majority voting cancels out whichever fields the model happened to miss on any single pass
- [ ] **D**: Add more detailed instructions about the importance of financial terms to increase the model's focus on those sections, since explicit emphasis in the prompt reweights attention toward the pages that matter most

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Long documents cause attention dilution: the model attends thoroughly to early content but loses focus on later sections. Per-section passes ensure each part gets dedicated attention, and the integration pass catches contradictions and reconciles fields across sections.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d1-066

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

A code review agent processes 14 files and produces detailed feedback for the first 5 files but misses obvious bugs in files 10-14. It also flags a pattern as problematic in one file while approving identical code in another. What is the root cause and solution?

- [ ] **A**: The model's context window is too small — upgrade to a model with a larger context window
- [ ] **B**: Split the review into per-file local analysis passes plus a separate cross-file integration pass
- [ ] **C**: Add a stronger system prompt emphasising the importance of reviewing all files equally
- [ ] **D**: Reduce the number of files reviewed per run to 5 and process in batches

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Multi-pass architecture solves attention dilution. Per-file passes ensure consistent depth for each file. The cross-file integration pass catches data flow issues and ensures consistent pattern evaluation.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d2-044

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

A research agent calls an external API via an MCP server. After the 30th query in a batch of 50, the API starts returning HTTP 429 errors. The MCP server returns a generic 'Request failed' for every failure, so the agent abandons the batch after three consecutive failures. What MCP server change would most improve resilience?

- [ ] **A**: Return structured errors with errorCategory: 'transient', isRetryable: true, and include a retryAfterMs field indicating how long to wait before the next attempt.
- [ ] **B**: Implement automatic retry with exponential backoff inside the MCP server, hiding rate limits from the agent entirely, so the agent never sees a failure class it has no way to act on.
- [ ] **C**: Return errorCategory: 'business', isRetryable: false to tell the agent to stop making requests entirely, which ends the batch cleanly instead of burning quota on calls that will keep failing.
- [ ] **D**: Queue all 50 requests at the MCP server level and process them sequentially with built-in rate limiting, so the server paces the whole batch beneath the API's published per-minute limit.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Rate limiting is a transient error — it will resolve after a delay. Structured metadata with the specific retry delay lets the agent space out remaining queries intelligently rather than abandoning the batch. The agent can continue processing other tasks while waiting.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-045

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

A `search_papers` MCP tool has three failure patterns: (1) the upstream academic API returns HTTP 503 during peak hours, (2) users request papers from a restricted journal the system has no licence for, and (3) the agent submits a malformed DOI like 'doi-1234' that fails the input regex. The team wants structured error metadata so agents can handle each case differently. Which `errorCategory` and `isRetryable` combination is correct for all three?

- [ ] **A**: HTTP 503: transient/retryable; restricted journal: business/not retryable; malformed DOI: validation/retryable.
- [ ] **B**: All three should be errorCategory: 'transient', isRetryable: true, since they all prevent the tool from completing its task.
- [ ] **C**: HTTP 503: transient/retryable; restricted journal: transient/retryable; malformed DOI: transient/retryable.
- [ ] **D**: HTTP 503: validation/retryable; restricted journal: business/not retryable; malformed DOI: business/not retryable.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** HTTP 503 is a temporary upstream outage (transient, will likely resolve on retry). Restricted journal is a policy limitation (business, will never resolve on retry — escalate or offer an alternative source). Malformed DOI is validation; the agent must repair the input and then retry.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d5-060

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

A customer support agent handles a multi-issue session. After several turns, the agent refers to 'your recent refund request' instead of the specific $247.83 refund for order #8891. The conversation history is being summarised between turns to manage context length. What is the most effective fix?

- [ ] **A**: Increase the context window size to avoid summarisation entirely, since a longer window keeps every turn verbatim and nothing has to be condensed
- [ ] **B**: Instruct the model to preserve all numerical values during summarisation, so each rewrite carries every amount and order number through unchanged
- [ ] **C**: Extract transactional facts (amounts, dates, order numbers) into a persistent case facts block included in every prompt, outside summarised history
- [ ] **D**: Store the full conversation in an external database and retrieve relevant turns on demand, so the agent can pull the exact turn holding the amount whenever it needs it

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This directly addresses the progressive summarisation trap by ensuring critical numerical and transactional data is never condensed.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d3-045

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A fintech company requires that all API response payloads are normalised to snake_case before being logged, and that any file write to the src/api/ directory is automatically linted. They want these enforcements to be deterministic and not rely on the model remembering instructions. Which hook configuration achieves both requirements?

- [ ] **A**: A PreToolUse hook on file writes that runs the linter before the write completes, and a PostToolUse hook on API response handling that normalises field names to snake_case
- [ ] **B**: Add both requirements to CLAUDE.md with clear examples, and add a PreToolUse hook that reminds the model about these rules before each tool call
- [ ] **C**: A PostToolUse hook on file writes to src/api/ that runs the linter on the created file, and a PostToolUse hook on data processing that normalises response payloads to snake_case
- [ ] **D**: A PreToolUse hook that blocks any file write to src/api/ unless the file has already been linted, and a PreToolUse hook that blocks API calls unless snake_case normalisation is configured

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Both are PostToolUse hooks because both act on completed outputs. The linter runs after a file write to src/api/ is complete, validating the written content. The normalisation hook processes API response data after it is retrieved, converting fields to snake_case before logging. Both provide deterministic enforcement independent of model instructions.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d4-052

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Your CI/CD code review pipeline has a 40% false positive rate on 'documentation mismatch' findings, causing developers to ignore ALL review categories. What is the most effective fix?

- [ ] **A**: Add 'only report high-confidence documentation issues' to the system prompt, so the model filters its own weak findings before any of them reach a developer
- [ ] **B**: Add a second model pass to verify each finding before reporting, since agreement between two passes is a dependable proxy for whether a finding is real
- [ ] **C**: Increase the model temperature to get more varied results and filter outliers, since a wider sampling spread makes the spurious findings easier to spot as outliers
- [ ] **D**: Temporarily disable the documentation mismatch category while refining its prompts with explicit criteria and code examples

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This restores trust in other categories immediately while you iterate on the problematic category with specific criteria.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d3-046

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

A CI/CD pipeline uses Claude Code to generate tests in one step and then review the same code in a subsequent step. The team notices that the review step rarely finds issues with the generated tests, but human reviewers consistently find problems. Both CI steps use the -p flag correctly. What is the most likely cause and fix?

- [ ] **A**: The review step needs --output-format json to produce structured findings that can be parsed programmatically Structured findings can then be compared against the generated tests field by field.
- [ ] **B**: The CLAUDE.md file lacks testing standards and review criteria, so the review has no project-specific context Without those standards the reviewer falls back on generic style checks it can apply anywhere.
- [ ] **C**: The review step runs the same model tier as generation, which is not capable enough to critique its own output; upgrade the review step to a more powerful model with stronger reasoning about the code under review
- [ ] **D**: The generation and review steps must run as independent sessions with no shared context, so the review instance approaches the code without the original reasoning bias

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The same Claude session (or a session with carried-over context) that generated code is less effective at reviewing its own changes because it retains the reasoning context from generation. An independent review instance without that context is more likely to catch issues, matching what human reviewers find. Session context isolation for independent reviews is a key CI integration concept.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d4-053

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

Your extraction pipeline has a validation step that checks extracted financial data. When validation fails, the system retries by sending just the original document with the same prompt. Retry success rates are below 10%. The most common failure is the model placing the 'net amount' value in the 'gross amount' field and vice versa. How should the retry be restructured?

- [ ] **A**: Increase retries from 1 to 5, since more attempts at the same prompt will eventually produce the correct field mapping by chance at a non-zero sampling temperature
- [ ] **B**: Switch to a different model for the retry, since the original model has a persistent field-mapping bias that a differently trained model does not share
- [ ] **C**: Add a post-processing rule that automatically swaps net and gross amounts when validation detects the pattern, removing the error class without a second model call
- [ ] **D**: Send the original document, the failed extraction output, and the specific validation error explaining which fields were swapped, so the model can self-correct

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Retry-with-error-feedback is dramatically more effective than naive retries. The model seeing its specific mistake (net and gross amounts swapped) and the validation error allows targeted self-correction rather than repeating the same misinterpretation.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d5-061

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.1

A customer support agent uses a token budget of 200k tokens. The system prompt consumes 8k tokens, conversation history takes 120k tokens, and the most recent tool call result returned 65k tokens. The agent is struggling to produce thorough responses. What is the most likely cause and fix?

- [ ] **A**: The conversation history should be cleared entirely to give the model a fresh context for each response, since the accumulated history is what crowds out the room left for generation
- [ ] **B**: The system prompt is too large at 8k tokens and should be reduced to under 2k to leave more room for the response, since trimming the largest fixed cost in the prompt frees the most room that the 65k-token tool result would otherwise occupy
- [ ] **C**: The model needs a higher max_tokens parameter to produce longer responses, since max_tokens is the setting that caps how long a response the model is permitted to produce
- [ ] **D**: The model is running out of response tokens — system prompt (8k) + history (120k) + tool result (65k) = 193k, leaving only 7k for the response. Summarise conversation history or truncate verbose tool results to free up response budget

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Token budget is shared: system prompt + conversation history + tool results + available for response = total budget. With 193k consumed, only 7k remains for the response. The fix targets the largest movable allocations: summarise older history or trim verbose tool output.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-067

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

A CI/CD agent has spent 30 minutes debugging a failing test suite, trying three different approaches that each modified configuration files. None worked, and its context now holds three sets of conflicting modifications and failed outputs. The developer wants to try a completely different strategy. What session management approach should they use?

- [ ] **A**: Continue in the current session and ask the agent to ignore all previous attempts and start fresh, since an explicit instruction to disregard earlier work is reliably honoured
- [ ] **B**: Start a completely new session with no context, re-read the failing tests, and apply the new strategy, so nothing from the failed attempts can bias the new approach
- [ ] **C**: Use fork_session from the point before the first debugging attempt to explore the new strategy, branching from a clean checkpoint while leaving the original session intact
- [ ] **D**: Start a fresh session with a summary injection that lists the three failed approaches and why each failed, then pursue the new strategy with clean context

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Fresh start with summary injection preserves the knowledge of what has been tried (preventing repetition) while eliminating the polluted context from three sets of conflicting file modifications. The agent starts with clean context and the lessons learned from previous attempts.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d2-046

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.2

A tool returns an empty array after a customer lookup. The agent retries 3 times, then escalates to a human agent. Analysis shows the customer's account simply does not exist. What is the root cause of this wasted effort?

- [ ] **A**: The retry limit is too low — increasing to 5 retries would resolve the issue, since the lookup usually succeeds by the fifth attempt under load.
- [ ] **B**: The escalation threshold is too aggressive — the agent should exhaust more retries before involving a human, keeping people for genuine failures.
- [ ] **C**: The tool does not distinguish between access failures and valid empty results, so the agent treats 'no matches' as a retriable failure.
- [ ] **D**: The system prompt should instruct the agent not to retry customer lookups, since a lookup returning nothing is not a failure worth repeating.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The tool successfully queried the data source and found no matches. This is a valid empty result, not an access failure. The agent's recovery logic cannot distinguish the two, causing it to retry when it should accept the result.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d5-062

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

A customer support agent searches for a customer named 'Sarah Johnson' and the lookup tool returns three matching accounts with the same name but different addresses and account ages. The agent selects the most recently active account and proceeds with the refund. Later, the customer calls back because the refund was applied to the wrong account. What should the agent have done differently?

- [ ] **A**: Selected the account with the oldest creation date, as long-standing customers are more likely to be the caller and account age is the strongest available signal.
- [ ] **B**: Escalated to a human agent immediately because the system returned ambiguous results, since disambiguation is a judgement the agent should not make alone.
- [ ] **C**: Processed the refund across all three accounts to ensure the correct customer received it, so the eligible account is credited without a further round trip.
- [ ] **D**: Asked the customer for additional identifying information — email address, phone number, or order number — to disambiguate the matching accounts.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** When multiple customers match a search query, the agent must ask for additional identifiers rather than selecting based on heuristics. This ensures the correct account is identified before any action is taken.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d4-054

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Your data extraction pipeline uses tool_use with tool_choice set to 'auto'. You need guaranteed structured output for every request, but some documents occasionally produce conversational text responses instead. You have only one extraction tool defined. What is the most reliable fix?

- [ ] **A**: Add a system prompt instruction: 'You must always use the extraction tool and never produce text responses'
- [ ] **B**: Add a post-processing step that retries any request returning text instead of a tool call
- [ ] **C**: Set tool_choice to force the specific extraction tool by name
- [ ] **D**: Switch to prompt-based JSON extraction with strict formatting instructions for more predictable output

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Setting tool_choice to {type: 'tool', name: 'extract_data'} forces the model to call that specific tool on every request, guaranteeing schema-compliant structured output with no possibility of text-only responses.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d1-068

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A consulting firm's multi-agent research system has a coordinator that always invokes the full pipeline of five subagents (web search, document analysis, data extraction, synthesis, and formatting) for every query, including simple factual lookups that only need web search. This adds unnecessary latency and cost. What is the correct architectural fix?

- [ ] **A**: Split into two separate systems: one for simple queries and one for complex queries, so each can be tuned for the class of work it serves
- [ ] **B**: Allow subagents to communicate directly with each other so they can skip unnecessary steps in the pipeline, letting it short-circuit itself
- [ ] **C**: Add a caching layer so subagents that have no work to do return immediately, costing a cache lookup rather than a model call
- [ ] **D**: Have the coordinator dynamically select which subagents to invoke based on query requirements, rather than always routing through the full pipeline

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The coordinator should analyse query requirements and decide which subagents are needed. A simple factual lookup only needs the web search agent, not the full five-agent pipeline. Dynamic selection reduces latency and cost for straightforward requests.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d4-055

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your manager proposes switching both your blocking pre-merge code review and your overnight technical debt report to the Message Batches API for 50% cost savings. How should you evaluate this proposal?

- [ ] **A**: Switch both to batch processing with status polling to check for completion
- [ ] **B**: Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks
- [ ] **C**: Keep real-time calls for both to avoid batch result ordering issues
- [ ] **D**: Switch both to batch with a timeout fallback to real-time if batches take too long

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Pre-merge checks are blocking workflows where developers wait. The batch API's 24-hour window makes it unsuitable. Technical debt reports are overnight and latency-tolerant.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d3-047

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A codebase has test files co-located with source files throughout 50+ directories (e.g., Button.test.tsx next to Button.tsx). The team wants all tests to follow the same conventions regardless of location. What is the most maintainable approach?

- [ ] **A**: Place a CLAUDE.md file in every directory containing test files, so each directory carries the conventions that apply to the tests beside it
- [ ] **B**: Create a rule file in .claude/rules/ with YAML frontmatter paths: ["**/*.test.tsx", "**/*.test.ts"] containing the test conventions
- [ ] **C**: Add all test conventions to the root CLAUDE.md file, which every session in the project already loads as global guidance
- [ ] **D**: Create a skill in .claude/skills/ with the test conventions, which the agent invokes whenever it writes or edits a test file

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Glob patterns in .claude/rules/ match files by pattern across the entire codebase. The conventions load automatically when editing any test file, regardless of directory. No maintenance burden as new test files are added.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d1-069

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A web search agent has 9 tools: `web_search`, `url_fetch`, `html_parse`, `pdf_extract`, `image_ocr`, `translate`, `summarise`, `keyword_extract`, `sentiment_analysis`. In testing it frequently calls `summarise` and `sentiment_analysis` when it should only fetch raw data. How should the architect fix this?

- [ ] **A**: Reduce the web search agent's allowedTools to only the 4–5 tools relevant to data fetching (web_search, url_fetch, html_parse, pdf_extract) and move analysis tools to the appropriate specialist agents
- [ ] **B**: Add system prompt instructions telling the web search agent to only use data fetching tools and ignore analysis tools, since the system prompt is the strongest lever over which tools a model reaches for
- [ ] **C**: Keep all 9 tools but implement PreToolUse hooks that block the web search agent from calling summarise and sentiment_analysis, enforcing the boundary at call time rather than relying on the model
- [ ] **D**: Merge the web search and synthesis agents into a single agent since they share some tools, so one agent owns the whole fetch-and-analyse path and no hand-off is required

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The recommended maximum is 4–5 tools per agent. The web search agent has 9 tools, causing it to use tools outside its intended role. Reducing to data-fetching tools enforces scoped access. The analysis tools (summarise, sentiment_analysis, keyword_extract) belong with the synthesis or analysis agents.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d2-047

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

A support agent tries to refund $850, but policy caps automated refunds at $500. The MCP tool returns 'Operation failed' as its error. The agent retries three times before escalating to a human. What change to the tool's error response would most effectively prevent this behaviour?

- [ ] **A**: Return a structured error with errorCategory: 'business', isRetryable: false, and a customer-friendly description explaining the policy limit.
- [ ] **B**: Set the MCP isError flag and add a retry-after header so the agent waits before retrying.
- [ ] **C**: Include a longer error message explaining the policy: 'Operation failed because the refund amount of $850 exceeds the $500 automated refund limit'.
- [ ] **D**: Catch the error in the agent's system prompt with an instruction: 'Never retry refund operations that fail'.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Business errors are never retryable — retrying a policy violation will always fail. Structured metadata with errorCategory and isRetryable: false tells the agent to stop retrying and take an alternative path, such as offering partial refund or escalating to a supervisor.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-048

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A developer productivity platform has a tool called analyze_content with the description 'Analyses content from various sources.' Logs show the agent uses it for web scraping, document parsing, and code analysis indiscriminately, leading to poor results for each use case. What is the most effective fix?

- [ ] **A**: Add detailed few-shot examples to the system prompt showing which types of content the tool handles well and which it does not, so the agent learns the boundaries from examples.
- [ ] **B**: Improve the tool description to list all supported content types and their expected formats, so the agent can tell from the description alone which inputs the tool accepts.
- [ ] **C**: Split analyze_content into purpose-specific tools — extract_web_results, parse_document, and analyze_code — each with a narrow description and defined input/output contracts.
- [ ] **D**: Implement a routing layer that inspects the input content type and dispatches to the appropriate internal processing function within analyze_content, keeping a single entry point.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Tool splitting replaces a generic tool with purpose-specific alternatives that each have a clear, narrow description. Each resulting tool handles one use case well, with defined input/output contracts that eliminate ambiguity about when to use it.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d5-063

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A multi-agent research system finds conflicting data on a pharmaceutical compound's efficacy. A 2022 peer-reviewed clinical trial reports 78% efficacy, while a 2024 preprint reports 45% efficacy with a larger sample size. The synthesis agent must produce a recommendation for a medical advisory board. Which approach correctly handles the conflicting sources?

- [ ] **A**: Use the 2024 preprint as it has a larger sample size and is more recent, noting it supersedes the 2022 study, since sample size and recency both point to the more reliable estimate
- [ ] **B**: Average the two values (61.5%) and present it as the best estimate with a note about variance between studies, since averaging independent measurements is the standard reconciliation
- [ ] **C**: Present both findings with full provenance: source identity, publication date, peer-review status, sample size, methodology, and any methodological differences that may explain the discrepancy. Let the advisory board weigh the evidence
- [ ] **D**: Exclude both findings and report that no reliable consensus exists, recommending further research before any conclusions, since an unresolved conflict invites a decision the evidence cannot support and stalls the recommendation the board actually asked for

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** For a medical advisory board, preserving full provenance is critical. The board needs to weigh peer-review status, sample size, methodology differences, and temporal context. Annotating both sources with complete metadata enables informed human judgment on conflicting scientific evidence.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d4-056

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

A moderation classification tool includes a `detected_patterns` array where the model lists specific patterns it identified (e.g. 'repeated slur targeting ethnicity'). Validation checks whether the detected patterns match the assigned category, and on mismatch retries with feedback like 'You classified this as spam but detected patterns of hate speech targeting ethnicity, please re-evaluate.' What is the primary benefit of the `detected_patterns` field in this workflow?

- [ ] **A**: It lets the system auto-correct the category by overriding the model's classification with a rule-based pattern match, so a deterministic rule wins wherever the two disagree
- [ ] **B**: It provides an auditable evidence trail showing which specific content features drove each moderation decision, which a reviewer can replay against the original content
- [ ] **C**: It increases classification accuracy by forcing the model to identify specific patterns before assigning a category, since naming the evidence first constrains the label that follows
- [ ] **D**: It enables the validation step to detect internal reasoning inconsistencies and provide targeted error feedback that the model can use to self-correct its classification

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The detected_patterns field externalises the model's reasoning into structured data that can be programmatically validated against the conclusion. When patterns and category are inconsistent, the specific error feedback ('you detected hate speech patterns but classified as spam') gives the model actionable information to self-correct. This is the core benefit in a retry-with-error-feedback workflow.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d2-049

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A developer needs to find all files that call a deprecated function processLegacyOrder() and also find all test files for those callers. Which tool sequence is correct?

- [ ] **A**: Glob for '*processLegacyOrder*' to find callers, then Grep for test files, since Glob searches file contents and Grep matches path patterns.
- [ ] **B**: Grep for 'processLegacyOrder' to find callers, then Glob for test files matching the caller filenames (e.g. **/*.test.tsx).
- [ ] **C**: Read all source files to manually search for the function, then Read all test files, which guarantees no caller is missed by an imprecise pattern.
- [ ] **D**: Bash with 'find . -name "*.ts" | xargs grep processLegacyOrder' for both steps, keeping the entire search inside a single shell invocation.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Grep searches file contents — correct for finding function callers. Glob matches file paths — correct for finding test files by naming pattern. This is the optimal two-step sequence.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d1-070

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

Platform policy strictly prohibits the moderation system from auto-removing any post in the 'political speech' category without human approval. Currently this rule is enforced via the system prompt: 'Never auto-remove political speech without human approval.' Audit logs reveal that in 2% of cases the agent auto-removes political speech posts. What is the correct fix?

- [ ] **A**: Implement a PreToolUse hook that inspects the category before any removal tool executes — if the category is 'political_speech', block the removal and redirect to human review
- [ ] **B**: Add few-shot examples showing the correct workflow for political speech: classify, then escalate to human, never auto-remove, so the pattern is demonstrated rather than merely stated
- [ ] **C**: Strengthen the system prompt by adding the rule in multiple locations with bold formatting and emphasis, since repetition and emphasis raise the salience of a rule that must never be broken
- [ ] **D**: Route all political speech posts to a dedicated subagent that has no access to the auto-remove tool, so the routing layer carries the policy rather than the tool layer

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A PreToolUse hook provides deterministic enforcement by physically blocking the removal tool when the content category is political speech. This is the only approach that guarantees 100% compliance with the policy, which is what platform rules require.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d3-048

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A developer is iterating on a data transformation function with Claude Code and has identified three issues: (1) date parsing mishandles timezone offsets, (2) currency formatting uses the wrong locale, and (3) the output JSON schema has an incorrect field name. Issues 1 and 2 are independent; issue 3 changes the output shape both must conform to. How should the developer provide feedback?

- [ ] **A**: Send all three issues in a single message to let Claude address them holistically, since one message keeps all three fixes in a single coherent edit and avoids three rounds of re-reading the file
- [ ] **B**: Send each issue in a separate sequential message, waiting for confirmation after each fix, so every fix is verified before the next is attempted and no change lands on an unverified base
- [ ] **C**: Use the interview pattern to have Claude ask clarifying questions about all three issues before making any changes, so the ambiguities are resolved up front rather than discovered mid-edit
- [ ] **D**: Fix issue 3 (schema field name) first in one message, then send issues 1 and 2 together in a second message since they are independent of each other but depend on the corrected schema

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Issue 3 changes the output schema that issues 1 and 2 must conform to, so it must be resolved first. Once the schema is correct, issues 1 and 2 are independent and can be batched together. This follows the principle: batch when fixes interact, sequence when independent, and resolve dependencies first.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d1-071

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

The moderation coordinator dispatches posts to specialist subagents. The text classifier has been extended to also handle image analysis: its prompt is now 2,500 tokens, its tool list has grown to 12 tools, and accuracy has dropped on both text and image tasks. What principle was violated and what is the fix?

- [ ] **A**: The text classifier's context window is too small — upgrade to a model with a larger context window to handle the expanded prompt, which the enlarged tool list now exceeds
- [ ] **B**: Add better instructions to the combined subagent's prompt to clarify when it should use text tools versus image tools, clarifying the boundary without changing the architecture
- [ ] **C**: Subagent isolation was violated — restore the text classifier to text-only responsibilities with scoped tools, and keep image analysis in its own specialist subagent
- [ ] **D**: Split the combined agent into three narrower specialists: text sentiment, text policy, and image analysis, so each owns exactly one modality or policy concern

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Each subagent should have a focused responsibility and a scoped tool set (4-5 tools maximum). Combining text and image analysis in one agent violates isolation, bloats the prompt, and confuses the model. Restoring separate specialists with scoped tools improves accuracy for both tasks.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d1-072

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

The moderation system's agentic loop uses a hardcoded decision tree: if the classify_content tool returns 'hate_speech', always call escalate_to_human; if it returns 'spam', always call auto_remove. During testing, the team discovers that satirical posts criticising hate speech are being auto-escalated, and sophisticated spam disguised as legitimate marketing slips through. What is the architectural problem?

- [ ] **A**: The classify_content tool needs more granular category labels to distinguish satire from genuine hate speech, since satire is only misread when the label set is too coarse to separate it from the real thing
- [ ] **B**: Route all ambiguous cases to human review to avoid misclassification, so every judgement call reaches a person and the automated path is left handling only the unambiguous posts where precision is already high
- [ ] **C**: Add a confidence threshold so only high-confidence classifications trigger automatic actions, so the automatic path fires only where the classifier is certain and everything else falls through to review
- [ ] **D**: The hardcoded decision tree removes Claude's ability to reason about context — replace it with model-driven decisions where Claude analyses the classification result and chooses the appropriate action based on the full context of the post

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Hardcoded decision trees treat classification labels as absolute when real content is nuanced. Letting Claude reason about context (satire vs genuine hate, sophisticated spam patterns) produces better moderation decisions. The agentic loop should let the model decide, not map labels to fixed actions.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d5-064

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A multi-agent research system has two types of workloads: real-time user queries requiring sub-5-second responses, and nightly batch jobs that process 10,000 documents for indexing. Both currently use the same API tier and compete for the same rate limits. During nightly batch runs, user query latency spikes to 30+ seconds. What is the correct architectural fix?

- [ ] **A**: Increase the rate limit by upgrading to a higher API tier so both workloads have sufficient capacity, since the binding constraint here is request throughput and a higher tier buys precisely that headroom
- [ ] **B**: Separate the workloads: use the batch processing API for the nightly indexing jobs (optimised for throughput, not latency) and reserve the real-time API tier for user queries (optimised for latency)
- [ ] **C**: Throttle the batch job to process only 100 documents per hour during business hours to leave capacity for user queries, so the batch fits into whatever capacity interactive traffic leaves free
- [ ] **D**: Queue user queries during batch processing and respond to them when the batch completes, so the batch runs at full rate and user traffic is served the moment it finishes without contending for quota

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Batch processing APIs are designed for high-throughput, latency-tolerant workloads. Real-time APIs prioritise low latency. Separating workloads ensures user queries are not starved by batch operations and batch jobs benefit from throughput optimisations.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d4-057

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

The moderation team asks a single Claude session to classify a post, then immediately asks the same session to independently review its own classification for quality assurance. The 'review' agrees with the original classification 98% of the time, including cases that human auditors later identify as errors. Why is this self-review ineffective?

- [ ] **A**: The model needs a stronger review prompt with explicit instructions to look for errors in the original classification, since a review prompt that names the specific failure modes will surface what the first pass missed
- [ ] **B**: Self-review is effective but the 98% agreement rate simply reflects high initial accuracy — the 2% disagreement is the expected error rate, and that is exactly what an independent second look should produce on a well-tuned classifier on a classifier whose first pass is this well calibrated
- [ ] **C**: The model's temperature is too low, producing deterministic agreement — increase temperature for the review pass, since deterministic sampling reproduces the original answer while a warmer setting forces genuinely different reasoning
- [ ] **D**: The same session retains the reasoning context from the original classification — the model is anchored to its own reasoning and cannot independently re-evaluate the content. Use a separate agent instance with no access to the original classification for genuine independent review

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Self-review within the same session is fundamentally limited because the model's conversation context includes the original reasoning. It will naturally be anchored to its prior conclusions. An independent instance with no access to the original decision evaluates the content fresh, providing genuine quality assurance.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d5-065

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.3

A research subagent queries an academic journal database for articles on renewable energy policy. The database responds successfully but returns zero matching articles. Meanwhile, a second subagent querying a government statistics API receives a connection timeout. The coordinator currently handles both cases identically by retrying three times. What should change?

- [ ] **A**: Increase the retry count to five for both cases to give transient failures more time to resolve, since both responses are failures of the same kind and more attempts will resolve either one
- [ ] **B**: Distinguish access failures from valid empty results: retry the API timeout as a transient failure, but accept the zero-match journal response as a valid finding and annotate the coverage gap
- [ ] **C**: Remove retries entirely and immediately escalate both failures to a human operator for investigation, since an operator can tell a genuine coverage gap from an outage faster than a retry loop can
- [ ] **D**: Add exponential backoff to all retries so the subagents wait progressively longer between attempts, giving a service under load time to recover before the next attempt lands

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Access failures (timeouts, connection errors) indicate the tool could not reach the data source and warrant retry. Valid empty results mean the tool reached the source and found no matches — this IS the answer. Conflating these leads to unnecessary retries on valid results and missed coverage annotations.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d2-050

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A developer productivity platform uses an automated documentation agent. The agent must always extract metadata from source files before generating documentation, but in testing it sometimes skips the metadata extraction step and produces documentation from incomplete information. What is the correct tool_choice configuration to enforce the mandatory first step?

- [ ] **A**: Set tool_choice to 'auto' and add a system prompt instruction: 'You must call extract_metadata before any other tool.'
- [ ] **B**: Set tool_choice to 'any' so the model must call a tool, relying on the tool description to guide it to extract_metadata first.
- [ ] **C**: Remove all other tools except extract_metadata from the agent's configuration so it has no choice.
- [ ] **D**: Set tool_choice to forced selection with the specific tool name extract_metadata for the first turn, then switch to 'auto' for subsequent turns.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Forced selection {'type': 'tool', 'name': 'extract_metadata'} ensures the model must call this specific tool. The model cannot skip it or choose a different tool. After the first turn completes, switching to 'auto' allows normal operation for documentation generation.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d1-073

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

The moderation system handles appeals where users contest a moderation decision. Currently, the same agent that made the original decision re-evaluates the appeal. Appeal overturn rates are suspiciously low. What is the most effective architectural change?

- [ ] **A**: Add stronger instructions to the appeal handler's prompt requiring it to consider the user's perspective fairly, so the handler weighs the appeal on its merits
- [x] **B**: Route appeals to a separate agent instance with no access to the original decision's reasoning, providing only the content and the user's appeal justification
- [ ] **C**: Route appeals to a human reviewer who has full authority to overturn automated decisions, so every appeal receives a manual decision
- [ ] **D**: Automatically overturn decisions where the user provides any appeal justification to improve user trust, since deferring to the user restores confidence fastest

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A fresh agent instance without access to the original reasoning context evaluates the content independently. This avoids confirmation bias from the original decision. The appeal agent sees only the content and the user's argument, enabling a genuinely independent review.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d2-051

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

An agent has two tools: `analyze_content` ('Analyses content') and `extract_web_results` ('Extracts data from web pages'). After a system prompt update added 'Always analyse content before responding', the agent started routing web-extraction tasks to `analyze_content` despite the unchanged descriptions. What is the most likely cause and fix?

- [ ] **A**: The analyze_content tool should be renamed to something less generic, such as summarize_document, to avoid all future conflicts, since a distinctive name cannot collide with instruction wording however the prompt is phrased. The new name also documents the tool's real scope.
- [ ] **B**: The tool descriptions need few-shot examples added to the system prompt showing when to use each tool, so the model sees worked examples of the boundary instead of inferring it from two similar names.
- [x] **C**: The keyword 'analyse content' in the system prompt creates an unintended association with the analyze_content tool, overriding tool descriptions. Review and rephrase the system prompt to remove keyword overlap with tool names.
- [ ] **D**: The tool descriptions have degraded over time and need to be rewritten with clearer boundaries between the two tools, since descriptions written against an older tool set drift as the surface area grows.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Keyword-sensitive instructions in system prompts can create unintended tool associations that override well-written descriptions. The phrase 'analyse content' directly matches the tool name, causing the model to favour it regardless of the task. The fix is to review and rephrase the system prompt after any update.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d3-049

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A consultancy works across 12 client projects simultaneously. Each developer has personal preferences (editor keybindings, alias shortcuts) and the consultancy has firm-wide coding standards. Each client project has its own specific conventions. Some client projects have subsystems with additional specialised rules. What is the correct configuration architecture?

- [ ] **A**: User ~/.claude/CLAUDE.md for everything; use @ path imports to pull in project-specific files from each repository, so one file stays the single source of truth and each repository contributes only its own additions at import time rather than duplicating the firm standards
- [ ] **B**: User ~/.claude/CLAUDE.md for personal preferences and firm-wide standards; project .claude/CLAUDE.md for client-specific conventions; directory-level CLAUDE.md or .claude/rules/ with paths for subsystem-specific rules, which keeps firm-wide standards beside the personal settings that rarely change and away from the client repositories
- [ ] **C**: A single CLAUDE.md at the root of each project containing all four levels of configuration, with clear section headings, so every level is visible in one file per project and no import resolution or lookup order is involved
- [x] **D**: User ~/.claude/CLAUDE.md for personal preferences; project .claude/CLAUDE.md for firm-wide standards and client-specific conventions (firm-wide standards kept in a shared file and pulled into each project with an @import); directory-level CLAUDE.md or .claude/rules/ with paths for subsystem-specific rules

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Personal preferences are per-developer, so they live at user level, which is not shared via version control. Firm-wide standards and client conventions must reach everyone who works on a project, so they belong at the project level, which is committed to the repository and distributed on clone; firm-wide standards can be kept in a shared file and pulled into each project's CLAUDE.md with an @import to stay modular. Putting shared standards at the user level is the classic hierarchy bug, where a colleague who clones a project would not receive them. Subsystem rules belong at the directory level or in path-scoped .claude/rules/.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d5-066

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A multi-agent research system produces a synthesis report on market trends. Two credible sources report different growth rates for the same sector: Source A reports 12% growth (2023 data) and Source B reports 8% growth (2024 data). The synthesis agent currently selects the more recent value. What is the correct approach?

- [ ] **A**: Always use the most recent source as it reflects the latest data and supersedes anything measured before it
- [ ] **B**: Average the two values and report 10% growth with a note about source variance, since the midpoint is the least biased single estimate available
- [ ] **C**: Flag the conflict and escalate to a human researcher for resolution before including in the report, so no unresolved discrepancy reaches the reader
- [x] **D**: Annotate both values with source attribution and publication dates, letting the consumer decide how to interpret the difference

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** This preserves provenance, temporal context, and both data points. The consumer can see that different dates explain different numbers.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d3-050

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

A team wants their CI pipeline to run Claude Code for both PR code review and automated test generation. The PR review should output structured JSON for integration with their review dashboard, while the test generation should produce standard text output. How should the two pipeline steps be configured?

- [x] **A**: Run the review step with -p --output-format json and the test generation step with -p only, as separate non-interactive invocations
- [ ] **B**: Run both steps with -p and configure the review dashboard to parse plain text output from both steps
- [ ] **C**: Run both steps in a single Claude Code session with -p, using different prompts to request different output formats
- [ ] **D**: Run both steps with --output-format json and have the test generation step extract code from the JSON response

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Each step uses -p for non-interactive mode. The review step adds --output-format json for structured output that the dashboard can parse reliably. The test generation step uses default text output since it produces code files, not structured data. Running them as separate invocations ensures session context isolation.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d4-058

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

The moderation system validates that every classification includes a 'reasoning' field explaining the decision. When validation fails (empty reasoning), the system retries. For most posts, the retry succeeds after feeding back the error 'reasoning field was empty — provide a brief justification for the classification.' However, for posts in unfamiliar languages, retries consistently fail. What should the system do?

- [ ] **A**: Increase the retry count from 1 to 5 for unfamiliar language posts since the model may succeed with more attempts, and sampling variation alone will eventually produce a populated reasoning field
- [x] **B**: Apply the retry boundary principle: retry format errors (empty reasoning on posts the model can analyse) but route capability failures (unfamiliar languages) to human review instead of retrying
- [ ] **C**: Add the unfamiliar language to the system prompt as a supported language to encourage the model to try harder, so it treats those posts as in scope and produces reasoning for them
- [ ] **D**: Remove the reasoning validation requirement for posts in unfamiliar languages, so the pipeline stops failing validation on posts the model was never able to explain in the first place

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The retry boundary distinguishes between fixable format issues and unfixable capability gaps. Empty reasoning on analysable posts is a format error that retries with error feedback can fix. Unfamiliar languages represent absent capability — no amount of retrying will create language understanding. Route these to human review.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d1-074

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A synthesis agent produces a report with several claims that have no source attribution. The web search and document analysis subagents are working correctly and returning well-sourced results. What is the most likely root cause?

- [ ] **A**: The synthesis agent's system prompt does not require citations, so nothing in its instructions asks for attribution
- [x] **B**: The coordinator is passing content to the synthesis agent without structured metadata (source URLs, document names, page numbers)
- [ ] **C**: The web search subagent needs to return results in a different format, since prose results cannot carry attribution through synthesis
- [ ] **D**: The synthesis agent needs access to the web search tool directly so it can cite the pages it retrieves itself

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Context passing must include structured data that separates content from metadata. Without source URLs and document names, the synthesis agent has no attribution information to include.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d5-067

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A multi-agent research system has three subagents (financial filings, news, technical white papers) and a synthesis agent. Each subagent returns properly attributed findings, but the final synthesised report has no source attribution: stakeholders cannot trace which claim came from which source. Which fix addresses the root cause?

- [ ] **A**: Append a bibliography section at the end of the report listing all sources each subagent consulted, so every source appears in the finished report even where an individual claim's origin is not stated inline
- [x] **B**: Require subagents to output structured claim-source mappings (claim, source URL, document name, excerpt, publication date) and instruct the synthesis agent to preserve and merge these mappings through the synthesis process
- [ ] **C**: Have each subagent include source URLs as inline hyperlinks in their prose output so the synthesis agent can preserve them as markup even when the surrounding prose is rewritten during synthesis
- [ ] **D**: Store all subagent outputs in a database and have the synthesis agent reference database entries by ID instead of incorporating content directly, so the full text stays out of its context

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Structured claim-source mappings survive synthesis because they are data structures, not prose that gets rewritten. The synthesis agent can merge mappings from multiple subagents while preserving the link between each claim and its source. This also enables content-appropriate rendering: financial data as tables, news as prose, technical findings as lists — each with attribution intact.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d3-051

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A DevOps team's polyglot codebase has Terraform files in terraform/, Kubernetes manifests in k8s/, and Dockerfiles scattered throughout various service directories. They want Claude Code to automatically apply infrastructure-specific conventions when editing each type of file, without loading all conventions for every session. What is the correct approach?

- [ ] **A**: Create three directory-level CLAUDE.md files: one in terraform/, one in k8s/, and one in the project root for Docker conventions, so each directory carries the conventions for the files beneath it
- [ ] **B**: Add all infrastructure conventions to the root CLAUDE.md with clear section headings so the model knows which section applies, keeping every convention in one file with no path globs to maintain
- [x] **C**: Create three .claude/rules/ files: terraform.md with paths: ["terraform/**/*", "**/*.tf"], kubernetes.md with paths: ["k8s/**/*"], and docker.md with paths: ["**/Dockerfile", "**/Dockerfile.*", "**/*.dockerfile"]
- [ ] **D**: Create a single .claude/rules/infrastructure.md file with paths: ["**/*"] containing all infrastructure conventions, so one rule file applies everywhere without maintaining three path patterns

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Each rule file targets specific infrastructure file types with appropriate glob patterns. Terraform conventions load only when editing Terraform files, Kubernetes conventions only for k8s manifests, and Docker conventions only for Dockerfiles — regardless of which directory the Dockerfiles are in. This provides token-efficient conditional loading for all three file types.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d4-059

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

A CI/CD system prompt defines two review categories with the instructions 'Check for security vulnerabilities in each function' and 'Check for performance issues in each loop'. The model frequently calls `performance_check` for security issues found inside loops, and `security_check` for performance issues in security-sensitive functions. What is the root cause and best fix?

- [ ] **A**: The model is confused because loops can have both security and performance issues; add a rule that security always takes priority over performance, giving it a deterministic tie-break whenever a finding could fall into either category and removes the ambiguity from the routing rule entirely
- [ ] **B**: Add more detailed tool descriptions explaining exactly when each tool should be called, so the model selects between them on description alone rather than on the wording of the instruction that produced the finding
- [x] **C**: Keyword overlap between instruction phrasing and tool names causes the model to associate 'loop' with performance and 'function' with security regardless of the actual issue; rewrite instructions and tool descriptions to use distinct, non-overlapping terminology
- [ ] **D**: Force tool_choice to 'auto' and let the model determine the correct tool based on the content of each finding, so routing follows the finding itself rather than a selection forced by the caller

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** When instruction text like 'check for security in each function' overlaps with tool name patterns, the model conflates instruction keywords with tool selection cues. Using distinct terminology for instructions versus tool names eliminates this cross-contamination.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d5-068

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A developer has been using the data platform agent in a single extended session for two hours, running complex federated queries, debugging SQL syntax, and iterating on report formatting. The agent now produces noticeably worse SQL and occasionally references table schemas from earlier queries that have since been corrected. What is the most effective intervention?

- [x] **A**: Use the /compact command, optionally passing focus instructions, to summarise the conversation so far and free context budget for current-state reasoning.
- [ ] **B**: Start a completely new session and re-establish all context from scratch, so nothing stale carries over into the new one.
- [ ] **C**: Increase the model's temperature parameter to improve creativity and reduce fixation on stale patterns, so it stops reproducing the same outdated schema assumptions.
- [ ] **D**: Add a system prompt instruction telling the agent to ignore all schema information from more than 30 minutes ago, so anything older than the current schema is disregarded.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Extended sessions cause context degradation as stale information (outdated schemas, abandoned approaches) competes with current context. /compact summarises the conversation history into a compressed form, freeing context budget. The optional [instructions] argument lets you bias the summary (for example, 'preserve the corrected schema for the orders table'). It is the documented mitigation for context degradation in long sessions, and the least disruptive option of the four.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d1-075

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

The team's refactoring pipeline uses a PreToolUse hook to enforce that every new microservice includes a Dockerfile. However, the hook only checks for Dockerfile existence at the moment the create_service tool is called. A developer points out that some services have their Dockerfiles added in a later commit by a different subagent. What is the flaw in this approach?

- [ ] **A**: The hook should use PostToolUse instead of PreToolUse, checking after service creation whether a Dockerfile was added, so the check sees the finished service rather than the intent
- [ ] **B**: The hook should run on every file write operation to continuously check whether a Dockerfile has been created yet, so the requirement is enforced continuously rather than at one point
- [x] **C**: The hook should block the final deployment or merge tool rather than create_service, verifying Dockerfile existence at the point where the service is considered complete
- [ ] **D**: The PreToolUse hook is correct but needs a timeout to wait for the Dockerfile to appear within a configurable window, so a Dockerfile written moments later still satisfies the gate

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Compliance checks should be enforced at the boundary where the precondition must hold — in this case, before deployment or merge. Checking at service creation time is too early when the workflow allows Dockerfiles to be added in subsequent steps. Moving the gate to the deployment or merge boundary ensures all required artefacts are present regardless of which subagent adds them.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d2-052

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

The data platform's fetch_api tool calls a third-party pricing API. When the API key has expired, the tool returns { "data": [], "status": "ok" } instead of signalling an authentication failure. The agent tells the user 'No pricing data is available for that product' and moves on. What is the root cause?

- [ ] **A**: The agent should be instructed via the system prompt to treat empty arrays as errors and retry with exponential backoff, since an empty array is the observable symptom the agent can act on.
- [ ] **B**: The third-party API is poorly designed. The platform team should switch to a different pricing provider that returns proper HTTP error codes, since in-band failure signalling cannot be fixed downstream.
- [x] **C**: The tool does not distinguish between an access failure (expired API key) and a valid empty result (no data exists), so the agent treats a permission error as a legitimate empty response.
- [ ] **D**: The agent's context window is too small to hold the full API response, so it receives a truncated version that arrives with its contents dropped but its status field intact.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The tool returns the same structure for two fundamentally different outcomes: 'I could not access the data' versus 'I accessed the data and found nothing.' The agent cannot distinguish these and accepts the empty result at face value. The tool must return a structured error with the MCP isError flag for authentication failures.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d2-053

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.2

A `query_postgres` MCP tool returns 500 on transient server overload and 404 on missing tables. The agent retries both identically, exhausting retries on missing tables and then failing to retry once the server recovers. What change to the error response structure would fix this?

- [ ] **A**: Return all errors with the MCP isError flag set to true and include the HTTP status code in the error message text so the agent can parse it and branch on the code it finds.
- [ ] **B**: Remove the retry logic entirely and escalate all errors to the user immediately for manual resolution, since a person can tell a missing table from an overloaded server at a glance.
- [x] **C**: Classify errors into structured categories — transient (server overload, network timeout) and validation (missing table, invalid column) — with the MCP isError flag and a category field, so the agent retries only transient errors.
- [ ] **D**: Increase the retry limit from 3 to 10 so the agent has enough attempts to cover both transient and permanent errors, since overloads clear well within the raised limit and permanent failures cost only a few extra calls.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Structured error categories give the agent explicit guidance on recovery strategy. Transient errors (overload, timeout) warrant retries. Validation errors (missing table, invalid column) are permanent and should not be retried. This eliminates wasted retries on unrecoverable errors.
> 
> *Guide Reference:* D2 · Implement structured error responses for MCP tools

---

### Question ID: d5-069

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.3

The data platform agent queries three sources in sequence: Snowflake (succeeds), PostgreSQL (returns a connection timeout), and a pricing API (succeeds). The agent silently skips the PostgreSQL failure and produces a report using only Snowflake and API data, without informing the user that customer data is missing. What is the critical design failure?

- [ ] **A**: The agent should retry the PostgreSQL query automatically with exponential backoff before producing the report, so a transient timeout resolves before assembly begins.
- [ ] **B**: The orchestrator should pre-check all data source connections before allowing the agent to begin querying, so a source that is down is known before any query is issued.
- [ ] **C**: The agent should abort the entire report if any single data source fails, to avoid producing incomplete results, so nothing is published that silently rests on partial data.
- [x] **D**: The agent silently suppresses the error instead of propagating structured error context that annotates which data sources failed and what coverage the report actually has.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Silent error suppression is one of the most dangerous anti-patterns in multi-source systems. The agent must propagate structured error context — identifying which sources failed, what data is missing, and what coverage the final report represents — so the user can make informed decisions about the report's completeness.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d3-052

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A team wants a /review command available to everyone who clones the repository. A developer also wants a personal /brainstorm skill that produces verbose codebase analysis output without cluttering the main conversation. Where should each be created and what configuration does the skill need?

- [ ] **A**: Both in .claude/commands/ with the brainstorm skill using context: fork
- [ ] **B**: Both in ~/.claude/commands/ with instructions for each developer to copy them locally
- [ ] **C**: /review in CLAUDE.md as a documented procedure; /brainstorm in .claude/skills/ with allowed-tools restrictions
- [x] **D**: /review in .claude/commands/ for team sharing; /brainstorm as a SKILL.md in ~/.claude/skills/ with context: fork frontmatter

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** /review needs to be project-scoped (.claude/commands/ or equivalently .claude/skills/) so it is shared via version control. Both paths create identical /commands. /brainstorm is personal, so it goes in ~/.claude/skills/. context: fork isolates the verbose analysis output from the main conversation.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d5-070

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

An agent receives 200 rows of Snowflake financial data and places it mid-prompt, between system instructions and the user's follow-up question. Asked to identify the row with the highest margin, the agent picks the 45th row (margin 32%) over the 142nd row (margin 47%). What cognitive bias is affecting the agent?

- [ ] **A**: Recency bias — the agent prioritises data appearing near the end of the context window, and this result set sits before the follow-up question.
- [x] **B**: The lost-in-the-middle effect — the agent attends more to data at the beginning and end of the result set, missing the highest-margin row buried in the middle.
- [ ] **C**: Token limit truncation — the result set exceeds the context window and rows beyond the 100th are silently dropped, so they never reach the model at all.
- [ ] **D**: Anchoring bias — the agent fixates on the first high-margin row it encounters and stops scanning the rest, judging later rows against that anchor.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The lost-in-the-middle effect causes LLMs to attend disproportionately to content at the start and end of long sequences, with reduced attention to material in the middle. Row 142 (the correct answer) sits deep in the middle of the 200-row result set, making it prone to being overlooked.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-076

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A refactoring agent decomposes a legacy Java monolith into microservices. Its loop terminates by parsing the assistant's last message for the phrase 'refactoring complete', running 20 iterations even on simple classes. Logs show stop_reason returns 'end_turn' after iteration 4. What is the correct fix?

- [ ] **A**: Improve the phrase detection to also check for 'finished', 'done', and 'all changes applied', covering the phrasings the model actually uses when it stops
- [ ] **B**: Add a tool that the agent must call explicitly to signal completion, and check for that tool call each iteration, so the loop reads a tool call instead of prose
- [ ] **C**: Lower the iteration cap to 5 so the agent stops sooner for simple classes and a run that has stopped making progress ends earlier
- [x] **D**: Replace the natural language parsing with stop_reason inspection — exit the loop when stop_reason is 'end_turn' and continue only when it is 'tool_use'

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Parsing natural language for termination is an anti-pattern. The stop_reason field is the authoritative, deterministic signal for agentic loop control. 'tool_use' means Claude has more work to do; 'end_turn' means it considers the task complete.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d5-071

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

An agent joins Snowflake revenue data with PostgreSQL customer data via federated queries. To manage context, it progressively summarises earlier results between rounds. After three rounds it reports 'revenue increased in Q3' but cannot give the exact figure ($14.2M), which was lost in summarisation. The user asks for the precise number. What is the most effective fix?

- [ ] **A**: Re-run the original Snowflake query to retrieve the exact Q3 revenue figure from the source of record whenever it is needed. The source of record is the only place the figure is guaranteed to be unrounded.
- [ ] **B**: Increase the context window size so that summarisation is triggered less frequently and fewer passes touch the figures. Fewer summarisation passes means fewer chances for a figure to be rewritten as prose.
- [x] **C**: Extract key numerical facts (revenue figures, dates, counts) into a persistent facts block that is included in every prompt, outside the summarised conversation history.
- [ ] **D**: Instruct the agent to always include exact figures in its summaries rather than qualitative statements, so the numbers carry through unchanged. Summaries that keep the digits intact preserve the joined figures.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The progressive summarisation trap destroys numerical precision when conversation history is compressed. A persistent facts block preserves exact figures, dates, and identifiers across summarisation rounds, directly solving the data loss problem.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d2-054

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

An enterprise data platform agent has 22 tools available, including query tools for Snowflake, PostgreSQL, and third-party APIs, plus data transformation, visualisation, export, and administrative tools. The team notices the agent frequently selects the wrong query tool — choosing the Snowflake tool for data that lives in PostgreSQL. What is the most effective architectural fix?

- [ ] **A**: Improve the descriptions of all 22 tools to include explicit boundaries and data source mappings.
- [x] **B**: Split the agent into role-specific agents — a query agent with 4-5 data source tools, a transformation agent, and an export agent — each scoped to its specialisation.
- [ ] **C**: Add a pre-processing step that analyses the user query to determine which data source is needed, then use tool_choice forced selection to call the correct query tool.
- [ ] **D**: Consolidate all query tools into a single universal_query tool that internally routes to the correct data source based on the query syntax.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Tool overload at 22 tools degrades selection reliability. Splitting into role-specific agents with 4-5 tools each reduces decision complexity and scopes each agent to its specialisation. The query agent can focus on selecting the right data source without being distracted by transformation or export tools.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d4-060

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your CI/CD pipeline processes code reviews using the Message Batches API. After a batch completes, you need to match each review result back to the corresponding pull request. What is the correct mechanism for correlating batch results with their original requests?

- [x] **A**: Use the custom_id field in each batch request to store the pull request identifier, then match results by custom_id
- [ ] **B**: Rely on the batch API returning results in the same order they were submitted
- [ ] **C**: Parse the review content to identify which pull request it refers to based on file names mentioned in the review
- [ ] **D**: Submit each pull request as a separate batch of one item to maintain correlation through the batch ID

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The custom_id field exists specifically for correlating batch request/response pairs. Setting it to the pull request identifier provides reliable, direct correlation without relying on result ordering or content parsing.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d5-072

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

An analytics agent queries Snowflake and receives 40+ columns per row, only 5 of which are relevant to the user's question about quarterly revenue. The agent appends the full result set to context. After three such queries the window is nearly full and follow-up questions fail. What is the most effective fix?

- [ ] **A**: Upgrade to a model with a larger context window so that full result sets can be accommodated across more queries.
- [x] **B**: Trim tool results to only the relevant columns before appending them to the conversation context.
- [ ] **C**: Store all query results in an external database and have the agent retrieve specific values on demand instead of keeping results in context.
- [ ] **D**: Limit the number of rows returned by each query to reduce the total data volume in context.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Tool result trimming removes irrelevant fields before they enter the context window. Keeping only the 5 relevant columns from each 40+ column result set dramatically reduces token consumption, allowing the agent to handle many more queries within the same context budget.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d3-053

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A growing project's CLAUDE.md has reached 800 lines covering API design rules, testing conventions, deployment procedures, and frontend style guides. Most of those topics only matter when working in the matching part of the codebase (API rules in /api, frontend rules in /web, etc.). Developers report attention dilution: Claude Code is increasingly inconsistent on specific conventions. What is the recommended fix to reduce the per-session token load while preserving coverage?

- [ ] **A**: Split CLAUDE.md into per-topic files referenced with @ path imports so each topic lives in its own file and loads only when its import is resolved for that turn
- [x] **B**: Move topic-scoped sections into .claude/rules/{topic>.md files with YAML frontmatter that scopes each rule to the relevant paths, so each rule only loads when Claude is working in that area
- [ ] **C**: Claude Code has a hard limit of 500 lines for CLAUDE.md files; trim the file to fit within the limit, after which it loads reliably on every turn instead of being truncated
- [ ] **D**: Duplicate the CLAUDE.md content across directory-level CLAUDE.md files in each subdirectory, so each one carries a copy of the conventions closest to the code it governs

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Path-scoped .claude/rules/ files are the documented way to reduce per-session context for guidance that only applies to part of the codebase. With frontmatter like `paths: ["api/**"]`, the API rules only load when working in /api; the frontend rules only load when working in /web; and so on. CLAUDE.md keeps only the genuinely cross-cutting standards. This actually shrinks the loaded context — unlike @ imports, which load eagerly.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d2-055

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

The data platform team has built an MCP server with 22 tools: query_snowflake, query_postgres, query_api, plus 19 specialised tools for individual data transformations (pivot_table, calculate_percentile, normalise_currency, etc.). Agents take 3-4 turns to select the correct tool and frequently choose the wrong transformation. What is the most effective redesign?

- [x] **A**: Consolidate the 19 transformation tools into a single transform_data tool with a transform_type parameter, reducing the total to 4 tools.
- [ ] **B**: Improve all 22 tool descriptions with detailed examples and boundary conditions to help the agent distinguish between them.
- [ ] **C**: Use tool_choice: 'any' to force the agent to always call a tool, eliminating turns where the agent reasons without acting.
- [ ] **D**: Split the tools across two separate MCP servers — one for queries and one for transformations — to reduce cognitive load.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Reducing from 22 to 4 tools brings the count within the optimal 4-5 range for reliable tool selection. The 19 transformation tools share a common pattern (input data, transformation type, output format) and are natural candidates for consolidation into a single parameterised tool.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d3-054

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A developer is migrating a monorepo from CommonJS to ES modules: 80+ files, multiple valid strategies, knock-on effects in build tooling, test configuration, and `package.json`. They start in direct execution mode and begin converting files. Halfway through, the chosen import resolution strategy breaks the test runner. What went wrong?

- [x] **A**: The developer should have used plan mode to explore the codebase, map dependencies, and evaluate migration strategies before committing to an approach
- [ ] **B**: The developer should have provided more detailed upfront instructions to direct execution specifying the exact migration pattern for every file type
- [ ] **C**: The developer should have used the interview pattern to have Claude ask questions about the migration before starting
- [ ] **D**: The developer should have written a complete test suite first and iterated by sharing test failures

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** An 80+ file migration with multiple valid strategies and cross-cutting concerns (build tooling, test configuration, package.json) is a textbook plan mode scenario. Plan mode would have revealed the test runner incompatibility before any files were changed. Starting with direct execution for a complex, multi-approach task risks costly rework.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d3-055

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

The team wants three Claude Code instances working in parallel: one extracting the authentication service, one extracting the billing service, and one updating shared libraries. All three need to commit to the same repository without conflicts. What is the correct setup?

- [ ] **A**: Run all three instances in the same working directory on separate branches, switching branches as needed
- [x] **B**: Use git worktree to create three separate working directories, each on its own branch, with one Claude Code instance per worktree
- [ ] **C**: Clone the repository three times into separate directories and merge the results manually
- [ ] **D**: Use fork_session to run the three tasks as parallel branches within a single Claude Code session

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** git worktree creates multiple working directories from the same repository, each checked out to a different branch. Each Claude Code instance operates in its own isolated file system while sharing the same git history. This eliminates file system conflicts between parallel instances.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d4-061

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

Your CI/CD code review system analyses pull requests averaging 8-12 files. Reviews are thorough on the first few files but become increasingly superficial on later files, sometimes missing obvious issues. What architectural change best addresses this pattern?

- [ ] **A**: Randomise the file order before each review so different files get thorough treatment and none is consistently last in line for the model's attention
- [x] **B**: Split the review into per-file analysis passes where each file gets dedicated attention, followed by a cross-file integration pass for inter-file concerns
- [ ] **C**: Increase the model's context window to give it more space to analyse all files, so all 12 fit comfortably and none is crowded out by the others
- [ ] **D**: Add a second full-PR review pass and merge findings from both passes, so a file skimmed in the first pass gets a closer look in the second

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Per-file analysis ensures each file receives consistent, thorough attention. The cross-file integration pass then catches issues that span multiple files, such as inconsistent interfaces or data flow problems. This directly solves attention dilution.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d2-056

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

An MCP server exposes a `query_database` tool for Snowflake. Agents ignore it and run SQL via the built-in Bash tool against the Snowflake CLI, even though the MCP tool returns structured results with column types and pagination that Bash does not. What is the most likely cause and fix?

- [x] **A**: The query_database tool has a sparse description that does not explain its capabilities, so the agent defaults to the familiar Bash tool. Enhance the MCP tool description to detail its structured output, pagination, and advantages over raw CLI queries.
- [ ] **B**: The MCP server is not properly connected. Restart the MCP server and verify the connection with a test query, since an agent silently falls back to Bash whenever an MCP tool fails to register at session start. and that fallback is silent in both directions.
- [ ] **C**: Disable the Bash tool entirely so the agent is forced to use the MCP tool for all operations, so the only remaining path to Snowflake is the MCP tool and the choice disappears from the agent's options.
- [ ] **D**: Add a system prompt instruction telling the agent to always use query_database instead of Bash for SQL queries, since an explicit routing instruction outranks whatever tool-selection habits the model brings.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When MCP tool descriptions are sparse, agents prefer familiar built-in tools like Bash. Enhancing the description to explain capabilities — structured results, column types, pagination — gives the agent enough information to prefer the MCP tool for database queries.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d1-077

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

During the monolith-to-microservices refactoring, each extracted service must follow a consistent Java package naming convention (com.company.service.{service-name>). The team notices that subagents sometimes use inconsistent package names like com.company.app.{service-name> or com.company.{service-name>. A team member proposes adding stronger instructions to the system prompt. What is the correct approach?

- [ ] **A**: Add the naming convention to the system prompt with three concrete examples showing the correct pattern
- [ ] **B**: Create a separate validation subagent that reviews all written files for naming compliance after each refactoring batch
- [x] **C**: Implement a PostToolUse hook that inspects written files and normalises any package declarations to the correct com.company.service.{service-name> format
- [ ] **D**: Use tool_choice to restrict the agent to a custom write_java_file tool that enforces the naming convention in its implementation

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A PostToolUse hook on file write operations can inspect the output and normalise package names deterministically. This provides a 100% enforcement guarantee regardless of what the model generates, which is the correct approach for structural consistency rules.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d4-062

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your Claude Code setup uses a complex system prompt with detailed review instructions, code examples, and few-shot demonstrations that total 4,000 tokens. Each code review request adds 500-2,000 tokens of code to review. The team wants to optimise costs since the same review instructions are used for every request. What is the most effective optimisation?

- [ ] **A**: Shorten the system prompt by removing few-shot examples to reduce per-request token costs, cutting the largest fixed component of every request
- [ ] **B**: Reduce the number of few-shot examples from 4 to 1 and lower the temperature to compensate for the reduced guidance, trading examples for determinism
- [ ] **C**: Switch all code reviews to the Message Batches API for 50% cost savings, since batch pricing halves the cost of every review
- [x] **D**: Enable prompt caching with the static review instructions and examples at the beginning of the prompt, placing the dynamic code-to-review at the end

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Prompt caching caches the static prefix and reuses it across requests. With 4,000 tokens of static content reused for every review, caching provides significant cost savings without sacrificing review quality. Dynamic code goes at the end so the prefix remains cacheable.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d1-078

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

A Claude Code agent has been working on a feature branch for 45 minutes and has accumulated extensive context about the codebase. The developer notices that several tool results from early in the session (file reads from 40 minutes ago) are now stale because a colleague pushed changes to those files. The agent is making recommendations based on the outdated file contents. What is the best recovery strategy?

- [ ] **A**: Continue in the current session and ask the agent to re-read the changed files, so it refreshes its view without losing what it has learned
- [x] **B**: Start a fresh session with a summary injection that captures the key findings and decisions from the previous session, then read the changed files for current state
- [ ] **C**: Start a completely new session with no context from the previous session, so nothing stale can mislead it on the second attempt
- [ ] **D**: Use fork_session to create a new branch that excludes the stale tool results, keeping the useful context and dropping only what is outdated

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Fresh start with summary injection is the prescribed recovery strategy for stale tool results. It preserves the valuable insights and decisions from the previous session while eliminating the stale data. Reading the changed files in the new session ensures the agent works from current state.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-079

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A team runs a coordinator agent that delegates refactoring work to three specialist subagents: a schema-migration agent, an API-layer agent, and a test-update agent. The test-update agent frequently produces tests that reference database schemas the schema-migration agent has already renamed. The subagents do not communicate with each other. What is the root cause?

- [ ] **A**: The subagents need a shared message bus so the test-update agent can query the schema-migration agent for the latest schema names
- [ ] **B**: The test-update agent should have read access to the schema migration files so it can discover the new names itself
- [ ] **C**: The schema-migration agent and test-update agent should run sequentially rather than in parallel to avoid race conditions
- [x] **D**: The coordinator is not passing the schema-migration agent's output (including renamed schemas) as context when delegating to the test-update agent

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** In hub-and-spoke orchestration, the coordinator manages all inter-agent communication. Subagents do not inherit each other's context. The coordinator must explicitly pass relevant outputs from earlier subagents as context to downstream subagents. Here, the renamed schema mappings must be injected into the test-update agent's context.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d2-057

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A developer is investigating a production bug. They know the error message 'InvalidStateTransition' is logged somewhere in the codebase, but they do not know which files contain it or where the state machine is defined. What is the correct tool sequence to locate the bug?

- [ ] **A**: Use Glob for '**/*state*' to find state machine files, then Read each one to search for the error message, narrowing the search to the files most likely to raise it.
- [ ] **B**: Use Edit to search for 'InvalidStateTransition' and replace it with a more descriptive error message, which locates every occurrence in the codebase as it rewrites them.
- [ ] **C**: Use Read on common file locations like src/index.ts and src/app.ts to find the error manually, checking the entry points where such errors are usually raised.
- [x] **D**: Use Grep to search for 'InvalidStateTransition' across the codebase, then Read the matching files to understand the surrounding code and state machine logic.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Grep searches file contents, making it the correct tool to locate all occurrences of the error string regardless of file name. Read then loads only the relevant files to understand context. This is the minimal, targeted approach.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d3-056

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

The team's CLAUDE.md specifies that all new microservices must include integration tests that verify API contract compliance and database migration rollback. A developer notices that Claude Code sometimes generates unit tests that mock the database instead of writing the required integration tests. What should the team add to their configuration?

- [x] **A**: Tighten the CLAUDE.md test rule with concrete criteria — real database connections, API contract assertions, plus an example test structure
- [ ] **B**: A PostToolUse hook that rejects any test file containing mock annotations, so a mocked test can never reach the branch
- [ ] **C**: A separate testing subagent that reviews generated tests and rewrites any that use mocks, so mocks are replaced automatically after generation
- [ ] **D**: A .claude/rules/ file with paths: ["**/*Test.java"] that instructs Claude Code to never use mocks, scoping the prohibition to exactly the files it applies to

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** CLAUDE.md is the correct location for persistent test standards. Specifying concrete criteria (real database connections, API contract assertions) with examples of expected structure and fixtures gives Claude Code an unambiguous target. This addresses the root cause: the existing instructions were not specific enough about what 'integration tests' means in this codebase.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d2-058

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A team's shared `.mcp.json` configures a PostgreSQL MCP server. A developer adds a personal staging database MCP server to their `~/.claude.json`, so both database tools are available in their session. When they query 'check user count', the agent calls the production tool instead of staging. What is the best resolution?

- [ ] **A**: Remove the production database from .mcp.json during testing so only the staging server is available, which means only one Postgres tool is visible at a time and the ambiguity cannot arise during the testing window at all, with no change needed on the agent side once testing finishes.
- [ ] **B**: Move the staging database configuration into .mcp.json alongside the production one so both are at the same configuration level, which means the agent resolves them at equal precedence and picks between the two on their descriptions rather than on which configuration file happened to load first.
- [x] **C**: Rename the staging tool to a distinct identifier (e.g. `query_postgres_staging`), update its description to call out the target environment, and add a developer-level system instruction stating that staging tools take precedence during the session. The agent then has both a distinct name and an explicit routing rule.
- [ ] **D**: Use tool_choice with forced selection of the staging database tool for all turns during testing, so every turn is pinned to staging and the production server is unreachable for the duration of the test run regardless of how the two tools happen to be named.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Description tuning alone cannot route a context-free prompt like 'check user count' because the user gave the agent no environment cue. The fix is to make the two tools structurally distinguishable (distinct names, environment in the description) and to give the agent an explicit routing rule for the session. Renaming sits inside the developer's own ~/.claude.json so it does not affect the shared team configuration.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d3-057

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A developer is new to a healthcare compliance domain and needs to build an audit logging system. They understand the technical implementation options but are unsure about regulatory requirements that might affect the design. Which Claude Code workflow technique is most appropriate?

- [ ] **A**: Provide concrete input/output examples of the desired audit log format and let Claude implement it, so the target shape is unambiguous before any code is written
- [ ] **B**: Use plan mode to have Claude explore the codebase and propose multiple audit logging architectures, so the options are laid out in full before one is chosen
- [x] **C**: Use the interview pattern so Claude asks clarifying questions about compliance requirements, data retention policies, and access control needs before proposing a design
- [ ] **D**: Start with direct execution using a simple implementation and iterate based on test failures, so the gaps surface as failing tests rather than as open questions

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The interview pattern is specifically designed for unfamiliar domains where the developer might miss important considerations. By having Claude ask probing questions about regulatory requirements, the developer surfaces constraints they might not have considered, leading to a more compliant design.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d5-073

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.3

A multi-agent system runs a 45-minute deep research workflow. Around the 30-minute mark, the coordinator's synthesis quality drops: it refers to 'the key findings' instead of specific statistics it cited earlier, and misattributes a claim from the financial subagent to the news subagent. No token limits or errors have been hit. What is the most likely diagnosis and correct mitigation?

- [ ] **A**: The model is experiencing 'fatigue' from a long session and needs a cooldown period before continuing, so a short pause restores the quality of its synthesis when the workflow resumes and no change to the context handling is required
- [x] **B**: Context degradation: the accumulated conversation has pushed early subagent results far back in the context, reducing the model's effective attention to those details. Implement periodic context consolidation that extracts key findings into a structured summary block placed near the end of the context
- [ ] **C**: The token limit has been silently exceeded and the API is truncating early messages. Upgrade to a larger context window model, since the early findings are physically absent from the request rather than merely far back in it, and only more room can bring them back and no amount of consolidation can recover what is gone
- [ ] **D**: The subagents are returning inconsistent data, confusing the coordinator. Add data validation to each subagent's output before it reaches the coordinator, so it is reconciling contradictory inputs rather than losing track of findings that were consistent all along

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Context degradation occurs when important information is buried deep in a long conversation. The model's attention to early content diminishes as new content accumulates. Consolidating key findings into a recent, structured block keeps them in the model's effective attention window without losing the specifics.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d2-059

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A developer productivity platform has a code review agent equipped with 18 tools covering code analysis, documentation lookup, test generation, dependency checking, security scanning, and deployment validation. Reviews are slow and the agent frequently selects the wrong tool. What is the most effective architectural change?

- [ ] **A**: Add detailed descriptions to all 18 tools to improve selection accuracy, without changing the agent's structure or its tool count.
- [ ] **B**: Implement a routing classifier that pre-selects the appropriate tool before each agent turn, so the model is handed one candidate instead of choosing among eighteen.
- [ ] **C**: Switch tool_choice from 'auto' to 'any' so the model is forced to select a tool on every turn rather than answering from memory when it is unsure.
- [x] **D**: Split the agent into role-specific agents with 4-5 tools each, scoped to their specialisation (e.g. separate agents for code analysis, security scanning, and test generation).

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The recommended range is 4-5 tools per agent. Splitting into role-specific agents with scoped tools eliminates decision complexity and prevents cross-specialisation misuse. Each agent excels within its narrow remit.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d3-058

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

Project-level `.claude/CLAUDE.md` says 'use 4-space indentation matching the existing codebase.' A senior architect has 'use 2-space indentation' in their user-level `~/.claude/CLAUDE.md`. In recent sessions the architect's code has come back in 2 spaces and broken the build. The team needs a guarantee that 4-space indentation is applied on every save. What should they do?

- [ ] **A**: Leave the rule in project-level `.claude/CLAUDE.md` — the more specific scope wins on conflicts, so the project rule will override the architect's user-level preference wherever the two disagree
- [x] **B**: Add a PostToolUse hook that runs the team's formatter (e.g. `prettier --use-tabs=false --tab-width=4 --write`) after every Write/Edit, so 4-space indentation is enforced regardless of what Claude generates
- [ ] **C**: Ask the architect to delete their user-level `~/.claude/CLAUDE.md` so there is no conflict to resolve, removing the competing preference at its source so only one rule remains in play
- [ ] **D**: Move the 4-space rule into a `CLAUDE.local.md` at the project root so it is appended last and reads after the user-level file, so the later file wins on load order

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Anthropic's memory docs are explicit that CLAUDE.md is delivered as a user message with 'no guarantee of strict compliance,' and that 'if two rules contradict each other, Claude may pick one arbitrarily.' The docs themselves point at hooks for this case: hooks 'execute as shell commands at fixed lifecycle events and apply regardless of what Claude decides to do.' A PostToolUse hook running the formatter is the only option here that gives a hard guarantee.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d4-063

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Your CI/CD pipeline uses a system prompt with a tool named 'check_security' and also includes instructions that say 'check the security of each function'. Developers report that the model sometimes produces a text-based security analysis instead of calling the check_security tool. What is the most likely cause?

- [x] **A**: Keyword overlap between the instruction text 'check the security' and the tool name 'check_security' causes the model to confuse instruction-following with tool invocation
- [ ] **B**: The model's temperature is too high, causing random tool selection, so the same finding routes to a different tool on each run with no stable pattern
- [ ] **C**: The model cannot call tools from within a CI/CD pipeline context, since tool use requires an interactive session the pipeline does not provide
- [ ] **D**: The system prompt is too long, causing the model to skip tool definitions past the point where it truncates

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When system prompt instructions use phrasing that closely mirrors tool names, the model can interpret 'check the security' as a general instruction rather than a trigger for the check_security tool. Distinct naming reduces this ambiguity.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d3-059

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A team is debugging a complex distributed system issue. The lead developer wants to use Claude Code to explore logs, trace request flows, and form hypotheses without making any changes to the codebase. Partway through the investigation, they identify a one-line fix in a configuration file and want to apply it immediately. What is the optimal workflow?

- [ ] **A**: Use allowedTools to restrict to read-only tools for investigation, then start a new session with write permissions for the fix
- [ ] **B**: Use direct execution throughout, with detailed upfront instructions describing both the investigation process and potential fix patterns
- [ ] **C**: Use plan mode for the entire session, including the one-line fix, to maintain consistency
- [x] **D**: Start in plan mode for investigation, then switch to direct execution for the one-line fix once identified

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Plan mode is ideal for the investigation phase: exploring logs, tracing flows, and evaluating multiple hypotheses without committing to changes. Once the fix is identified and well-understood (a clear-scope, single-file change), switching to direct execution applies it efficiently without unnecessary planning overhead.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d1-080

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A developer-tool agent writes code and runs shell commands. A system prompt instruction ('Do not run destructive commands or access files outside the project') is violated 3% of the time in testing. The team requires this rule to hold absolutely. What should the architect implement?

- [ ] **A**: Strengthen the system prompt with more specific examples of forbidden commands and add few-shot demonstrations, so the boundary is stated precisely enough to follow
- [x] **B**: Implement PreToolUse hooks that inspect shell commands for destructive patterns and validate file paths against the project directory before execution
- [ ] **C**: Implement PostToolUse hooks that detect and roll back destructive commands after they execute, so any damage is reverted before it reaches the repository
- [ ] **D**: Remove the shell execution tool entirely to prevent any possibility of destructive commands, so the capability behind the incident no longer exists

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** PreToolUse hooks intercept tool calls before execution. A hook can pattern-match against destructive commands like 'rm -rf' and validate that file paths fall within the project directory, blocking any violation with 100% reliability. This is deterministic enforcement for a safety-critical requirement.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-081

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A coordinator using the Claude Agent SDK delegates a refactoring task to a code reviewer, a test generator, and a documentation writer in parallel, all working from the original code. The code reviewer recommends significant changes; once applied, the tests and documentation generated against the old API become invalid. What architectural fix prevents this?

- [ ] **A**: Have all three agents share memory so they can see each other's outputs in real time and adjust as the reviewed code changes
- [ ] **B**: Add a validation step at the end that checks whether tests and documentation match the final code, so any drift between the three is caught before the work is accepted
- [x] **C**: Use pipeline orchestration: run the code reviewer first, then pass the reviewed code to the test generator and documentation writer in parallel
- [ ] **D**: Instruct the coordinator to always run agents sequentially, one at a time, regardless of dependencies, so no agent ever runs on an input another is still changing

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The code reviewer's output changes the code that tests and documentation must target. Therefore, the code reviewer must run first. Once the reviewed code is stable, the test generator and documentation writer can run in parallel since they are independent of each other. This is a hybrid pattern: sequential then parallel.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d3-060

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A developer extracting the notification subsystem from a monolith faces 12 cross-module dependencies, 3 messaging patterns, and several valid extraction strategies. They start in direct execution mode. After moving 8 files, the chosen approach breaks circular dependencies with the user-profile module. What should they have done differently?

- [ ] **A**: Used direct execution but with more detailed upfront instructions specifying how to handle each dependency, so the model has the handling spelled out before it starts editing files
- [ ] **B**: Delegated the entire extraction to a subagent to isolate the risk, so a failed extraction stays contained inside the subagent and never touches the main session's context
- [ ] **C**: Used direct execution but processed only 2 files at a time to catch problems earlier, so a broken assumption surfaces after two files rather than after all twelve are rewritten
- [x] **D**: Used plan mode to explore the codebase, map all 12 module dependencies, identify circular dependencies, and evaluate extraction strategies before committing to an approach

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A subsystem with 12 dependencies, multiple messaging patterns, and several valid strategies is a textbook plan mode scenario. Plan mode would have mapped the dependency graph and revealed the circular dependency with user-profile before any files were moved, avoiding costly rework.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d1-082

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A multi-agent research system produces a report on 'renewable energy technologies' that only covers solar and wind, missing geothermal, tidal, biomass, and nuclear fusion. Each subagent produced thorough coverage of its assigned topic. Where is the root cause?

- [ ] **A**: The web search subagent's search queries were too narrow, so the sources retrieved covered only the two technologies the queries named
- [ ] **B**: The synthesis subagent failed to identify gaps in the research, so the missing categories were never flagged before the report was assembled
- [x] **C**: The coordinator's task decomposition only assigned solar and wind as subtopics, missing other renewable energy categories
- [ ] **D**: The document analysis subagent did not have access to sources covering other energy types, so those categories were absent from its material

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The coordinator is responsible for decomposing the broad topic into subtopics. If it only assigns solar and wind, no downstream agent can cover the missing categories. Trace failures to their origin.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d5-074

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A docs team has Claude Code synthesise an API reference guide from source across 50 modules. The guide states 'the authentication service supports OAuth2, SAML, and API key authentication' with no indication of which source files informed this. Six months later, after a major refactor, the team needs to verify whether the statement is still accurate. What is the core provenance failure and how should it be prevented?

- [ ] **A**: The failure is that the guide was not version-controlled. Storing it in git would allow the team to trace the statement back to the commit that generated it, and every claim could then be attributed to the revision of the source it was written from
- [ ] **B**: The failure is that Claude Code hallucinated the authentication methods. The team should run a separate verification pass to confirm each claim against the source code, since a verification pass is the only way to establish whether a stated method actually exists in the code the guide describes Nothing else establishes that the method exists.
- [x] **C**: The failure is loss of claim-to-source traceability during synthesis. Each factual claim should carry structured provenance linking it to specific source files (e.g., auth-service/src/providers/*.ts) and retrieval timestamps, enabling targeted re-verification of affected claims after refactoring
- [ ] **D**: The failure is that the documentation was generated in a single pass. Processing modules incrementally with human review after each module would catch inaccuracies before synthesis, since a reviewer sees each claim while the source is still in front of them

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Without claim-to-source mappings, the team must re-audit the entire codebase to verify a single statement. Structured provenance (source file, line range, retrieval date) makes verification targeted: check whether auth-service/src/providers/ still contains OAuth2, SAML, and API key implementations. The retrieval timestamp signals when the claim was last verified.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d1-083

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A developer's customer support agent sometimes terminates prematurely because they check if response.content[0].type == 'text' to determine completion. The agent stops even when Claude has more tools to call. What is the bug and how should they fix it?

- [ ] **A**: Add an iteration cap of 15 loops to ensure the agent runs long enough to finish the work it started
- [ ] **B**: Set tool_choice to 'any' so Claude always calls a tool instead of returning text, so a text reply can never be read as completion
- [ ] **C**: Parse the assistant's text for phrases like 'I have completed' before terminating, so completion is judged on what the model says it has done
- [x] **D**: Check the stop_reason field instead of content type — continue when stop_reason is 'tool_use', terminate when 'end_turn'

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The stop_reason field is the deterministic, authoritative signal for loop control. Claude can return text alongside tool_use blocks, so checking content type is unreliable.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d4-064

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

The moderation system uses tool_use with a JSON schema for classification output. All fields including 'sub_category' and 'target_demographic' are marked as required. Auditors discover that when a post is spam (which has no target demographic), the model fabricates plausible-sounding demographics like 'general public' or 'young adults.' What schema change prevents this fabrication?

- [ ] **A**: Add a validation step that rejects target_demographic values for spam posts, so the fabricated value is caught before it is ever stored
- [ ] **B**: Add a prompt instruction telling the model to leave target_demographic empty for spam posts, so the field stays blank when it does not apply
- [ ] **C**: Remove 'target_demographic' from the schema entirely since it causes fabrication, so a field that cannot be filled honestly is never requested A field the schema omits cannot be fabricated.
- [x] **D**: Make 'target_demographic' nullable so the model can return null when the field is not applicable, rather than being forced to fabricate a value

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Required fields pressure the model to produce a value even when none exists. Making the field nullable gives the model a legitimate way to indicate 'not applicable,' eliminating the incentive to fabricate. This is the standard pattern for fields that apply conditionally.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-065

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

The moderation system classifies hate speech accurately for explicit slurs but misses coded language and dog-whistle terms that human moderators easily recognise. The prompt includes detailed written rules about coded language patterns. What intervention would most improve detection of coded hate speech?

- [ ] **A**: Add a comprehensive dictionary of all known coded terms and dog-whistles to the system prompt, so every term the moderators know about is available at match time
- [ ] **B**: Increase the model's context window so it can consider more of the user's post history for context, so the surrounding posts supply the meaning the term carries
- [ ] **C**: Add 20+ examples covering every known category of coded hate speech to maximise coverage, so the breadth of the example set covers whatever phrasing turns up
- [x] **D**: Add 2-4 few-shot examples showing coded hate speech alongside the reasoning that identifies the coded language, the targeted group, and why the surface text appears innocuous

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Few-shot examples with reasoning tags teach the model the pattern-recognition process, not just individual terms. Showing the reasoning chain — surface meaning, coded meaning, targeted group, contextual signals — enables the model to generalise to new coded terms it has not seen before.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d5-075

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

Claude Code generates API reference pages for 150 endpoints across three categories: payment processing (30 endpoints, high regulatory risk), internal tooling (80 endpoints, low risk), and public data queries (40 endpoints, moderate risk). The team cannot manually review all 150. How should they structure human review?

- [x] **A**: Use stratified sampling: review 100% of payment processing docs (30 pages), 10% of public data query docs (4 pages), and 5% of internal tooling docs (4 pages), totalling 38 pages with effort concentrated on highest-risk content
- [ ] **B**: Randomly sample 15% of all endpoints (approximately 23 pages) for review, ensuring a representative cross-section so that no category is over- or under-weighted by a human judgement call
- [ ] **C**: Review only the payment processing endpoints since they are the highest risk, and trust Claude Code's output for the remaining 120 endpoints, so review effort goes entirely where an error carries regulatory consequences
- [ ] **D**: Have Claude Code self-assess each generated page with a confidence score and only review pages where confidence falls below 80%, so reviewer attention lands exactly where the generator itself signalled uncertainty

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Stratified sampling allocates review effort proportional to risk. Payment processing documentation has regulatory implications warranting full review. Public data queries affect external users and deserve moderate scrutiny. Internal tooling has the lowest blast radius and can tolerate the lightest review. This achieves thorough coverage of critical content within a manageable review budget.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d2-061

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A customer support agent has two tools: get_customer_profile (returns name, email, preferences) and get_customer_orders (returns order history with statuses). Users frequently ask 'Tell me about customer X', and the agent calls both tools sequentially, doubling response time. 90% of 'tell me about' queries only need the profile. What is the best approach?

- [ ] **A**: Consolidate both tools into a single get_customer_info tool that returns all customer data in one call, so a customer question has exactly one obvious call and there is no tool selection left for the model to get wrong.
- [x] **B**: Update get_customer_profile's description to explicitly state it should be the default for general 'tell me about' queries, and update get_customer_orders to clarify it is only needed when order-specific information is requested.
- [ ] **C**: Add a system prompt instruction: 'When a user says tell me about, only call get_customer_profile.' so that phrase is mapped explicitly onto one tool and the model has no room left to interpret it on any turn.
- [ ] **D**: Set tool_choice to forced selection of get_customer_profile for all turns to prevent unnecessary order lookups, so the profile lookup happens every turn and order history is never fetched speculatively.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Refining tool descriptions with clear boundaries and default routing guidance is the lowest-effort fix. The descriptions should specify when each tool is the right choice, directing the agent to call only the profile tool for general queries.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d1-084

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A customer support agent must redact credit card numbers from its responses before they reach the customer. The current system prompt instructs the agent to replace card numbers with asterisks, but QA testing reveals that 6% of responses still contain unredacted card numbers. What guardrail approach should the architect use?

- [x] **A**: Implement a PostToolUse hook that applies a regex pattern to detect and redact credit card numbers from all tool results before the model processes them
- [ ] **B**: Rewrite the system prompt with more explicit redaction instructions and add few-shot examples of correct redaction, so the rule is unambiguous and demonstrated
- [ ] **C**: Implement a PreToolUse hook that blocks any tool call containing a credit card number in its parameters, so no card number is ever sent to a tool
- [ ] **D**: Remove all tools that might return credit card numbers from the agent's allowedTools, so card data never enters the agent's context in the first place

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A PostToolUse hook runs deterministic code (regex pattern matching) on tool results before the model sees them. This ensures credit card numbers are redacted with 100% reliability, regardless of model behaviour. This is the correct guardrail for data security requirements.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d3-061

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A documentation team must update architecture guides across 25 microservice directories after a platform migration. Each guide requires reading source, checking dependencies, and rewriting affected sections. Working in direct execution mode, a team member updates three services before noticing the results are inconsistent: some guides still mention the old platform, others use inconsistent terminology for the new one. What went wrong and what is the correct approach?

- [x] **A**: The team member should have used plan mode to establish a consistent update strategy, terminology glossary, and section-by-section template before executing changes across all 25 services
- [ ] **B**: Direct execution was correct but should have been done in a single continuous session to maintain consistency through conversation context, so one conversation carries the terminology across all 25 services
- [ ] **C**: The team member should have created a custom slash command that hardcodes the exact text replacements for each service, so every service receives identical replacements with no model variance
- [ ] **D**: The team member should have used the Explore subagent to discover all affected files first, then made all changes in a single batch, so the full set of files is known before any edit is made

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A 25-service migration with consistency requirements is a multi-step, cross-file operation where planning is essential. Plan mode would produce an explicit strategy covering terminology, update order, and validation criteria before any changes are made, preventing the inconsistency that emerged from ad hoc execution.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d2-062

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

A customer support agent calls a payment processing tool to check a refund status. The tool returns: {"status": "success", "data": [], "message": "No refunds found for this transaction"}. The agent's recovery logic treats this as an error and retries the request. What is wrong with the agent's behaviour?

- [ ] **A**: The agent should retry more times, as the payment system may be slow to process refund records, since a record can take several seconds to become queryable after it is created.
- [ ] **B**: The tool should not return an empty array — it should return an error with isRetryable: false to prevent the retry, since a non-retryable error is the only signal that reliably stops an agent. An explicit flag is a signal the agent reads directly.
- [x] **C**: The agent incorrectly treats a valid empty result as an error. An empty data array with a success status means the query executed correctly but found no matching records — this requires no retry.
- [ ] **D**: The agent should escalate to a human immediately instead of retrying, as payment queries should never be retried, since a query returning nothing needs a person to confirm the refund exists.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** An empty array result is not a failure when the status indicates success. The tool queried the payment system, found no refund records, and returned that information correctly. The agent should inform the customer that no refund exists for this transaction, not retry.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d2-063

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

A platform engineering team wants to share an MCP server for their internal ticketing system across all developers using Claude Code. The server requires an API token unique to each developer. Where should the MCP server be configured, and how should credentials be managed?

- [x] **A**: Add the server to .mcp.json in the project root using ${TICKETING_API_TOKEN} environment variable expansion, so each developer sets their own token locally.
- [ ] **B**: Add the server to .mcp.json in the project root with each developer's API token hard-coded in the configuration, so the server works for everyone with no local setup step.
- [ ] **C**: Have each developer add the server to their personal ~/.claude.json with their API token, so each token stays in that developer's own configuration file.
- [ ] **D**: Create a shared .env file in the repository with all developer tokens and reference it from .mcp.json, so one file holds every token and .mcp.json stays free of secrets.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Project-level .mcp.json is version-controlled and shared with the team, making the server available to everyone. Environment variable expansion keeps individual credentials out of version control whilst allowing each developer to authenticate with their own token.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d3-062

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A documentation team needs to simultaneously update API reference docs for three independent microservices after a breaking change. Each update requires reading source code, updating Markdown files, and validating links. A single Claude Code session would exhaust the context window trying to hold all three services' code simultaneously. What is the recommended approach?

- [ ] **A**: Process the three services sequentially in the same session, running /compact between each service to free context Compacting between services keeps each one working from a clean, service-specific context.
- [ ] **B**: Split the documentation files into smaller chunks and process each chunk in a separate API call using the batch API, so each microservice's docs are generated independently of the others
- [ ] **C**: Create a single skill with context: fork that processes all three services in parallel within one session A forked context gives each service its own working copy while the parent session coordinates them.
- [x] **D**: Use git worktree to create three parallel branches, each with its own Claude Code session working on one service's documentation, then merge the results

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** git worktree creates separate working directories on different branches, each with its own isolated Claude Code session. Each session has a full context budget dedicated to one service. The three updates run in parallel without interfering with each other, and results are merged via standard git workflows.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d5-076

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A docs team asks Claude Code to audit documentation coverage across a 500,000-line codebase. After reading 30 files via the Read tool, the conversation is approaching the context limit and earlier tool results will be summarised away by auto-compaction. The agent still needs that earlier information to complete the audit. What is the best strategy?

- [x] **A**: Have the agent write structured findings (file name, public API list, documentation status) to a scratchpad file after processing each source file, then reference the scratchpad for the final audit report instead of relying on in-context tool results
- [ ] **B**: Increase the context window size so that all 30+ file contents can be held simultaneously without trimming, so every file's contents remain available when the final report is written, however many files the audit ends up touching
- [ ] **C**: Process all files in a single Read tool call by passing a glob pattern, so the results arrive in one untrimmed block that the context manager treats as a unit rather than discarding piece by piece as the audit proceeds
- [ ] **D**: Run /compact after every 10 files to free up context space for the next batch of file reads, so each batch begins with room to spare and no tool result is dropped part-way through the audit

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A scratchpad file persists on disk and can be re-read at any time, unlike in-context tool results that are trimmed as new results arrive. By extracting and recording the essential findings (not the full file contents) after each file read, the agent decouples its knowledge from context window limits. The final audit reads the compact scratchpad rather than needing all source files in context.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d3-063

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A developer working on a React Native project notices that Claude Code applies web-specific React conventions (e.g., using div elements) when editing mobile components in the src/mobile/ directory, despite having mobile-specific conventions documented. The root CLAUDE.md contains general React standards, and there is no directory-level or rules-based configuration for mobile. What is the best fix?

- [ ] **A**: Add mobile-specific conventions to the root CLAUDE.md alongside the existing web React standards
- [ ] **B**: Replace the root CLAUDE.md web React conventions with mobile React Native conventions
- [x] **C**: Create a .claude/rules/react-native.md file with paths: ["src/mobile/**/*"] containing the mobile-specific conventions
- [ ] **D**: Create a CLAUDE.md file in src/mobile/ and remove all React standards from the root CLAUDE.md

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A rules file with a path restriction to src/mobile/ ensures mobile conventions load only when editing mobile components. This keeps the root CLAUDE.md focused on universal standards while providing targeted, token-efficient mobile guidance.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d1-085

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

An architect is designing a customer support system using the Claude Agent SDK. The system needs a coordinator agent that can delegate to a billing specialist and a technical support specialist. Each specialist needs different tools. How should the architect configure the AgentDefinitions?

- [ ] **A**: Create one AgentDefinition with all tools from both specialists, and use prompt instructions to tell the agent which tools to use in each context
- [ ] **B**: Create the specialists as separate API endpoints and have the coordinator call them via HTTP rather than the Agent tool
- [x] **C**: Create separate AgentDefinitions for each specialist with scoped allowedTools (4–5 tools each), and give the coordinator the Agent tool to spawn them
- [ ] **D**: Give the coordinator all tools and have it handle all requests directly, eliminating the need for subagents

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Each specialist gets its own AgentDefinition with allowedTools restricted to the 4–5 tools relevant to its role. The coordinator has the Agent tool (renamed from Task tool in SDK v2.1.63; 'Task' still works as a backward-compatible alias) in its allowedTools so it can spawn specialists. This enforces separation of concerns and scoped tool access.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d3-064

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

A documentation team creates a /generate-api-docs skill that reads source code files and produces Markdown API reference pages. The skill generates verbose output (200+ lines per endpoint) and should be available to every team member who clones the repository. How should the skill be configured?

- [x] **A**: Create a SKILL.md in .claude/skills/ with context: fork frontmatter so it is shared via version control and isolates verbose output from the main conversation
- [ ] **B**: Create a SKILL.md in ~/.claude/skills/ with context: fork frontmatter, and instruct each team member to copy it locally, so every machine resolves the skill from the same user-level path
- [ ] **C**: Add the documentation generation instructions to the root CLAUDE.md so they load automatically in every session Root memory is loaded on every turn, so the instructions are available without invoking anything.
- [ ] **D**: Create a SKILL.md in .claude/skills/ without any frontmatter, relying on the team to manually manage context overflow Skills without frontmatter inherit the session's own context settings rather than declaring their own.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** .claude/skills/ is project-scoped and version-controlled, making it available to every developer who clones the repository. context: fork isolates the verbose 200+ line output per endpoint into a forked context, preventing it from consuming the main conversation's context budget.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d4-066

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

A moderation team introduces a severity scale ('low', 'medium', 'high', 'critical'). The same post (a user threatening to 'destroy' a competitor's product in a review) is classified as 'high' on some runs and 'low' on others. The prompt defines severities with phrases like 'high means the content is clearly harmful' and 'low means the content is mildly inappropriate'. What should they change?

- [x] **A**: Replace prose severity descriptions with concrete examples for each level — 'high' includes direct threats of physical harm with specifics; 'low' includes figurative language in product reviews — so the model has calibration anchors for each severity
- [ ] **B**: Set temperature to 0 to eliminate classification variance across runs, so the same post receives the same severity every time and the disagreement between runs disappears without any change to how the scale itself is defined
- [ ] **C**: Remove the severity scale and use binary classification (violation / not violation) to reduce inconsistency, so the borderline judgement that produces the disagreement is removed from the task altogether and only one decision remains
- [ ] **D**: Run the classification three times and take the majority vote for severity, so a single outlying rating is outvoted by the two that agree and the reported severity reflects the model's most common reading of the post

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Concrete examples anchor each severity level to specific, observable patterns. When the model sees 'destroy a competitor's product' in a review context, it can match against the 'low severity — figurative language' example rather than interpreting 'clearly harmful' differently each run.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d3-065

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A documentation team wants to archive the full conversation transcript to a log file every time Claude Code runs /compact, so that context lost during compaction can be reviewed later. Which hook configuration achieves this?

- [x] **A**: A PreCompact hook that writes the current transcript to a timestamped log file before /compact summarises the conversation
- [ ] **B**: A PostToolUse hook on Write that snapshots the transcript whenever a file is written, on the assumption /compact will eventually run
- [ ] **C**: A PreToolUse hook configured on a built-in 'Compact' tool, matching tool name 'Compact'
- [ ] **D**: A PostToolUse hook on all tools that appends each tool result to a running log file, creating a continuous archive

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** PreCompact is a first-class hook event in Claude Code that fires immediately before /compact (or auto-compaction) runs. The hook receives the full pre-compaction transcript path and can copy or process it before summarisation discards detail. This is the documented mechanism for exactly this use case.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d1-086

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A customer support agent's loop terminates when cumulative token usage exceeds a budget. During a complex billing investigation the budget is exhausted mid-task, after data gathering but before resolution, with stop_reason still `tool_use`. What architectural change addresses this?

- [ ] **A**: Double the token budget to ensure the agent always has enough tokens to complete complex investigations, so the loop is never cut short in the middle of one by a budget it can exhaust
- [ ] **B**: Switch to a cheaper model to reduce token usage per iteration, allowing more iterations within the same budget, so an investigation of this length reaches its end within the same spend
- [ ] **C**: Remove the token budget entirely and rely solely on the iteration cap for safety, so the cap alone decides when the loop stops and no cut-off can land in the middle of a tool call
- [x] **D**: When the token budget is nearly exhausted and stop_reason is 'tool_use', trigger a graceful degradation path that summarises progress so far and escalates to a human agent with a structured handoff

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** When constraints prevent completion, the agent should degrade gracefully rather than terminating abruptly. Summarising progress and performing a structured handoff (customer ID, summary, root cause so far, recommended next steps) ensures no work is lost and the human agent can continue from where the AI left off.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d2-064

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

A customer support team configures an MCP server for their internal CRM system. The agent frequently ignores the CRM MCP tool and instead uses the built-in Grep tool to search local log files for customer information, producing incomplete results. The MCP tool's description reads: 'CRM tool'. What should the team do first?

- [ ] **A**: Remove the Grep tool from the agent's available tools so it cannot fall back to local file search, leaving the CRM tool as the only route to customer data.
- [ ] **B**: Add a system prompt instruction: 'Always use the CRM tool for customer queries. Never use Grep for customer data.' so the routing rule sits in the prompt where it outranks the tool descriptions.
- [x] **C**: Enhance the MCP tool's description to detail its capabilities: full customer records, transaction history, account status, and structured output — explaining what it returns that Grep cannot.
- [ ] **D**: Move the MCP server configuration from .mcp.json to ~/.claude.json so it takes higher priority, since a user-level server is resolved ahead of the project configuration on every turn.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** When an MCP tool's description is sparse, the agent defaults to familiar built-in tools. Enhancing the description to explain capabilities and structured output in detail makes the agent prefer it for relevant queries. This is the recommended fix for MCP tool underutilisation.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d2-065

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A platform has `search_knowledge_base` ('Searches help articles') and `process_action` ('Handles customer actions like refunds and plan changes'). The agent picks `search_knowledge_base` for 'cancel my subscription' requests. After adding 'subscription cancellations' to `process_action`'s description, it now picks `process_action` for knowledge queries like 'how does cancellation work?'. What is the most effective solution?

- [ ] **A**: Consolidate search_knowledge_base and process_action into a single tool that determines the correct action based on user intent, so intent resolution happens inside one tool and the model never chooses between two overlapping descriptions.
- [ ] **B**: Remove the word 'cancellation' from both tool descriptions to eliminate the keyword conflict entirely, so neither description contains the term both tools were matching on and the collision disappears from the surface text.
- [x] **C**: Add boundary descriptions to both tools: process_action should state 'Use when the customer wants to execute a cancellation' and search_knowledge_base should state 'Use when the customer wants to learn about the cancellation process without taking action'.
- [ ] **D**: Add few-shot examples to the system prompt showing five cancellation scenarios with the correct tool for each, so the model learns the split from worked cases rather than from the descriptions themselves.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Boundary descriptions that specify when to use each tool versus similar tools resolve ambiguity. The key distinction is intent: executing an action versus seeking information. Describing these boundaries explicitly in both tools prevents cross-routing in both directions.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d4-067

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

Your legal document extraction pipeline uses tool_use with tool_choice set to 'auto'. The pipeline processes contracts and sometimes receives plain text analysis instead of the structured JSON extraction you need. The team suggests switching to prompt-based JSON with explicit formatting instructions. What is the correct approach?

- [ ] **A**: Switch to prompt-based JSON as suggested, since the model clearly prefers text responses for these documents
- [x] **B**: Keep tool_use and set tool_choice to force the specific extraction tool, guaranteeing schema-compliant structured output on every request
- [ ] **C**: Keep tool_use but switch tool_choice from 'auto' to 'any' to guarantee the model always returns a structured tool call
- [ ] **D**: Add stronger instructions in the system prompt telling the model to always use the extraction tool and never respond with plain text

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Forcing a specific tool with tool_choice {type: 'tool', name: 'extract_contract'} guarantees the model calls that exact tool every time, eliminating both text-only responses and wrong-tool selection. This is the most reliable approach for guaranteed structured output.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d5-077

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

A structured data extraction system achieves 97% overall accuracy across all document types. The team proposes automating all extractions where model confidence exceeds 95% to reduce human review costs. What is the critical risk in this approach?

- [ ] **A**: The 95% confidence threshold is too low and should be raised to 99% for automation, so only extractions the model is nearly certain about are automated
- [ ] **B**: Automated extractions should always have human review regardless of confidence, making the proposal fundamentally flawed, since no confidence figure justifies removing the reviewer
- [ ] **C**: The model will become overconfident over time as it processes more documents, requiring regular retraining, so the threshold drifts upward and automation silently widens its scope
- [x] **D**: Aggregate accuracy may mask poor performance on specific document types or fields, and confidence scores need calibration against labelled validation sets before use

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** 97% overall can hide 40% error rates on specific document types. Without stratified validation and confidence calibration, automation will silently fail on certain inputs.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d1-087

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A customer support agent integrates with three different backend systems via MCP tools. One system returns dates as Unix timestamps, another returns ISO 8601 strings, and the third returns dates in 'DD/MM/YYYY' format. The agent occasionally misinterprets dates, leading to incorrect order lookup results. What is the correct fix?

- [ ] **A**: Add instructions to the system prompt explaining the three date formats and how to interpret each one
- [ ] **B**: Standardise the backend APIs to all return the same date format
- [x] **C**: Implement a PostToolUse hook that normalises all date formats to ISO 8601 before the model processes the results
- [ ] **D**: Implement a PreToolUse hook that converts all dates to ISO 8601 before passing them to the tools

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** PostToolUse hooks intercept tool results after execution but before the model processes them. Converting all dates to a consistent ISO 8601 format ensures the model receives clean, unambiguous data regardless of which backend system produced it. This is the canonical use case for PostToolUse hooks.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d5-078

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A docs team has Claude Code generate architecture guides by synthesising source code, inline comments, commit messages, and ADRs. After several edits, the guides no longer indicate which statements came from which source. A developer later questions whether a specific architectural constraint in a guide is still valid. What approach preserves source attribution?

- [ ] **A**: Instruct Claude Code to add footnotes to the generated documentation citing the original source for each statement, so every claim carries a visible citation a reader can follow back
- [x] **B**: Maintain structured provenance metadata alongside each documentation section, mapping claims to their source files, line numbers, and retrieval dates, stored as machine-readable data separate from the prose content
- [ ] **C**: Keep all original source files unchanged in a reference directory so developers can manually trace any claim back to its origin, so the material is always on hand to check a claim against
- [ ] **D**: Version-control the documentation and use git blame to trace each line back to the commit that created it, so each line's origin is recoverable from history without extra metadata

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Structured provenance metadata survives editing because it is stored as data fields (e.g., JSON or YAML frontmatter) separate from the prose. When a developer questions a claim, they can trace it to the exact source file and line number. The retrieval date indicates whether the source was current when the documentation was generated.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d5-079

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.2

A customer says: 'This is ridiculous, I have been waiting 20 minutes. Just connect me to a real person.' The agent has access to the customer's account and can see the issue is a simple password reset that takes 30 seconds to resolve. What should the agent do?

- [x] **A**: Escalate to a human agent immediately without attempting to resolve the issue, because the customer explicitly requested a human.
- [ ] **B**: Acknowledge the frustration and offer to resolve the password reset, explaining it will take only 30 seconds — the issue is straightforward and escalation is unnecessary.
- [ ] **C**: Run sentiment analysis to confirm the customer is genuinely frustrated before deciding whether to escalate or attempt resolution.
- [ ] **D**: Ask the customer if they would prefer to wait for a human or let the agent resolve the password reset quickly.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When a customer explicitly says 'connect me to a real person', the agent must escalate immediately. This is one of the three valid escalation triggers. The simplicity of the issue is irrelevant — the customer's explicit request takes priority.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d1-088

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

A customer support agent handles account deletion requests. The company policy requires explicit human approval before any account is permanently deleted. Currently, the agent sometimes processes deletions autonomously when the customer is insistent. What approval mechanism should the architect implement?

- [x] **A**: Implement a PreToolUse hook on the delete_account tool that pauses execution and routes the request to a human approval queue before proceeding
- [ ] **B**: Add a system prompt instruction: 'Always get manager approval before processing account deletions'
- [ ] **C**: Remove the delete_account tool from the agent entirely and require customers to call a separate phone line
- [ ] **D**: Implement a PostToolUse hook that reviews the deletion after it has been processed and reverts it if no approval was recorded

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** A PreToolUse hook on the delete_account tool intercepts the call before execution and enforces the human approval requirement deterministically. The deletion cannot proceed until a human explicitly approves it, regardless of how insistent the customer is.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d4-068

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

Your Claude Code agent generates API endpoint implementations. You provide detailed instructions specifying error handling conventions, but the generated code inconsistently handles async errors: sometimes using try/catch, sometimes using .catch(), and sometimes omitting error handling entirely. Adding more detailed instructions did not resolve the inconsistency. What is the most effective next step?

- [ ] **A**: Add a linting rule to catch missing error handling and reject generated code that fails the lint, so any generated code without the required handling is rejected before it can be committed
- [x] **B**: Add 2-4 few-shot examples demonstrating the correct error handling pattern across varied scenarios, including async/await, Promise chains, and edge cases, with reasoning for each choice
- [ ] **C**: Set temperature to 0 to eliminate the randomness causing inconsistent error handling styles, so the model produces the same handling pattern every time it meets the same input
- [ ] **D**: Add a post-generation review step that rewrites any incorrect error handling patterns, so incorrect patterns are corrected after generation rather than prevented during it

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** When detailed instructions alone fail to produce consistent formatting, few-shot examples with reasoning are the correct escalation. Covering varied async scenarios prevents the model from pattern-matching only the specific cases shown and teaches it to generalise the error handling style.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d1-089

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A multi-agent research system has a coordinator that spawns a web search subagent and a document analysis subagent sequentially across separate API turns. The web search completes in 8 seconds and the document analysis completes in 12 seconds, giving a total latency of 20 seconds. The two subagents are investigating independent topics and do not depend on each other's results. How should the architect reduce this latency?

- [ ] **A**: Merge the web search and document analysis into a single subagent to reduce coordination overhead One subagent holding both roles needs no handoff and no shared-context contract at all.
- [ ] **B**: Allow the web search subagent to directly invoke the document analysis subagent after it finishes, removing the coordinator round-trip, so the handoff happens where the results already are
- [x] **C**: Have the coordinator emit both Agent tool calls in a single response to spawn both subagents in parallel, reducing total latency to roughly 12 seconds
- [ ] **D**: Use fork_session to split the coordinator into two parallel branches, one for each subagent Each branch then carries its own copy of the coordinator state for the subagent it owns.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** When subagents investigate independent topics, the coordinator can emit multiple Agent tool calls (renamed from Task tool in SDK v2.1.63) in a single response. Both subagents run concurrently, so total latency is determined by the slower one (12 seconds) rather than the sum (20 seconds).
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d4-069

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

Your Claude Code review prompt for the TypeScript monorepo classifies severity using prose descriptions like 'critical means the code is dangerous' and 'minor means the code is slightly suboptimal'. Developers complain that identical code patterns receive different severity ratings across runs. What is the most effective improvement?

- [x] **A**: Replace prose severity descriptions with concrete code examples for each severity level, showing actual TypeScript snippets that qualify as critical, major, and minor
- [ ] **B**: Add a confidence threshold so only findings above 90% confidence are reported, filtering out uncertain severity ratings so only the ratings the model is sure about reach a reviewer
- [ ] **C**: Lower the model temperature to 0 to ensure deterministic severity ratings, so the same finding receives an identical rating on every run of the review
- [ ] **D**: Add a second model pass that re-evaluates each finding's severity to catch inconsistencies, so a rating that disagrees with the first pass is caught before it is reported

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Severity calibration with concrete code examples produces consistent classification across invocations. Prose descriptions are inherently ambiguous and leave the model to interpret severity differently each time.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d5-080

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

The data platform team runs a human review of the agent's federated query reports. Reviewers sample 50 reports and find an overall accuracy rate of 97%. Management approves the system for production. Three weeks later, users report that currency conversion calculations in cross-border revenue reports are wrong 40% of the time. How did the review process fail?

- [ ] **A**: The sample size of 50 reports was too small to detect a 40% error rate in currency conversions, since a category making up a small share of reports needs a far larger sample to surface at all.
- [x] **B**: The reviewers used aggregate accuracy metrics that masked category-specific failures. A 97% overall rate hides a 40% error rate on currency conversions if that category is a small fraction of total reports.
- [ ] **C**: The reviewers were not domain experts in currency conversion and could not identify the errors, since spotting a wrong conversion requires knowing what the correct rate should have been.
- [ ] **D**: The agent's accuracy degraded over time due to model drift, and the initial 97% rate was genuinely correct at the time of review, so any figure measured before the shift no longer describes the system.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This is the aggregate metrics trap. When a low-frequency report type (cross-border revenue) has high error rates, the overall accuracy metric is dominated by high-frequency, easy report types. Stratified random sampling across report categories would have caught the currency conversion failures.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d3-066

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

Developer A's Claude Code follows the team's API naming conventions perfectly. Developer B, who joined last week, gets inconsistent naming from Claude Code. Both are working on the same repo, same branch. What is the most likely root cause?

- [ ] **A**: Developer B has not run /memory to load the configuration files, so the project's conventions were never loaded into that session
- [x] **B**: The API naming conventions are stored in Developer A's user-level CLAUDE.md (~/.claude/CLAUDE.md) rather than the project-level configuration
- [ ] **C**: Developer B needs to install an MCP server to access the naming convention rules, which are only reachable through the server the team installed
- [ ] **D**: The conventions are in a .claude/rules/ file that Developer B's editor does not support, so the file is present but never read on that machine

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** User-level CLAUDE.md is not version-controlled or shared via git. Developer A has the instructions locally; Developer B, having just joined, does not. Moving instructions to project-level config (.claude/CLAUDE.md) would fix this.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d4-070

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Your Claude Code agent generates unit tests for the TypeScript monorepo. When given detailed instructions alone, it produces tests with inconsistent assertion styles: sometimes using expect().toBe(), sometimes assert.equal(), and occasionally mixing both in the same file. Adding more detailed instructions about assertion style did not fix the problem. What should you do next?

- [ ] **A**: Switch to a different model that better follows formatting instructions, so the assertion style is applied as written without needing examples
- [x] **B**: Add 2-4 few-shot examples demonstrating the desired assertion style with reasoning for each testing decision, covering edge cases like async functions and error handling
- [ ] **C**: Add 2-4 few-shot examples showing complete test files with the desired assertion style and reasoning for why that style was chosen over alternatives, so the model sees whole files rather than isolated snippets
- [ ] **D**: Add a linter post-processing step to automatically convert all assertions to a single style, so every assertion ends up consistent regardless of what the model produced

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Few-shot examples are the most effective technique when detailed instructions alone produce inconsistent formatting. Including 2-4 examples with reasoning teaches generalisation to novel patterns, not just pattern-matching. Covering varied scenarios (async, error handling) ensures the model generalises correctly.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d3-067

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A junior developer is using Claude Code to refactor a payment processing module. The team lead wants to ensure Claude Code cannot accidentally delete production configuration files or modify the database migration directory during the refactoring session. What is the most appropriate approach?

- [x] **A**: Configure allowedTools to restrict the session to only Read, Grep, Glob, and Write for files within the payment module directory
- [ ] **B**: Instruct the developer to use plan mode so Claude Code will ask for approval before each file change
- [ ] **C**: Add a rule in CLAUDE.md stating 'Never modify files in the config/ or migrations/ directories'
- [ ] **D**: Set the repository to read-only mode at the filesystem level before starting the session

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** allowedTools provides tool-level permission control that can restrict which tools are available and their scope. By limiting write access to the payment module directory and keeping read access for context, the team lead ensures Claude Code cannot modify production config or migration files.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d4-071

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

Your Claude Code setup reviews generated code by asking the same model instance to critique its own output immediately after generation, within the same conversation. The team notices the reviews are overly favourable and miss bugs that an external reviewer would catch. What is the root cause and correct fix?

- [ ] **A**: The model needs more detailed review instructions; add a comprehensive checklist of what to look for during self-review A checklist gives the review pass criteria it can apply point by point to its own output.
- [ ] **B**: Enable extended thinking so the model reasons more carefully about potential issues in its own code Extended thinking gives the review pass more room to reason before it commits to a verdict.
- [x] **C**: The model retains reasoning context from generation; use a separate independent Claude instance without the prior conversation context to perform the review
- [ ] **D**: Lower the temperature during the review phase to make the model more precise and less likely to approve questionable code, since a deterministic pass applies the review criteria more strictly

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A model reviewing its own output in the same session retains reasoning context and is less likely to question its own decisions. An independent instance without prior context catches more subtle issues because it approaches the code fresh.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d1-090

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A multi-agent research system must process a customer's request that involves three sequential stages: data collection, analysis, and report generation. Each stage depends on the output of the previous one. Which orchestration pattern is most appropriate?

- [ ] **A**: Parallel orchestration — run all three subagents simultaneously to minimise latency
- [x] **B**: Pipeline orchestration — pass the output of each stage as input to the next in a defined sequence
- [ ] **C**: Dynamic adaptive decomposition — let the coordinator decide the order at runtime based on query complexity
- [ ] **D**: Hub-and-spoke with all three agents reporting independently to the coordinator

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Pipeline orchestration is the correct pattern for sequential dependencies. Each stage completes before the next begins, with the output of one stage serving as the input to the next. This matches the data collection -> analysis -> report generation dependency chain.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d2-066

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A developer is investigating a data inconsistency in the platform codebase. They need to find all files that reference a specific Snowflake table name 'fact_revenue_daily' and then check the directory structure for related migration files. Which tool sequence is correct?

- [x] **A**: Grep for 'fact_revenue_daily' to find all content references, then Glob for '**/migrations/*.sql' to find migration files by path pattern.
- [ ] **B**: Read all SQL files in the project to search for the table name, then Read all migration files.
- [ ] **C**: Glob for '**/*fact_revenue_daily*' to find references, then Glob for '**/migrations/**' to find migration files.
- [ ] **D**: Grep for 'fact_revenue_daily' for both steps — first to find references, then to find migration files containing the table.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Grep searches file contents — correct for finding code that references the table name. Glob matches file paths — correct for finding migration files by directory pattern. This is the optimal two-step sequence using each tool for its strength.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d5-081

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A synthesis agent receives findings from three subagents: solar investment grew 15% (Bloomberg, January 2024), solar investment grew 22% (IEA, March 2024), and cost-per-watt data. The synthesis agent currently picks the IEA figure because it is more recent. What is the correct approach?

- [x] **A**: Present both figures with full source attribution and publication dates, annotating that the difference may reflect different reporting periods, methodologies, or scope definitions.
- [ ] **B**: Average the two values (18.5%) and cite both sources to present a balanced view, since a midpoint between two credible figures is the most defensible single number.
- [ ] **C**: Always use the most authoritative source (IEA as an international agency) and discard the Bloomberg figure, since an international agency's methodology is the more authoritative of the two.
- [ ] **D**: Flag the conflicting figures and pause report generation until a human researcher resolves the discrepancy, since publishing a number the sources disagree about puts the conflict into the report.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Preserving both data points with provenance — source, date, and potential explanations for the difference — lets the consumer interpret the data correctly. Different publication dates and methodologies explain the discrepancy without requiring the synthesis agent to judge which is 'right'.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d1-091

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.1

A customer support agent runs to its `max_iterations=10` cap on every request, even simple ones. Logs show stop_reason returns 'end_turn' after the third iteration, but the loop ignores it and uses the iteration count as its primary termination signal. What architectural change resolves this?

- [ ] **A**: Increase the iteration cap to 20 so the agent has more room to work on complex requests and is not cut off before it has finished the work A larger cap costs nothing on the requests that finish early.
- [ ] **B**: Lower the iteration cap (for example to 3) so the loop is forced to terminate earlier on simple requests, bounding the waste at three iterations instead of ten Three iterations is enough for the simple requests that dominate.
- [ ] **C**: Parse the agent's response text after each iteration to detect phrases like 'task complete' and terminate early when found, so the loop exits as soon as the agent says it is finished That phrase is what marks the work finished.
- [x] **D**: Use stop_reason as the primary loop control — exit on 'end_turn', continue on 'tool_use' — and retain the iteration cap only as a safety backstop, not the primary termination mechanism

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The stop_reason field is the authoritative signal for loop control. The loop should exit on 'end_turn' and continue on 'tool_use'. An iteration cap can remain as a safety net for edge cases, but must not be the primary stopping mechanism, which is the anti-pattern causing unnecessary iterations here.
> 
> *Guide Reference:* D1 · Design and implement agentic loops for autonomous task execution

---

### Question ID: d4-072

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

Your extraction pipeline retries failed documents, but the retry simply resends the original document with the same prompt. Success rates on retries are only marginally better than the first attempt. Developers have identified that most failures are format mismatches where the model places values in the wrong fields. How should you improve the retry mechanism?

- [ ] **A**: Increase the number of retries from 1 to 3, since extraction is non-deterministic and more attempts improve odds of landing the correct field mapping
- [ ] **B**: Switch to a different model for retries so a fresh perspective catches the errors a model with the same bias would repeat
- [ ] **C**: Skip retries and route all failures directly to human review to avoid wasting API costs on attempts that were never going to succeed
- [x] **D**: Send the original document, the failed extraction, and the specific validation error (which fields had misplaced values) in the retry request

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Retry-with-error-feedback is dramatically more effective than naive retries. Sending the original document, the failed extraction, and the specific validation error allows the model to self-correct. Format mismatches are fixable errors that respond well to this approach.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d5-082

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A customer support agent system encounters API rate limits from the Claude API during a peak traffic period. Multiple concurrent user sessions are failing. What is the recommended retry strategy?

- [ ] **A**: Retry immediately at fixed intervals until the request succeeds
- [ ] **B**: Switch to a different API key to bypass the rate limit
- [x] **C**: Exponential backoff with jitter, increasing wait times between retries to allow the rate limit to reset
- [ ] **D**: Queue all requests and process them in a single batch after a fixed 60-second delay

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Exponential backoff progressively increases wait times, reducing pressure on the API. Jitter prevents multiple clients from synchronising their retries and creating burst patterns.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d3-068

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A platform engineering team creates a /security-audit skill that scans the codebase for vulnerabilities. The skill should be available to every developer on the project, must not be able to modify any files, and produces extensive analysis output. Which configuration is correct?

- [ ] **A**: Place the skill in ~/.claude/skills/ with allowed-tools restricting it to Read, Grep, and Glob, and context: fork in the frontmatter
- [ ] **B**: Place the skill in .claude/commands/ with allowed-tools restricting it to Read, Grep, and Glob
- [ ] **C**: Place the skill in CLAUDE.md as an always-loaded security scanning procedure
- [x] **D**: Place the skill in .claude/skills/ with a SKILL.md containing allowed-tools: ["Read", "Grep", "Glob"] and context: fork in the frontmatter

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** .claude/skills/ is project-scoped and shared via version control, so every developer gets it. allowed-tools restricts the skill to read-only tools, preventing file modifications. context: fork isolates the extensive analysis output from the main conversation. This satisfies all three requirements.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d4-073

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

An extraction pipeline uses `tool_use` with a 15-required-field schema. For some document types, only 8 of those fields ever appear in the source material. The model consistently fabricates plausible values for the missing 7, and the instruction 'do not fabricate data' has not helped. Should the team (A) keep all fields required and add post-extraction validation, or (B) redesign the schema? Which is correct and why?

- [ ] **A**: Keep all fields required and add post-extraction validation to detect and remove fabricated values
- [x] **B**: Redesign the schema to make the 7 sometimes-absent fields optional/nullable, allowing the model to return null instead of fabricating
- [ ] **C**: Create separate schemas for each document type, each containing only the fields present in that document type
- [ ] **D**: Switch to prompt-based JSON extraction where you can instruct the model to omit absent fields entirely

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Making fields optional/nullable when source data may be absent removes the schema-level pressure to fabricate. The model can legitimately return null for missing information, which is a correct representation of reality. This addresses the root cause at the schema level.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d5-083

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A support system processes two request types: password resets (high volume, latency-sensitive, customers wait on screen) and account migrations (low volume, complex, can complete overnight). Both share one synchronous API endpoint at identical priority. At peak hours, migrations consume rate limit capacity and password-reset latency exceeds thresholds. What is the best approach?

- [ ] **A**: Pause all account migration requests during business hours and process them only between midnight and 6am, so migrations never contend with interactive traffic while customers are waiting
- [x] **B**: Route password resets through the real-time API for low-latency responses, and route account migrations through the batch processing API for high-throughput, latency-tolerant processing
- [ ] **C**: Implement a priority queue where password resets always execute before migration requests, using a single API endpoint, so a reset is always served ahead of a migration on the endpoint they share
- [ ] **D**: Add more API keys to increase total rate limit capacity so both workloads can run simultaneously without contention, since the combined limit is then high enough that neither throttles the other

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** This matches each workload to the appropriate API tier. Password resets need low latency and get real-time processing. Migrations tolerate latency and benefit from batch throughput. The workloads no longer compete for the same rate limits.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d3-069

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A team has a /deploy-check skill that verifies deployment readiness. It needs to: (1) read configuration files across the repo, (2) run bash commands to check service health, (3) produce a lengthy multi-page report, and (4) never modify any source code. The skill should be available to the entire team. Which SKILL.md configuration satisfies all four requirements?

- [ ] **A**: Place in ~/.claude/skills/ with allowed-tools: ["Read", "Grep", "Glob", "Bash", "Write"] and context: fork
- [ ] **B**: Place in .claude/skills/ with allowed-tools: ["Read", "Grep", "Glob"] and context: fork
- [x] **C**: Place in .claude/skills/ with allowed-tools: ["Read", "Grep", "Glob", "Bash"] and context: fork
- [ ] **D**: Place in .claude/skills/ with allowed-tools: ["Read", "Grep", "Glob", "Bash"]

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The skill is in .claude/skills/ for team access (requirement 4 via version control). allowed-tools includes Read, Grep, and Glob for reading configuration files (requirement 1), Bash for running health check commands (requirement 2), and excludes Write and Edit to prevent source code modification (requirement 4). context: fork isolates the lengthy report from the main conversation (requirement 3).
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d5-084

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

A legal document extraction pipeline has been running for three months with calibrated confidence thresholds. Extractions above 90% confidence are auto-approved without human review, saving 60% of reviewer time. A new client submits contracts written in an unusual two-column legal format the system has not encountered before. The system reports 92% confidence on these extractions. What is the appropriate safeguard?

- [ ] **A**: Raise the confidence threshold from 90% to 98% for all document types to account for novel formats, so an unfamiliar layout must clear a much higher bar before it is auto-approved
- [ ] **B**: Trust the calibrated confidence threshold since it was validated against labelled data and the system reports 92% confidence, which exceeds the 90% auto-approval threshold, and calibration holds across formats
- [x] **C**: Maintain stratified random sampling of high-confidence extractions across document types, which would detect the elevated error rate on the new format before significant damage occurs
- [ ] **D**: Add a document format classifier that flags unknown formats for mandatory human review before any auto-approval, so an unrecognised layout is never auto-approved in the first place

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Stratified random sampling is designed precisely for this scenario: detecting novel error patterns in high-confidence extractions that slip past threshold-based routing. By sampling across document types, the new format's errors would surface during routine verification even though the confidence scores appear acceptable.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d2-067

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A developer is using Claude Code to update a configuration value in a file. They use the Edit tool, but it fails because the text they are trying to match appears in three places in the file. What is the correct next step?

- [ ] **A**: Use Grep to find which of the three occurrences is the correct one, then provide more surrounding context to Edit to make the match unique.
- [ ] **B**: Switch to using Bash with sed to perform the replacement, as it handles multiple matches natively and rewrites every occurrence in one pass.
- [x] **C**: Fall back to Read to load the full file, then Write the complete modified file, so the whole file is rewritten and no match has to be unique.
- [ ] **D**: Use Glob to find all files containing the configuration value, then edit each one individually, so each file is handled on its own.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When Edit fails due to non-unique matches, the first recovery step is to include more surrounding context so the match becomes unique. Grep helps identify the right occurrence and its context. This keeps you within the Edit workflow.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d3-070

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A developer has personal code formatting preferences (2-space indentation, trailing commas) that differ from some of the projects they work on. They want Claude Code to apply these preferences across all of their projects by default. Where should these preferences be configured?

- [x] **A**: In ~/.claude/CLAUDE.md, so they apply across all of the developer's projects
- [ ] **B**: In the project-level .claude/CLAUDE.md of each repository they work on
- [ ] **C**: In a .claude/rules/ file without YAML frontmatter so it loads for every session
- [ ] **D**: In a ~/.claude/skills/ file that is invoked before each coding session

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** User-level CLAUDE.md (~/.claude/CLAUDE.md) applies to all of that developer's projects and is not shared with the team via version control, which is exactly right for personal preferences. Note that CLAUDE.md files are concatenated into context rather than strictly overriding one another, so a project's conflicting standard is not guaranteed to win; if a rule must always be enforced, put it in settings.json or a hook.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d2-068

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

The data platform team needs to share their Snowflake and PostgreSQL MCP server configurations with all team members whilst allowing individual developers to experiment with a personal API integration server. Where should each configuration be placed?

- [x] **A**: Place the Snowflake and PostgreSQL servers in the project-level .mcp.json, and personal API integration servers in user-level ~/.claude.json.
- [ ] **B**: Place all three servers in the project-level .mcp.json so they are version-controlled and consistent across the team.
- [ ] **C**: Place all three servers in ~/.claude.json and have each developer copy the configuration manually.
- [ ] **D**: Place the database servers in environment variables and reference them in both .mcp.json and ~/.claude.json.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Project-level .mcp.json is version-controlled and shared — correct for team-wide database integrations. User-level ~/.claude.json is machine-specific — correct for personal experimental servers that should not affect other team members.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d5-085

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.3

A multi-agent system has subagents for web search, academic database, and industry reports. The academic database subagent hits a 403 Forbidden on a specific journal, catches the error, and returns an empty result set marked as successful. The coordinator produces a final report with no academic sources. What is the critical failure in this design?

- [ ] **A**: The coordinator should validate that all subagents return non-empty results before producing the final report, so a subagent returning nothing is caught first.
- [x] **B**: The subagent silently suppressed the access failure by returning empty results as success, preventing the coordinator from attempting recovery or noting the gap in coverage.
- [ ] **C**: The subagent should have retried the request with exponential backoff, as 403 errors are often transient and clear once the rate window resets.
- [ ] **D**: The entire workflow should have been terminated when the academic database subagent encountered the 403 error, so no report rests on an incomplete source set.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Silent suppression — returning empty results marked as success — is the worst error propagation anti-pattern. The coordinator believes the academic search succeeded and found nothing, so it produces a report without academic sources and without noting the coverage gap. The subagent should have returned structured error context with the failure type, what was attempted, and potential alternatives.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d2-069

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.4

An enterprise data platform team is evaluating how to integrate with their existing PostgreSQL database, Slack workspace, and a custom internal approval workflow. A developer proposes building three custom MCP servers. What is the correct approach?

- [ ] **A**: Build all three custom MCP servers to ensure tight integration with the team's specific requirements and coding standards.
- [ ] **B**: Use community MCP servers for all three integrations, adapting the internal approval workflow to fit an existing community server's interface.
- [ ] **C**: Skip MCP entirely and use direct API calls from Bash for all three integrations to avoid the overhead of running MCP servers.
- [x] **D**: Use community MCP servers for PostgreSQL and Slack, and build a custom server only for the internal approval workflow that has no community equivalent.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Community servers should be evaluated first for standard integrations. PostgreSQL and Slack have well-maintained community MCP servers. The internal approval workflow is team-specific with no community equivalent, making it the only justified custom build.
> 
> *Guide Reference:* D2 · Integrate MCP servers into Claude Code and agent workflows

---

### Question ID: d1-092

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A research coordinator spawns 4 subagents to investigate different aspects of a market analysis. Agent A fails with an API error, Agent B returns partial results (3 of 5 requested data points), and Agents C and D return complete results. The final report is due in 2 hours. What should the coordinator do?

- [ ] **A**: Retry Agent A, discard Agent B's partial results, and wait for both to fully complete before proceeding, so the report is built only on results known to be complete
- [ ] **B**: Proceed with only Agents C and D's results and produce the report without the data from Agents A and B, so it ships on the two agents whose results are known good
- [ ] **C**: Terminate all agents and restart the entire investigation from scratch with a simplified scope, so the whole investigation runs once against a scope that fits the budget
- [x] **D**: Retry Agent A, incorporate Agent B's partial results, flag the missing data points from B as gaps, and synthesise the report using all available results with explicit gap annotations

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The coordinator should maximise data utilisation: retry the failed agent (A), incorporate partial results from B while flagging the 2 missing data points as known gaps, and synthesise all available results from A (after retry), B (partial), C, and D. Explicit gap annotations ensure the report is transparent about its completeness.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d3-071

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A large TypeScript monorepo has a root CLAUDE.md with universal coding standards and a .claude/rules/ directory with topic-specific rule files. A developer notices that conventions from testing.md in .claude/rules/ are loading even when editing API handler files, consuming unnecessary tokens. The testing.md file has no YAML frontmatter. What should the developer do to fix this?

- [ ] **A**: Move testing.md out of .claude/rules/ and into a directory-level CLAUDE.md inside the test folder
- [x] **B**: Add YAML frontmatter with paths: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"] to testing.md so it only loads when editing test files
- [ ] **C**: Add the testing conventions to the root CLAUDE.md instead, since rules files cannot be path-scoped
- [ ] **D**: Use an @./.claude/rules/testing.md line in the root CLAUDE.md so the file only loads when the import is reached

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Without YAML frontmatter, rule files in .claude/rules/ load for all sessions. Adding a paths field with glob patterns restricts loading to sessions where the developer is editing matching files. This is the correct approach for token-efficient, conditional convention loading.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-072

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

Your team faces three tasks: (1) restructure a monolith into microservices, (2) fix a null pointer exception in a single function with a clear stack trace, (3) migrate from one logging library to another across 30 files. Which mode should be used for each?

- [ ] **A**: Plan mode for all three, since they all involve code changes
- [ ] **B**: Direct execution for all three with comprehensive upfront instructions
- [ ] **C**: Plan mode for (1), direct execution for (2) and (3)
- [x] **D**: Plan mode for (1) and (3), direct execution for (2)

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Task 1 involves architectural decisions with multiple valid approaches. Task 3 affects 30 files with a pattern that needs design before execution. Task 2 is a single-function fix with a clear stack trace — direct execution is appropriate.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d5-086

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A data engineer delegates a complex cross-database analysis to the platform agent: join Snowflake billing data with PostgreSQL usage data, apply currency normalisation, and produce a cost-per-user breakdown by region. The agent's context fills rapidly as it accumulates intermediate query results. What is the most effective strategy for managing this multi-step analysis within context limits?

- [ ] **A**: Execute all queries in a single SQL statement using cross-database joins to avoid intermediate results entirely. A single statement lets the engine plan the joins across both sources at once.
- [x] **B**: Write intermediate results to a scratchpad file after each step, then read back only the final aggregated data needed for the cost-per-user calculation.
- [ ] **C**: Delegate each step to a separate subagent so each runs with a fresh context window, then combine their outputs. A fresh window per step keeps each subagent's context free of the previous step's output.
- [ ] **D**: Summarise intermediate results between steps to reduce their token footprint in the conversation context. Summarising between steps keeps the running total of context growth roughly flat.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Scratchpad files offload intermediate results from the context window. Each step writes its output to a file, keeping the context budget free for the current step's reasoning. The final step reads back only the aggregated data it needs, avoiding the accumulation of raw intermediate results in context.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d3-073

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

A developer describes a code transformation in prose. Claude Code interprets it differently each time, producing inconsistent results. What technique should the developer try first?

- [ ] **A**: Rewrite the prose description with more precise language and technical terminology
- [ ] **B**: Write a test suite first and iterate by sharing test failures
- [ ] **C**: Use the interview pattern to have Claude ask clarifying questions before implementing
- [x] **D**: Provide 2-3 concrete input/output examples showing the exact before and after transformation

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Concrete examples eliminate interpretation ambiguity. The model generalises from examples more reliably than from descriptions. This is the documented first-line technique for inconsistent interpretation.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d4-074

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.4

Your extraction pipeline validates that line item amounts sum to the stated total. For Document A, the sum is £450 but the stated total is £500. For Document B, the 'department' field is missing entirely from the source text. Which retry strategy is correct?

- [x] **A**: Retry Document A with the discrepancy error; flag Document B for human review since the information is absent from the source
- [ ] **B**: Retry both: send the validation error for Document A and instruct the model to find the missing department for Document B, so each retry carries a specific instruction
- [ ] **C**: Retry both documents with the same prompt since extraction is non-deterministic, so a second pass has a fresh chance at both
- [ ] **D**: Skip retries for both and flag them for human review, so a person who can see the source document checks each one

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Document A has a fixable discrepancy (the model may have missed a line item). Document B has genuinely absent information — retries are ineffective.
> 
> *Guide Reference:* D4 · Implement validation, retry, and feedback loops for extraction quality

---

### Question ID: d1-093

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A coordinator delegates to a data collection agent (`web_search`, `database_query`) and an analysis agent (`calculate`, `chart_generate`). In testing, the analysis agent calls `web_search` directly to fetch extra context, bypassing the data collection agent. What is the architectural violation and how should it be fixed?

- [x] **A**: The analysis agent's allowedTools list includes web_search, which should be removed to enforce scoped tool access. Only the data collection agent should have web_search.
- [ ] **B**: Add a system prompt instruction telling the analysis agent not to use web_search even though it has access, so the restriction sits where the agent reads it each turn
- [ ] **C**: Allow the analysis agent to keep web_search access since it sometimes needs additional context for better analysis, so it can fill a gap without a round trip to the collector
- [ ] **D**: Implement a PostToolUse hook that logs when the analysis agent uses web_search for monitoring purposes, so every crossing of the boundary is recorded for later review

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Each agent should only have tools relevant to its specific role. The analysis agent should have calculate and chart_generate, not web_search. If the analysis agent needs additional data, it should request it through the coordinator, which then delegates to the data collection agent. This enforces the scoped tool access principle.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d1-094

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

An agent occasionally processes international transfers without required compliance checks. The compliance team requires 100% enforcement of anti-money laundering (AML) checks before any international transfer. What is the correct approach?

- [ ] **A**: Add detailed AML check instructions to the system prompt with examples of correct behaviour
- [x] **B**: Implement a PreToolUse hook that blocks transfer execution until AML verification returns a pass result
- [ ] **C**: Add a PostToolUse hook to flag completed transfers that skipped AML checks
- [ ] **D**: Train the agent with few-shot examples showing the correct AML verification workflow

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** A hook intercepts the outgoing tool call before execution and physically blocks it until the compliance check passes. This provides the deterministic guarantee that AML rules require.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d4-075

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

The moderation system's classification schema has a 'category' field defined as a free-text string. Auditors find 47 different category values in production data, including 'hate speech', 'Hate Speech', 'hate-speech', 'hateful content', and 'hate_speech' — all intended to be the same category. This makes downstream analytics and routing unreliable. What is the best schema fix?

- [x] **A**: Change the 'category' field from free-text string to an enum with predefined values like 'hate_speech', 'spam', 'harassment', and include an 'other' option for edge cases
- [ ] **B**: Add a post-processing normalisation step that maps all variations to canonical category names, so the 47 variants collapse to a fixed set before anything is stored
- [ ] **C**: Add detailed instructions to the prompt listing the exact category names to use and their formatting, so the names and casing sit where the model reads them each turn
- [ ] **D**: Add few-shot examples showing the correct category formatting for each type, so the model copies the formatting straight from worked examples of each category

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Enum fields constrain the model to predefined values, eliminating spelling and formatting variations. Including 'other' as an enum value handles edge cases without allowing free-text drift. With strict: true, the schema guarantees only valid enum values are returned.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d4-076

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.1

The moderation system's prompt instructs Claude to 'be conservative when moderating and err on the side of caution.' Reviewers find that innocuous posts about cooking with knives, news articles about violence, and fictional war stories are all being flagged as policy violations. What is the root cause and fix?

- [x] **A**: Replace 'be conservative' with explicit categorical criteria — define each violation category with specific indicators, severity levels, and concrete examples of what does and does not qualify, including edge cases like news reporting and fiction
- [ ] **B**: The model is too sensitive — lower the temperature to reduce over-flagging, so it stops treating borderline posts as violations and its flagging settles onto the clear cases where the policy plainly applies
- [ ] **C**: Add an allowlist of safe topics (cooking, news, fiction) that should never be flagged, so an entire class of legitimate posts is exempt from the conservative reading of the instruction and cannot be actioned while the rest of the policy is left untouched
- [ ] **D**: Add a second pass that reviews flagged posts and removes false positives before actioning them, so the over-flagging is corrected downstream and only genuine violations reach the moderation queue at all

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Vague directives like 'be conservative' give the model no basis for distinguishing between genuine violations and legitimate content that mentions sensitive topics. Explicit criteria with examples of both violations and non-violations (news, fiction, educational content) enable consistent, calibrated decisions.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d4-077

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.2

Your extraction pipeline correctly identifies data in structured tables but returns empty fields when the same information appears in narrative paragraphs. Detailed instructions specify all required fields. What should you try first?

- [x] **A**: Add few-shot examples showing correct extraction from both structured tables and narrative paragraphs
- [ ] **B**: Increase the model's context window to process more of the document
- [ ] **C**: Add a pre-processing step to convert all narrative text into tables
- [ ] **D**: Add a post-processing retry that re-extracts any empty fields

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Few-shot examples demonstrating correct handling of varied document structures directly address inconsistent extraction quality across formats.
> 
> *Guide Reference:* D4 · Apply few-shot prompting to improve output consistency and quality

---

### Question ID: d2-071

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.3

A team's agent must generate a weekly report on the first turn of each conversation by calling `generate_report`. With `tool_choice: 'auto'`, the agent sometimes responds with a text summary instead. The team wants to guarantee `generate_report` is called on turn one while allowing normal tool selection afterwards. What is the correct configuration?

- [ ] **A**: Set tool_choice to 'any' for all turns so the agent always calls a tool.
- [x] **B**: Set tool_choice to forced selection of generate_report for the first turn, then switch to 'auto' for subsequent turns.
- [ ] **C**: Add a system prompt instruction stating 'Always call generate_report first' and keep tool_choice on 'auto'.
- [ ] **D**: Remove all tools except generate_report from the first turn's tool list, then add the remaining tools for subsequent turns.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Forced selection with the specific tool name guarantees generate_report is called on the first turn. Switching to 'auto' afterwards restores normal behaviour where the model decides whether and which tools to call.
> 
> *Guide Reference:* D2 · Distribute tools appropriately across agents and configure tool choice

---

### Question ID: d1-095

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A user reports a post that contains both potentially defamatory text and an embedded image that may violate graphic content policies. The coordinator receives this report as a single moderation request. What is the correct delegation strategy?

- [ ] **A**: Send the entire report to the text classifier first, then forward its output to the image analyser, so the analyser has the text verdict in hand and can weigh both signals together before deciding
- [x] **B**: Decompose the request into two independent tasks — route the text to the text classifier and the image to the image analyser in parallel, then aggregate both results to determine the final moderation action
- [ ] **C**: Send the entire report to whichever subagent handles the more severe category, so the report is judged once against the policy that carries the heavier penalty and the lighter one cannot dilute it
- [ ] **D**: Create a new combined text-and-image subagent specifically for multi-modal reports, so one subagent owns the whole report and nothing has to be aggregated across two independent verdicts

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The coordinator should decompose multi-concern requests into independent subtasks. Text defamation and image policy violations are separate analysis dimensions that can be evaluated in parallel. The coordinator aggregates the results to make a unified moderation decision.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d5-087

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.2

A structured data extraction pipeline processes 500 documents per hour. Each request sends the same 12k-token system prompt with extraction schemas, followed by the document content which varies per request. The team wants to reduce API costs. Which prompt caching strategy is most effective?

- [x] **A**: Place the 12k-token system prompt and extraction schemas first, set a cache_control breakpoint after them, then append the variable document content. The static prefix caches across all 500 requests per hour
- [ ] **B**: Cache the entire prompt including document content, since many documents have similar structures and repeated structures are then served from the cache too
- [ ] **C**: Send the document content first so the model processes it before the extraction instructions, then cache the extraction schemas at the end, so the model has read the document before it meets the schema
- [ ] **D**: Split each request into two API calls: one for the cached system prompt and one for the document, then combine the results, so only the document half is billed at the full rate

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The 12k static prefix is identical across all requests and caches effectively. At 500 requests per hour, the cache read savings on 12k tokens per request significantly reduces costs. Variable document content after the breakpoint does not affect cache validity.
> 
> *Guide Reference:* D5 · Design effective escalation and ambiguity resolution patterns

---

### Question ID: d2-072

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A documentation team needs to update all references to a renamed API endpoint across their 500,000-line codebase. They know the old endpoint name (POST /api/v1/users/create) but not which files reference it. After locating the files, they need to replace the old endpoint with the new one (POST /api/v2/users). What is the correct tool sequence?

- [ ] **A**: Use Glob for '**/*.md' to find all documentation files, then Read each one to check for the old endpoint, then use Edit to update matches, covering every documentation file in the repository.
- [ ] **B**: Use Read on the API router file to find all endpoint definitions, then manually trace each reference, since the router is the authoritative list of endpoints.
- [x] **C**: Use Grep for '/api/v1/users/create' to find all files containing the old endpoint, then use Edit to replace the old endpoint with the new one in each matched file.
- [ ] **D**: Use Bash with sed to perform a global find-and-replace across all files in a single command, rewriting every occurrence without opening a file.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Grep searches file contents across the entire codebase, locating all references regardless of file type or location. Edit then makes targeted replacements in each matched file. This is the minimal, precise approach.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d3-074

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

A docs team maintains three content types in `docs/api/`, `docs/architecture/`, and `docs/runbooks/`, each with distinct formatting, terminology, and required sections. They want Claude Code to apply the correct standards automatically when editing any docs file, without loading all three rule sets in every session. What is the correct configuration architecture?

- [ ] **A**: Place all three sets of rules in the root CLAUDE.md with clear section headings so Claude Code can identify which rules apply, keeping all three sets in one file and letting it select the heading that matches the directory being edited
- [ ] **B**: Create three custom skills (/api-docs, /arch-docs, /runbook-docs) and require writers to invoke the correct one before editing, so the writer names the content type explicitly and the right conventions load on request
- [ ] **C**: Place a separate CLAUDE.md file in each of docs/api/, docs/architecture/, and docs/runbooks/ with the type-specific rules, so each directory carries its own and the nearest file wins for anything edited beneath it
- [x] **D**: Create three rule files in .claude/rules/ with YAML frontmatter paths targeting each directory: paths: ['docs/api/**'] for API rules, paths: ['docs/architecture/**'] for architecture rules, and paths: ['docs/runbooks/**'] for runbook rules

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Path-scoped rules in .claude/rules/ with glob patterns load only when editing files in the matching directory. Each documentation type gets its own rules loaded automatically and exclusively, conserving context tokens and eliminating the risk of applying incorrect standards.
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-075

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.3

The team creates a reusable /extract-service skill that guides Claude Code through the standard steps of extracting a module from the monolith into a microservice (identify boundaries, create service scaffold, migrate code, update call sites, add tests). Where should this skill be stored so that every team member who clones the repository has access?

- [ ] **A**: In ~/.claude/skills/ on each developer's machine, distributed via the team wiki
- [ ] **B**: In a shared MCP server that all team members connect to
- [ ] **C**: In the repository-root CLAUDE.md as an inline procedure
- [x] **D**: In the repository's .claude/skills/ directory, committed to version control

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** .claude/skills/ is project-scoped and version-controlled. When any team member clones the repository, the skill is automatically available as a /extract-service command. Updates to the skill flow through normal git pull, ensuring all developers have the same version.
> 
> *Guide Reference:* D3 · Apply path-specific rules for conditional convention loading

---

### Question ID: d1-096

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

A developer is exploring two different strategies for decomposing the monolith's order processing module: (1) splitting by business capability (orders, payments, shipping) or (2) splitting by data ownership (order-db, payment-db, shipping-db). They want to explore both approaches in parallel without losing either analysis. What is the correct Claude Code approach?

- [ ] **A**: Open two terminal tabs and run separate Claude Code sessions with different instructions in each
- [x] **B**: Use fork_session to create two parallel exploration branches from the current session's baseline, one for each decomposition strategy
- [ ] **C**: Use --resume to alternate between the two strategies in a single session, relying on conversation history to separate the analyses
- [ ] **D**: Instruct the agent to evaluate both strategies sequentially in the same session, then compare results

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** fork_session creates independent branches from a shared baseline. Both branches inherit the current codebase analysis and context but can diverge independently to explore different strategies. Neither branch's exploration affects the other, and both analyses are preserved.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d5-088

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.3

A documentation generation pipeline uses Claude Code to produce docs from three sources: source code comments, existing wiki pages, and API schema files. During a run, the wiki page retrieval fails with a timeout, but the source code and API schema are available. The pipeline currently halts entirely on any source failure. What is the best error handling strategy?

- [ ] **A**: Retry the wiki retrieval three times with exponential backoff. If all retries fail, halt the pipeline to prevent incomplete documentation, since a documentation set built on a partial source set is worse than none
- [ ] **B**: Silently skip the wiki source and generate documentation from the remaining two sources without noting the omission, so the pipeline completes on whatever responded and the output reads as a finished document
- [x] **C**: Return structured error context for the wiki failure (failure type, source URL, partial results if any), proceed with available sources, and mark the generated documentation with explicit gaps noting which sections lack wiki-sourced content
- [ ] **D**: Use the source code comments to infer what the wiki pages would have contained, filling in the gaps with generated content, so the missing sections are reconstructed from the code the wiki described anyway

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** This produces maximum value from available sources while maintaining transparency about what is missing. Structured error context enables intelligent recovery (retry later, alert the team). Explicit gap markers prevent users from trusting incomplete documentation as complete.
> 
> *Guide Reference:* D5 · Implement error propagation strategies across multi-agent systems

---

### Question ID: d1-097

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

The content moderation system uses a hub-and-spoke architecture with a coordinator that routes posts to specialist subagents: a text classifier, an image analyser, and a policy enforcer. The team notices that the image analyser sometimes directly calls the policy enforcer's action tools to remove posts, bypassing the coordinator. What is the architectural violation and how should it be fixed?

- [ ] **A**: Give the image analyser its own copy of the action tools so it does not need to call the policy enforcer's tools, so it can act on what it finds without routing back through the coordinator
- [ ] **B**: Add a message queue between the image analyser and the policy enforcer so communication is asynchronous, so neither subagent waits on the other and messages arrive when each is ready
- [ ] **C**: Merge the image analyser and policy enforcer into a single subagent to simplify the communication flow, so the exchange that broke isolation happens inside one subagent instead of across two
- [x] **D**: The image analyser is violating hub-and-spoke isolation — restrict its tool access to image analysis only and ensure all results flow back through the coordinator, which then routes to the policy enforcer

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** In hub-and-spoke orchestration, subagents must be isolated and communicate only through the coordinator. The image analyser should return its classification result to the coordinator, which then decides whether to invoke the policy enforcer. Direct subagent-to-subagent communication breaks the architecture.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d5-089

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

Claude Code is synthesising release notes from commit messages, PR descriptions, and changelog entries. During a 200+ commit session, summaries of early commits become vague ('various bug fixes') while recent commits are still detailed accurately. The context window is not full. What is the most likely cause?

- [ ] **A**: The model's temperature is set too high, causing it to generate vague summaries randomly, so detail varies from commit to commit with no relation to position
- [ ] **B**: Claude Code applies progressive summarisation to older commits to conserve context for recent ones, so early commits reach the model as summaries rather than as their original text
- [ ] **C**: The commit messages for early commits are inherently less detailed than recent ones, so the vague summaries are accurate and reflect how much the author actually wrote
- [x] **D**: The lost-in-the-middle effect causes the model to attend more strongly to information at the beginning and end of context, losing detail for commits in the middle of a long input sequence

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The lost-in-the-middle effect is a well-documented phenomenon where models attend more strongly to the start and end of long contexts, with reduced attention to middle content. With 200+ commits loaded sequentially, commits in the middle of the sequence receive less attention, producing vague summaries. Processing in smaller batches or reordering critical information to the start and end mitigates this.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d1-098

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

The moderation system auto-removes posts classified as policy violations. Production logs reveal that 3% of auto-removed posts were legitimate content (false positives), generating user complaints and eroding platform trust. The team considers two approaches: (A) escalate all borderline cases to human reviewers, or (B) add a confidence threshold where only high-confidence violations are auto-removed and everything else goes to human review. Which approach is better and why?

- [x] **A**: Approach B with confidence-based routing — auto-remove only high-confidence violations, escalate uncertain cases to human review, and auto-approve high-confidence safe content
- [ ] **B**: Approach A is better because human reviewers are always more accurate than automated systems, so routing everything to a person removes the error class entirely
- [ ] **C**: Neither — instead lower the classification threshold so fewer posts are flagged as violations, so fewer borderline posts enter the auto-removal path at all
- [ ] **D**: Approach B but with a fixed threshold of 95% confidence for all categories, so a single calibrated bar applies uniformly and no category gets special treatment

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Confidence-based routing creates a tiered system: high-confidence violations are actioned immediately, high-confidence safe content passes through, and uncertain cases receive human review. This balances speed, accuracy, and reviewer workload while directly addressing the false positive problem.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-099

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

The coordinator receives a batch of 200 flagged posts to moderate. Currently it processes them sequentially, taking 45 minutes. Each post's moderation is independent — the decision on one post does not affect others. How should the coordinator handle this batch?

- [ ] **A**: Process all 200 posts in a single API call by concatenating them into one large prompt
- [x] **B**: Delegate independent posts to parallel subagent instances, with the coordinator aggregating results as they complete
- [ ] **C**: Split into fixed batches of 20 posts and process each batch sequentially in a single prompt
- [ ] **D**: Increase the iteration cap on the agentic loop to allow the agent more time to process all 200 posts

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Since each post's moderation is independent, the coordinator should delegate them to parallel instances. This reduces total processing time from sequential (45 minutes) to roughly the time of the slowest individual moderation, and a failure on one post does not block others.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d4-078

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your CI/CD pipeline generates nightly security audit reports using the Message Batches API. A batch of 200 documents completes overnight, but 15 documents fail due to exceeding the context window. The team proposes resubmitting the entire batch of 200 documents. What is the correct failure handling strategy?

- [ ] **A**: Resubmit the entire batch since you cannot identify which documents failed
- [x] **B**: Resubmit only the 15 failed documents identified by custom_id, chunking the oversized documents before resubmission
- [ ] **C**: Switch the entire pipeline to synchronous processing to avoid batch failures
- [ ] **D**: Increase the batch processing timeout to give the system more time to handle large documents

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Identify failed documents by custom_id, then resubmit only failures with modifications (chunking oversized documents). This is the correct batch failure handling pattern — it avoids reprocessing the 185 successful documents and addresses the root cause of the failures.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d1-100

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

The coordinator receives two requests simultaneously: (1) rename a utility class used across 60 files, and (2) add a new health-check endpoint to one microservice. A developer proposes delegating both tasks to subagents. What is the optimal delegation strategy?

- [ ] **A**: Delegate both to subagents — task 1 to a rename specialist and task 2 to an API specialist
- [ ] **B**: Handle both tasks directly in the coordinator to minimise subagent communication overhead
- [ ] **C**: Delegate task 2 to a subagent and have the coordinator handle task 1, since the coordinator has full codebase awareness needed for the rename
- [x] **D**: Delegate task 1 (60-file rename) to a subagent with scoped context, and have the coordinator handle task 2 (single-file health check) directly

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The coordinator should delegate when tasks are large or require specialist focus, and handle tasks directly when they are simple and well-scoped. A 60-file rename benefits from a dedicated subagent with focused context. A single-file endpoint addition is trivial enough for the coordinator to handle without delegation overhead.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-101

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

A developer resumes a Claude Code session after modifying 3 files in a 50-file codebase. The agent gives contradictory advice about the modified files because it is reasoning from stale tool results. What is the correct approach?

- [ ] **A**: Start a completely new session and re-analyse the entire codebase from scratch, so nothing stale from the earlier reading survives
- [ ] **B**: Resume the session and ask the agent to re-read only the 3 modified files, so only what actually changed is read again
- [ ] **C**: Use fork_session to create a branch that incorporates the file changes, keeping the useful findings and dropping only the stale reads
- [x] **D**: Start a fresh session with an injected summary of prior findings and inform the agent about the specific 3 file changes for targeted re-analysis

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** A fresh session with summary injection avoids stale tool results. Specifying the 3 changed files enables targeted re-analysis without wasting time on unchanged files.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d1-102

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A coordinator agent receives a request to extract a payment processing module from the monolith into a standalone microservice. The task involves creating new API endpoints, migrating database tables, updating 40+ call sites, and writing integration tests. A junior developer suggests the coordinator should handle the entire task itself to avoid subagent communication overhead. Why is this approach wrong?

- [ ] **A**: The coordinator should never write code — it should only route tasks
- [ ] **B**: The coordinator cannot access file system tools, so it physically cannot make code changes
- [x] **C**: Loading 40+ files into one context dilutes attention — the coordinator should delegate to scoped subagents instead
- [ ] **D**: The coordinator's API rate limits would be exceeded when processing 40+ files

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Large, multi-file tasks suffer from attention dilution when processed in a single context. Delegating to specialist subagents ensures each agent works with focused context. The coordinator should handle task decomposition and context injection, delegating implementation to specialists.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-103

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

Production data shows that in 8% of cases, a customer support agent processes refunds without verifying account ownership, occasionally leading to refunds on wrong accounts. What is the most appropriate fix?

- [x] **A**: Implement a programmatic prerequisite gate that blocks process_refund until get_customer has returned a verified customer ID
- [ ] **B**: Add stronger instructions to the system prompt emphasising the importance of verification before refunds
- [ ] **C**: Add few-shot examples showing the correct verification-then-refund workflow
- [ ] **D**: Implement a routing classifier that sends refund requests to a specialised verification pipeline

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Financial operations require deterministic enforcement. A prerequisite gate physically prevents the refund tool from executing until identity verification is complete, eliminating the 8% failure rate entirely.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d1-104

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.4

A financial services company's customer support agent receives a request: 'I was charged twice for my subscription, and I also need to update my billing address.' The agent processes the address change successfully but only partially investigates the double-charge, providing an incomplete resolution. What architectural pattern should be applied to handle this correctly?

- [ ] **A**: Add a system prompt instruction telling the agent to address all customer concerns before responding, so nothing the customer raised is left unanswered
- [x] **B**: Decompose the request into distinct items (double-charge investigation and address update), investigate each in parallel using shared context, and synthesise a unified resolution
- [ ] **C**: Route the request to two separate specialised agents — one for billing disputes and one for address changes, so each concern is handled by the agent that specialises in it
- [ ] **D**: Process the concerns sequentially — complete the address change first, then investigate the double-charge in a follow-up interaction, so the simpler change lands before the investigation begins

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Multi-concern request decomposition breaks the compound request into distinct items, investigates each in parallel using shared context (the customer's account), and synthesises a unified resolution that addresses all concerns. This ensures no concern is dropped or partially addressed.
> 
> *Guide Reference:* D1 · Implement multi-step workflows with enforcement and handoff patterns

---

### Question ID: d5-090

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.5

A contract extraction system reports 96% overall accuracy. The team plans to auto-approve all extractions where model confidence exceeds 90%. A pilot reveals party name extraction achieves 99% accuracy but indemnification clause extraction only 71%, even though the model reports high confidence on both. What should they implement before automating?

- [ ] **A**: Raise the automation confidence threshold from 90% to 99% to ensure only the most reliable extractions are automated and nothing borderline is approved.
- [ ] **B**: Exclude indemnification clauses from automation entirely and continue automating all other field types at the 90% threshold, removing the field driving the errors.
- [x] **C**: Calibrate confidence thresholds per field type using labelled validation sets, and implement stratified sampling to continuously monitor accuracy by document type and field segment.
- [ ] **D**: Train a separate classification model to predict extraction accuracy before deciding whether to automate each extraction, so each one is judged by a model built for that decision. A model trained for that judgement makes it better.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Field-level confidence calibration using ground truth data exposes the discrepancy between reported confidence and actual accuracy. Stratified sampling provides ongoing monitoring to detect novel error patterns. Together, these ensure automation is only applied where validated accuracy justifies it.
> 
> *Guide Reference:* D5 · Design human review workflows and confidence calibration

---

### Question ID: d2-073

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.5

A developer needs to rename a variable from 'userData' to 'customerData' in a specific file. The variable appears 12 times throughout the file. What is the most efficient approach using Claude Code's built-in tools?

- [ ] **A**: Use Grep to find all 12 occurrences, then call Edit 12 times, once for each occurrence with unique surrounding context.
- [ ] **B**: Use Read to load the file, then Write the entire file back with all occurrences manually changed.
- [x] **C**: Use Edit with replace_all set to true, specifying 'userData' as the old string and 'customerData' as the new string.
- [ ] **D**: Use Bash with sed to perform a global find-and-replace across the file.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The Edit tool's replace_all parameter replaces all occurrences of the specified string in a single operation. This is the most efficient approach for renaming a variable throughout a file.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d1-105

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.2

A research system receives a customer query: 'Compare the environmental impact and cost-effectiveness of electric vehicles versus hydrogen fuel cell vehicles for commercial fleet operations.' The coordinator must decide how to decompose this task. Which decomposition strategy is most appropriate?

- [x] **A**: Multi-concern decomposition: split into parallel research tracks (environmental impact and cost-effectiveness), each investigating both vehicle types, then synthesise into a unified comparison
- [ ] **B**: Single-agent approach: assign the entire comparison to one research agent with access to all tools, so one agent holds the whole comparison and nothing has to be merged
- [ ] **C**: Vehicle-based decomposition: assign one agent to research EVs and another to research hydrogen fuel cells, then merge findings, so each vehicle type is researched in full before the comparison
- [ ] **D**: Dynamic adaptive decomposition: start with a broad search and let the coordinator decide next steps based on what it finds, so the plan follows the evidence rather than a fixed split

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The query has two distinct analytical dimensions (environmental impact and cost-effectiveness) applied to the same subjects. Multi-concern decomposition splits these into parallel tracks, each with its own subagent. Both tracks investigate both vehicle types, ensuring consistent comparison methodology. A synthesis step produces the unified comparison.
> 
> *Guide Reference:* D1 · Orchestrate multi-agent systems with coordinator-subagent patterns

---

### Question ID: d2-074

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

The data platform's query_snowflake tool has a description that reads: 'Queries Snowflake data warehouse. Accepts SQL.' The agent correctly uses the tool but frequently sends queries using PostgreSQL-specific syntax (e.g. ILIKE, string_agg) that Snowflake rejects. What is the most effective fix?

- [ ] **A**: Add a SQL syntax validation layer in front of the MCP tool that rejects non-Snowflake syntax before execution, so a query in the wrong dialect fails before it reaches the warehouse and the agent gets an immediate signal.
- [x] **B**: Expand the tool description to specify that the tool accepts Snowflake SQL dialect, include examples of supported functions (e.g. LISTAGG instead of string_agg, ILIKE is supported), and note dialect differences from PostgreSQL.
- [ ] **C**: Add a system prompt instruction listing all Snowflake-specific SQL functions the agent should use, so the dialect rules sit in the prompt where the model reads them every turn rather than in a tool description.
- [ ] **D**: Have the MCP server automatically translate PostgreSQL syntax to Snowflake syntax before executing the query, so the agent keeps writing the dialect it already knows and the server absorbs the difference.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The description says 'Accepts SQL' without specifying the dialect. The agent defaults to PostgreSQL syntax because it has no guidance on dialect differences. Adding dialect-specific examples and boundary conditions in the description directly resolves the misrouting.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d1-106

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A coordinator agent should spawn specialist subagents for billing disputes and technical issues. Its system prompt describes the delegation workflow correctly, yet when it tries to invoke a subagent nothing happens: no subagent is created and no related error is thrown. What is the most likely cause?

- [ ] **A**: The coordinator needs to pass the full conversation history to the subagent for it to initialise properly, so the subagent starts with the context the coordinator holds
- [ ] **B**: The subagent's AgentDefinition is missing a description field, preventing it from being invoked, so there is nothing for the coordinator to match its request against
- [x] **C**: The coordinator's allowedTools list does not include 'Agent' (or its backward-compatible alias 'Task'), so it cannot invoke the mechanism for spawning subagents
- [ ] **D**: The subagents need to be pre-registered in a configuration file before the coordinator can invoke them, so it can resolve each one by name when it spawns it

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The Agent tool (renamed from Task tool in SDK v2.1.63) is the mechanism for spawning subagents. If 'Agent' (or 'Task') is not in the coordinator's allowedTools, it physically cannot create subagents regardless of what the system prompt instructs. This is a configuration issue, not a prompt issue.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-107

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

A developer-tool agent has two guardrails: a PreToolUse hook blocking file writes outside the project directory (enforced 100% of the time), and a system prompt instruction 'Always create a backup before overwriting existing files' (followed 88% of the time). A senior engineer wants all guardrails converted to hooks for consistency. What is the correct assessment?

- [ ] **A**: The senior engineer is correct — all guardrails should be deterministic hooks for maximum reliability, since a prompt instruction can always be skipped under load
- [ ] **B**: Both guardrails should be prompt instructions to reduce implementation complexity, since one enforcement mechanism is simpler to reason about than two
- [x] **C**: The directory restriction is correctly a hook (safety-critical); the backup instruction can stay as a prompt because a missed backup is recoverable.
- [ ] **D**: The backup instruction should be converted to a hook because 88% is an unacceptable failure rate for anything described as a guardrail

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The guardrail strategy should match the severity of the consequence. Writing outside the project directory could damage the host system — this demands deterministic enforcement via a hook. Missing a backup is inconvenient but recoverable (files are in version control). The 88% compliance rate from the prompt is acceptable for a non-critical best practice.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d1-108

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

A research team is using Claude Code to analyse a large dataset. After completing an initial analysis, they want to explore two competing hypotheses: one using a statistical modelling approach and another using a machine learning approach. Both explorations should start from the same baseline analysis but proceed independently. Which session management strategy is correct?

- [x] **A**: Use fork_session to create two independent branches from the shared analysis baseline, exploring one hypothesis in each fork
- [ ] **B**: Start two fresh sessions, each with an injected summary of the initial analysis, and explore one hypothesis in each
- [ ] **C**: Use the initial session and explore both hypotheses sequentially, asking the agent to set aside the first approach before starting the second
- [ ] **D**: Resume the session twice with --resume, once for each hypothesis, running them one after the other

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** fork_session creates independent branches from a shared baseline, which is exactly the use case here. Both forks start from the complete initial analysis but proceed independently. Neither exploration contaminates the other, enabling a clean comparison of the two approaches.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d3-076

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.6

A CI pipeline validates that generated API docs match the codebase. It runs `claude -p 'Verify that all public API endpoints in src/api/ have corresponding documentation in docs/api/'` with `--output-format json`. The check consistently reports 100% coverage, yet manual audits regularly find undocumented endpoints. What is the most likely cause?

- [x] **A**: Claude Code is performing a surface-level pattern match rather than a deep semantic comparison, and the prompt lacks specific validation criteria and expected output structure for reporting gaps
- [ ] **B**: The --output-format json flag corrupts the analysis results, causing false positives, since serialisation drops the fields the comparison depends on and what remains reads as a clean pass
- [ ] **C**: The -p flag prevents Claude Code from reading files, so it generates a plausible-sounding report without actual file access, describing endpoints it never opened
- [ ] **D**: The CI pipeline needs a separate review step where a second Claude Code instance verifies the first instance's findings, catching what the first one missed before CI reports a pass

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Without explicit validation criteria (e.g., 'for each exported function in src/api/, check that docs/api/ contains a section with the function name, parameters, and return type'), the model may perform a shallow check. Adding structured criteria, expected output format, and examples of what constitutes a gap produces reliable verification.
> 
> *Guide Reference:* D3 · Integrate Claude Code into CI/CD pipelines

---

### Question ID: d1-109

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.5

A coordinator spawns a research subagent to investigate market trends. The subagent returns detailed findings. The coordinator then needs to pass these findings to a synthesis subagent for report writing. However, the synthesis subagent produces a report that contradicts the research findings. What is the most likely cause?

- [ ] **A**: The synthesis subagent has a conflicting system prompt that overrides the research data, so the findings are discarded in favour of its own framing
- [ ] **B**: The synthesis subagent has access to web search tools and is finding contradictory information online, blending retrieved pages with the findings it was handed
- [x] **C**: The coordinator is passing a summary of the research findings instead of the full structured output, causing the synthesis agent to fill in gaps from its training data
- [ ] **D**: The two subagents are using different model versions with different training data, so they disagree on facts their training sets covered differently

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Subagents do not share memory. The coordinator must explicitly pass the complete research output to the synthesis agent. If the coordinator only passes a summary, the synthesis agent has no access to the detailed findings and will rely on its training data to fill gaps, potentially contradicting the actual research.
> 
> *Guide Reference:* D1 · Apply Agent SDK hooks for tool call interception and data normalization

---

### Question ID: d3-077

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.4

A developer asks Claude Code to 'explain the order processing pipeline' before refactoring it. The pipeline spans 15 classes across 4 packages with deep inheritance and callback chains. Claude Code reads 3 files and produces a superficial summary that misses the callback chain entirely. What approach would produce a more thorough analysis?

- [ ] **A**: Re-prompt Claude Code with more specific instructions listing all 15 classes to read, so it works through every class instead of sampling the handful it happens to open first
- [ ] **B**: Switch to plan mode and ask Claude Code to create a plan for understanding the pipeline, so the plan names each class and callback chain it intends to trace before any reading starts
- [x] **C**: Use an Explore subagent configured for verbose discovery, which will systematically trace the pipeline across classes, follow inheritance hierarchies, and map callback chains before producing a comprehensive analysis
- [ ] **D**: Run multiple Claude Code sessions, each analysing a different package, then manually combine the results, so every package gets a full session's attention and none of them is skimmed

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The Explore subagent is purpose-built for verbose, thorough codebase discovery. It systematically follows references, traces inheritance, and maps control flow across files — exactly what is needed for a complex event-driven pipeline. Regular Claude Code defaults to efficient, minimal reads; the Explore subagent prioritises comprehensive discovery.
> 
> *Guide Reference:* D3 · Determine when to use plan mode vs direct execution

---

### Question ID: d5-091

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.6

A data extraction pipeline extracts financial figures from annual reports. The pipeline cites sources using inline text references like 'According to page 12 of the 2024 Annual Report, revenue was $4.2B.' When the extracted data is consumed by a downstream analytics system, the source attribution is consistently lost. What is the root cause and fix?

- [x] **A**: Inline prose citations are fragile because downstream systems rewrite, parse, or restructure text. Fix by outputting structured claim-source mappings where each extracted value is paired with its source document, page, and date as structured data fields
- [ ] **B**: The downstream system strips text formatting. Fix by making the citations bold or using a special delimiter, so the attribution survives whatever rewriting the downstream system applies to the surrounding prose long before the figure ever reaches the reader
- [ ] **C**: The downstream system needs to be modified to preserve all input text verbatim without any transformation, so the citation reaches the reader exactly as the extractor wrote it with nothing in between
- [ ] **D**: Add a separate attribution database that the downstream system can query to look up sources for any extracted value, so the prose stays clean and any figure can be resolved back to its source on demand

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Structured claim-source mappings survive downstream processing because they are data fields, not prose. An analytics system can consume {'value': '4.2B', 'source': '2024 Annual Report', 'page': 12} without losing attribution, whereas it will discard 'According to page 12...' during text processing.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d3-078

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

Two Claude Code instances are running in separate git worktrees: Instance A is extracting the payment service (branch: extract/payment) and Instance B is extracting the inventory service (branch: extract/inventory). Both instances need to modify the shared OrderService.java file — Instance A to remove payment logic and Instance B to remove inventory logic. How should the team coordinate this?

- [ ] **A**: Let both instances modify OrderService.java independently on their branches and resolve the merge conflict when merging to main, so neither is blocked and the divergence is settled once at merge time
- [ ] **B**: Create a third Claude Code instance dedicated to modifying only shared files, with Instances A and B handling everything else, so shared files have a single writer and the other two never touch them
- [x] **C**: Have Instance A complete and merge first, then Instance B rebases onto the updated main before modifying OrderService.java, ensuring each instance works from the latest state of shared files
- [ ] **D**: Use file locking via git to prevent both instances from modifying OrderService.java simultaneously, so only one instance holds the file at a time and the other waits its turn

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Sequencing modifications to shared files avoids merge conflicts. Instance A completes its changes to OrderService.java and merges. Instance B then rebases onto the updated main, seeing Instance A's changes, and makes its modifications with full awareness of the current state. This is the standard coordination pattern for parallel Claude Code instances modifying shared files.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d3-079

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.1

The refactoring team's Java naming convention must be applied on every run. A senior developer's user-level CLAUDE.md (~/.claude/CLAUDE.md) contradicts it, and reviewers have already caught Claude following the developer's personal preference over the team rule. Where should the team move the rule so it is guaranteed to be honoured?

- [ ] **A**: Keep the rule in CLAUDE.md but move it into a CLAUDE.local.md so it appends last and overrides the personal preference
- [ ] **B**: Leave the rule in the repository-root CLAUDE.md — the more specific scope wins on conflicts, so it will override the user-level file
- [ ] **C**: Promote the rule into the user-level CLAUDE.md of every team member so it loads first and sets the baseline
- [x] **D**: Into the project's settings.json or a PreToolUse hook — enforcement-grade locations that the Claude Code client applies regardless of what the model decides

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Anthropic's memory docs are explicit that CLAUDE.md files are 'concatenated into context rather than overriding each other' and that 'if two rules contradict each other, Claude may pick one arbitrarily.' CLAUDE.md is delivered as a user message and the docs warn there's 'no guarantee of strict compliance.' The docs themselves point teams at the right alternative: 'Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md instructions shape Claude's behavior but are not a hard enforcement layer.' For a rule that must hold every time, move it to settings.json permissions or a hook — hooks run as shell commands at fixed lifecycle events and apply 'regardless of what Claude decides to do.'
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d3-080

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

The team wants to ensure that every Java file written by Claude Code during refactoring is automatically formatted with the project's Checkstyle rules before being saved. Developers occasionally forget to run the formatter manually. What is the correct hook configuration?

- [x] **A**: A PostToolUse hook on file write operations that runs the Checkstyle formatter on the written file, automatically correcting any style violations
- [ ] **B**: A PreToolUse hook on the Write tool that runs Checkstyle on the content before the file is written, so non-compliant content is corrected before it reaches disk
- [ ] **C**: Add 'Always run Checkstyle before saving files' to the CLAUDE.md system prompt, so the rule is in the project memory every session loads
- [ ] **D**: A PreToolUse hook on the Read tool that verifies all Java files are Checkstyle-compliant before they are read into context, so a violation is caught the moment a file enters

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** PostToolUse fires after the file is written to disk. A hook that runs the Checkstyle formatter on the output file ensures every written Java file conforms to the project's style rules, regardless of what the model generated. This provides deterministic enforcement without relying on prompt instructions.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d4-079

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.3

Your document processing pipeline chains three steps: (1) extract raw text, (2) classify document type, (3) extract structured fields based on type. Step 2 occasionally misclassifies invoices as purchase orders, causing step 3 to extract the wrong fields. The team proposes combining steps 2 and 3 into a single prompt to reduce errors. What is the better approach?

- [ ] **A**: Combine steps 2 and 3 as proposed, since fewer steps means fewer failure points and classification and extraction then share one context
- [ ] **B**: Run step 2 three times and use majority voting to determine the document type, so a single misclassification is outvoted by the two runs that agree
- [ ] **C**: Add more document type examples to step 2's prompt to improve classification accuracy, so the classifier has met a case like each type before it sees one
- [x] **D**: Keep the steps separate but add validation between steps 2 and 3 that checks classification confidence and routes low-confidence documents for re-classification before extraction

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** Keeping steps separate maintains focused prompts. Adding validation between steps catches misclassifications before they cascade into wrong-field extraction. This is the core principle of prompt chaining: focused steps with inter-step validation.
> 
> *Guide Reference:* D4 · Enforce structured output using tool use and JSON schemas

---

### Question ID: d2-075

**Difficulty:** Medium | **Domain:** 2 | **Task:** 2.1

A support agent has `process_refund` and `adjust_billing` tools with clearly differentiated descriptions, yet still occasionally calls `adjust_billing` for refund requests. The system prompt contains the instruction: 'For any billing-related concerns, prioritise resolving them quickly using available billing tools.' What is the root cause?

- [ ] **A**: The tool descriptions are still too similar and need further differentiation with explicit boundary statements, so the split is stated rather than left to inference.
- [ ] **B**: The two tools should be consolidated into a single financial_operation tool that handles both refunds and billing adjustments, so there is no selection left to get wrong.
- [ ] **C**: The model needs few-shot examples demonstrating that refund requests should use process_refund, not adjust_billing, so the mapping is shown on cases rather than asserted.
- [x] **D**: The keyword-sensitive instruction in the system prompt creates an unintended association between refund requests (which mention billing) and the adjust_billing tool, overriding the improved descriptions.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** System prompt wording can silently override well-written tool descriptions. The phrase 'billing-related concerns' matches refund requests that mention billing, causing the model to favour adjust_billing even when process_refund is the correct tool. Reviewing system prompts for conflicts after updating tool descriptions is essential.
> 
> *Guide Reference:* D2 · Design effective tool interfaces with clear descriptions and boundaries

---

### Question ID: d1-110

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

The refactoring coordinator delegates a database migration task to a subagent. The subagent sometimes executes destructive SQL migrations (DROP TABLE, ALTER TABLE DROP COLUMN) before verifying that a rollback script exists. The team requires that every destructive migration has a verified rollback before execution. What approach provides the strongest guarantee?

- [ ] **A**: Add a prerequisite check in the system prompt: 'Always verify rollback scripts exist before executing destructive migrations', so the requirement sits where the subagent reads it every turn
- [ ] **B**: Have the coordinator agent review the subagent's SQL before allowing execution, so a second model inspects each statement before it reaches the database
- [x] **C**: Implement a programmatic prerequisite gate that blocks execution of any SQL tool call containing DROP or ALTER TABLE DROP until a rollback verification tool has returned success
- [ ] **D**: Run all migrations in a sandboxed database first and check for errors before applying to the real database, so a destructive statement fails in the sandbox rather than in production

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** A programmatic prerequisite gate physically prevents destructive SQL execution until the rollback verification precondition is met. This provides a deterministic guarantee that no destructive migration runs without a verified rollback, eliminating the failure mode entirely.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d1-111

**Difficulty:** Hard | **Domain:** 1 | **Task:** 1.6

An insurance claim agent has gathered all relevant information but the policy language admits two valid interpretations and its confidence is low. With no escalation path, the agent picks one interpretation and proceeds. What architectural improvement is needed?

- [ ] **A**: Add more insurance policy documents to the agent's knowledge base to improve its interpretation accuracy, so it has enough comparable precedent in context to settle an ambiguity of this kind itself
- [x] **B**: Implement a confidence threshold that triggers a structured escalation to a human claims specialist, including the customer ID, claim summary, the two possible interpretations, and supporting evidence for each
- [ ] **C**: Have the agent ask the customer which interpretation they prefer, so the reading the policy admits is chosen by the person whose claim it decides and the agent never has to guess
- [ ] **D**: Train a fine-tuned model specifically for insurance policy interpretation, so ambiguous policy language is resolved by a model trained on exactly that language rather than a general one

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** When the agent encounters genuine ambiguity that requires human judgment, it should escalate with a structured handoff. The escalation payload includes all the information the human specialist needs: customer ID, claim summary, both interpretations, and supporting evidence. This ensures the human can make an informed decision without re-investigating.
> 
> *Guide Reference:* D1 · Design task decomposition strategies for complex workflows

---

### Question ID: d5-092

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

Claude Code is auditing API documentation coverage across a large codebase. After exploring 15 modules, the agent produces vague references like 'the authentication module follows standard patterns' instead of citing specific class names and method signatures it discovered earlier. `/compact` has already been used once. What is the most effective next step?

- [x] **A**: Delegate remaining module explorations to subagents, providing each with a summary of findings so far from a scratchpad file, while the main agent preserves coordination context.
- [ ] **B**: Run /compact again to further reduce context usage and continue the exploration in the same session, so the freed context is spent on the modules still to explore.
- [ ] **C**: Start a fresh session and re-explore all 15 modules more efficiently to rebuild the context with only essential findings, so it holds only what the audit actually needs.
- [ ] **D**: Increase the model's temperature to encourage more detailed and specific outputs instead of vague pattern references, so the outputs regain the specificity they lost.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Subagent delegation isolates verbose exploration output from the main agent's context. The scratchpad file persists specific findings (class names, method signatures) across context boundaries. The main agent retains enough context for coordination without being overwhelmed by discovery output.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d5-093

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.1

A docs team processes a 500,000-line codebase by having Claude Code read files and generate docs, instructing it to 'summarise each module after documenting it, then discard the detailed source from context.' After processing 20 modules, the docs for module 21 reference class names from module 3 that were renamed in module 12. What caused this failure?

- [ ] **A**: Claude Code cached module 3's source code and served the stale version instead of the updated file on disk, so the agent worked from a copy taken before the rename landed and never saw the new names so the rename stayed invisible to it for the whole run
- [ ] **B**: The agent's context window overflowed, causing it to hallucinate class names from earlier modules, so names from module 3 were reproduced in place of the ones it could no longer see in context
- [x] **C**: Progressive summarisation lost the rename detail: when module 12's summary replaced its source code, the rename was condensed to 'various refactoring changes', so the agent retained module 3's original class names from its earlier summary
- [ ] **D**: The model confused similar class names because it processed too many modules in a single session, so names differing by a word or two were interchanged across module boundaries as it went

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** Progressive summarisation is lossy. The summary of module 12 likely compressed the rename into a generic phrase, while module 3's summary still referenced the original class names. When the agent documented module 21, it found conflicting names across summaries and defaulted to the earlier, more prominent reference. Critical cross-module changes like renames must be tracked in a persistent facts block outside summarised context.
> 
> *Guide Reference:* D5 · Manage conversation context to preserve critical information across long interactions

---

### Question ID: d5-094

**Difficulty:** Medium | **Domain:** 5 | **Task:** 5.4

A documentation team working across a 500,000-line codebase notices that Claude Code's responses become less specific after extensive file exploration. What is the term for this degradation and what is the primary mitigation in Claude Code?

- [x] **A**: Context degradation — mitigated by using scratchpad files to persist key findings outside the conversation context, and delegating exploration to subagents to isolate verbose output
- [ ] **B**: Token exhaustion — mitigated by increasing the model's max_tokens parameter, since it is the response length that is capped rather than the room left in context
- [ ] **C**: Hallucination drift — mitigated by lowering the temperature to zero for deterministic output, since deterministic sampling reproduces the specific detail rather than a paraphrase
- [ ] **D**: Prompt injection — mitigated by sanitising file contents before they enter the context window, since untrusted file content is what steers the model toward generic phrasing

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** Context degradation occurs when the model loses grip on specific details as verbose tool output accumulates in the conversation. Scratchpad files persist findings on disk where they can be re-read as needed. Subagent delegation isolates verbose exploration output from the main agent's context budget.
> 
> *Guide Reference:* D5 · Manage context effectively in large codebase exploration

---

### Question ID: d2-076

**Difficulty:** Hard | **Domain:** 2 | **Task:** 2.5

An agent attempts to use the Edit tool to update a configuration value in a large auto-generated file where the same string "timeout: 30" appears 47 times. The Edit call fails because the match is not unique. The agent tries to fix this by extending old_string with 10 lines of surrounding context — but every occurrence is structurally identical (the auto-generator writes the same block verbatim 47 times). What is the correct fallback approach?

- [ ] **A**: Keep expanding old_string until it captures enough unique text — with 47 occurrences there must be at least one line difference further up in the block.
- [ ] **B**: Use replace_all: true in the Edit call so the tool replaces all 47 occurrences simultaneously.
- [x] **C**: Use Read to load the file, locate the specific occurrence by its position or index in memory, modify that entry, then use Write to save the full file back.
- [ ] **D**: Use Bash with sed -i to replace the first occurrence and rely on sed line-ordering to target the right one.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** When Edit fails and the file is auto-generated with structurally identical repeated blocks, extending old_string context is provably futile — the generator wrote the same bytes in every block by design. Setting replace_all would blindly change all 47 entries when only one is wanted, and sed without a reliable line-number anchor cannot safely target the right occurrence. The correct fallback is Read → locate by structural position or index → modify in memory → Write: it bypasses Edit uniqueness contract entirely and lets you target the exact occurrence programmatically.
> 
> *Guide Reference:* D2 · Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively

---

### Question ID: d4-080

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.6

Production metrics show that when your agent resolves complex cases involving billing disputes or multi-order returns, customer satisfaction scores are 15% lower than for simple cases -- even when the resolution is technically correct. Root cause analysis reveals the agent provides accurate resolutions but inconsistently explains the reasoning: sometimes omitting relevant policy details, other times missing timeline information or next steps. The specific context gaps vary by case. You want to improve resolution quality without adding human review overhead. Which approach is most effective?

- [ ] **A**: Implement few-shot examples in the system prompt showing complete resolution explanations for five common complex case types, demonstrating how to include policy context, timelines, and next steps. Worked examples carry the timelines and next steps.
- [x] **B**: Add a self-critique step where the agent evaluates its draft response for completeness -- ensuring it addresses the customer's concern, includes relevant context, and anticipates follow-up questions.
- [ ] **C**: Add a structured output schema requiring policy_context, resolution_timeline, and next_steps fields in every response, so the model is forced to populate each section before sending.
- [ ] **D**: Route complex cases through a dedicated multi-turn clarification loop before resolution, ensuring all customer context is gathered upfront before drafting the explanation.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** The root cause is case-specific variation in completeness -- the agent omits different things in different cases. B (self-critique) is adaptive: the agent evaluates its own draft against the actual case, catching whichever context gaps exist for that specific situation, with no human overhead. A (few-shot) is the primary trap: examples teach format for five enumerated types but cannot address the varying gap pattern in novel cases -- it fixes presentation, not adaptive completeness. C (structured schema) forces field presence but the agent may fill sections with generic boilerplate irrelevant to the specific case; structure without evaluation does not close reasoning gaps. D addresses information gathering, not explanation quality, and adds interaction overhead that may further frustrate customers already in a dispute.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d4-081

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.1

Your automated code review averages 15 findings per pull request, with developers reporting a 40% false positive rate. The bottleneck is investigation time: developers must click into each finding to read Claude's reasoning before deciding whether to address or dismiss it. Your CLAUDE.md already contains comprehensive rules for acceptable patterns, and stakeholders have explicitly rejected any approach that filters findings before developer review. What change would best address the investigation time bottleneck?

- [x] **A**: Require Claude to include its reasoning and confidence assessment inline with each finding, so developers can triage without navigating into individual findings.
- [ ] **B**: Categorize each finding by severity tier (critical / warning / informational) so developers can prioritize which findings to investigate first.
- [ ] **C**: Add a post-processor that analyzes finding patterns and automatically suppresses those matching historical false positive signatures from past pull requests.
- [ ] **D**: Configure Claude to only surface findings where its confidence exceeds a defined threshold, reducing total finding volume to what is most likely actionable.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** The bottleneck is the click required to read reasoning -- not the volume or category label. A eliminates that click by surfacing reasoning and confidence inline; developers triage at a glance with no navigation, and all findings remain visible (satisfying the no-filtering constraint). B (severity tier) adds a useful label but still requires developers to click in to read the reasoning they need to decide; it addresses prioritization, not investigation time. C (post-processor suppressing historical false positives) was explicitly rejected by stakeholders as a filtering approach -- the wrong answer the learner chose. D (high-confidence threshold filtering) also hides findings from developer review and was explicitly rejected for the same reason.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

### Question ID: d3-081

**Difficulty:** Hard | **Domain:** 3 | **Task:** 3.5

You ask Claude Code to implement a complex data transformation function. After three iterations, the output still has subtle edge case bugs that are hard to describe in prose. What iteration strategy will most reliably converge on a correct implementation?

- [ ] **A**: Write more detailed prose descriptions of the edge cases in each follow-up message, being increasingly specific about the expected behaviour.
- [ ] **B**: Switch to a more capable model mid-session so the next iteration benefits from stronger reasoning about the transformation logic. so the remaining edge cases meet stronger reasoning
- [x] **C**: Write tests that encode the edge cases first, then iterate by sharing the actual test failure output -- assertion, expected vs actual values, and stack trace -- with Claude.
- [ ] **D**: Use plan mode to have Claude design the algorithm approach and data flow before attempting any further implementation.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** The root cause is ambiguity: prose descriptions of edge cases are imprecise and lead to repeated misinterpretation. C (test-driven iteration) replaces prose with machine-generated, executable specification -- the exact assertion, expected vs actual values, and stack trace give Claude unambiguous, targeted feedback for each correction cycle. A (more detailed prose) does not fix the ambiguity problem; it just produces longer ambiguous descriptions. B (switching models) does not address the root cause -- a better model still receives the same imprecise prose. D (plan mode) is the primary trap: plan mode helps clarify design intent upfront but does not produce the precise failure signal needed to correct a partially-correct implementation; it addresses design, not implementation-correctness convergence.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d3-082

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.2

A developer creates a /migrate skill that requires a target-version argument. When teammates invoke /migrate without providing the argument, Claude simply runs the skill with an empty argument and produces incorrect output. What frontmatter option should be added to the SKILL.md?

- [x] **A**: argument-hint: "target-version (e.g., v2.0.0)" — Claude Code displays the hint and requests the argument before proceeding.
- [ ] **B**: validate-args: ["target-version"] — validates that named arguments are present and non-empty before skill execution.
- [ ] **C**: required-args: ["target-version"] — enforces the argument at invocation time and aborts if it is missing.
- [ ] **D**: min-args: 1 — specifies the minimum number of positional arguments the skill requires before it will run.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** argument-hint is the valid SKILL.md frontmatter key for prompting users to supply parameters when they invoke a skill without arguments. Claude Code displays the hint and requests the value before proceeding, preventing silent execution with empty inputs. required-args, validate-args, and min-args are not valid SKILL.md frontmatter options -- they are plausible, semantically intuitive names that do not exist in the spec. Knowing which keys actually exist (vs. which sound like they should) is what this question tests.
> 
> *Guide Reference:* D3 · Create and configure custom slash commands and skills

---

### Question ID: d3-083

**Difficulty:** Easy | **Domain:** 3 | **Task:** 3.1

In the CLAUDE.md hierarchy, which file takes precedence when there are conflicting instructions?

- [x] **A**: The subdirectory CLAUDE.md closest to the file currently being edited -- more specific context overrides more general context.
- [ ] **B**: The project root CLAUDE.md always overrides all other CLAUDE.md files, ensuring consistent project-wide rules regardless of subdirectory.
- [ ] **C**: The global user ~/.claude/CLAUDE.md takes highest priority so that personal preferences are always respected across all projects.
- [ ] **D**: All CLAUDE.md files are merged with equal weight; Claude resolves conflicts by the order in which the files were loaded into context.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** CLAUDE.md files follow a specificity hierarchy: subdirectory closest to current file > project root > global user (~/.claude/CLAUDE.md). More specific context overrides more general context, allowing subdirectories (e.g., frontend/ with React-specific rules) to override project-wide defaults. Making the project root always win inverts the hierarchy, since the root is less specific than a subdirectory. Putting the global user file on top inverts it further: that file is the least specific and loses to both the project root and any subdirectory file. Merging every file with equal weight is also wrong — specificity, not load order, determines precedence. Note: even with this hierarchy, compliance is not guaranteed -- use hooks for hard enforcement (see d3-058).
> 
> *Guide Reference:* D3 · Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization

---

### Question ID: d5-095

**Difficulty:** Hard | **Domain:** 5 | **Task:** 5.6

The web search subagent returns results for only 3 of 5 requested source categories: competitor websites and industry reports succeeded, but news archives and social media feeds timed out. The document analysis subagent successfully processed all provided documents. The synthesis subagent must now produce a findings summary from this mixed-quality input. What is the most effective error propagation strategy?

- [ ] **A**: Have the synthesis subagent request the coordinator to retry the timed-out sources with extended timeouts before proceeding, ensuring complete data coverage before synthesis begins.
- [x] **B**: Structure the synthesis output with coverage annotations indicating which findings are well-supported versus which topic areas have gaps due to the unavailable sources.
- [ ] **C**: Return an error to the coordinator indicating that synthesis cannot proceed with incomplete source coverage, so the coordinator can decide whether to retry or abort.
- [ ] **D**: Proceed with synthesis using only available data without annotating gaps, since explicitly noting missing sources could undermine stakeholder confidence in the report.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** B (coverage annotations) is the graceful-degradation pattern: synthesise the most useful output possible from available data while explicitly marking which findings are well-supported and which topic areas have gaps. This preserves the value of the 3 succeeded sources and propagates uncertainty so downstream consumers can make informed decisions. A (block on retry) is the primary trap: it delays the entire output for sources that already timed out and may time out again, discarding the value of completed work and risking indefinite stall. C (return error) discards all completed work -- competitor websites, industry reports, and document analysis all succeeded and their value is lost. D (silent synthesis) hides uncertainty, potentially causing consumers to make decisions on incomplete data without knowing it -- the most dangerous anti-pattern.
> 
> *Guide Reference:* D5 · Preserve information provenance and handle uncertainty in multi-source synthesis

---

### Question ID: d3-084

**Difficulty:** Medium | **Domain:** 3 | **Task:** 3.5

During a debugging session, you identify two bugs: Bug A causes incorrect tax calculation in the checkout module, and Bug B causes a display error in the order history page. These modules share no code. How should you structure your messages to Claude Code?

- [x] **A**: Fix Bug A first in one message, review the resulting diff, then send Bug B as a separate follow-up message — sequential iteration keeps each diff small and attributable.
- [ ] **B**: Send both bugs in a single message so Claude can spot any hidden interactions and design a unified fix before committing to separate changes.
- [ ] **C**: Create a new session for each bug to ensure a completely clean, isolated context with no risk of cross-contamination between fixes.
- [ ] **D**: Ask Claude to analyse both modules together first to independently confirm there are no shared dependencies, then implement fixes in whichever order it determines is safest.

> [!check]- Reveal Answer
> **Correct Answer:** A
> 
> **Rationale:** When bugs are independent (no shared code, no interacting fixes), sequential iteration is optimal: one bug per message keeps the diff small and attributable so you can review exactly what changed for Bug A before introducing Bug B. B (send together) is appropriate only when bugs share a root cause or interacting fix path -- here the modules share no code, so batching adds unnecessary complexity without benefit. C (new session per bug) is the primary trap: session isolation is the right tool for polluted or conflicting context (see d1-067), not for independent bugs in an active debugging session. It discards useful session context and adds friction with no correctness benefit. D (analyse first) wastes a round-trip on confirming independence the problem statement already states.
> 
> *Guide Reference:* D3 · Apply iterative refinement techniques for progressive improvement

---

### Question ID: d4-082

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.6

You are building a document review system with three passes: the first pass extracts all claims from the document, the second pass verifies each claim against sources, and the third pass generates a credibility report. What architectural pattern does this represent?

- [ ] **A**: Chain-of-thought prompting applied across multiple sequential API calls — each call continues the reasoning chain from the previous step.
- [x] **B**: Multi-pass review — each pass dedicates full attention to a single review dimension (extraction, verification, synthesis) without mixing responsibilities.
- [ ] **C**: Coordinator-subagent decomposition — the coordinator delegates each stage to a specialist subagent that independently completes its assigned task.
- [ ] **D**: Waterfall pipeline — a linear sequence of stages where each stage's output feeds the next, suitable for any multi-stage data transformation.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** B (multi-pass review) is the defining pattern: each pass is dedicated to exactly one review dimension -- extraction only, verification only, synthesis only. Full model attention on each dimension produces higher quality than attempting all three in one pass. A (chain-of-thought) is the primary trap: CoT is sequential reasoning steps within or across calls, but it does not imply separate passes with single-responsibility dimensions -- it is a prompting technique, not an architectural review pattern. C (coordinator-subagent) implies delegation to independent agents; here it is a single model performing successive passes, not a multi-agent delegation structure. D (waterfall pipeline) describes linear stage sequencing generically -- it applies to any multi-stage process and does not capture the defining characteristic: single-responsibility specialisation per review dimension.
> 
> *Guide Reference:* D4 · Design multi-instance and multi-pass review architectures

---

### Question ID: d1-112

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.3

You want to spawn multiple subagents to run in parallel. How do you achieve this with the Task tool?

- [ ] **A**: Set parallel: true in the Task tool configuration object for each call to signal that it should execute concurrently.
- [x] **B**: Emit multiple Task tool calls within a single coordinator response -- the SDK interprets multiple tool calls in one turn as concurrent invocations.
- [ ] **C**: Issue each Task call in a separate turn and set a max_concurrency parameter on the coordinator to run them simultaneously.
- [ ] **D**: Issue Task calls sequentially across separate turns; the SDK automatically detects independent tasks and parallelises them at runtime.

> [!check]- Reveal Answer
> **Correct Answer:** B
> 
> **Rationale:** Parallel subagent execution is triggered by emitting multiple Task tool calls in a single coordinator response (one turn). The SDK interprets multiple tool calls in one response as concurrent invocations; Task calls across separate turns always execute sequentially. A (parallel: true) is the primary trap: this configuration key does not exist in the Task tool spec -- there is no flag to request concurrency; the mechanism is turn-level batching. C (max_concurrency parameter) is similarly non-existent in the SDK. D (automatic runtime detection) is wrong: the SDK does not infer independence -- sequential turns always serialise regardless of task independence.
> 
> *Guide Reference:* D1 · Configure subagent invocation, context passing, and spawning

---

### Question ID: d4-083

**Difficulty:** Medium | **Domain:** 4 | **Task:** 4.5

Your CI/CD system performs three types of Claude-powered analysis: (1) quick style checks on each PR that block merging until complete, (2) comprehensive security audits of the entire codebase run weekly, (3) test case generation triggered nightly for recently-modified modules. The Message Batches API offers 50% cost savings but can take up to 24 hours to process. You want to optimize API costs while maintaining acceptable developer experience. Which combination correctly matches each task to its API approach?

- [ ] **A**: Use synchronous calls for PR style checks and nightly test generation; use the Message Batches API only for weekly security audits.
- [ ] **B**: Use the Message Batches API for all three workloads to maximise the 50% cost savings across every Claude-powered workflow.
- [x] **C**: Use synchronous calls for PR style checks; use the Message Batches API for both weekly security audits and nightly test generation.
- [ ] **D**: Use synchronous calls for all three workloads to ensure consistent, predictable turnaround times regardless of volume.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** PR style checks block developers from merging and require immediate responses -- they must use synchronous calls. Weekly security audits and nightly test generation are scheduled tasks with flexible timelines; both already run asynchronously and can easily tolerate a 24-hour batch window. Using the Batches API for both captures 50% savings on the two highest-volume workloads without any developer experience impact. Batching only the weekly audits correctly excludes PR checks but wrongly excludes nightly test generation too -- the 'nightly deadline' intuition is false, since a batch window of up to 24 hours still fits a nightly-to-next-nightly cycle when triggered at a consistent time. Batching all three makes PR style checks unusable, because developers cannot wait up to 24 hours to merge. Keeping all three synchronous foregoes the savings on the two workloads that have no latency requirement.
> 
> *Guide Reference:* D4 · Design efficient batch processing strategies

---

### Question ID: d1-113

**Difficulty:** Medium | **Domain:** 1 | **Task:** 1.7

An agent has a named session from last week that contains extensive tool results from analyzing a codebase. Since then, 15 files have been modified and 3 new modules added. A developer wants to continue the investigation. What is the recommended approach?

- [ ] **A**: Resume the old session -- Claude Code automatically detects which files have changed since the last session and re-reads them before continuing.
- [ ] **B**: Resume the old session and immediately inform the agent about which specific files changed, so it can perform targeted re-analysis of only those files.
- [x] **C**: Start a new session, inject a structured summary of the prior session's key findings (architecture decisions, entry points, patterns), then re-analyze only the changed files.
- [ ] **D**: Run /compact on the old session to compress its context and reduce stale data overhead, then resume the compacted session to continue the investigation.

> [!check]- Reveal Answer
> **Correct Answer:** C
> 
> **Rationale:** When prior tool results are stale -- 15 modified files and 3 new modules represent significant drift -- starting a fresh session with an injected structured summary is more reliable than resuming. The old session's tool results reference code that no longer exists; the model may reason from outdated facts even if told about the changes. A structured summary of key findings gives the new session the conceptual baseline (architecture, entry points, patterns) without stale data. A (automatic change detection) is wrong: Claude Code has no mechanism to detect file changes since a prior session -- this feature does not exist. B (resume + inform) is the learner trap: it can work for trivial changes but is risky at this scale; the old tool results remain in context and the model may still anchor on outdated code paths. D (/compact) is the novel trap: /compact compresses the existing context but does not refresh it -- compressed stale data is still stale.
> 
> *Guide Reference:* D1 · Manage session state, resumption, and forking

---

### Question ID: d4-084

**Difficulty:** Hard | **Domain:** 4 | **Task:** 4.1

Your automated review analyzes comments and docstrings. The current prompt instructs Claude to 'check that comments are accurate and up-to-date.' Findings frequently flag acceptable patterns (TODO markers, straightforward descriptions) while missing comments that describe behavior the code no longer implements. What change addresses the root cause of this inconsistent analysis?

- [ ] **A**: Add git blame annotations to the prompt context so Claude can check whether a comment predates recent code changes and is therefore more likely to be stale.
- [ ] **B**: Add a post-processing filter that suppresses findings for known acceptable patterns such as TODO markers and one-line descriptions.
- [ ] **C**: Add few-shot examples of misleading comments alongside correct ones to help the model recognize similar problematic patterns in the codebase.
- [x] **D**: Replace the vague instruction with an explicit criterion: flag a comment only when its stated behavior contradicts what the code actually does.

> [!check]- Reveal Answer
> **Correct Answer:** D
> 
> **Rationale:** The root cause is the vague instruction 'check that comments are accurate and up-to-date,' which provides no concrete definition of what makes a comment problematic. D (explicit criterion: flag only when claimed behavior contradicts actual code) removes the ambiguity that generates both false positives (TODO markers, obvious descriptions) and false negatives (stale behavioral claims). One rule fixes both directions simultaneously. A (git blame) adds historical signal but no decision rule -- knowing a comment is old does not tell the model whether it is wrong. B (post-processing filter) suppresses known false positives but does not fix the missing criterion for false negatives; it is a workaround, not a fix. C (few-shot examples) is the primary trap: examples help calibrate judgment for similar patterns but cannot substitute for a missing decision criterion -- novel stale comments outside the example set will still be missed. Examples are secondary to fixing the criterion itself.
> 
> *Guide Reference:* D4 · Design prompts with explicit criteria to improve precision and reduce false positives

---

