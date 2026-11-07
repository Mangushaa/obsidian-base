
The Deployment object exists to manage the release of new versions. Deployments represent deployed applications in a way that transcends any particular version. Addi tionally, Deployments enable you to easily move from one version of your code to the next. This “rollout” process is specifiable and careful. It waits for a user-configurable amount of time between upgrading individual Pods. It also uses health checks to ensure that the new version of the application is operating correctly and stops the deployment if too many failures occur.


The top-level Deployment object is managing this ReplicaSet. When you adjust the number of replicas to one, it no longer matches the desired state of the Deployment, which has replicas set to 2. The Deployment controller notices this and takes action to ensure the observed state matches the desired state, in this case readjusting the number of replicas back to two. If you ever want to manage that ReplicaSet directly, you need to delete the Deploy ment. (Remember to set --cascade to false, or else it will delete the ReplicaSet and Pods as well!


# Creating Deployments

```
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: null
  generation: 1
  labels:
    run: kuard
  name: kuard
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      run: kuard
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        run: kuard
    spec:
      containers:
      - image: gcr.io/kuar-demo/kuard-amd64:blue
        imagePullPolicy: IfNotPresent
        name: kuard
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status: {}
```

The Deployment spec has a very similar structure to the ReplicaSet spec. There is a Pod template, which contains a number of containers that are created for each replica managed by the Deployment. In addition to the Pod specification, there is also a strategy object

The strategy object dictates the different ways in which a rollout of new software can proceed. There are two strategies supported by Deployments: Recreate and RollingUpdate.

# Managing Deployments

As with all Kubernetes objects, you can get detailed information about your Deploy ment via the kubectl describe command.

```
...
OldReplicaSets: <none>
NewReplicaSet: kuard-6d69d9fc5c (2/2 replicas created)
...
```

These fields point to the ReplicaSet objects this Deployment is currently managing. If a Deployment is in the middle of a rollout, both fields will be set to a value. If a rollout is complete, OldReplicaSets will be set to 'none'.

You can use kubectl rollout history to obtain the history of rollouts associated with a particular Deployment. If you have a current Deployment in progress, you can use kubectl rollout status to obtain the current status of that rollout.

# Updating Deployments

### Scaling a Deployment

To scale up a Deployment, you would edit your YAML file to increase the number of replicas

### Updating a Container Image

To do this, you should likewise edit the Deployment YAML file, though in this case you are updating the container image, rather than the number of replicas.

After you update the Deployment, it will trigger a rollout, which you can then monitor via the kubectl rollout command

You can see the old and new ReplicaSets managed by the Deployment along with the images being used. Both the old and new ReplicaSets are kept around in case you want to roll back

If you are in the middle of a rollout and you want to temporarily pause it (e.g., if you start seeing weird behavior in your system that you want to investigate), you can use the pause command

```
kubectl rollout pause deployments kuard
```

If, after investigation, you believe the rollout can safely proceed, you can use the resume command to start up where you left off

```
kubectl rollout resume deployments kuard
```

### Rollout History

```
kubectl rollout history deployment kuard
```

The revision history is given in oldest to newest order. A unique revision number is incremented for each new rollout.

If you are interested in more details about a particular revision, you can add the--revision flag to view details about that specific revision

```
kubectl rollout history deployment kuard --revision=2
```

Let’s say there is an issue with the latest release and you want to roll back while you investigate. You can simply undo the last rollout

```
kubectl rollout undo deployments kuard
```


After rollout to prev version 

```
kubectl rollout history deployment kuard

1 
3 Update to blue kuard 
4 Update to green kuard
```

Revision 2 is missing! It turns out that when you roll back to a previous revision, the Deployment simply reuses the template and renumbers it so that it is the latest revision. What was revision 2 before is now revision 4.

The kubectl rollout undo command to roll back to a previous version of a Deployment. Additionally, you can roll back to a specific revision in the history using the --to-revision flag

```
kubectl rollout undo deployments kuard --to-revision=3
```

Specifying a revision of 0 is a shorthand way of specifying the previous revision. In this way, kubectl rollout undo is equivalent to kubectl rollout undo --to revision=0
By default, the last 10 revisions of a Deployment are kept attached to the Deployment object itself. It is recommended that if you have Deployments that you expect to keep around for a long time, you set a maximum history size for the Deployment revision history. For example, if you do a daily update, you may limit your revision history to 14, to keep a maximum of two weeks’ worth of revisions (if you don’t expect to need to roll back beyond two weeks). To accomplish this, use the revisionHistoryLimit property in the Deployment specification.

# Deployment Strategies

When it comes time to change the version of the software implementing your service, a Kubernetes deployment supports two different rollout strategies, Recreate and RollingUpdate. Let’s look at each in turn.

### Recreate Strategy

The Recreate strategy is the simpler of the two. It simply updates the ReplicaSet it manages to use the new image and terminates all of the Pods associated with the Deployment. The ReplicaSet notices that it no longer has any replicas and re-creates all Pods using the new image. Once the Pods are re-created, they are running the new version.


### RollingUpdate Strategy

The RollingUpdate strategy is the generally preferable strategy for any user-facing service. While it is slower than Recreate, it is also significantly more sophisticated and robust. Using RollingUpdate, you can roll out a new version of your service while it is still receiving user traffic, without any downtime. When working with rolling update all new versions must be compatible, since parallely few versions is running, and if any is not compatible you or user or both will face errors.

##### Configuring a rolling update

There are two parameters you can use to tune the rolling update behavior: maxUnavailable and maxSurge.

The maxUnavailable parameter sets the maximum number of Pods that can be unavailable during a rolling update. It can either be set to an absolute number (e.g., 3, meaning a maximum of three Pods can be unavailable) or to a percentage (e.g., 20%, meaning a maximum of 20% of the desired number of replicas can be unavailable). Generally speaking, using a percentage is a good approach for most services, since the value is correctly applied regardless of the desired number of replicas in the Deploy ment. However, there are times when you may want to use an absolute number (e.g., limiting the maximum unavailable Pods to one).

At its core, the maxUnavailable parameter helps tune how quickly a rolling update proceeds. For example, if you set maxUnavailable to 50%, then the rolling update will immediately scale the old ReplicaSet down to 50% of its original size. If you have four replicas, it will scale it down to two replicas. The rolling update will then replace the removed Pods by scaling the new ReplicaSet up to two replicas, for a total of four replicas (two old, two new). It will then scale the old ReplicaSet down to zero replicas, for a total size of two new replicas. Finally, it will scale the new ReplicaSet up to four replicas, completing the rollout. Thus, with maxUnavailable set to 50%, the rollout completes in four steps, but with only 50% of the service capacity at times.

However, there are situations where you don’t want to fall below 100% capacity, but you are willing to temporarily use additional resources to perform a rollout. In these situations, you can set the maxUnavailable parameter to 0, and instead control the rollout using the maxSurge parameter. Like maxUnavailable, maxSurge can be specified either as a specific number or a percentage

The maxSurge parameter controls how many extra resources can be created to achieve a rollout. To illustrate how this works, imagine a service with 10 replicas. We set maxUnavailable to 0 and maxSurge to 20%. The first thing the rollout will do is scale the new ReplicaSet up by 2 replicas, for a total of 12 (120%) in the service. It will then scale the old ReplicaSet down to 8 replicas, for a total of 10 (8 old, 2 new) in the service. This process proceeds until the rollout is complete. At any time, the capacity of the service is guaranteed to be at least 100% and the maximum extra resources used for the rollout are limited to an additional 20% of all resources.


### Slowing Rollouts to Ensure Service Health

Staged rollouts are meant to ensure that the rollout results in a healthy, stable service running the new software version. To do this, the Deployment controller always waits until a Pod reports that it is ready before moving on to update the next Pod.

Sometimes, however, simply noticing that a Pod has become ready doesn’t give you sufficient confidence that the Pod is actually behaving correctly. Some error condi tions don’t occur immediately. For example, you could have a serious memory leak that takes a few minutes to show up, or you could have a bug that is only triggered by 1% of all requests. In most real-world scenarios, you want to wait a period of time to have high confidence that the new version is operating correctly before you move on to updating the next Pod.

For Deployments, this time to wait is defined by the minReadySeconds parameter:

```
spec: minReadySeconds: 60
```

Setting minReadySeconds to 60 indicates that the Deployment must wait for 60 seconds after seeing a Pod become healthy before moving on to updating the next Pod