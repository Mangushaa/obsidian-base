# Retrieval & Grounding

## Entry
* **RAG definition and motivation**.
* **RAG pipeline anatomy**: ingestion -> chunking -> embedding -> indexing -> retrieval -> augmentation -> generation.
* **Chunking fundamentals**: fixed-size, overlap sizing.
* **Citation and grounding basics**: inline source attribution.
* **Common RAG failure modes**.

## Specialist
* **GraphRAG and knowledge graph RAG**.
* **Document ingestion and preprocessing**: LangChain loaders, LlamaIndex, Unstructured.io.
* **Retrieval mode selection criteria**: vector / lexical / hybrid.
* **Advanced chunking strategies**: contextual chunking (Anthropic), late chunking.
* **Hybrid retrieval and similarity mechanics**: BM25 + dense + RRF.
* **Reranking**: bi/cross-encoder, Cohere / Voyage.
* **Query transformation patterns**: HyDE, multi-query expansion.
* **Embedding-model selection**.
* **Retrieval-side eval signals**: context precision, recall (RAGAS).
* **Citation engineering for RAG features**.

## Expert
* **Retrieval architecture trade-off design**.
* **Reranker economics and placement**.
* **Faithfulness and grounding-failure remediation at scale**.
* **Long-context vs retrieval trade-off framing**.
* **Retrieval-pipeline anti-patterns at scale**.
