ACID vs BASE

Vertical vs Horizontal

Strong schema vs schemaless

### Consistent Hashing

To decide how to partition data (to which request for certain data will go). We are using consistent hashing. 


First we has our nodes id or other unique metadata.

![[Pasted image 20260912154229.png]]
![[Pasted image 20260912154240.png]]

When fetching doing basically the same. 
To prevent data loss we replicating data to next unique server (not label of same server), so when some node crash we will just fetch it from replica.


