# LLM API Patterns & Structured Output

## Entry
* **How LLM works (basics)**: https://medium.com/data-science-at-microsoft/how-large-language-models-work-91c362f5b78f
* **LLM provider taxonomy**: closed-weight (OpenAI, Anthropic), open-weight (Llama, Mistral), inference hosts.
* **Managed inference services**: Bedrock, Vertex, Azure OpenAI.
* **LLM API fundamentals**: chat completion vs completion endpoints, message roles.
* **Core inference parameters**: temperature, top-p, top-k, max tokens.
* **Token & Context Window fundamentals**: tokens vs words, tokenizer families.
* **Context window basics**: per-model limits, truncation vs summarization.
* **Structured Output & Validation**: Streaming basics, structured output modes (JSON mode, response_schema).
* **Basic error handling**: retryable vs non-retryable errors.
* **Function Calling**: schema declaration basics, tool-call result shape conventions.

## Specialist
* **Tokenizer behavior across providers**: BPE vs SentencePiece.
* **Reasoning / extended thinking models**: prompting patterns, thinking budget control.
* **Provider capability comparison**: function calling support, structured output guarantees, vision input.
* **Prompt caching**: Anthropic cache_control, OpenAI cached-input, Gemini context caching.
* **Multi-turn conversation state**: history compaction, tool-result threading.
* **Provider error and rate-limit semantics**: 429 vs 500 vs 529.
* **Open-weight model integration**: hosted vs self-host.
* **Fine-tuning vs RAG vs prompting decision criteria**.
* **Failure mode taxonomy**: Hallucination, over-refusal, context-pollution.
* **Structured Output & Validation**: Instructor, Outlines, Pydantic, Zod.
* **Streaming response mechanics**: SSE protocol, async generator handlers.

## Expert
* **Schema reliability engineering**: adherence-rate measurement, prompt+schema co-design.
* **Structured-output failure taxonomy**: hallucinated fields, schema collapse.
* **Schema evolution and versioning**: backward-compatible additive change.
* **Grammar / FSM-constrained generation**: llama.cpp GBNF, Outlines FSMs.
* **Provider-portfolio strategy**: closed vs open-weight mix.
* **Provider-agnostic abstraction layer design**: adapter/facade pattern over multiple LLM clients.
