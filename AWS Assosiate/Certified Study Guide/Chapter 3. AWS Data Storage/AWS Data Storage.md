![[Pasted image 20260718010642.png]]


## Storage Fundamentals

### Data Dimensions

Velocity, Variety, and Volume 

**Velocity** - is the speed at which data is being read or written, measured in reads per second (RPS) or writes per second (WPS). The velocity can be based on batch processing, periodic, near-real-time, or real-time speeds.

**Variety** - determines how structured the data is and how many different structures exist in the data. This can range from highly structured to loosely structured, unstructured, or binary large object (BLOB) data.

**Volume** - is the total size of the dataset. Two common uses for data are developing valuable insights and storage for later use.

## Storage Temperature

**Hot** data is being worked on actively; that is, new ingests, updates, and transformations are actively contributing to it. Both reads and writes tend to be single-item. Items tend to be small (up to hundreds of kilobytes). Speed of access is essential. Hot data tends to be high-velocity and low-volume.

**Warm** data is still being actively accessed, but less frequently than hot data. Often, items can be as small as in hot workloads but are updated and read in sets. Speed of access, while important, is not as crucial as with hot data. Warm data is more balanced across the velocity and volume dimensions.

**Cold** data still needs to be accessed occasionally, but updates to this data are rare and so reads can tolerate higher latency. Items tend to be large (tens of hundreds of megabytes or gigabytes). Items are often written and read individually. High durability and low cost are essential. Cold data tends to be high-volume and low-velocity.

 **Frozen** data needs to be preserved for business continuity or for archival or regulatory reasons, but it is not being worked on actively. While new data is regularly added to this data store, existing data is never updated. Reads are extremely infrequent (known as “write once, read never”) and can tolerate very high latency. Frozen data tends to be extremely high-volume and extremely low-velocity.

## Data Value

**Transient Data** is often short-lived. The loss of some subset of transient data does not significantly impact the system as a whole. Examples include clickstream or data on X (formerly Twitter).

**Reproducible Data** contains a copy of useful information that is often created to improve performance or simplify consumption, such as adding more structure or altering a structure to match consumption patterns. Although the loss of some or all of this data may affect a system’s performance or availability, this will not result in data loss because the data can be reproduced from other data sources.

**Authoritative data** is the source of truth. Losing this data will have significant business impact because it will be difficult, or even impossible, to restore or replace it. For this data, we are willing to invest in additional durability. 

**Critical/Regulated Data** is data that a business must retain at almost any cost. This data tends to be stored for long periods of time and needs to be protected from accidental and malicious changes—not just data loss or corruption. Therefore, in addition to durability, cost and security are equally important factors

## AWS Block Storage Services

**NOTE:** AWS Block Storage Services
- Boot volumes on EC2 instances
- Relational and NoSQL databases
- Stream and log processing applications
- Data warehousing applications
- Big data analytics engines (like the Hadoop/HDFS {Hadoop Distributed File System} ecosystem and Amazon EMR clusters)

**NOTE:** EBS volumes are flexible. For current-generation volumes attached to current-generation instance types, you can dynamically increase size, modify provisioned input/output operations per second (IOPS) capacity, and change the volume type on live production volumes without service interruptions.

**NOTE:** EBS provides the following volume types

- **SSD-Backed Volumes** Solid-state drive (SSD)–backed volumes are optimized for transactional workloads involving frequent read/write operations with small I/O size, where the dominant performance attribute is IOPS. SSDs are available in two volume types: gp2, and the newer, more flexible gp3. The biggest distinction is that gp3 decouples IOPS and throughput from volume size, whereas these performance features scale with size on gp2. The newer gp3 also provides better baseline performance. The older gp2 is still available mostly for backward-compatibility reasons; new AWS users should choose gp3 when selecting EBS storage types.
- **HDD-Backed Volumes** Hard disk drive (HDD)–backed volumes are standard magnetic drives optimized for large streaming workloads where throughput (measured in MiB/s) is a better performance measure than IOPS.
![[Pasted image 20260719010820.png]]
![[Pasted image 20260719010835.png]]

## Elastic Volumes

**NOTE:** Elastic Volumes is a feature of Amazon EBS that allows you to dynamically increase storage capacity, tune performance, and change the type of storage volumes live, without interruption to the systems using them. 

## Amazon EBS Snapshots

**NOTE:** You can protect your data by creating point-in-time snapshots of EBS volumes, which are backed up to S3 for long-term durability. The volume does not need to be attached to a running instance to take a snapshot.

**NOTE:** These snapshots can be used to create multiple new Amazon EBS volumes or move volumes across availability zones.

**NOTE:** If you are taking snapshots at regular intervals, such as once per day, you may be concerned about the cost of the storage. Snapshots are incremental backups, meaning that only the blocks on the volume that have changed after your most recent snapshot are saved, making this a cost-effective way to back up your block data. For example, if you have a volume with 100 GiB of data, but only 5 GiB of data have changed since your last snapshot, only the 5 GiB of modified data is written to S3.

## Amazon EBS Encryption

**NOTE:** Snapshots of encrypted EBS volumes are automatically encrypted. EBS volumes that are restored from encrypted snapshots are also automatically encrypted.

## Amazon EBS Performance ??? 

**NOTE:** Volume initialization and fast snapshot restore
New EBS volumes receive their maximum performance the moment they are available and do not require initialization (formerly known as pre- warming).

Storage blocks on volumes that were restored from snapshots, however, must be initialized (pulled down from S3 and written to the volume) before you can access the block. This preliminary action takes time and can cause a significant increase in the latency of an I/O operation the first time each block is accessed. Performance is restored after the data is accessed once. You may avoid a performance hit by accessing each block prior to putting the volume into production, perhaps with a script. This process is called initialization. EBS can automate this process for you with an option called Fast
Snapshot Restore (FSR). For a small per-snapshot, per-AZ cost, EBS can be configured to pre-initialize snapshots in availability zones of your choosing, allowing you to launch new volumes from backup with immediate maximum I/O performance.

**NOTE:** Be aware of factors that can degrade HDD performance.  ??? 


## Instance Store

**NOTE:** An Amazon EC2 instance store is ephemeral block-level storage using the storage of the actual disks physically attached to an EC2 instance’s host computer

**NOTE:** Not all instance types come with available instance store volume(s), and the size and type of volumes vary by instance type. 

**NOTE:** You must enable these volumes when you launch an  EC2 instance, as you cannot add instance store volumes to an EC2 instance once it has been launched.

## AWS Object Storage Services (S3)

**The S3 service console & naming are GLOBAL.**
**The actual storage location of your data is REGIONAL.**

**NOTE:** By default, you can only create up to 100 buckets per account, but this limit can be increased up to 1,000 buckets by requesting a quota increase.

**NOTE:** A bucket name must be unique across all existing bucket names in S3 across all of AWS—not just within your account or within your chosen AWS region.
![[Pasted image 20260719020318.png]]


## Versioning

**NOTE:** Versioning is turned off by default. When you turn on versioning, S3 will create new versions of your object every time you overwrite an object.

**NOTE:** S3 versioning also protects against unintended deletes. If you issue a delete command against an object in a versioned bucket, AWS places a delete marker on that object, which means that if you perform a GET on it, you will receive an error as if the object does not exist. However, an administrator, or anyone else with the necessary permissions, can remove the delete marker and access the data.

**NOTE:** You cannot disable versioning on a bucket. You may suspend versioning, but past object versions accumulated while versioning was enabled will still exist. If you need to fully discontinue versioning, you must first copy all of your objects to a new bucket that has versioning disabled, and then use that bucket going forward.

**NOTE:** Objects belonging to a bucket that you create in a specific AWS region never leave that region unless you explicitly transfer them to another region.

## Objects

You can store an unlimited number of objects within Amazon S3, but an object can only be between 1 byte to 5 TB in size. The largest object that can be uploaded in a single PUT is 5 GB (gigabytes). For objects larger than 100 MB, you should consider using multipart upload (discussed later in this chapter). For any objects larger than 5 GB, you must use multipart upload.

## Object Tagging
 
- You can associate 10 tags with an object, and each tag associated with an object must have unique tag keys.
- A tag key can be up to 128 Unicode characters in length, and tag values can be up to 256 Unicode characters in length.

In addition to data classification, tagging offers other benefits as follows:

- Object tags enable fine-grained access control of permissions. For example, you could grant an AWS Identity and Access Management (IAM) user permissions to read only objects with specific tags.

- Object tags enable fine-grained object life cycle management in which you can specify a tag-based filter, in addition to key name prefix, in a life cycle rule.

- When using Amazon S3 analytics, you can configure filters to group objects together for analysis by object tags, by key name prefix, or by both prefix and tags.

- You can also customize CloudWatch metrics to display information by specific tag filters. The following sections provide details.


## Storage Classes

- S3 Standard (Default) - high durability, availability
- S3 Express One Zone - lower durability (will loose data of all AZ goes down), lowest latancy 10x faster then standart
- Amazon S3 Standard-Infrequent Access (S3 Standard-IA) 
	- Long-term storage
	- Backups
	- Data stores for disaster recovery
	Same as standart but lower price. Is set on object level.
- Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) - combination of one zone, and IA storages.
- Reduced Redundancy Storage - used for noncritical data, that can be replicated if lost. No longer reccomended, use standard instead!!!! 
- S3 Intelligent Tiering - for small fee s3 will monitor data access patterns and move data between diffirent tiers: Frequent Access, Infrequent Access, and Archive Instant Access. it is possible to enable two additional Intelligent Tiering classes—Archive Access and Deep Archive Access that provide asynchronous
data access at even lower costs.

## Amazon S3 Glacier

Amazon S3 Glacier and S3 Glacier Deep Archive are secure, durable, and extremely low-cost S3 storage class. It provides same very high durability level 99.9999999%, but way slower access minutes - 12 hours.

- Glacier Instant Retrieval - instantaneous read time
- Glacier Flexible Retrieval - up to few hours
- Deep Archive - up to 12 hours

## Glacier as a Stand-alone Service

Glacier was standalone service, but not it's part of S3, but API and SDK is still available, and can be used in certain cases ??

## Restoring Objects from Glacier
Restoring Objects from Glacier Outside of Glacier Instant Retrieval, objects in the S3 Glacier storage classes are not immediately accessible once they have been moved to Glacier.
Instead, you must initiate a restoration, then return to download the retrieved object when the restore is complete.
Glacier charges fee for retrieval

## Storage Class Comparison
![[Pasted image 20260725013707.png]]

## S3 Strong Consistency
Prior to 2020, Amazon S3 operated with an eventual consistency model, meaning that applications did not have any guarantee of being able to read a write immediately after making that write. Now, however, S3 provides strong
read-after-write consistency for writes, as well as strong consistency for list operations without impacting performance or availability.

## Presigned URLs

A presigned URL is a way to grant temporary access to an object. Developers use presigned URLs to allow users to upload or download objects without granting them direct access to S3 or the account.

The presigned URL must be created by someone who has permission to perform the operation upon which the presigned URL is based.

Amazon S3 presigned URLs cannot be generated within the AWS Management Console, but they can be generated using the AWS CLI or AWS SDKs.

## Encryption

Sensetive data should be protected both in rest and in transit. 

To encrypt in transit S3 SSL API should be used with HTTPS. In rest any server-side-encryption (SSE) can be used.

Objects in S3 are encrypted at the object level as they
are written to disk in AWS data centers and then decrypted for you when you access the objects using AES-256. This process, called seamless encryption, is automatic and invisible to the user.

You can also use client-side encryption, with which you encrypt the objects before uploading to S3 and then decrypt them after you have downloaded them. Some customers, for some workloads, will use a combination of both server-side and client-side encryption for extra protection.
## Server-Side Encryption (SSE)

**SSE-S3 (Amazon S3-Managed Keys)** With this option, objects in your bucket are encrypted at rest using an AES-256 key owned and managed by S3.

**SSE-C (Customer-Provided Keys)** With this option, you must
provide your own AES-256 encryption key. Whenever you upload an object to S3, you also provide this key, which S3 uses to encrypt the file and subsequently deletes. When you retrieve this object from S3, you must provide the same encryption key in your request in order to decrypt the retrieved object.

**SSE-KMS (AWS KMS-Managed Encryption Keys)** You can encrypt your data in S3 by defining an AWS KMS key within your account. Similar to SSE-S3, this encryption method is seamless; S3 automatically encrypts objects when they are uploaded and decrypts them when they are retrieved. However, this method does provide additional safeguards, as you may use IAM policies to control which users have access to the KMS key used for encryption.

**Note:** also that unlike SSE-S3 and SSE-C, using SSE-KMS does incur a small additional charge associated with the creation and maintenance of the KMS key. 

## Client-Side Encryption

- Client-Side Key
When uploading an object, you provide a client-side key to the Amazon S3 encryption client. The client uses this key only to encrypt the data encryption key (DEK), which it generates randomly and uploads alongside the object. 
When downloading an object, the client first downloads the encrypted object from S3 along with its metadata, which contains the DEK. Then, the client uses the original key to decrypt the DEK and uses that key to decrypt the object.

**NOTE:** The client-side key that you provide can be either a symmetric key or a public/private key pair. It’s essential that you do not lose it; otherwise, neither you nor AWS will be able to decrypt your objects.

- AWS KMS-Managed CMK 
Customer-managed key (CMK), so named because while you create and manage the key itself, it lives on infrastructure managed by AWS, and you use KMS console functionality to control access, rotation, and other key lifecycle events. It is a similar process to using a client-provided key, but the key is managed by and retrieved from KMS, subject to appropriate IAM policies.


## Access Control

All S3 resources (buckets, objects, life-cycle, configuration) are private by default, so only resources owner can access it.

Access can be granted using access policy.

Acess policies attached to resuource is called **resource-based**.

You can also attach access policies to users in your account. These are called **user policies**.

Any **IAM principal** (a user, role, or application) that has the **`s3:PutBucketPolicy`** permission attached to their IAM policy can apply or modify a bucket policy.

- **`iam:AttachUserPolicy`** — To attach a managed policy to a user.
    
- **`iam:PutUserPolicy`** — To add an inline policy directly to a user.
    
- **`iam:AddUserToGroup`** — To add a user to a group that already has permissions attached.

You **can** write statements inside that single Bucket Policy that target specific individual objects or groups of objects using their paths (keys).

## Managing Access with Access Control Lists

Unlike IAM policies or Bucket Policies, which are JSON documents written in a central place, an ACL is a simple, sub-resource metadata table attached directly to an individual object. Their capabilities are limited, especially compared to the breadth of control enabled by IAM policies, and are therefore not recommended over the use of IAM.

## S3 Defence in Depth
![[Pasted image 20260726211013.png]]

## Hosting a Static Website

To host a static website, you configure an S3 bucket for website hosting, then upload your website content to the bucket. The website is then available at
the AWS region–specific website endpoint of the bucket in one of the following formats:

{bucket-name}.s3-website-{AWS-region}.amazonaws.com
{bucket-name}.s3-website.{AWS-region}.amazonaws.com

Once your static hosting is established on S3, you may use Amazon Route 53 to point your own domain to this content. Note that S3 does not support server-side scripting or dynamic content.

## MFA Delete

Requiring a unique code from a token or an authentication device (virtual or hardware) in order to delete objects

## S3 Object Lock

This feature, configurable at the bucket or individual object level, prevents accidental deletion or overwriting of objects for a set period of time or for all time. This feature requires
versioning to be enabled on the bucket.

## Cross-Region Replication

Cross-region replication (CRR) is a bucket-level configuration that enables automatic, asynchronous copying of objects across buckets in different AWS regions.

**These buckets can be owned by different accounts.**

To configure we need to provide:
- The destination bucket or buckets
- The objects that need to be replicated
- Optionally, the destination storage class (otherwise the source storage class will be used

Replicase will have same: key names, metadata, storage class (if other not specified), Object ACL.


Normally, after S3 replicates an object, the object will not be replicated again until the source object changes. For instance, deleting the replicated object in the destination bucket will not result in another replication. However, it is possible to configure replication bidirectionally between two buckets, so that changes in the destination end up reflected in the source, and vice versa.

Requirements for CRR include the following:
- Versioning must be enabled for both the source and destination buckets.
- Source and destination buckets must be in different AWS regions.
- Amazon S3 must be granted appropriate permissions to replicate files.

## VPC Endpoints

??

## Performance

## Amazon S3 Transfer Acceleration

??

## Object Life Cycle Management

There are two types of actions:

**Transition Actions** define when objects transition
to another storage class. For example, you might choose to transition objects to the STANDARD_IA (Standard-IA) storage class 30 days after you created them or archive objects to a Glacier storage class one year after creating them.

**Expiration Actions** Expiration actions define when objects expire. S3 deletes expired objects on your behalf.

![[Pasted image 20260726215420.png]]

## AWS File Storage Services

## Amazon Elastic File System

Use cases:
- Mounts from multiple systems
- GB/s throughput
- Multi-AZ availability/durability
- Automatic scaling (growing/shrinking of storage)

## Mount Target
To access your files system from within a VPC, create mount targets in the VPC. A mount target is a Network File System (NFS) endpoint within your VPC that includes an IP address and a DNS name, both of which you use in your mount command. 
## EFS Storage Classes
EFS offers different tiers of storage that let users determine
their optimal price-to-performance ratio.

Regional Storage Types:
- EFS Standard
- EFS Standard – Infrequent Access
- EFS Archive

One Zone Storage Types:
- EFS One Zone
- EFS One Zone – Infrequent Access

## Accessing an Amazon EFS File system
EC2 and AWS Direct Connect

## Using Amazon Elastic Compute Cloud

To access a file system from an EC2 instance, you must mount the file system either by using the standard Linux mount command or the AWS EFS mount helper

A file system belongs to a region, and your EFS file system spans all availability zones in that region. Once you have mounted your file system, data can be accessed from any availability zone in the region within your VPC while maintaining full consistency. 

## Using AWS Direct Connect

With AWS Direct Connect, you can mount your on-premises
servers to EFS using the same mount command used to mount in EC2. 

## Using amazon-efs-utils

For most Linux systems, Amazon makes available a utility called amazon-efs-utils. This package, which is preinstalled on Amazon Linux operating systems, provides an easy interface to perform the mounting steps just described

## Syncing Files Using EFS File Sync

Now that you have a functioning EFS file system, you can use EFS File Sync to synchronize files from an existing file system to the cloud. EFS File Sync can synchronize your file data and file system metadata such as ownership, time stamps, and access permissions.

## Performance Modes

**General Purpose (Default)** mode is the default mode, and it is used for latency-sensitive applications and general-purpose workloads, offering the lowest latencies for file operations.

**Max I/O** If you are running large-scale and data-heavy applications, then choose the max I/O performance option, which provides you with a virtually unlimited ability to scale out throughput and IOPS, but with a trade-off of slightly higher latencies.

## Throughput Modes

**Elastic** throughput sees AWS automatically scaling throughput for you in response to observed usage of your EFS file system. Amazon recommends this mode when your average-to-peak throughput demands are less than 5 percent.

**Provisioned** For spikier workloads whose average-to-peak is regularly higher than 5 percent, AWS allows users to pay for provisioned throughput, which guarantees a certain amount of throughput, paid in advance.

**Bursting** mode, similar to EC2’s bursting performance modes, operates by giving you additional throughput just when you need it, based on a system of bursting credits that accumulate when your usage is below a certain base rate.

## Security

![[Pasted image 20260726223707.png]]

## Amazon FSx

FSx expands on the capabilities of EFS by providing file systems beyond NFS.
- NetApp ONTAP
- OpenZFS
- Windows File Server
- Lustre

## Storage Comparisons
![[Pasted image 20260726223933.png]]

![[Pasted image 20260726223959.png]]

![[Pasted image 20260726224015.png]]
![[Pasted image 20260726224028.png]]
