
Perhaps second only to containers, the term service mesh has become synonymous with cloud native development.

There are three general capabilities provided by most service mesh implementations: network encryption and authorization, traffic shaping, and observability.

# Encryption and Authentication with Mutal TLS

Encryption of network traffic between Pods is a key component to security in a microservice architecture. The service mesh adds a sidecar container to every Pod, which transparently intercepts all network communication.

# Traffic Shaping

A common model used in the software industry is “dog-fooding” your own software, meaning that a new version of the software is tried internally before anywhere else. In a dog-fooding model, you may run version Y of your service for a day to a week (or longer) for a subset of users before you roll it out broadly to your full set of users.

Such experiments require the ability to do traffic shaping, or routing of requests to different service implementations based on the characteristics of the request.

Service meshes change this by building experimentation into the mesh itself. Instead of writing code to implement your experiment, or deploying an entirely new copy of your application on new infrastructure, you declaratively define the parameters of the experiment (10% of traffic to version Y, 90% of traffic to version X), and the service mesh implements it for you. Although, as a developer, you are involved in defining the experiment, the implementation is transparent and automatic, meaning that many more experiments will be run with a corresponding increase in reliability, agility, and insight.

# Introspection

Automatic introspection is another important capability provided by a service mesh. Because it is involved in all communication between Pods, the service mesh knows where requests were routed, and it can keep track of the information required to put a complete request trace back together.

# Do You Really Need a Service Mesh?

The service mesh is deeply integra ted into the core communication of your microservices. When a service mesh fails, your entire application stops working. This additional operational overhead means that for many small applications, a service mesh is an unnecessary complexity.

If you are using Kubernetes provided as a managed service that also provides a service mesh, it is much easier to use that mesh, knowing that the cloud provider will provide the support, debugging, and seamless new releases for the service mesh.

# Introspecting a Service Mesh Implementation

Because the sidecar sits in the same network stack as the application Pod, it can use tools like iptables or, more recently, eBPF to introspect and intercept network traffic coming from your application container and process it into the service mesh.

# Service Mesh Landscape

The most popular service mesh is likely the Istio project. In addition to Istio, there are many other open source meshes, including Linkerd, Consul Connect, Open Service Mesh, and others. 

# Summary 

Service meshes contain powerful functionality that adds security and flexibility to your application. At the same time, a service mesh adds complexity to the operations of your cluster and is another potential source of outages for your application. Carefully consider the pros and cons of adding service meshes to your infrastructure. If you have the choice, use a managed service mesh where someone else takes responsibility for the operational details while enabling your applications access to service mesh capabilities.