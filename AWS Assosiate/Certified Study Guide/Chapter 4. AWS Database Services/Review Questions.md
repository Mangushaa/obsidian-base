## AWS Database Practice Questions

### 1. Which of the following does Relational Database Service (RDS) manage on your behalf? (Choose three.)
- [ ] A. Database settings
- [ ] B. Database software installation and patching
- [ ] C. Query optimization
- [ ] D. Hardware provisioning
- [ ] E. Backups

---

### 2. What is the recommended way to ensure your RDS instance stays up-to-date and patched with the least impact on availability?
- [ ] A. Enable automatic minor version upgrades for your RDS instance and schedule maintenance windows during low-traffic periods.
- [ ] B. Regularly take snapshots of your RDS instance.
- [ ] C. Create an AWS Lambda function to apply patches from via boto.
- [ ] D. Always keep a warm RDS instance online for patching, and swap the active instance after upgrades.

---

### 3. You are designing an e-commerce web application that will scale to potentially hundreds of thousands of concurrent users. Which database technology is best suited to hold the session state for large numbers of concurrent users?
- [ ] A. Relational database by using RDS
- [ ] B. NoSQL database table by using DynamoDB
- [ ] C. Data warehouse by using Redshift
- [ ] D. MySQL on EC2

---

### 4. When using DynamoDB, how many read capacity units (RCUs) do you need to support 25 strongly consistent reads per second of 15 KB?
- [ ] A. 100 RCUs
- [ ] B. 25 RCUs
- [ ] C. 10 RCUs
- [ ] D. 15 RCUs

---

### 5. When using DynamoDB, how many read capacity units (RCUs) do you need to support 25 eventually consistent reads per second of 15 KB?
- [ ] A. 10 RCUs
- [ ] B. 25 RCUs
- [ ] C. 50 RCUs
- [ ] D. 15 RCUs

---

### 6. When using DynamoDB, how many write capacity units (WCUs) are needed to support 100 writes per second of 512 bytes?
- [ ] A. 129 WCUs
- [ ] B. 25 WCUs
- [ ] C. 10 WCUs
- [ ] D. 100 WCUs

---

### 7. Your company is currently using DynamoDB, and they would like to implement a write-through caching mechanism. They would like to get everything up and running in only a few short weeks. Additionally, your company would like to refrain from managing any additional servers. You are the lead developer on the project; what should you recommend?
- [ ] A. Build your own custom caching application.
- [ ] B. Implement Amazon DynamoDB Accelerator (DAX).
- [ ] C. Run Redis on EC2.
- [ ] D. Run Memcached on EC2.

---

### 8. Your company would like to implement a highly available caching solution for its SQL database running on Amazon RDS. Currently, all of its services are running in AWS. As their lead developer, what should you recommend?
- [ ] A. Implement your own caching solution on-premises.
- [ ] B. Implement ElastiCache for Redis.
- [ ] C. Implement ElastiCache for Memcached.
- [ ] D. Implement DynamoDB Accelerator (DAX).

---

### 9. Your organization runs an app using a PostgreSQL database on RDS. You are tasked with significantly enhancing its read performance and introducing high availability. What is your best option?
- [ ] A. Add read replicas to your RDS PostgreSQL instance and configure multi-AZ deployment for high availability.
- [ ] B. Migrate the PostgreSQL database to Aurora to leverage its performance and scalability capabilities.
- [ ] C. Increase the instance size of your RDS database and add a caching layer with ElastiCache.
- [ ] D. Rebuild your PostgreSQL database on an EC2 instance with provisioned IOPS SSD storage to achieve faster disk reads.

---

### 10. A company is experiencing an issue with DynamoDB whereby the data is taking longer than expected to return from a query. You are tasked with investigating the problem. After looking at the application code, you realize that a Scan operation is being called for a large DynamoDB table. What should you do or recommend?
- [ ] A. Implement a query instead of a scan, if possible, as queries are more efficient than a scan.
- [ ] B. Do nothing; the problem should go away on its own.
- [ ] C. Implement a strongly consistent read.
- [ ] D. Increase the write capacity units (WCUs).
- [ ] E. Add more read capacity units (RCUs).