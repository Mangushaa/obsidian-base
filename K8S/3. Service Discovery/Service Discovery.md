
Real service discovery in Kubernetes starts with a Service object. A Service object is a way to create a named label selector. 

### Service DNS

Because the cluster IP is virtual, it is stable, and it is appropriate to give it a DNS address. All of the issues around clients caching DNS results no longer apply. Within a namespace, it is as easy as just using the service name to connect to one of the Pods identified by a service.

Kubernetes provides a DNS service exposed to Pods running in the cluster. This Kubernetes DNS service was installed as a system component when the cluster was first created. The DNS service is, itself, managed by Kubernetes and is a great example of Kubernetes building on Kubernetes. The Kubernetes DNS service provides DNS names for cluster IPs.

### Looking Beyond the Cluster

The most portable way to do this is to use a feature called NodePorts, which enhance a service even further. In addition to a cluster IP, the system picks a port (or the user can specify one), and every node in the cluster then forwards traffic to that port to the service

With this feature, if you can reach any node in the cluster, you can contact a service. You can use the NodePort without knowing where any of the Pods for that service are running. This can be integrated with hardware or software load balancers to expose the service further.

### Load Balancer Integration

If you have a cluster that is configured to integrate with external load balancers, you can use the LoadBalancer type. This builds on the NodePort type by additionally configuring the cloud to create a new load balancer and direct it at nodes in your cluster.

In Kubernetes, a **NodePort** is a type of Service that exposes your application to external traffic outside of the cluster. It works by opening a specific, static port on the IP address of _every_ worker node in the Kubernetes cluster.

Any external traffic sent to `NodeIP:NodePort` is automatically routed to the underlying pods matching the Service.

### How Traffic Flows

When you create a NodePort service, Kubernetes actually provisions a standard **ClusterIP** (an internal IP for the cluster) first, and then routes the NodePort traffic to that ClusterIP.

The flow looks like this:

1. **External Client** sends a request to `<Any-Node-IP>:<NodePort>`.
2. **kube-proxy** on that node intercepts the traffic.
3. The traffic is forwarded to the **Service** (via its internal ClusterIP).
4. The Service load-balances the traffic to an available, healthy **Pod**.

_Note: You can hit the IP address of any node in the cluster on that specific port, even if that specific node doesn't currently host the pod. Kubernetes handles the internal routing._

**NOTE:** Kubernetes Services build on top of each other. A `NodePort` Service automatically includes a `ClusterIP` as part of its internal machinery.


### Load Balancer Integration 

Here is the exact flow of how a standard Kubernetes `LoadBalancer` service handles traffic:

1. **External Traffic** hits the external Cloud Load Balancer.
2. **The Load Balancer** directs that traffic to the **Nodes** in your cluster (specifically targeting a designated `NodePort` that is opened on every worker node).
3. **The Node** receives the traffic. The cluster's internal networking (usually managed by `kube-proxy`) then takes over and forwards the request to the actual **Pod**.

Because it builds on the `NodePort` type, the external load balancer doesn't actually know where your pods are. It only knows where your nodes are. Even if a specific node doesn't have the required pod running on it, that node will still accept the traffic from the load balancer and internally route it across the cluster to a node that _does_ have the pod.


# Endpoints 




The Service IP and the Pod IPs are completely different, and you can absolutely bypass the Service to talk to a specific Pod directly if you know its IP.

Here is how the two concepts differ in practice:

**1. The IP Difference**

They are completely different addresses, usually drawn from entirely different subnets in your cluster configuration.

- **Service IP (ClusterIP):** This is a _virtual_ IP address. It is perfectly stable, never changes as long as the Service exists, and is intercepted by cluster networking rules (`kube-proxy`) to perform load balancing. Think of it as a company's main 1-800 phone number.
- **Pod IPs (Endpoint IPs):** These are the _actual_ IP addresses attached to the running containers by the cluster's network plugin (CNI). They are highly volatile—if a Pod crashes and restarts, it gets a completely new IP. Think of these as the direct extension lines to individual employees' desks.
    
**2. Reaching Pods Separately**

Because of the Kubernetes networking model, every Pod in the cluster can communicate directly with every other Pod.

- If you send a request to the **Service IP**, the cluster intercepts it and load-balances it across the available Endpoints.
- If you send a request directly to a **Pod IP** (found via the Endpoints object), the traffic goes straight to that specific Pod, completely bypassing the Service and its load balancing.

While you _can_ reach Pods directly, you generally shouldn't hardcode Pod IPs in your applications because those IPs disappear forever the moment a Pod is recreated.

# kube-proxy and Cluster IPs

the kube-proxy watches for new services in the cluster via the API server. It then programs a set of iptables rules in the kernel of that host to rewrite the destinations of packets so they are directed at one of the endpoints for that service. If the set of endpoints for a service changes (due to Pods coming and going or due to a failed readiness check), the set of iptables rules is rewritten. The cluster IP itself is usually assigned by the API server as the service is created. However, when creating the service, the user can specify a specific cluster IP. Once set, the cluster IP cannot be modified without deleting and re-creating the Service object

**Yes.** A Pod can talk directly to another Pod using its Pod IP address, even if no Service object exists for either Deployment.

`iptables` handles the **translation** (Service IP $\rightarrow$ Pod IP), while the CNI network handles the **transport** (getting the packet to the correct physical node).
# Connecting to Resources Outside of a Cluster

When you are connecting Kubernetes to legacy resources outside of the cluster, you can use selector-less services to declare a Kubernetes service with a manually assigned IP address that is outside of the cluster. That way, Kubernetes service discovery via DNS works as expected, but the network traffic itself flows to an external resource. To create a selector-less service, you remove the spec.selector field from your resource, while leaving the metadata and the ports sections unchanged. Because your service has no selector, no endpoints are automatically added to the service. This means that you must add them manually. Typically the endpoint that you will add will be a fixed IP address (e.g., the IP address of your database server) so you only need to add it once. But if the IP address that backs the service ever changes, you will need to update the corresponding endpoint resource.

# Connecting External Resources to Services Inside a Cluster

Connecting external resources to Kubernetes services is somewhat trickier. If your cloud provider supports it, the easiest thing to do is to create an “internal” load balancer, as described above, that lives in your virtual private network and can deliver traffic from a fixed IP address into the cluster. You can then use traditional DNS to make this IP address available to the external resource. If an internal load balancer isn’t available, you can use a NodePort service to expose the service on the IP addresses of the nodes in the cluster. You can then either program a physical load balancer to serve traffic to those nodes, or use DNS-based load-balancing to spread traffic between the nodes

If neither of those solutions works for your use case, more complex options include running the full kube-proxy on an external resource and programming that machine to use the DNS server in the Kubernetes cluster. Such a setup is significantly more
difficult to get right and should really only be used in on-premise environments. There are also a variety of open source projects (for example, HashiCorp’s Consul) that can be used to manage connectivity between in-cluster and out-of-cluster resources. Such options require significant knowledge of both networking and Kubernetes to get right and should really be considered a last resort