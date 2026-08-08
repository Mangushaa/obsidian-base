
#### Scalability
Load balancer using same approach for scalability as default application servers: horizontal (Active-Active configuration), vertical.

#### Performance
Since LB is also taking part in request/response flow it will increase latance of all flow, to decrease latancy we can use this methods:

- **Geographical distribution:** Deploying load balancers and backend servers in geographically distributed locations can help reduce latency for users by ensuring that their requests are processed by a nearby instance.
    
- **Connection reuse:** Many load balancers support connection reuse or keep-alive connections, which reduce the overhead of establishing new connections between the load balancer and backend servers for each request.
    
- **Protocol optimizations:** Some load balancers support protocol optimizations, such as HTTP/2 or QUIC, which can improve performance by reducing latency and increasing throughput.
