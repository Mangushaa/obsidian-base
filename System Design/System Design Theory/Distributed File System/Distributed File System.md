
Is service that allows to work with file system that is actually distributed across different server and usually geographically for fault tolerance as it is in your local single server machine.

Examples: AWS Elastic File System (EFS)

### Key cons

- Scalability - you can increase amount of backend servers
- Fault tolerance, Availability - servers are splitted across regions usually, so in case one region failed, others will exists.

### Key challanges

- Consistency - changes should be synced to all servers. 
- Security 