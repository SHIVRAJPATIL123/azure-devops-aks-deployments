# azure-devops-aks-deployments
azure-devops-aks-deployments using docker and using helm both 
Demo repo for deploying Node.js apps to AKS using Azure DevOps Pipelines.

## Assignments
- **Assignment 2**: Docker + Kubernetes manifests (namespace: app2, recreate strategy)
- **Assignment 3**: Docker + Helm (namespace: app3, blue-green strategy)

## Instructions
- Update service connections in Azure DevOps
- Push changes to trigger CI/CD
- Monitor AKS for deployments

command required to connect gcp 
kubectl apply -f devops-access-app3.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app3
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: azure-devops
  namespace: app3
---
apiVersion: v1
kind: Secret
metadata:
  name: azure-devops-token
  namespace: app3
  annotations:
    kubernetes.io/service-account.name: azure-devops
type: kubernetes.io/service-account-token
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: full-access
  namespace: app3
rules:
- apiGroups: ["", "apps", "batch", "extensions", "networking.k8s.io"]
  resources: ["pods", "services", "deployments", "replicasets", "configmaps", "secrets", "persistentvolumeclaims", "ingresses", "jobs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: azure-devops-binding
  namespace: app3
subjects:
- kind: ServiceAccount
  name: azure-devops
  namespace: app3
roleRef:
  kind: Role
  name: full-access
  apiGroup: rbac.authorization.k8s.io

for cluster 
apiVersion: v1
kind: ServiceAccount
metadata:
  name: azure-devops
  namespace: default
---
apiVersion: v1
kind: Secret
metadata:
  name: azure-devops-token
  namespace: default
  annotations:
    kubernetes.io/service-account.name: azure-devops
type: kubernetes.io/service-account-token
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: full-access
rules:
- apiGroups: ["", "apps", "batch", "extensions", "networking.k8s.io"]
  resources:
    - nodes
    - pods
    - services
    - deployments
    - replicasets
    - configmaps
    - secrets
    - persistentvolumeclaims
    - ingresses
    - jobs
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: azure-devops-binding
subjects:
- kind: ServiceAccount
  name: azure-devops
  namespace: default
roleRef:
  kind: ClusterRole
  name: full-access
  apiGroup: rbac.authorization.k8s.io




  kubectl apply -f devops-access-app3.yaml\n
  854  kubectl get serviceAccounts  -n app3 -o=jsonpath={.secrets[*].name}
  855  kubectl describe secret azure-devops-token -n app3\n
  856  kubectl describe secret azure-devops-token -n app3 -o json 
  857  kubectl get secret azure-devops-token -n app3 -o json\n
  858   kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}'
  859  kubectl get ns
  860  kubectl get all -n app3
  861  kubectl get all -n app3
  862  kubectl get all -n app3
  863  kubectl describe pod app3-blue-7c5c584f5c-4x99m -n app3
  864  history 
  865  ls


