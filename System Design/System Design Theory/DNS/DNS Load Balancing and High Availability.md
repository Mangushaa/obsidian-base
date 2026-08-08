 DNS load balancing and high availability techniques, such as round-robin DNS, geographically distributed servers, anycast routing, and Content Delivery Networks (CDNs), help distribute the load among multiple servers, reduce latency for end-users, and maintain uninterrupted service, even in the face of server failures or network outages. This chapter provides an overview of these techniques, explaining how they contribute to a more efficient and resilient DNS infrastructure.

- Round robin - basically same as default lb, DNS records holds few IPs for same domain name, and return them one by one. Do not take into account capacity, geographical position, etc.

- Geographically distributed DNS - dns deployed in diffirrent regions to increase dns resolution

- Anycast routing - multiple sevrers share same IP request if routed based on some metric (closest, least latancy, etc).

- CDN - kind of region local caches, when servers can be only in few regions, CDN are way more in more regions, so diffirent static data can be shared to client way faster.
