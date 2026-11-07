
# Creating config map

```
my-config.txt # This is a sample config file that I might use to configure an application 

# Content
parameter1 = value1
parameter2 = value2
```

```
kubectl create configmap my-config \ 
	--from-file=my-config.txt \ 
	--from-literal=extra-param=extra-value \
	--from-literal=another-param=another-value
```

# Using a ConfigMap

There are three main ways to use a ConfigMap:

- Filesystem: You can mount a ConfigMap into a Pod. A file is created for each entry based on the key name. The contents of that file are set to the value
- Environment variable: A ConfigMap can be used to dynamically set the value of an environment variable
- Command-line argument: Kubernetes supports dynamically creating the command line for a container based on ConfigMap values.

```
apiVersion: v1
kind: Pod
metadata:
  name: kuard-config
spec:
  containers:
    - name: test-container
      image: gcr.io/kuard-demo/kuard-amd64:blue
      imagePullPolicy: Always
      command:
        - "/kuard"
        - "$(EXTRA_PARAM)"
      env:
        # An example of an environment variable used inside the container
        - name: ANOTHER_PARAM
          valueFrom:
            configMapKeyRef:
              name: my-config
              key: another-param
        # An example of an environment variable passed to the command to start
        # the container (above).
        - name: EXTRA_PARAM
          valueFrom:
            configMapKeyRef:
              name: my-config
              key: extra-param
      volumeMounts:
        # Mounting the ConfigMap as a set of files
        - name: config-volume
          mountPath: /config
  volumes:
    - name: config-volume
      configMap:
        name: my-config
  restartPolicy: Never
```

# Secrets

By default, Kubernetes Secrets are stored in plain text in the etcd storage for the cluster. Depending on your requirements, this may not be sufficient security for you. In particular, anyone who has cluster administration rights in your cluster will be able to read all of the Secrets in the cluster. In recent versions of Kubernetes, support has been added for encrypting the Secrets with a user-supplied key, generally integra ted into a cloud key store. Additionally, most cloud key stores have integration with Kubernetes Secrets Store CSI Driver volumes, ena bling you to skip Kubernetes Secrets entirely and rely exclusively on the cloud provider’s key store.

# Creating Secrets

```
kubectl create secret generic kuard-tls \ 
--from-file=kuard.crt \ 
--from-file=kuard.key
```

# Consuming Secrets

Instead of accessing Secrets through the API server, we can use a Secrets volume. Secret data can be exposed to Pods using the Secrets volume type. Secrets volumes are managed by the kubelet and are created at Pod creation time. Secrets are stored on tmpfs volumes (aka RAM disks), and as such are not written to disk on nodes.

```
apiVersion: v1
kind: Pod
metadata:
  name: kuard-tls
spec:
  containers:
    - name: kuard-tls
      image: gcr.io/kuar-demo/kuard-amd64:blue
      imagePullPolicy: Always
      volumeMounts:
        - name: tls-certs
          mountPath: "/tls"
          readOnly: true
  volumes:
    - name: tls-certs
      secret:
        secretName: kuard-tls
```

# Private Container Registries

Image pull Secrets leverage the Secrets API to automate the distribution of private registry credentials. Image pull Secrets are stored just like regular Secrets but are consumed through the spec.imagePullSecrets Pod specification field

```
kubectl create secret docker-registry my-image-pull-secret \
 --docker-username=<username> \ 
 --docker-password=<password> \ 
 --docker-email=<email>
```

```
apiVersion: v1
kind: Pod
metadata:
  name: kuard-tls
spec:
  containers:
    - name: kuard-tls
      image: gcr.io/kuar-demo/kuard-amd64:blue
      imagePullPolicy: Always
      volumeMounts:
        - name: tls-certs
          mountPath: "/tls"
          readOnly: true
  imagePullSecrets:
    - name: my-image-pull-secret
  volumes:
    - name: tls-certs
      secret:
        secretName: kuard-tls
```