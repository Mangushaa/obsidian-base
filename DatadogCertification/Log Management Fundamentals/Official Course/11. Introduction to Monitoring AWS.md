
Datadog’s AWS integration includes over 100 resource-specific sub-integrations. Most are automatically installed and configured when you set up the main AWS integration.

The AWS integration uses two primary methods to detect your AWS resources and collect their metrics and logs:

1. **Pulling metrics** from AWS into your Datadog account.
    
    Datadog assumes an IAM role in your AWS account to poll the CloudWatch Metrics API. On average, Datadog collects metrics every 10 minutes.
    
2. **Pushing logs** from your AWS account to Datadog.
    
    A Lambda function in your environment forwards logs to Datadog when triggered. It automatically collects logs from certain resource types and can be configured to support additional sources.


# Other collection methods

### Metric streams and Amazon Data Firehose

With additional configuration, you can collect low-latency metrics from AWS using metric streams. Metrics streams use [Amazon Data Firehose](https://aws.amazon.com/firehose/) to continuously push metrics to your Datadog account with a 3-minute latency.

# The Datadog Agent

The Datadog Agent can be installed on or alongside some AWS resource types. For example:

- Install the Agent on EC2 instances, including those used by RDS and ECS (EC2 launch type)
- Run the Datadog Agent container in the same task definition as your application container
- Run the Datadog Agent container in EKS clusters

The benefits of adding the Agent to your AWS infrastructure include:

- Low-latency host metrics sampled every 15 seconds (compared to 60-300 seconds for EC2 metrics in CloudWatch)
- Over 200 checks, many of which run automatically
- The ability to run custom checks
- The ability to send custom metrics using DogStatsD
- The ability to collect Application Performance Monitoring (APM) traces and profiling data

Datadog recommends installing the Agent wherever possible alongside the AWS integration. This combination provides the most comprehensive visibility into your AWS infrastructure.