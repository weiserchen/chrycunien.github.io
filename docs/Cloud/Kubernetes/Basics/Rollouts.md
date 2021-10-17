# Rollouts

- Rollouts update deployments
- Any change to the `template` field of deployments will triggers a rollout

## Strategy
- **Rolling update** by default
- Updates in groups rather than all-at-once
- Both old and new are running at the same time (gracefullin shutdown)
- Alternative is **recreate**, it kills all old templates at once
- Scaling is not a rollout (orthogonal)

## Commands
To better see the effect of rollout, you may choose to delete the autoscaler first.
```bash
kubectl -n deployments delete hpa app-tier
```
- Edit the app-tier deployment file
```bash
kubectl -n deployments edit deployment app-tier

# First,  modify the replicas from 2 to 10
# Second, modify the name to see the change.
# Third, delete the resource field of the template
```
- `maxSurge: 25%` means you can have more than 25% of desired number of pods at any moment
- `maxUnavailable: 25%` means at least 25% pods are running, neither terminating or creating
- Several commands
```bash
# Show the roll out status of a deployment
kubectl -n deployments rollout status deployment app-tier

# Pause the rollout
kubectl -n deployments rollout pause deployment app-tier

# Resume the rollout
kubectl -n deployments rollout resume deployment app-tier

# Undo rollout
# Can add --record flag to record the command
# Use --to-revision to specify the specific version
kubectl -n deployments rollout undo deployment app-tier

# Find the history of rollout
kubectl -n deployments rollout history deployment app-tier

# Note that you can rollout to a specific version
# Find more related options in the documentation

```

## References
