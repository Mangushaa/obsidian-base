There are two common ways to handle messages: **Queuing** and **Publish-Subscribe**.

#### [[Queue]]
#### [[Publisher-subscriber]]

#### [[Messaging Patterns]]

To summarize, a message system is deployed in an application stack for the following reasons:

1. **Messaging buffering:** To provide a buffering mechanism in front of processing (i.e., to deal with temporary incoming message spikes that are greater than what the processing app can deal with). This enables the system to safely deal with spikes in workloads by temporarily storing data until it is ready for processing.
    
2. **Guarantee of message delivery:** Allows producers to publish messages with assurance that the message will eventually be delivered if the consuming application is unable to receive the message when it is published.
    
3. **Providing abstraction:** Distributed messaging systems enable decoupling of sender and receiver components in a system, allowing them to evolve independently. This architectural pattern promotes modularity, making it easier to maintain and update individual components without affecting the entire system.
    
4. **Scalability:** Distributed messaging systems can handle a large number of messages and can scale horizontally to accommodate increasing workloads. This allows applications to grow and manage higher loads without significant performance degradation.
    
5. **Fault Tolerance:** By distributing messages across multiple nodes or servers, these systems can continue to operate even if a single node fails. This redundancy provides increased reliability and ensures that messages are not lost during system failures.
    
6. **Asynchronous Communication:** These systems enable asynchronous communication between components, allowing them to process messages at their own pace without waiting for immediate responses. This can improve overall system performance and responsiveness, particularly in scenarios with high latency or variable processing times.
    
7. **Load Balancing:** Distributed messaging systems can automatically distribute messages across multiple nodes, ensuring that no single node becomes a bottleneck. This allows for better resource utilization and improved overall performance.
    
8. **Message Persistence:** Many distributed messaging systems provide message persistence, ensuring that messages are not lost if a receiver is temporarily unavailable or slow to process messages. This feature helps maintain data consistency and reliability across the system.
    
9. **Security:** Distributed messaging systems often support various security mechanisms, such as encryption and authentication, to protect sensitive data and prevent unauthorized access.
    
10. **Interoperability:** These systems often support multiple messaging protocols and can integrate with various platforms and technologies, making it easier to connect different components within a complex system.