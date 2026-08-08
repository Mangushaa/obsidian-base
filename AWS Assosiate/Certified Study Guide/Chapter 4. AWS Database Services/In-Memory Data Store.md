
ElastiCache currently supports two different open source in-memory key-value caching engines: Redis and Memcached. Each engine provides certain advantages.

Redis: Unlike Memcached, Redis has disk persistence built in, meaning that you can use it for long-lived data. Redis also supports replication, which can be used to achieve multi-AZ redundancy.

![[Pasted image 20260808142421.png]]

## Amazon DynamoDB Accelerator

Is a cache layer for DynamoDB.