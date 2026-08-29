
# AWS CodePipeline

**Pipeline** - is overall workflow that defines what will be done during pipeline run.

**NOTE:** Pipeline name can't be changed.

***

**Revision** - is work item that passes through a pipeline???

***

**Stage** - is a group of actions, each stage have a unique name.  If any action in stage fail then all satge considered failed

*** 
**Action** - defines work to perform on the revision. Actions can be configured to run in seq or parallel. Failed action can be retried.

**NOTE**: Apipeline must have 2 or more stages. Only first stage may include source actions. 

**NOTE**: Every action in one stage must have unique name.

***

## Action Types

**Source** - action defines the location where you store and update source files. Modifications to files in a source repository or archive trigger deployments to a pipeline

Existed sources:
- Amazon S3
- AWS CodeCommit
- GitHub
- Amazon ECR (Elastic Container Registry)
- GitLab
- Bitbucket

**NOTE:** A single pipeline can contain multiple source actions. If a change is detected in one of the sources, all source actions will be invoked.

***

**Build** - define tasks such as compiling source code, running
unit tests, and performing other tasks that produce output artifacts for later use in your pipeline. For build actions,
CodePipeline supports AWS CodeBuild and Jenkins.

***

**Test**  - to run various tests against source and compiled
code, such as lint or syntax tests on source code, and unit tests on compiled, running applications. CodePipeline support for test integrations includes:
- AWS CodeBuild
- BlazeMeter
- Ghost Inspector
- StormRunner Load
- Runscope

***
**Deploy** - responsible for taking compiled or prepared assets and installing them on instances, on-premises servers, serverless functions, or deploying and updating infrastructure using CloudFormation templates. The following services are supported as deploy actions:

- AWS CloudFormation
- AWS CodeDeploy
- Amazon Elastic Container Service
- AWS Elastic Beanstalk

***

**Approval** - An approval action is a manual gate that controls whether a revision can proceed to the next stage in a pipeline.
You must approve actions manually within seven days; otherwise, CodePipeline rejects the code. 
You can retire the action, which initiates the approval process again. 

Approval actions provide several options that you can use to provide additional information about what you choose to approve:
- Publish Approval Notifications Amazon Simple Notification
  Service (SNS) sends notices to one or more targets that approval is pending.
- Specify a Universal Resource Locator (URL) for Review You
  can include a URL in the approval action notification—for example, to review a website published to a fleet of test instances.
- Enter Comments for Approvers You can add additional comments in the notifications for the reviewer’s reference.

***
**Invoke** - allow you to execute external actions via AWS Lambda or Step Functions, which allows arbitrary code to be run as part of the pipeline execution.

- Backing up data volumes, Amazon S3 buckets, or databases
- Interacting with third-party products, such as posting messages to Slack channels
- Running through test interactions with deployed web applications, such as executing a test transaction on a shopping site
- Updating IAM roles to allow permissions to newly created resources

***

**Artifact** - Artifacts are kept in an S3 bucket associated with the pipeline.

**NOTE:** Multiple actions in a single pipeline cannot output artifacts with the same name.

***
## Transition

Transitions connect stages in a pipeline and define which stages should transition to one another. When all actions in a stage complete successfully, the revision passes to the next stage(s) in the pipeline.

You can pause pipeline execution by manually disabling the transition between two stages. This causes pipeline revisions to queue until either 30 days elapse and the revisions expire, or you reenable the transition, at which point queued revisions execute sequentially.


# Use AWS CodeCommit as a Source Repository


## Managing Access 

- Https - same as in github, IAM user username and password is used 
- SSH - Self-generated SSH keys may be uploaded and
  attached to the user by an IAM administrator or by users themselves who have the IAMUserSSHKeys managed policy. After uploading a key to an IAM User via the IAM console, AWS assigns it an SSH Key ID, this key is used in .ssh/config as User. 
- Credential Helper - AWS CLI feature that lets terminal users authenticate to AWS services like CodeCommit with an IAM user

## Repository

#### Repository Notifications

CodeCommit can be configured to issue CloudWatch events for many types of updates, including pull request creation or closure, comments on code changes, or commits to a branch. This allows for automation opportunities, such as kicking off a Lambda to notify others when a pull request is created.

#### Repository Triggers

Similar to notifications, repository triggers can invoke SNS or Lambda during these events:
- Push to Existing Branch
- Create a Branch or Tag
- Delete a Branch or Tag

# Use AWS CodeBuild to Create Build Artifacts


## Build Projects

Build projects define all aspects of a build. This includes the environment in which to perform builds (such as an Ubuntu or Amazon Linux container), any tools to include in the environment, the actual build steps to perform, and outputs to save.


## To build project

1. Select source provider (CodeCommit, S3, Github, Bitbucket, Gitlab)
2. Select build environment - CodeBuild provides preconfigured build environments for some operating systems, runtimes, and runtime versions, such as Ubuntu with Java 9.
3. Configure build specification - This can be done by inserting build commands in the console or by specifying a buildspec.yml file in your source code. After you set the build project properties, you can select the compute type
   (memory and vCPU settings), any environment variables to pass to the build container, and tags to apply to the project.

## Build Specification (buildspec.yml)

The buildspec.yml file determines exactly what the CodeBuild project does. Written in YAML, this file controls the environment and actions of a build process using the following format:

```
version: 0.2
env:
 variables:
  key: "value"
 parameter-store:
  key: "value"
 secrets-manager:
  key: "value"
phases:
 install:
  commands:
   - command
 pre_build:
  commands:
   - command
 build:
  commands:
   - command
 post_build:
  commands:
   - command
artifacts:
 files:
  - location
 discard-paths: yes
 base-directory: location
cache:
 paths:
  - path
```

#### Environment Variables (env)
You can add optional environment variables to build jobs. Any key-value pairs that you provide in the variables section are available as environment variables in plaintext.

**NOTE:** Any environment variables that you define here will overwrite those you define elsewhere in the build project, such as those in the container itself or by Docker.

The **parameter-store** mapping specifies parameters to query in AWS Systems Manager Parameter Store, while the **secrets-manager** key allows you to load values from Secrets Manager.

```
env:
 secrets-manager:
  DATABASE_USER: MyDatabaseSecrets:dbuser
  DATABASE_PASS: MyDatabaseSecrets:dbpassword

MyDatabaseSecrets - secret name
dbuser/dbpassword - secret values (attributes)
```

#### Phases

- install - Commands to execute during installation of the build environment
- pre_build - Commands to be run before the build begins.
- build - Commands to be run during the build.
- post_build - Commands to be run after the build completes.

**NOTE:** If a command fails in any stage, subsequent stages will not run.
#### Artifacts

The artifacts mapping specifies where CodeBuild will place output artifacts, if any. This is required only if your build job produces actual outputs, such as a JAR file resulting from Java code complication. In contrast, unit tests would not produce output artifacts for later use in a pipeline. The files list specifies individual files in the build environment that will act as output artifacts. You can specify individual files, directories, or recursive directories.

#### Cache

If you configure caching for the build project, the cache mapping specifies which files to upload to S3 for use in subsequent builds.


## Build Environments

A build environment is a Docker image with a preconfigured operating system, programming language runtime, and any other tools that CodeBuild uses to perform build tasks and communicate with the service, along with other metadata for the environment, such as the compute settings. CodeBuild maintains its own repository of preconfigured build environments. If these environments do not meet your requirements, you can use public Docker Hub images. Alternatively, you can use container images in Amazon Elastic
Container Registry (Amazon ECR).

CodeBuild provides several environment variables by default, such as: AWS_REGION, CODEBUILD_BUILD_ID, and HOME.

**NOTE:** When you create your own environment variables, CodeBuild reserves the CODEBUILD_ prefix.


## Running Builds

When you run builds manually in the CodeBuild console, AWS CLI, or AWS SDK, you have the option to change several properties before you run a build job:
- Source version (Amazon S3)
- Source branch, version, and Git clone depth (AWS CodeCommit, GitHub, and Bitbucket)
- Output artifact type, name, or location
- Build timeout
- Environment variables

# Use AWS CodeDeploy to Deploy Applications

## AWS CodeDeploy Concepts

#### Revision

A revision is an artifact that contains both application files to deploy and an AppSpec configuration file. The AppSpec file specifies what steps CodeDeploy will follow when it performs deployments of an individual revision.

A revision must contain any source files and scripts to execute on the target instance inside a root directory. Within this root directory, the appspec.yml file must exist at the topmost level

When you deploy to Lambda, a revision contains only the AppSpec file. It contains information about the functions to deploy, as well as the steps to validate that the deployment was successful.

**NOTE:**. Lambda deployments support only S3 buckets as a source repository.

#### Deployments

A deployment is the process of copying content and executing scripts on instances in your deployment group. To accomplish this, CodeDeploy performs the tasks outlined in the AppSpec configuration file. There are two types of deployments supported by AWS CodeDeploy: in-place and blue/green.

- In-Place Deployments - any currently running code is stopped, the new application revision is deployed, and then the application is restarted. 
- Blue/green deployments publish an entirely new instance of a code revision, after which traffic shifting routes requests to the new versions according to the deployment configuration that you define.

**NOTE:** On-premises instances do not support blue/green deployments.

#### Rollbacks

CodeDeploy achieves automatic rollbacks by redeploying the last working revision to any instances in the deployment group (this will generate a new deployment ID). If you do not configure automatic rollbacks for the application, you can perform a manual rollback by redeploying a previous revision as a new deployment. This will accomplish the same result as an automatic rollback.