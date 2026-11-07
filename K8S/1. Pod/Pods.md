
# Accessing Pod

kubetl logs 'podname -> prints pod logs
kubectl exec podname -- date -> executes command agains pod container

Note: In both cases first container in specs are pickedup, if other wanted should be specified explicitly with --container param
# Health checks

### Liveness Probe

Confirm that it is actually healthy and shouldn’t be restarted. Liveness probes are defined per container, which means each container inside a Pod is health checked separately.

![[Pasted image 20260920204803.png]]

### Readiness Probe

Kubernetes makes a distinction between liveness and readiness. Liveness determines if an application is running properly. Containers that fail liveness checks are restarted. Readiness describes when a container is ready to serve user requests. Containers that fail readiness checks are removed from service load balancers. Readiness probes are configured similarly to liveness probes

### Startup Probe

Startup probes have recently been introduced to Kubernetes as an alternative way of managing slow-starting containers. When a Pod is started, the startup probe is run before any other probing of the Pod is started. The startup probe proceeds until it either times out (in which case the Pod is restarted) or it succeeds, at which time the liveness probe takes over. Startup probes enable you to poll slowly for a slow-starting container while also enabling a responsive liveness check once the slow-starting container has initialized


# Resource Management

To request that the kuard container land on a machine with half a CPU free and get 128 MB of memory allocated to it, we define the Pod

![[Pasted image 20260920211457.png]]

Requests are used when scheduling Pods to nodes. The Kubernetes scheduler will ensure that the sum of all requests of all Pods on a node does not exceed the capacity of the node. Therefore, a Pod is guaranteed to have at least the requested resources when running on the node. Importantly, “request” specifies a minimum. It does not specify a maximum cap on the resources a Pod may use.

Imagine a container whose code attempts to use all available CPU cores. Suppose that we create a Pod with this container that requests 0.5 CPU. Kubernetes schedules this Pod onto a machine with a total of 2 CPU cores. As long as it is the only Pod on the machine, it will consume all 2.0 of the available cores, despite only requesting 0.5 CPU. If a second Pod with the same container and the same request of 0.5 CPU lands on the machine, then each Pod will receive 1.0 cores. If a third, identical Pod is scheduled, each Pod will receive 0.66 cores. Finally, if a fourth identical Pod is scheduled, each Pod will receive the 0.5 core it requested, and the node will be at capacity. CPU requests are implemented using the cpu-shares functionality in the Linux kernel.

### Limits

When you establish limits on a container, the kernel is configured to ensure that consumption cannot exceed these limits. A container with a CPU limit of 0.5 cores will only ever get 0.5 cores, even if the CPU is otherwise idle. A container with a memory limit of 256 MB will not be allowed additional memory; for example, malloc will fail if its memory usage exceeds 256 MB

# Persisting Data with Volumes

Allow data to live longer then pod (pods are restarted often)

For this you mount volumes to containers

![[Pasted image 20260920221036.png]]

Here volume uses hostPath that will save data on host machine but we also can use diffirent network storages as Amazon Elastic Block Store, Azure File and Azure Disk, and Google’s Persistent Disk

# Summary

Pods represent the atomic unit of work in a Kubernetes cluster. They are comprised of one or more containers working together symbiotically. To create one, you write a Pod manifest and submit it to the Kubernetes API server by using the command-line tool or (less frequently) by making HTTP and JSON calls to the server directly. Once you’ve submitted the manifest to the API server, the Kubernetes scheduler finds a machine where the Pod can fit and schedules the Pod to that machine. After it’s scheduled, the kubelet daemon on that machine is responsible for creating the containers that correspond to the Pod, as well as performing any health checks defined in the Pod manifest. Once a Pod is scheduled to a node, no rescheduling occurs if that node fails. Addi tionally, to create multiple replicas of the same Pod, you have to create and name them manually.