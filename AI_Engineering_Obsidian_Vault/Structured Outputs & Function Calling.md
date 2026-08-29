# Structured Outputs & Function Calling

## Entry
* **Structured output modes**: OpenAI JSON mode, Anthropic tool-use, Gemini response_schema.
* **Function / tool schema declaration**: JSON Schema subset.
* **Basic schema design**: types, required fields, enums.
* **Response parsing and validation**: Pydantic (Python) / Zod (TypeScript).
* **Malformed-output handling**: JSON repair, simple retry-on-fail.
* **Common use cases**: data extraction, classification, form filling.
* **Tool-call result shape**.

## Specialist
* **Constrained-decoding libraries**: Instructor, Outlines, JSONFormer, BAML.
* **Schema design patterns**: discriminated unions, minimal schema surface.
* **Output validation and self-correction loops**: Pydantic-AI-style auto-fix.
* **Streaming structured outputs**: partial JSON parsing.
* **Provider reliability patterns**.
* **Complex schema strategies**: recursive types, polymorphism.
* **Structured output + RAG interaction**: citation extraction.
* **Multi-turn schema adherence**.

## Expert
* **Schema reliability engineering**.
* **Structured-output failure taxonomy**.
* **Multi-model fallback strategies**.
* **Grammar / FSM-constrained generation**.
* **Custom decoding pipelines**: speculative parsing.
* **Schema evolution and versioning**.
* **Cost and latency engineering**.
* **Schema DSLs and internal standards**.
