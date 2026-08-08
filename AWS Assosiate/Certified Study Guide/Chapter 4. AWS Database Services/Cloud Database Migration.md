
## AWS Database Migration Service

AWS Database Migration Service (AWS DMS) helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database.

The service supports homogenous database migrations, such as Oracle to Oracle, in addition to heterogeneous migrations between different database platforms, such as Oracle to Amazon Aurora or Microsoft SQL Server to MySQL. 

You can also stream data to Amazon Redshift, DynamoDB, and S3 from any of the supported sources, such as Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle Database, SAP ASE, SQL Server, IBM DB2 LUW, and MongoDB, enabling consolidation and easy analysis of data in a petabyte- scale data warehouse. You can also use DMS for continuous data replication with high availability.

## AWS Schema Conversion Tool

For heterogeneous database migrations, DMS uses the AWS Schema Conversion Tool (AWS SCT). AWS SCT makes heterogeneous database migrations predictable by automatically converting the source database schema and a majority of the database code objects, including views, stored
procedures, and functions, to a format compatible with the target database. Any objects that cannot be automatically converted are clearly marked so that they can be manually converted to complete the migration.