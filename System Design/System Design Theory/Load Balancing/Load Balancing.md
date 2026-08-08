Load balancer is component of system then distribute traffic across available servers.

## Key terminology and concepts

**Load Balancer:** A device or software that distributes network traffic across multiple servers based on predefined rules or algorithms.

**Backend Servers:** The servers that receive and process requests forwarded by the load balancer. Also referred to as the server pool or server farm.

**Load Balancing Algorithm:** [[Algorithms]]

**Health Checks:** Periodic tests performed by the load balancer to determine the availability and performance of backend servers. Unhealthy servers are removed from the server pool until they recover.

**Session Persistence:** A technique used to ensure that subsequent requests from the same client are directed to the same backend server, maintaining session state and providing a consistent user experience.

### Key responsibilities

- Security -> works as reverse proxy, can handle atacks (for example DDOS)
- **SSL/TLS Termination:** The process of decrypting SSL/TLS-encrypted traffic at the load balancer level, offloading the decryption burden from backend servers and allowing for centralized SSL/TLS management. 

### Failover
[[Failover]]

### Synchronization and  State sharing

[[Synchronization and State Sharing]]


### Scalability and performance

[[Scalability and Performance]]