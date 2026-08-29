## Question 1

Which of the following AWS services enables you to automate your build, test, deploy, and release process every time there is a code change?

- [ ] A. AWS CodeCommit
    
- [ ] B. AWS CodeDeploy
    
- [ ] C. AWS CodeBuild
    
- [ ] D. AWS CodePipeline
    

## Question 2

Which of the following statements is true about AWS Elastic Beanstalk?

- [ ] A. Elastic Beanstalk automatically handles capacity provisioning, load balancing, and application health monitoring.
    
- [ ] B. Developers need to manually manage the underlying infrastructure when deploying applications with Elastic Beanstalk.
    
- [ ] C. Elastic Beanstalk supports only a single programming language for application development.
    
- [ ] D. Applications deployed using Elastic Beanstalk cannot be integrated with other AWS services.
    

## Question 3

Which of the following languages is **not** supported by AWS Elastic Beanstalk?

- [ ] A. Java
    
- [ ] B. Node.js
    
- [ ] C. Objective C
    
- [ ] D. Go
    

## Question 4

What does the Elastic Beanstalk service do?

- [ ] A. Deploys applications and architecture
    
- [ ] B. Stores static content
    
- [ ] C. Directs user traffic to EC2 instances
    
- [ ] D. Works with dynamic cloud changes as an IP address
    

## Question 5

Instances in your Elastic Beanstalk application need several operating system packages installed before the app can run. For the fastest possible scaling times, how should you provision this configuration?

- [ ] A. Use the `container_commands` section of a `.ebextensions` file to install packages via a shell script.
    
- [ ] B. Edit the launch configuration of the application’s Auto Scaling group to add package installations to user data.
    
- [ ] C. Install the packages on an instance, create an AMI, and use that AMI in the launch configuration.
    
- [ ] D. Use `.ebextensions` to download the packages from S3.
    

## Question 6

Which of the following components can Elastic Beanstalk deploy? _(Choose three.)_

- [ ] A. EC2 instances with write capabilities to a DynamoDB table
    
- [ ] B. A worker application using SQS
    
- [ ] C. An ECS task
    
- [ ] D. A mixed fleet of Spot and Reserved Instances with four applications running in each environment
    
- [ ] E. A mixed fleet of Reserved Instances scheduled between 9 a.m. and 5 p.m. and On-Demand Instances used for processing data workloads when needed randomly
    

## Question 7

Which of the following operations can Elastic Beanstalk do? _(Choose two.)_

- [ ] A. Access an S3 bucket
    
- [ ] B. Connect to an RDS database
    
- [ ] C. Install agents for the GuardDuty service
    
- [ ] D. Create and manage Amazon WorkSpaces
    

## Question 8

Which service can be used to restrict access to Elastic Beanstalk resources?

- [ ] A. AWS Config
    
- [ ] B. Amazon RDS
    
- [ ] C. AWS IAM
    
- [ ] D. Amazon S3
    

## Question 9

Which IAM entities are used when creating an environment? _(Choose two.)_

- [ ] A. Federated role
    
- [ ] B. Service role
    
- [ ] C. Instance profile
    
- [ ] D. Profile role
    
- [ ] E. Username and access keys
    

## Question 10

Which of the following describes how customers are charged for Elastic Beanstalk?

- [ ] A. A monthly fee based on an hourly rate for use.
    
- [ ] B. A one-time upfront cost for each environment running.
    
- [ ] C. No additional charges.
    
- [ ] D. A fee is charged only when scaling to support traffic changes.
    

## Question 11

What two AWS resources must be configured to achieve horizontal scaling of a web app on EC2 instances?

- [ ] A. An Auto Scaling group and a VPC
    
- [ ] B. An Application Load Balancer (ALB) and Route 53
    
- [ ] C. An Application Load Balancer and an Auto Scaling group
    
- [ ] D. An Auto Scaling group and an Internet gateway