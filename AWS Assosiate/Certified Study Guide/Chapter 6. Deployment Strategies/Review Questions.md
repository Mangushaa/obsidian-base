![[Pasted image 20260808174536.png]]

![[Pasted image 20260808174741.png]]
![[Pasted image 20260808174823.png]]


## LB

- ALB - operates at L7 (HTTP, HTTPS). Can route traffic based on headers, url patterns, etc. By filtering traffic based on URL, one ALB can serve as the entry point for multiple backend applications.
- NLB - route tcp traffic to targets (ec2, containers, ip adresses) based on IP protocol data.
  
![[Pasted image 20260808180919.png]]
![[Pasted image 20260808180944.png]]


## Deploying and Maintaining Applications