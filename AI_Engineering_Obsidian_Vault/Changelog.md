# Changelog

**Added to the Data Layer, subsection Data Preparation:**

**Entry: Data Preparation**
* Data hygiene checks for LLM inputs
  * using pandas / Python to inspect sample data before using it in a prompt
  * spotting obvious issues — nulls, wrong types, encoding problems, unexpected length
  * applying basic cleanup (whitespace, encoding, deduplication) before sending to LLM
