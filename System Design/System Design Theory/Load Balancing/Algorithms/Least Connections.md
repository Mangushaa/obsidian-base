Distribute request to server with least amount of connections.

### Pros

 - Load awareness - takes into account current load on server
 -  Adapts to traffic change, ensuring any server becomes bottle neck
- Works well when servers have different workloads 

### Cons
- Higher complexetie
- State maintenance - load balancer should know current servers connection count
-