Every request to Kubernetes is associated with some identity. Even a request with no identity is associated with the system:unauthenticated group.

# Roles and Role Bindings in Kubernetes

In Kubernetes, two pairs of related resources represent roles and role bindings. One pair is scoped to a namespace (Role and RoleBinding), while the other pair is scoped to the cluster (ClusterRole and ClusterRoleBinding).