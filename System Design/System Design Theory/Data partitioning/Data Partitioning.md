Data partitioning is a technique used in distributed systems and databases to divide a large dataset into smaller, more manageable parts, referred to as partitions. Each partition is independent and contains a subset of the overall data. So in result less amount of data is scanned, and it's faster.

## Partitioning Methods

- #### Horizontal (Sharding)
	Data is splitted by rows. Rows are going to certain shard based on sharding key. Shard kan be as in same db server, but also in other.
   
- #### Vertical
	Data is splitted by colums. Decrease time by decreasing size of page of data that is read by db, so decrease amount of IO operation to disc.

![[Pasted image 20260520152512.png]]


### [[Partitioning Problems]]