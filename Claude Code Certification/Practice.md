# Architectural Blueprint: Multi-Agent Evaluation Pipeline & MCP Server

## Overview
This document outlines the system architecture for an AI-powered code evaluation pipeline designed to assess Java syntax, operator precedence, and promotion rules using a multi-agent orchestration pattern and the Model Context Protocol (MCP).

---

## 1. Core Architectural Components

### Agentic Architecture & Orchestration
* **Hub-and-Spoke Coordinator**: Manages the core execution loop (`Plan -> Execute -> Evaluate -> Repeat`).
* **Specialized Subagents**: 
    * `Syntax Checker Agent`: Validates code tokens and compile-time rules.
    * `Logic Review Agent`: Evaluates execution outcomes, type casting, and edge cases.
* **Context Isolation**: Subagents do not automatically inherit parent history; explicit context payloads must be passed down by the coordinator.

### Tool Design & MCP Integration
* **MCP Server**: Built using the official Java/Spring AI SDK to act as a localized "Rulebook Engine".
* **Single-Purpose Tools**:
    * `get_promotion_rules`: Fetches exact numeric promotion constraints.
    * `get_bitwise_constraints`: Retrieves operator precedence and bitwise rules.
* **Lifecycle Handling**: Manages standard `stdio` transport and parses the `stop_reason` token when Claude requests a tool call.

### Prompt Engineering & Structured Output
* **XML Structuring**: System instructions are wrapped in explicit semantic tags (e.g., `<rules>`, `<constraints>`).
* **Schema Enforcement**: Guarantees JSON-formatted output reports for downstream parsing.

### Context Management & Reliability
* **Prompt Caching**: Applied to static system instructions and rule definitions to reduce token costs.
* **State Separation**: Isolates durable evaluation artifacts from transient conversation loops.

### Claude Code Configuration & Workflows
* **`CLAUDE.md` Setup**: Scopes local repository behavior and architectural boundaries.
* **Deterministic Hooks**: Programmatic interceptors (e.g., `PostToolUse`) that validate code size and execution constraints.