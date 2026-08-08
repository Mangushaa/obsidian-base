![[Pasted image 20260728141606.png]]
![[Pasted image 20260728141620.png]]

## Relational Databases

- Automatic software patching
- Easy vertical scaling
- Easy storage scaling
- Read replicas
- Automatic backups
- Database snapshots
- Multi-AZ deployments
- Encryption
- IAM DB authentication
- Monitoring and metrics with Amazon CloudWatch

```
aws rds create-db-instance \
--db-instance-class db.t2.micro \
--allocated-storage 30 \
--db-instance-identifier my-cool-rds-db --engine mysql \
--master-username masteruser --master-user-password masterpassword1!
```

## Automatic Software Patching

When you create an RDS database instance, you can define a maintenance window. A maintenance window is where you can define the period in which RDS may apply any updates or downtime to your database instance. 
![[Pasted image 20260729011539.png]]

To prevent downtime:
- Blue-green
- AWS RDS Proxy - when instance are upgrades persists request in memory, when finished process. May case latancy up to 120 sec.


## Vertical Scaling

If you are in a single-AZ configuration for your Amazon RDS instance, the database will be unavailable during the scaling operation. However, if you are in a multi-AZ configuration, the standby database is upgraded first and then a failover occurs to the newly configured database.


Scale instance type
```
aws rds modify-db-instance --db-instance-identifer your-db-instance-identifer --db-instance-class db.t2.medium
```

Scale storage:
```
aws rds modify-db-instance --db-instance-identifer your-db-instance-identifer --allocated-storage 50 --storage-type io1 --iops 3000
```


## Read Replicas (Horizontal Scaling)

```
aws rds create-db-instance-read-replica --db-instance-identifier your-db-instance-identifier --source-db-instance-identifier your-source-db
```

## Backing Up Data with Amazon RDS

RDS has two different ways of backing up data of your database instance: automated backups and database snapshots (DB snapshots).


## Automated Backups

When enabled, RDS performs a full daily snapshot of your data that is taken during your preferred backup window. 

After the initial backup is taken (each day), RDS then captures transaction logs as changes are made to the database.

The default retention period is seven days, but it can be a
maximum of up to 35 days.

To perform a restore, you must choose the Latest Restorable Time, which is typically within the last five minutes.

When you delete an RDS database, you can choose to retain any automated backups that currently exist, giving you the ability to restore a database after deletion. These backups will persist according to the retention period you chose when configuring automated backups.

## Database Snapshots (Manual)

DB snapshots are kept until you explicitly delete them. Regardless of the backup taken
![[Pasted image 20260729015054.png]]

## Multi-AZ Deployments

RDS multi-AZ configuration provides the following benefits:

- Automatic failover; no administration required
- Increased durability in the unlikely event of component failure
- Increased availability in the unlikely event of an availability zone failure
- Increased availability for planned maintenance (automated backups; I/O activity is no longer suspended)

```
aws rds create-db-instance \
--db-instance-class db.t2.micro \
--allocated-storage 30 \
--db-instance-identifier multi-az-rds-db --engine mysql \
--master-username masteruser \
--master-user-password masterpassword1! \
--multi-az
```

## Encryption

Encryption is one of the few options that must be configured
when the DB instance is created; you cannot modify an RDS database to enable encryption. You can, however, create a DB snapshot and then restore to an encrypted DB instance or cluster.

At the time of this writing, RDS encryption at rest is available on every database instance type except the following:
- m1, m2 famaly (old architecture not support low level mechanism to provide encryption at rest) and 
- t2.micro

## IAM DB Authentication

IAM DB authentication is supported only for MariaDB, MySQL, and PostgreSQL.

```
aws rds modify-db-instance --db-instance-identifier my-rds-db --enable-iam-database-authentication --apply-immediately
```

Because downtime is associated with this action, you can enable this feature during the next maintenance window. You can do so by changing the last parameter to 
--no-apply-immediately.

## Monitoring with Amazon CloudWatch

RDS integrates with CloudWatch to send it the following database logs:
- Audit log
- Error log
- General log
- Slow query log

## Amazon Aurora

An Aurora DB cluster has two types of DB instances: 

**Primary Instance** Supports read and write operations and performs all of the data modifications to the cluster volume. Each Amazon Aurora DB cluster has one primary instance.

**Amazon Aurora Replica** Supports read-only operations. Each Aurora DB cluster can have up to 15 Amazon Aurora replicas in addition to the primary instance. Multiple replicas distribute the read workload, and if you locate Aurora replicas in separate availability zones, you can also increase database availability.

![[Pasted image 20260730011119.png]]

The primary difference is that there is a separate storage layer, called the cluster volume, which is spread across multiple availability zones in a single AWS region. This means that the durability of your data is increased.

Additionally, Aurora has one primary instance that writes across the cluster volume. This means that Aurora replicas can be spun up quickly, because they don’t have to copy and store their own storage layer; they connect to it. Because the cluster volume is separated in this architecture, the cluster volume can grow automatically as your data increases.

## Aurora Global Databases
With Aurora, you can also create a multiregional deployment for your database tier. In this configuration, the primary AWS region is where your data is written (you may also do reads from the primary AWS region). Any application performing writes must write to the primary AWS region where the cluster is operating.

The secondary AWS region is used for reading data only. Aurora replicates the data to the secondary AWS region with typical latency of less than a second. Furthermore, you can use the secondary AWS region for disaster recovery purposes. You can promote the secondary cluster and make it available as the primary typically in less than a minute.

**NOTE:** Available only in certain regions and db engines.


## Amazon Aurora Serverless

For workloads that have spiky, unpredictable patterns of usage, Aurora Serverless may offer significant savings over provisioned RDS Aurora instances. On the other hand, if your database load stays mostly consistent throughout the day, you may see lower overall costs with the traditional Aurora setup.

## Best Practices for Running Databases on AWS

Page 257

