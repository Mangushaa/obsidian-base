Assign weights to server based on capacity, etc. Distribute more traffic to servers with more weight

### Pros
- **Load Distribution According to Capacity**: Servers with higher capacities handle more requests, leading to better utilization of resources.
- **Flexibility**: Easily adjustable to accommodate changes in server capacities or additions of new servers.
- **Improved Performance**: Helps in optimizing overall system performance by preventing overloading of less powerful servers.

### Cons

- **Complexity in Weight Assignment**: Determining appropriate weights for each server can be challenging and requires accurate performance metrics.
- **Increased Overhead**: Managing and updating weights can introduce additional overhead, especially in dynamic environments where server performance fluctuates.
- **Not Ideal for Highly Variable Loads**: In environments with highly variable load patterns, WRR may not always provide optimal load balancing as it doesn't consider real-time server load.


### Use Cases

- **Heterogeneous Server Environments**: Ideal for environments where servers have different processing capabilities, ensuring efficient use of resources.
- **Scalable Web Applications**: Suitable for web applications where different servers may have varying performance characteristics.
- **Database Clusters**: Useful in database clusters where some nodes have higher processing power and can handle more queries.