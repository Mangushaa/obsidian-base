Controlls active amount of certain pods. Usually 1 microservoce - 1 replica set. Pods are controller by label. So there is infinite loop that checks current active amount of pods if that mot match with desired state k8s will match it.

# Autoscaling a ReplicaSet

“Horizontal Pod Autoscaling” is kind of a mouthful, and you might wonder why it is not simply called “autoscaling.” Kubernetes makes a distinction between hori zontal scaling, which involves creating additional replicas of a Pod, and vertical scaling, which involves increasing the resources required for a particular Pod (such as increasing the CPU required for the Pod). Many solutions also enable cluster autoscaling, where the number of machines in the cluster is scaled in response to resource needs.

Scaling based on CPU usage is the most common use case for Pod autoscaling. You can also scale based on memory usage. CPU-based autoscaling is most useful for request-based systems that consume CPU proportionally to the number of requests they are receiving, while using a relatively static amount of memory.

```
kubectl autoscale rs kuard --min=2 --max=5 --cpu-percent=80
```

This command creates an autoscaler that scales between two and five replicas with a CPU threshold of 80%. To view, modify, or delete this resource, you can use the standard kubectl commands and the horizontalpodautoscalers resource. It is quite a bit to type horizontalpodautoscalers, but it can be shortened to hpa:

```
kubectl get hpa
```