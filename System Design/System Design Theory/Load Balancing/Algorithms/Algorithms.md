**Load Balancing Algorithm:** The method used by the load balancer to determine how to distribute incoming traffic among the backend servers.

1. [[Round Robin]] - each request next server
2. [[Least Connections]] - request to server with least amount of connections
3. [[Weighted Round Robin]] - assign weights to server based on capacity, etc. Distribute more traffic to servers with more weight
4. [[Weighted Least Connections]] - combination of 2 and 3
5. [[IP Hash]] - same client same server
6. [[Least Response Time]] - forward request to server with least response time
7. [[Random]] - choose random server
8. [[Least Bandwidth]] - forward request to server with least bandwitch based on related metric
9. [[Custom Load]] - custom alhotrithm