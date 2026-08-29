![[Pasted image 20260808174536.png]]

![[Pasted image 20260808174741.png]]
![[Pasted image 20260808174823.png]]


## LB

- ALB - operates at L7 (HTTP, HTTPS). Can route traffic based on headers, url patterns, etc. By filtering traffic based on URL, one ALB can serve as the entry point for multiple backend applications.
- NLB - route tcp traffic to targets (ec2, containers, ip adresses) based on IP protocol data.
  
![[Pasted image 20260808180919.png]]
![[Pasted image 20260808180944.png]]


## Deploying and Maintaining Applications

## AWS Elastic Beanstalk
![[Pasted image 20260809215249.png]]
![[Pasted image 20260809220348.png]]
![[Pasted image 20260809220358.png]]


DOUBLE CHECK!!!! 

## Deployment Strategies


## In-Place Deployments

Stop all instances, deregister from LB, deploy new versions.

## Rolling Deployments

Update instances by batches, without full service downtime.

## Blue/Green Deployment

Maintaining 2 complete copies of env. One is active, second is used for update. After update deployed, trafic flow is changed to updated env. 

## Immutable Deployment 

Similar to Blue/Green but each time new cluster is created, and prevs are removed.

![[Pasted image 20260809222709.png]]

## Monitoring and Troubleshooting