
Load balancer can have fail as well as any server, and since it's entry point to our application and basically can be bottleneck in our design it should be resistend to failes as well.

Strategies to prevent fail:
- **Active-Passive configuration** - we have 2 load balancers, one is active that is serving all the traffic and one is passive, it will be used in case current active one will faile.
- **Active-Active configuration** - all load balancers is active and serving traffic for this sone more high level LB is needed to distribute traffic between active LBs. It can be DNS f.e.
