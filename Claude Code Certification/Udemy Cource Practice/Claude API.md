
#### Send message

```
message = client.messages.create(  
    model=model,  
    max_tokens=300,
    temperature=0, 
    system="You are ..., your job..., do thhis and that
    messages=[  
        {  
            "role": "user",  
            "content": "A customer wants to return an order. Write a short helpful response."  
        }  
    ]
    "tool_choice": { "type": "tool", "name": "get_weather" },  
)  
  
print(message.content[0].text) # Claude answer
print(message.stop_reason) #  
```

- max_tokens - how many tokens claude response can include, it will trim by this num max, with message.stop_reason = max_tokens
- system - system prompt the define general model behavior, as tone, role, and important points model should follow during answer
- stop_sequence - define stop sequance which is array string, when claude generates any of string defined there is stop generating and return result
- messages[].role - 'user' for request or 'assistant' for response 
- tool_choice - controls whether tools is used
	- auto - claude decides if wants to use a tool
	- any - claude mast use tool but can choose any
	- forced_tool - as in example, claude shoud use given tool
- stop_reason: 
	- end_turn - success full response
	- max_tokens - response was treamed by max_token constraint
	- tool_use - claude ask applicaiotn for tool execution and it's data
	- stop_sequance


# Message Batches API

- 50% lower cost that standard synchronous API
- Ideal when the work doesn't need an immediate answer
- There is not guarunteed SLA, a tach can take up to 24 hours
- Use custom_id to match response to original request, cause response can return on different order then request
- All context needs to be gathered before execution, cause there is not option to add info (new turn) after request send.
- Don't start with huge batches, verify execution on small one first
 
# RAG

#### Search Options

- Keyward search - exact terms & IDs. For example when you need info about specific product, search by product name (ID).
- Semantic search (vector database)
- Hybrid


#### What you tune in a RAG System

- Chunking - by size, paragrapgh, heading, or meaning
- Search type - vector, keyword or hybrid
- Citations - should claude cite the retrieved sources 
- How many chunks - how much context to retrieve?
- Reranking - reorder results before sending them
- Knowledge scope - which sources belong in the index