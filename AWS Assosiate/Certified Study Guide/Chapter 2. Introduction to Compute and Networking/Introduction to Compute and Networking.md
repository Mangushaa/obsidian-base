
**NOTE:** Computing services 

- Amazon Elastic Compute Cloud (Amazon EC2)
- Amazon Lightsail
 - AWS Elastic Beanstalk
- Amazon Elastic Container Service (Amazon ECS)
- Amazon Elastic Container Service for Kubernetes (Amazon EKS)
- AWS Lambda
- VMWare Cloud
- Amazon app runner


## Amazon Elastic Compute Cloud (EC2)

## Instance Types
![[Pasted image 20260716005214.png]]

## Storage

**NOTE:**  Amazon Elastic Block Store (Amazon EBS) to provide block storage devices for Amazon EC2 instances.

**NOTE:** The **Root Volume** is the primary storage disk that contains the operating system (OS) and boot files used to boot the EC2 instance.

**NOTE:** A **Non-Root Volume** (often called a **Data Volume**) is any additional storage drive you attach to your EC2 instance after (or during) its launch.

## Temporary Storage

**NOTE:** Certain Amazon EC2 instance types also allow you to mount instance store volumes—storage local to the physical host that runs your Amazon EC2 instance. This storage can have a high read/write performance because it is physically
attached to the host machine that runs the instance. However, because this storage is local to the host machine, your data persists only while the instance is running on that host machine.

## Software Images

**NOTE:** An Amazon Machine Image (AMI) provides the template for the OS and applications on the root volume
of your instance. AMIs also provide a block device mapping that can specify additional volumes to mount when an instance launches

**NOTE:** You can create your own AMIs from an instance that you have previously customized, which is a great way to accelerate boot time for workloads that require specific software configuration.

**NOTE:** AMIs are region-specific but can be shared across regions or even accounts. To control which AWS accounts can
use your AMIs, define the launch permissions for your AMI.

## Network Interfaces

**NOTE:** Virtual network interfaces called elastic network interfaces (ENIs) provide networking for your EC2 instances. Each instance is assigned a primary network interface associated with a subnet of a VPC and receives a private IP
address to communicate with other resources.

**NOTE:** To give your instance a public IP, you may allocate an Elastic IP to associate with the machine. Elastic IPs may be detached from one instance and attached to another at any time. While IPv4 addresses have a small monthly cost, IPv6 addresses are free.

**NOTE:** Keep in mind that merely having a public IP does not make your instance publicly accessible; clients or users still need a path to the machine. This can be achieved, among other ways, by placing the instance in a public subnet, or routing traffic to it with a public load balancer. In addition, the instance’s security groups must allow traffic to reach the instance.

**NOTE:** Security groups protect traffic entering and exiting an instance’s network interface. Security groups act as a stateful firewall. To make network connections to your instance, you must set security group rules to allow the connection.

**NOTE:** You can attach additional network interfaces to an EC2 instance, each with its own MAC addresses and IP address associations. Unlike the primary ENI, you can detach a secondary network interface from one instance and later attach it to another.

## Amazon EC2 Key Pairs

**NOTE:** Default user:
- Linux: ec2-user
- Windows: Administrator (Locale spicific)
- Ubuntu: ubuntu

**NOTE:**  To connect to an instance via SSH, you must configure SSH key and assosiate it with default login user. 

```
chmod 400 /path/to/key
ssh -i /path/to/key ec2-user@<your instance IP>
```

## Session Manager

**NOTE:**  By attaching an IAM role with the AmazonSSMManagedInstanceCore policy to your
instance and making sure the Session Manager agent is running (a default installation on Amazon Linux), you can enable Session Manager and get a shell right in your browser.

## EC2 Instance Connect

**NOTE:** As with Session Manager, Instance Connect functionality is enabled by attaching the appropriate IAM role to your instance via its instance profile.

## Instance Life Cycle

**NOTE:** An Amazon EC2 instance has three primary states: running, stopped, and terminated. Additionally, there are intermediate states of pending, stopping, and shutting down.

**NOTE:** Lifecycle
![[Pasted image 20260716224341.png]]

**NOTE:** Typically, each time an instance is started, it is launched on a different physical host machine than before.

## Customizing Software with User Data

**NOTE:** For Linux instances, user data can be a shell script or a cloud-init directive. On Windows instances (depending on the version of Windows Server), either EC2Config or EC2Launch will process the user data. 

## Discovering Instance Metadata

**NOTE:** With the instance metadata service (IMDS), code running on an Amazon EC2 instance can discover properties about that instance. The IMDS exposes a special IP address, 169.254.169.254, which you can query using HTTP to perform lookups.

**NOTE:** Anyone who can access an instance can view its metadata and user data.
Do not store sensitive data, such as passwords or access keys, in user data.

## Obtaining AWS Credentials

**NOTE:** Instance profiles are how you assign an IAM role (with its associated policies) to an instance. When you see “instance profile” as a configurable field on EC2 instances in the console or other parts of AWS, you can think “attached IAM role.

## Monitoring Instances

**NOTE:** For each of your instances, the EC2 service automatically collects metrics related to CPU utilization, disk reads and writes, network utilization, and instance reachability, and makes them available in Amazon CloudWatch.

## Customizing the Network

**NOTE:** For each VPC, you have full control over whether the VPC is connected to the Internet, to private on-premises networks, or to other Amazon VPCs. Until you explicitly create these connections, instances in your VPC are able to communicate with other instances in the same VPC.
![[Pasted image 20260717005501.png]]

## IPs for instance

- **PrivateIP** - assigned for each instance in VPC, IP is taken from VPC defined IP range block e.g 10.0.0.0/16 
- **PublicIP** - is configured when launching instance, or if subnet is configured to assign public IP to each instance You cannot manually associate or disassociate public IP addresses from an instance. All public IPv4 addresses come with a small hourly charge.
- **ElasticIP** - similar to public ones, manually can be associated/deasasociated between instances
- IPV6

## Subnets

**NOTE:** Within an Amazon VPC, you define one or more subnets. A subnet is associated with a specific availability zone within the region containing the VPC. Each subnet has its own block of private IP addresses defined using CIDR notation. This block is a subset of the overall IP address range assigned to the VPC and does not overlap with any other subnet in the same VPC.

**NOTE:** the VPC reserves the first four IP addresses and the
last IP address in the range, leaving 251 IP addresses in the subnet.

**NOTE:** Usually at least 2 subnets are created public - with access to internet and private - without

## Route Tables

**NOTE:** A route table rules traffic **from** the subnet out to its destination.

**NOTE:** Each route table includes a rule called the local route. This route is what allows traffic from instances in one subnet within the VPC to communicate with instances in other subnets within the same VPC.

**NOTE:** Unless explicitly associated with a specific route table, subnets associate with a default route table called the main route table. By default, the main route table includes only the local route.

**NOTE:** When you launch an EC2 instance into a public subnet, be sure to assign a public IP address to the instance, whether explicitly upon instance creation, implicitly by the default subnet configuration, or by giving it an Elastic IP. Even though a public subnet will have a route to an Internet gateway, instances are not able to communicate with the Internet without a public IP address.

## Security Groups
![[Pasted image 20260717175135.png]]

**NOTE:** Security groups only support rules to allow traffic. Therefore, if you assign multiple security groups to your instance, that instance receives the cumulative network traffic permissions allowed by all the security group rules.

## Network Access Control Lists (NACL)

**NOTE:** NACL allow an administrator to control traffic that enters and leaves a subnet.

**NOTE:** Whereas security group rules provide only the capability to allow traffic, network ACL rules support the ability to allow or deny specific types of traffic.

**NOTE:** To allow for a particular traffic flow, both inbound and outbound rules must allow it for that network ACL
![[Pasted image 20260718003640.png]]

## Network Address Translation

**NOTE:** Network address translation (NAT) allows for instances in a private subnet to make outbound requests to the Internet without exposing those instances to inbound connections from Internet users, supplying an outgoing public IP to instances that do not have their own. Multiple instances often use the same NAT, which either provides the same shared IP to all outgoing traffic or assigns an IP from a dedicated pool. To achieve this, you can run NAT software on an EC2 instance or use AWS’s NAT Gateway service.

## Monitoring Amazon VPC Network Traffic

**NOTE:** You can monitor traffic within your Amazon VPC by enabling Amazon VPC Flow Logs, which may be published to Amazon CloudWatch Logs or stored in Amazon S3. You can enable VPC Flow Logs on a particular VPC, on a subnet, or on a specific elastic network interface, such as one associated with an Amazon EC2 instance.

## Managing Your Resources
![[Pasted image 20260718005643.png]]