The passage highlights a fundamental limitation of standard Kubernetes **Service** objects: they operate at **Layer 4 (Transport Layer)** of the OSI model, meaning they only route traffic based on IP addresses and TCP/UDP port numbers. They cannot read HTTP headers, domain names, or URL paths.

Because Layer 4 operates blindly to application data, exposing multiple HTTP applications using standard Kubernetes Services forces inefficient trade-offs:

- **`type: NodePort` limitation:** Each service opens a unique, high-numbered port (30000–32767) across all cluster nodes. Users must append awkward port numbers to access different apps (e.g., `example.com:30080` vs. `example.com:30081`).
    
- **`type: LoadBalancer` limitation:** Kubernetes requests a brand-new cloud load balancer and dedicated public IP address for _every_ service. Provisioning 10 microservices results in 10 separate cloud load balancers, significantly increasing infrastructure costs and consuming cloud quota limits.


When solving a similar problem in non-Kubernetes situations, users often turn to the idea of “virtual hosting.” This is a mechanism to host many HTTP sites on a single IP address. Typically, the user uses a load balancer or reverse proxy to accept incoming connections on HTTP (80) and HTTPS (443) ports. That program then parses the HTTP connection and, based on the Host header and the URL path that is requested, proxies the HTTP call to some other program. In this way, that load balancer or reverse proxy directs traffic for decoding and directing incoming connections to the right “upstream” server. Kubernetes calls its HTTP-based load-balancing system Ingress. Ingress is a Kubernetes-native way to implement the “virtual hosting” pattern.

![[Pasted image 20260924020335.png]]

The Ingress controller is a software system made up of two parts. The first is the Ingress proxy, which is exposed outside the cluster using a service of type: LoadBalancer. This proxy sends requests to “upstream” servers. The other component is the Ingress reconciler, or operator. The Ingress operator is responsible for reading and monitoring Ingress objects in the Kubernetes API and reconfiguring the Ingress proxy to route traffic as specified in the Ingress resource. There are many different Ingress implementations. In some, these two components are combined in a single container; in others, they are distinct components that are deployed separately in the Kubernetes cluster.

# Ingress Spec Versus Ingress Controllers

While conceptually simple, at an implementation level, Ingress is very different from pretty much every other regular resource object in Kubernetes. Specifically, it is split into a common resource specification and a controller implementation. There is no “standard” Ingress controller that is built into Kubernetes, so the user must install one of many optional implementations.

Users can create and modify Ingress objects just like every other object. But, by default, there is no code running to actually act on those objects. It is up to the users (or the distribution they are using) to install and manage an outside controller. In this way, the controller is pluggable.


### My Ingress Understandnig

Ingress is routing request to certain pod based on http rules (path, params, etc).
Ingress controller better to be deployed on each worker node. When external LB routes request to node it handled by ingress which decies to what pod it should go. If pod not present on same node as ingress using internal cluster network it will sent it to correct node. 


When working in AWS for example ingress objects basically just configures ALB through AWS API.


# Routing rules


## Using Hostnames

request. The most common example of this is to have the Ingress system look at the HTTP host header (which is set to the DNS domain in the original URL) and direct traffic based on that header.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: host-ingress
spec:
  defaultBackend:
    service:
      name: be-default
      port:
        number: 8080
  rules:
  - host: alpaca.example.com
    http:
      paths:
      - pathType: Prefix
        path: /
        backend:
          service:
            name: alpaca
            port:
              number: 8080
```

There are a couple of confusing things here. First, there is a reference to the default http-backend. This is a convention that only some Ingress controllers use to handle requests that aren’t handled in any other way. These controllers send those requests to a service called default-http-backend in the kube-system namespace.

## Using Paths

In this example, we direct everything coming into http://bandicoot.example.com to the bandicoot service, but we also send http:// bandicoot.example.com/a to the alpaca service. This type of scenario can be used to host multiple services on different paths of a single domain

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: path-ingress
spec:
  rules:
  - host: bandicoot.example.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: bandicoot
            port:
              number: 8080
      - pathType: Prefix
        path: "/a/"
        backend:
          service:
            name: alpaca
            port:
              number: 8080
```

As requests get proxied to the upstream service, the path remains unmodified. That means a request to bandicoot.example.com/a/ shows up to the upstream server that is configured for that request hostname and path. The upstream service needs to be ready to serve traffic on that subpath.

# Path Rewriting

Some Ingress controller implementations support, optionally, doing path rewriting. This can be used to modify the path in the HTTP request as it gets proxied.

## Serving TLS

When serving websites, it is becoming increasingly necessary to do so securely using TLS and HTTPS. Ingress supports this (as do most Ingress controllers).

First, users need to specify a Secret with their TLS certificate and keys. You can also create a Secret imperatively with kubectl create secret tls --cert --key .