
## CLI Profile

```
aws configure --profile developer
```

**NOTE:** From then on, you may append --profile developer to any AWS CLI command to run it as this alternate user.

**NOTE:** The SDK and CLI both automatically check several locations for these values when they are not explicitly provided in the code. These locations include environment variables, programming language–specific parameter stores, and local files

## Working with Regions
![[Pasted image 20260714194524.png]]

## Identity and Access Management

**NOTE:** To manage authentication and authorization, IAM provides users, groups, and roles. IAM authorizes each request to AWS by evaluating the policies associated with the identity and resources affected by the request.

## Users

**NOTE:** Users is basically long term security credentials to access AWS account.

**NOTE:** usernames only need to be unique within your account

**NOTE:** For programmatic access to AWS, we create an access key for the IAM user. Each user may have up to two active access keys at any time. These access keys are long-term credentials and remain valid until you explicitly revoke
them. 

**NOTE:** An AWS access key is composed of two
distinct parts:
- Access Key ID
- Secret access key

## Groups 

**NOTE:** In the case that multiple permissions policies apply to the same API action, any policy that has the effect deny will take precedence over any policy that has the effect allow. 

## Roles

**NOTE:** Role is similar to user but can't be used to login, instead uesr can assume role for session, or role can be assigned to aws resource.

**NOTE:** To control access to an IAM role, define a trust policy that specifies which principals can assume a role. Potential principals include AWS Cloud services and also users who have authenticated using identity federation. Principals
could also include users who authenticate with web identity federation, IAM users, IAM groups, or IAM roles from other accounts.

**NOTE:** When a principal assumes a role, AWS provides new short-term security credentials that are valid for a time-limited session through the AWS Security Token (AWS STS) service. These credentials are composed of an access key ID, secret access key, and, additionally, a session token with a known expiration date.

**NOTE:** While a user assumes a role, their permissions are limited to what the role can do; any permissions the user has directly attached or inherited from a group are not evaluated. 

![[Pasted image 20260716001635.png]]

## Policy

**NOTE:** Any action is implicitly denied unless there is a policy that explicitly allows it. If there is a policy that explicitly denies an action, that policy always takes precedence.

- AWS managed policies - prebuilt by AWS
- Custom policies - user created

**NOTE:** As shown in the earlier examples, an IAM policy is a JSON-style document composed of one or more statements. Each statement has an effect that will either allow or deny access to specific actions on AWS resources. A deny statement takes precedence over any allow statements. Use an Amazon Resource Name (ARN) to specify precisely the resource or resources to which a custom policy applies.

```
{
	"Version": "2012-10-17" ,
	"Statement": [{
		"Sid": "AllowDeleteForSpecifiedLexicon"
		"Effect": "Allow",
		"Action": ["polly:DeleteLexicon"],
		"Resource": "arn:aws:polly:us-west- 2:123456789012:lexicon/awsLexicon"
	},]
}
```

**NOTE:** To allow slightly broader permissions in a similar policy, use wildcards in the ARN. 

```
{
"Version": "2012-10-17",
"Statement": [{
	"Sid": "AllowDeleteSpecifiedRegion",
	"Effect": "Allow",
	"Action": ["polly:DeleteLexicon"],
	"Resource": "arn:aws:polly:us-east 2:123456789012:lexicon/*"
	}]
}
```

![[Pasted image 20260716002806.png]]

```
arn:partition:service:region:account-id:resource

arn:partition:service:region:account id:resourcetype/resource 

arn:partition:service:region:account-id:resourcetype:resource


<!-- Amazon Polly Lexicon -->
arn:aws:polly:us-west-2:123456789012:lexicon/awsLexicon

<!-- IAM user name -->
arn:aws:iam::123456789012:user/carla

<!-- Object in an Amazon S3 bucket -->
arn:aws:s3:::bucket-name/exampleobject.png

```

**NOTE:** A single policy document can have multiple statements. Additional components to a statement may include an optional statement ID (Sid) and condition blocks to restrict when the policy applies. If the policy is attached to a resource rather than to an IAM identity, then the policy must also specify a principal (to whom the policy applies)

![[Pasted image 20260716003023.png]]