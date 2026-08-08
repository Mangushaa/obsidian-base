
Go to servers one by one, each request next server.
#### Pros 
- Even distribution, each server gets event amount of request (works well when all server are same resources, and handled processes)
- Easy algorithm
#### Cons 
- Do not know server capacities
- Not know current server load
- Can be used by attackers if then find vulnurabilities in certain server.


### Use cases

- Works well then all servers capacities are same
- Stateless applications no session is needed



