# Docker & Kubernetes

## Docker

```md
- FROM: specifies the base image for the Dockerfile
- RUN: executes commands in the Docker container
- COPY: copies files and directories from the host system to the container
- ADD: similar to COPY, but can also handle remote URLs and decompress archives
- WORKDIR: sets the working directory for subsequent commands
- ENV: sets environment variables in the container
- EXPOSE: documents which ports should be published when the container is run
- CMD: specifies the default command to run when the container is started
```

```md
FROM node:14-alpine

WORKDIR /app

ADD https://github.com/user/repo/archive/refs/heads/main.zip .
RUN unzip main.zip && mv repo-main/\* .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```

## Docker Compose

Docker Compose is a tool used for defining and running multi-container Docker applications. It allows you to define the services that make up your application, how they are linked and interact with each other, and the configuration needed to run them in a declarative way.

A service is a containerized application that performs a specific task. In the Compose file, each service is defined as a separate block with a name, an image, and optionally other configuration parameters like environment variables, ports, volumes, and dependencies.

```yaml
version: "3"
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
```

```yaml
version: "3"
services:
  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: password

volumes:
  db-data:
```

```shell
docker-compose down --volumes
```

This will remove all volumes defined in the Compose file, including the "db-data" volume.

```yaml
version: "3"
services:
  web:
    image: nginx
    volumes:
      - ./app:/app

volumes:
  data-volume:
```

## Kubernetes

In the context of Kubernetes, a cluster is a set of physical or virtual machines (called nodes) that are connected together and managed as a single entity. The nodes in a cluster work together to run containerized applications, and are managed by a central control plane that orchestrates and schedules workloads across the cluster.

Control plane: The control plane is responsible for managing the overall state of the cluster and making decisions about how to deploy and manage containerized applications.

Nodes: Nodes are the physical or virtual machines that run containerized applications. Each node runs a container runtime (such as Docker) and a Kubelet component that communicates with the control plane.

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It was originally developed by Google, and is now maintained by the Cloud Native Computing Foundation (CNCF).

Kubernetes provides built-in features for discovering and connecting to services within the cluster, and can automatically load balance traffic between containers.

### Control Plane

The control plane in Kubernetes is the set of components that manage the overall state of the cluster and make decisions about how to deploy and manage containerized applications. It is responsible for orchestrating and scheduling container workloads across the cluster, and for ensuring that containers are running correctly and are able to communicate with each other.

The control plane consists of several key components, including:

API server: The API server is the central management component of Kubernetes, and is responsible for exposing the Kubernetes API, which can be used to manage the state of the cluster.

etcd: etcd is a distributed key-value store that is used by Kubernetes to store the state of the cluster, including information about the nodes, pods, services, and other resources.

kube-scheduler: The kube-scheduler is responsible for determining where to place new pods based on resource availability, application requirements, and other factors.

The architecture of Kubernetes is based on a master/worker model, where a central control plane (the "master") manages a set of nodes (the "workers") that run containerized applications.

The master node is responsible for managing the overall state of the cluster and making decisions about how to deploy and manage containerized applications.

### Replicaset

In Kubernetes, a ReplicaSet is a resource that defines a set of identical replicas of a pod. The ReplicaSet ensures that a specified number of replicas of the pod are running at any given time. If a pod fails or is deleted, the ReplicaSet creates a new replica to replace it.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-replicaset
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: my-image
```

### Statefulset

In Kubernetes, a StatefulSet is a resource that is used to manage stateful applications, which are applications that require stable and unique network identities and persistent storage.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
spec:
  replicas: 3
  serviceName: my-statefulset
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      hostname: my-hostname
      containers:
        - name: my-container
          image: my-image
          volumeMounts:
            - name: my-storage
              mountPath: /data
  volumeClaimTemplates:
    - metadata:
        name: my-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

### Configmap

In Kubernetes, a ConfigMap is a resource object that is used to store configuration data in key-value pairs. The data stored in a ConfigMap can be used by a Kubernetes deployment or pod as environment variables, command-line arguments, or configuration files.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-configmap
data:
  DB_HOST: db.example.com
  DB_PORT: "5432"
  DB_NAME: mydatabase
```

### Ingress

In Kubernetes, an Ingress is an API object that manages external access to the services in a cluster. It provides a way to route HTTP and HTTPS traffic from outside the cluster to internal services based on the requested URL or other criteria.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  name: http
```

### Job

A Job creates Pods with a specific container image and command, and runs them until they complete successfully or fail. If a Pod fails or is terminated for any reason, the Job controller automatically creates a new Pod to replace it until the desired number of successful completions is reached.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
spec:
  completions: 3
  parallelism: 2
  template:
    spec:
      containers:
        - name: my-container
          image: my-image
          command: ["/bin/sh", "-c", "echo 'Hello, world!'"]
      restartPolicy: OnFailure
```

### Persistent Volume

In Kubernetes, a Persistent Volume (PV) is a storage abstraction that allows users to decouple the storage requirements of their applications from the underlying storage provider. It provides a way for applications to request and use persistent storage without having to worry about the specific details of the storage provider.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: my-storage-class
  nfs:
    server: nfs.example.com
    path: /my-nfs-volume
```

The persistentVolumeReclaimPolicy is set to Retain, which means that the data on the volume will not be deleted when the volume is released.

ReadWriteOnce access mode, which means that it can be mounted as read-write by a single node.

### Persistent Volume Claim

In Kubernetes, a Persistent Volume Claim (PVC) is a request for a specific amount of storage from a Persistent Volume (PV). It is used by applications to request and use persistent storage without having to know the specific details of the underlying storage provider.

To use a Persistent Volume, a user creates a Persistent Volume Claim with the required storage capacity and access mode. The Kubernetes control plane then matches the claim with a suitable Persistent Volume and binds them together. The application can then use the Persistent Volume as a regular volume, without having to know the details of the underlying storage provider.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: my-storage-class
```

### Pod

In Kubernetes, a Pod is the smallest deployable unit that represents a single instance of a running process in a cluster. It is the basic building block of Kubernetes and can contain one or more containers that share the same network namespace and can communicate with each other using localhost.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: my-image
      ports:
        - containerPort: 80
```

### ReplicationController

A Replication Controller is a Kubernetes resource that ensures that a specified number of replicas of a Pod are running at all times. It is responsible for maintaining the desired state of the system by creating, deleting, and scaling Pods based on the user-defined configuration

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: my-controller
spec:
  replicas: 3
  selector:
    app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: my-image
          ports:
            - containerPort: 80
```

### Services

Kubernetes Services are an abstraction layer that provides a stable IP address and DNS name for a set of Pods in a Kubernetes cluster. Services allow Pods to communicate with each other, even if they are running on different nodes in the cluster.

There are three types of Services in Kubernetes:

ClusterIP: This is the default type of Service, which creates a virtual IP address within the cluster to represent the Service. The Service is accessible only from within the cluster.

NodePort: This type of Service exposes the Service on a static port on each node in the cluster. This allows external clients to access the Service using the node's IP address and the static port number.

LoadBalancer: This type of Service exposes the Service using an external load balancer. This is typically used in cloud environments where an external load balancer can be automatically provisioned.

### Scaling UP

```
kubectl scale deployment <deployment-name> --replicas=<number-of-replicas>
```

### Check current ROLL OUT status

```
kubectl rollout status deployment/<deployment-name>
```

**Rollback**

```
kubectl rollout undo deployment/<deployment-name>
```

**History of Rollouts**

```
kubectl rollout history deployment/<deployment-name>
```
