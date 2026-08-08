Forwards same clients request to same server based on client IP, provides session persistance.


### Pros

- **Session Persistence**: Ensures that requests from the same client IP address are consistently routed to the same server, which is beneficial for stateful applications.
- **Simplicity**: Easy to implement and does not require the load balancer to maintain the state of connections.
- **Deterministic**: Predictable and consistent routing based on the client's IP address.
### Cons

- **Uneven Distribution**: If client IP addresses are not evenly distributed, some servers may receive more requests than others, leading to an uneven load.
- **Dynamic Changes**: Adding or removing servers can disrupt the hash mapping, causing some clients to be routed to different servers.
- **Limited Flexibility**: Does not take into account the current load or capacity of servers, which can lead to inefficiencies.

### Use cases
Main use case is statefull applications where sticky session is needed

