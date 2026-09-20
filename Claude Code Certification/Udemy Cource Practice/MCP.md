
#### Tool info object

```
tools = [  
    {  
        "name": "lookup_order",  
        "description": "Look up an order by order ID and return order details.",  
        "input_schema": {  
            "type": "object",  
            "properties": {  
                "order_id": {  
                    "type": "string",  
                    "description": "The customer's order ID."  
                }  
            },  
            "required": ["order_id"]  
        }  
    }  
]
```




**Lesson: 25**

How to define MCP server????

What is structure of json in project level or user lervel mcp.json.

What is claude.json??