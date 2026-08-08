##  1. Cache Stampede
Is problem when really popular (frequantly requested) data is removed from cache (by TTL, or other reason), right after that all requests will go to data origin, and it will quickly increase load on it. Or after application startup cache is cold.
#### Solution

- Lock - after first cache miss happens key becomes locked, and subsequent requests will be blocked on key request, after first miss will update key all other request will proceed with value from cache and will not request main storage. Spring boot cache implementation looks like this 
  ***@Cacheable(cacheNames = "usersCache", key = "'allUsers'", sync = true)***  
  Sync = true implement it.

- Staggered expiration times - we add 'expires_at' to our value. When application fetches value it checks this field, if we are really close to expiring with some probability (rolling a dice) app will refresh value in cache. We start from 0% chance to 100% chance. Usually dice will succed pretty soon, and one of server will refresh data, so we will not get thundering herd issue, even in worse scenarios only few request to db will be done, not hyndreds.


Option 1 and 2 can be combined so only 1 server update cache. Before updating it grabs some lock, of second server wants to update it it will be not ablt cause lock is taken.


## 2. Cache Penetration
Cache penetration refers to the situation where requests for data bypass the cache and directly access the origin server, reducing the benefits of caching. This typically happens when requests are made for non-existent or rarely accessed data. To mitigate cache penetration, negative caching (caching negative responses) or using a bloom filter to check for the existence of data before querying the cache can be employed.


## 3. Big Key
A big key is a large piece of data that consumes a significant portion of the cache's capacity. Storing big keys can lead to cache evictions, reducing the overall effectiveness of the caching system. Solutions for handling big keys include compressing the data before caching, breaking the data into smaller chunks, or using a separate caching strategy specifically designed for large objects.

## 4. Hot Key
A hot key refers to a piece of data that is frequently accessed, causing contention and performance issues in the caching system. Hot keys can lead to cache thrashing and an unbalanced distribution of load. Solutions for dealing with hot keys include using consistent hashing to distribute the load more evenly, replicating the hot key across multiple cache nodes, or implementing a load balancing strategy to distribute requests across multiple instances of the hot key.

## 5. Cache Pollution
Cache pollution occurs when less frequently accessed data displaces more frequently accessed data in the cache, leading to a reduced cache hit rate. To mitigate cache pollution, eviction policies like LRU (Least Recently Used) or LFU (Least Frequently Used) can be employed, which prioritize retaining frequently accessed data in the cache.

## 6. Cache Drift
Cache drift refers to the inconsistency between cached data and the data on the origin server, typically caused by updates or changes in the data. To handle cache drift, proper cache invalidation strategies should be implemented to ensure that the cache is updated or invalidated when the data on the origin server changes.