[[Caching Challenges]]

# Cach evictction strategies 

### Belady’s Algorithm

Belady’s algorithm is an optimal caching algorithm that evicts the data item that will be used farthest in the future. It requires knowledge of the future access pattern, which is usually impractical to obtain. Belady’s algorithm serves as a theoretical benchmark for evaluating the performance of other caching policies.

### Queue-Based Policies

- FIFO
- LIFO

### Recency-Based Policies

- LRU - removes data that was used in the most past assuming you don't need this data anymore.
- MRU -removes data that was used in the nearest past assuming you don't need this data again soon

### Frequancy-Based Policies

- LFU - remove items that was used min amount of times compare to others
- LFRU - LFRU combines the concepts of LFU and LRU by considering both the frequency of access and the recency of access. It evicts the item with the lowest frequency count among the least recently used items.

# Allowlist Policy

An allowlist policy for cache replacement is a mechanism that defines a set of prioritized items eligible for retention in a cache when space is limited. Instead of using a traditional cache eviction policy that removes the least recently used or least frequently accessed items, an allowlist policy focuses on explicitly specifying which items should be preserved in the cache. This policy ensures that important or high- priority data remains available, even during periods of cache pressure. By allowing specific items to remain in the cache while evicting others, the allowlist policy optimizes cache utilization and improves performance for critical data access scenarios.

# Cache Invalidation

- Active invalidation -  Active invalidation involves explicitly removing or invalidating cached data when changes occur in the underlying data source. This approach requires the application or the system to notify or trigger cache invalidation operations. For example, when data is modified or deleted in the data source, the cache is immediately updated or cleared to ensure that subsequent requests fetch the latest data. Active invalidation provides precise control over cache consistency but requires additional overhead to manage the invalidation process eﬀectively. In a social media application, when a user posts new content, the system actively invalidates the caches of all users’ feeds that might contain outdated information. This ensures that everyone sees the most recent updates without delay, providing a fresh and accurate user experience
- TTL (passive invalidatoin) - item is removed on time based
- Tag-Based invalidatoin - tag each key, and remove all keys by tag. Is usefull when changes to any entity, needs invalidation of all related


# Caching strategies

## Read-Intensive Strategies

This strategy is particularly beneficial for applications where the majority of operations involve reading data rather than updating or writing data. Let’s look at these read-intensive
caching strategies in more detail.

- Cache-aside - also known as lazy loading, delegates the responsibility of managing the cache to the application code. When data is requested, the application first checks the cache. If the data is found, it is returned from the cache. If the data is not in the cache, the application retrieves it from the data source, stores it in the cache, and then returns it to the caller.
- Read-through - The read-through caching strategy retrieves data from the cache if available; otherwise, the cache itself fetches the data from the underlying data source. When a cache miss occurs for a read operation, the cache retrieves the data from the data source, stores it in the cache for future use, and returns the data to the caller. Subsequent read requests for the same data can be served directly from the cache, improving the overall read performance. Unlike the cache-aside strategy, this strategy offloads the responsibility of managing cache lookups from the application, providing a simplified data-retrieval process. While read-through caching enhances read performance once populated, it can initially introduce higher latency during the warm-up period due to cache misses. This can lead to unpredictable P999 latency spikes as the first requests involve longer fetch times from the data source rather than quick retrieval from the cache.
- Refresh-ahead - The refresh-ahead caching strategy, also known as prefetching, proactively retrieves data from the data source into the cache before it is explicitly requested. The cache anticipates the future need for specific data items and fetches them in advance. By prefetching data, the cache reduces latency for subsequent read requests and improves the overall performance of data retrieval. This strategy results in a better and more predictable P999 latency profile because data is preloaded into the cache. When a user requests the anticipated data, it can be served almost instantly from the cache rather than fetching it from the slower data source.

## Write-Intensive Strategies

In a write-intensive caching strategy, the cache is designed to handle frequent write operations, ensuring that updated data is stored temporarily in the cache before eventually being synchronized with the underlying data source, such as a database or a remote server, leading to better consistency. This approach can help reduce the load on the primary data store and improve the application’s responsiveness by acknowledging write operations more quickly.

- Write-through - The write-through caching strategy involves writing data to both the cache and the underlying data source simultaneously. When a write operation occurs, the data is first written to the cache and then immediately propagated to the persistent storage synchronously before the write operation is considered complete. This strategy ensures that the data remains consistent between the cache and the data source. However, it may introduce additional latency due to the synchronous write operations.
- Write-around - The write-around caching strategy involves bypassing the cache for write operations. When the application wants to update data, it writes directly to the underlying data source, bypassing the cache. As a result, the written data does not reside in the cache, reducing cache pollution with infrequently accessed data. However, subsequent read operations for the updated data might experience cache misses until the data is fetched again from the data source and cached.
-  Write-back -  The write-back caching strategy allows write operations to be performed directly on the cache, deferring the update to the underlying data source until a later time. When data is modified in the cache, the change is recorded in the cache itself, and the update is eventually propagated to the data source asynchronously on a schedule or when specific conditions are met (e.g., cache eviction or time intervals). Write-back caching provides faster write operations by reducing the number of immediate disk writes.


# Cache Deployment

- In-Process Caching - basically in memory cache
- Interprocess Caching - same machine, another process (e.g same pod)
- Remote Caching - cache on different node, VM.

# Caching Mechanisms

- Client-side caching - Cached data is stored on the client device, typically in the browser’s memory or local storage. This mechanism allows web applications to store and retrieve static resources, such as HTML, CSS, JavaScript, andimages, directly from the client’s device.  

- CDN caching - Static content is cached on distributed servers that are strategically located across diﬀerent geographic regions. CDNs serve cached content to users based on their proximity to the CDN server , reducing the latency and load on the origin server. 

- Web server caching - These caching mechanisms are implemented at the server side to store frequently accessed content. When a request is made to the server , it first checks if the requested content is already cached. If found, the server serves the cached content directly, avoiding the need to regenerate the content.

- Application caching - Data is cached within the application’s memory or in-memory databases. This mechanism is typically used to store frequently accessed data or computation results that are costly to generate orretrieve from other data sources. 

![[Pasted image 20260912165042.png]]


