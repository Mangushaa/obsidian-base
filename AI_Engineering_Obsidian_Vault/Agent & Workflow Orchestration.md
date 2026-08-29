# Agent & Workflow Orchestration

## Entry
* **Agent execution loop fundamentals**: Observe → Think → Act cycle, ReAct Architecture.
* **Workflow vs agent distinction**: deterministic prompt chaining vs autonomous loop.
* **Agent-side tool invocation patterns**: dispatching parsed tool calls.
* **Agent framework landscape**: LangGraph, OpenAI Agents SDK, CrewAI, Semantic Kernel, Pydantic AI.
* **Single-agent vs. multi-agent distinction**.
* **Short-term agent memory**.
* **Basic agent failure modes**: tool-call loops, runaway iteration.

## Specialist
* **Workflow orchestration pattern taxonomy**: routing, parallelization, orchestrator-workers, prompt chaining.
* **Deterministic chain-composition primitives**: LangChain LCEL / Runnables.
* **Deterministic workflow vs. autonomous agent decision framework**.
* **Agent graph construction**: LangGraph / Pydantic AI.
* **Mixed pipeline pattern**: LLM, code, LLM chaining.
* **Agent memory strategies**: short-term, long-term vector, semantic memory.
* **Knowledge-base agent patterns**.
* **Human-in-the-loop patterns**: approval-gate, supervisor UX.
* **Streaming and cancellation in orchestrated flows**.

## Expert
* **Multi-agent topologies**: supervisor/worker, swarm, debate.
* **Multi-agent coordination mechanics**: shared state vs message-passing.
* **Durable execution and state persistence**: Temporal / Restate-style workflows.
* **Agent harness engineering**.
