## Amazon DynamoDB

![[Pasted image 20260803193221.png]]

 DynamoDB supports nested attributes up to 32 levels deep.

When creating table you need define PK. It could be:
- Partiotion (Hash) Key - one attribute hash function on which determine on which partition item will be saved. PK should be unique (if sort key is not defined) and scalar.
- Composite key - PartiotionKey + SortKey. If PK is equal then SK should be diffirent.

Sort Key - defines in which order items are stored in partiotion.

![[Pasted image 20260804010450.png]]


## Secondary Indexes

A secondary index contains the following:
- Primary key attributes
- Alternate key attributes
- (Optional) A subset of other attributes from the base table (projected attributes)


Amazon DynamoDB supports two types of secondary indexes: local secondary indexes and global secondary indexes. You can define up to five global secondary indexes and five local secondary indexes per table.

## Local Secondary Index

A local secondary index (LSI) is an index that has the same partition key as the base table, but a different sort key. When
creating an LSI, you choose an alternate sort key as well as any other fields you’d like to copy, or project, on to the local secondary index. If you project all the fields, you have essentially replicated the original table with different query options!  

An LSI is called "Local" because it lives **on the exact same physical server** as your base table data.

Because the base table and the LSI share the exact same physical hard drive, AWS can offer you a superpower with LSIs that you cannot get with GSIs: **Strongly Consistent Reads.**

When you write new data to your base table, DynamoDB can update the LSI at the exact same millisecond before it tells your application "Success!"

LSI must be defined exactly when you create the table. You cannot add one later.

LSIs are manifested just like tables, they do incur a storage cost.
## Global Secondary Index

A global secondary index is an index with a partition key and a sort key that can be different from those on the base table

Can be created/modified/deleted after table creation unlike LSI.

DynamoDB maintains indexes automatically. When you add, update, or delete an item in the base table, DynamoDB adds, updates, or deletes the corresponding item in any indexes that belong to that table.

**When you create an index, you specify which attributes will be projected from the base table to the index. At a minimum, Amazon DynamoDB projects the key attributes from the base table into the index.**

![[Pasted image 20260804021122.png]]

## Amazon DynamoDB Streams

Captures data modification events in DynamoDB tables.

Each event is represented by a stream record. Record created for each item create/update/delete

Each stream record also contains the name of the table, the event time stamp, and other metadata. Stream records have a lifetime of 24 hours; after that, they are automatically removed from the stream.

## Read Consistency

DynamoDB replicates data among multiple availability zones in a region. The data is eventually consistent across all storage locations, usually within one second or less. DynamoDB supports both eventually consistent and strongly consistent reads.

**DynamoDB uses eventually consistent reads, unless you
specify otherwise.**

When querying data, you can specify whether DynamoDB should return **strongly consistent reads**. When you request a strongly consistent read, DynamoDB returns a response with the most up-to-date data, reflecting updates from all prior write operations that were successful. A strongly consistent read might not be available if there is a network delay or outage.

## Read and Write Throughput

When you create a table or index in DynamoDB, you must specify your capacity requirements for read and write activity. 

You specify throughput capacity in terms of read capacity units and write capacity units:

- One read capacity unit (RCU) represents one strongly consistent read per second, or two eventually consistent reads per second, for an item up to 4 KB in size. If you need to read an item that is larger than 4 KB, DynamoDB will need to consume additional read capacity units. The total number of read capacity units required depends on the item size and whether you want an eventually consistent or strongly consistent read.
- One write capacity unit (WCU) represents one write per second for an item up to 1 KB in size. If you need to write an item that is larger than 1 KB, DynamoDB must consume additional write capacity units. The total number of write capacity units required depends on the item size.

**NOTE:** up to the DynamoDB maximum item size of 400 KB

**NOTE:** DynamoDB read/write capacity calculations always round up to the nearest 4 KB. If you need one strongly consistent read per second at 1 KB, you will consume a full RCU (rounding up to 4). If you need a strongly consistent read per second at 5 KB, that will consume two RCUs (rounding up to 8 KB). The same is true of write capacity units (WCUs), which round up to the nearest 1 KB.


If your read or write requests exceed the throughput settings for a table, DynamoDB can throttle that request. DynamoDB may also thottle read requests on an index. Throttling prevents your application from consuming too many capacity units. When a request is throttled, it fails with an HTTP 400 code (Bad Request) and a ProvisionedThroughputExceededException. The AWS SDKs have built-in support for retrying throttled requests, so you do not need to write this logic yourself.

Amazon DynamoDB provides the following mechanisms for managing throughput as it changes:

- **DynamoDB Autoscaling** DynamoDB automatic scaling actively manages throughput capacity for tables and global secondary indexes. With autoscaling, you define a range (upper and lower limits) for read and write capacity units. You can even choose to autoscale only for reads or writes alone. You also define a target utilization percentage within that range. DynamoDB automatic scaling seeks to maintain your target utilization, even as your application workload increases or decreases.
- **Provisioned Throughput** If you aren’t using DynamoDB autoscaling, you must define your throughput requirements manually. 
- **Reserved Capacity** You can purchase reserved capacity in advance, where you pay a one-time upfront fee and commit to a minimum usage level over a period of time. You may realize significant cost savings compared to on-demand provisioned throughput settings, but make sure not to overprovision for your needs.
- **On-Demand** It can be difficult to plan capacity, especially if you aren’t collecting metrics or perhaps are developing a new application and you aren’t sure what type of performance you require. With On-Demand mode, your DynamoDB table will automatically scale up or down to any previously reached traffic level. If a workload’s traffic level reaches a new peak, DynamoDB rapidly adapts to accommodate the workload. While this method requires the least forethought, be aware that it is the most expensive option.

## Partitions and Data Distribution
When you are using a table in DynamoDB, the data is placed on multiple partitions (depending on the amount of data and the amount of throughput allocated to it; recall that throughput is determined by RCUs and WCUs). When you allocate RCUs and WCUs to a table, those RCUs and WCUs are split evenly among all partitions for your table.

For example, suppose that you have allocated 1,000 RCUs and 1,000 WCUs to a table, and this table has 10 partitions allocated to it. Then each partition would have 100 RCUs and 100 WCUs for it to use.

If one of your partitions consumes all the RCUs and WCUs for the table, you may receive a ProvisionedThroughputExceededException error because one of your partitions is hot. To deal with hot partitions, DynamoDB has two features: burst capacity and adaptive capacity.

## Burst Capacity

Whenever your partition is not using all of its total capacity,
DynamoDB reserves a portion of that unused capacity for later bursts of throughput to handle any spike your partition may experience.

As of this writing, DynamoDB currently reserves up to 300 seconds (5 minutes) of unused read and write capacity, which means that your partition can handle a peak load for five minutes over its normal expected load. Burst capacity is enabled and runs in the background.

**NOTE:** DynamoDB enforces strict physical limits per partition. A single partition **can never process more than 3,000 RCUs in a single second**, regardless of how much burst capacity you have stored in the bucket.

## Adaptive Capacity

DynamoDB adaptive capacity enables your application to continue reading and writing to hot partitions without being throttled, provided that the total provisioned capacity for the table is not exceeded. DynamoDB allocates additional RCUs to the hot partition, in this case, 100 more. Once adaptive capacity allocates the RCUs to the partition, DynamoDB is able to sustain the new higher throughput for your partition and table. Adaptive capacity is on by default, and there is no need to enable or disable it.

## Retrieving Data from DynamoDB

## Query

Two primary methods are used to retrieve data from DynamoDB: Query and Scan.

In DynamoDB, you perform Query operations directly on the table or index. To run the Query command, you must specify, at a minimum, a primary key. If you are querying an index, you must specify both TableName and IndexName

## Scan

The Scan operation reads every item in a table or a secondary index. Although you can provide a FilterExpression along with the command, any filtering is performed after the full table scan, so you always incur the full cost of reading every item in the table.

If the total number of scanned items exceeds the maximum dataset size limit of 1 MB, the scan stops, and the results are returned to the user as a LastEvaluatedKey value to continue the scan in a subsequent operation. The results also include the number of items exceeding the limit.

A single Scan operation reads up to the maximum number of items set (if using the Limit parameter) or a maximum of 1 MB of data and then applies any filtering to the results by using FilterExpression. If LastEvaluatedKey is present in the response, you must paginate the result set.

Scan operations proceed sequentially; however, for faster performance on a large table or secondary index, applications can request a parallel Scan operation by providing the Segment and TotalSegments parameters.

Scan uses eventually consistent reads when accessing the data in a table; therefore, the result set might not include the changes to data in the table immediately before the operation began. If you need a consistent copy of the data, as of the time that the Scan begins, you can set the ConsistentRead parameter to true.

## Global Tables

With global tables, DynamoDB performs all the necessary tasks to create copies of your tables in multiple regions and propagate ongoing data changes to all of them

If your application requires strongly consistent reads, then it must perform all its strongly consistent reads and writes in the same region. DynamoDB does not support strongly consistent reads across AWS regions.

Conflicts can arise if applications update the same item in different regions at about the same time (concurrent updates). To ensure eventual consistency, DynamoDB global tables use a “last writer wins” conflict resolution mechanism, wherein all replicas agree on the latest update and converge toward a state in which they all have identical data.

## Amazon DynamoDB Local

Local analogue of DynamoDB to save money on development and testing that use real API.

## IAM and Fine-Grained Access Control

...

## Backup and Restore

You can create on-demand backups and enable point-in-time recovery for your DynamoDB tables.

**On-demand** backups create full backups of your tables or restore them on-demand at any time. These actions execute with zero impact on table performance or availability and without consuming any provisioned throughput on the table.

**Point-in-time** recovery helps protect your DynamoDB tables from accidental write or delete operations. For example, suppose that a test script accidentally writes to a production DynamoDB table. With point-in-time recovery, you can restore that table to any point in time during the last 35 days.