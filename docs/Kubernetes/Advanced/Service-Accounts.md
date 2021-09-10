# Service Account

- A Pod may need to authenticate itself to gain access to the cluster resources
- Provide an identify to a Pod in the cluster
- Stored in, and managed by the cluster
- Scoped to namespace

## Access Control
- Service accounts are compativle with role-based access control (RBAC)
- Pods have a token mounted on a volume that can be used to authenticated requests
- When not specifies, a pod will use a default service account
- Default service account token has no additional permission than an unauthenticated user

## Image Pull Secrets
- Image pull secrets authenticate with private container registries
- Service accounts can also store image pull secrets
