### 1. Which of the following is typically used to sign API (CLI or SDK) calls to AWS services?

- [ ] A. AWS KMS Key
    
- [ ] B. AWS access key
    
- [ ] C. IAM username and password
    
- [ ] D. Account number
    

### 2. When you make calls to AWS services, for most services those requests are directed at a specific endpoint that corresponds to which of the following?

- [ ] A. AWS facility
    
- [ ] B. AWS availability zone
    
- [ ] C. AWS region
    
- [ ] D. AWS edge location
    

### 3. When you’re configuring a local development machine to make AWS calls, which of the following is the simplest secure method of obtaining and using credentials?

- [ ] A. Create an IAM user, assign permissions by adding the user to an IAM group with IAM policies attached, and generate an access key for programmatic access.
    
- [ ] B. Sign in with your email and password, and visit My Security Credentials to generate an access key.
    
- [ ] C. Generate long-term credentials for a built-in IAM role.
    
- [ ] D. Use your existing username and password by configuring local environment variables.
    

### 4. You have a large number of employees, and each employee already has an identity in an external directory. How might you manage AWS credentials for each employee so that they can interact with AWS for short-term sessions?

- [ ] A. Create an IAM user and credentials for each member of your organization.
    
- [ ] B. Share a single password through a file stored in an encrypted Amazon S3 bucket.
    
- [ ] C. Define a set of IAM roles, and establish a trust relationship between your directory and AWS.
    
- [ ] D. Configure the AWS Key Management Service (AWS KMS) to store credentials for each user.
    

### 5. You have a team member who needs access to write records to an existing Amazon DynamoDB table within your account. How might you grant write permission to this specific table and only this table?

- [ ] A. Write a custom IAM policy that specifies the table as the resource, and attach that policy to the IAM user for the team member.
    
- [ ] B. Attach the DynamoDBFullAccess managed policy to the IAM role used by the team member.
    
- [ ] C. Delete the table and re-create it. Permissions are set when the DynamoDB table is created.
    
- [ ] D. Create a new user within DynamoDB, and assign table write permissions.
    

### 6. You created a Movies DynamoDB table in the AWS Management Console, but when you try to list your DynamoDB tables by using the Java SDK, you do not see this table. Why?

- [ ] A. DynamoDB tables created in the AWS Management Console are not accessible from the API.
    
- [ ] B. Your SDK may be listing your resources from a different AWS region in which the table does not exist.
    
- [ ] C. The security group applied to the Movies table is keeping it hidden.
    
- [ ] D. Listing tables is supported only in C# and not in the Java SDK.
    

### 7. You make a request to describe voices offered by Amazon Polly by using the AWS CLI, and you receive the following error message: `Could not connect to the endpoint URL: https://polly.us-east-1a.amazonaws.com/v1/voices`. What went wrong?

- [ ] A. Your credentials have been rejected.
    
- [ ] B. You have incorrectly configured the AWS region for your call.
    
- [ ] C. Amazon Polly does not offer a feature to describe the list of available voices.
    
- [ ] D. Amazon Polly is not accessible from the AWS CLI because it is only in the AWS SDK.
    

### 8. To what resource does this IAM policy grant access, and for which actions?

JSON

```
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "s3:ListBucket",
    "Resource": "arn:aws:s3:::example_bucket"
  }
}
```

- [ ] A. The policy grants full access to read the objects in the Amazon S3 bucket.
    
- [ ] B. The policy grants the holder the permission to list the contents of the Amazon S3 bucket called example_bucket.
    
- [ ] C. Nothing. The policy was valid only until October 17, 2012 (2012-10-17), and is now expired.
    
- [ ] D. The policy grants the user access to list the contents of all Amazon S3 buckets within the current account.
    

### 9. When an IAM user makes an API call via the CLI or SDK, that user’s long-term credentials are valid in which context?

- [ ] A. Only in the AWS region in which their identity resides
    
- [ ] B. Only in the availability zone in which their identity resides
    
- [ ] C. Only in the edge location in which their identity resides
    
- [ ] D. Across multiple AWS regions
    

### 10. You have provisioned a user with the managed policy `AmazonS3FullAccess`. A new feature has been added to the S3 API. What steps do you need to take to ensure that the user has access to use this new feature?

- [ ] A. Go to the IAM console, find the AmazonS3FullAccess policy, and click Update.
    
- [ ] B. Remove and reattach the AmazonS3FullAccess policy from the user.
    
- [ ] C. Copy the text of the AmazonS3FullAccess policy and use it to create a custom policy with the new permissions.
    
- [ ] D. Do nothing; AWS updates managed policies automatically when services are updated.
    

### 11. You have an on-premises application that needs to sample data from all your Amazon DynamoDB tables. You have defined an IAM user for your application called TableAuditor. How can you give the TableAuditor user read access to new DynamoDB tables as soon as they are created in your account?

- [ ] A. Define a custom IAM policy that lists each DynamoDB table. Revoke the access key, and issue a new access key for TableAuditor when tables are created.
    
- [ ] B. Create an IAM user and attach one custom IAM policy per AWS region that has DynamoDB tables.
    
- [ ] C. Add the TableAuditor user to the IAM role DynamoDBReadOnlyAccess.
    
- [ ] D. Attach the AWS managed IAM policy AmazonDynamoDBReadOnlyAccess to the TableAuditor user.
    

### 12. The principals who have access to assume an IAM role are defined in which document?

- [ ] A. IAM access policy
    
- [ ] B. IAM trust policy
    
- [ ] C. MS grant token
    
- [ ] D. AWS credentials file
    

### 13. A new developer has joined your small team. You would like to help your team member set up a development computer for access to the team account quickly and securely. How do you proceed?

- [ ] A. Generate an access key based on your IAM user, and share it with your team member.
    
- [ ] B. Create a new directory with AWS Directory Service, and assign permissions in the AWS Key Management Service (AWS KMS).
    
- [ ] C. Create an IAM user, add it to an IAM group that has the appropriate permissions, and generate a long-term access key.
    
- [ ] D. Create a new IAM role for this team member, assign permissions to the role, and generate a long-term access key.
    

### 14. You have developed an app that interacts with Amazon S3 using the Python SDK on a Linux server. You are now building a new application in C#, which will run on a separate Windows Server. What is the most straightforward way to enable your new application to work with S3?

- [ ] A. Rewrite your existing Python application in .NET to ensure compatibility with the Windows Server environment.
    
- [ ] B. Go to the Amazon S3 service, and change the supported languages to include .NET.
    
- [ ] C. Install the AWS SDK for .NET on your Windows Server.
    
- [ ] D. Implement a proxy service that accepts your API requests, and translate them to Python.
    

### 15. You work for a Virginia-based company, and you have been asked to implement a custom application exclusively for customers in Australia. This application has no dependencies on any of your existing applications. What is a method you use to keep the customer latency to this new application low?

- [ ] A. Set up an AWS Direct Connect (DX) between your on-premises environment and US East (N Virginia), and host the application from your own data center in Virginia.
    
- [ ] B. Create all resources for this application in the Asia Pacific (Sydney) region, and manage them from your current account.
    
- [ ] C. Deploy the application to the US East (N Virginia) region, and select Amazon EC2 instances with enhanced networking.
    
- [ ] D. It does not matter which region you select, because all resources are automatically replicated globally.