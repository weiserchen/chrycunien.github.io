# Some Question

## 10/24
- `server-core/.../database/utils/MyBatisUtil`
    - `checkCalledByTestMethod` doesn't seem to take effect
    - Solved: the `SubmarineConfiguration.getInstance()` will create a singleton
- `server-core/.../environment/database/mappers/Environment mapper`
    - Why we put these three functions in api rather than core?
    - Is it some historical reasons?
```java
import org.apache.submarine.server.api.environment.Environment;
import org.apache.submarine.server.api.environment.EnvironmentId;
import org.apache.submarine.server.api.spec.EnvironmentSpec;
```
- SUBMARINE-1030
    - What the difference between 3 styles?
- `server-core/.../experiment/database/ExperimentManager`:
    - In `createExperiment`, it is weird to first populate the spec and then remove the spec. Plus, it seems to set some fields again provided a spec that is passed into the creation process before.
```java
spec.getMeta().getEnvVars().put(RestConstants.JOB_ID, id.toString());
spec.getMeta().getEnvVars().put(RestConstants.SUBMARINE_TRACKING_URI, url);
spec.getMeta().getEnvVars().put(RestConstants.LOG_DIR_KEY, RestConstants.LOG_DIR_VALUE);

String lowerName = spec.getMeta().getName().toLowerCase();
spec.getMeta().setName(lowerName);
spec.getMeta().setExperimentId(id.toString());

Experiment experiment = submitter.createExperiment(spec);
experiment.setExperimentId(id);

spec.getMeta().getEnvVars().remove(RestConstants.JOB_ID);
spec.getMeta().getEnvVars().remove(RestConstants.SUBMARINE_TRACKING_URI);
spec.getMeta().getEnvVars().remove(RestConstants.LOG_DIR_KEY);

experiment.setSpec(spec);
```
- server-core mappers and service
    - I find many of the entity share the same feature, like select, update, create, ...
    - Why we don't provide a general interface to generalize the mappers in the server
    - Also, the service may be generalized, too
    - Is this related to somethings like refactor or not?
    - What is the actual model of server? `model-mapper-service`?
    - Or we will use hibernate later so this doesn't matter

## 10/15

### The clarification of what our operator do
So, below is what I guess we are doing in the development of the operator.
- Now, we simply hardcode the yaml (from outer helm chart) into the native go object, not allow any user input.
- Then, we try to read the yaml and convert the data in yaml to the native go object, maybe like [this](https://github.com/kubernetes/client-go/issues/193). Therefore, we allow user to change configuration. (Actually, this time we treat yaml file as configuration file.)
- The process is:
1. User edit helm chart using helm syntax for easier maintainability.
2. We use some tool like `helm template` to transform the template in helm chart to a raw yaml file.
3. Our operator will read these file, parse them, and convert them to go object using some decoder.
4. The following procedure stays the same. We wait for user create our submarine operator cr, then we use the object created in the previous steps and then send command to the API server to create other resources.

### Recorder
- [Solved] You can see the `controller.go` for more information.
- Does the only thing that the recorder do is to write event record to some space that we can retrieve using `kubectl describe`?
- What is EventSinkImpl
```go
eventBroadcaster := record.NewBroadcaster()
eventBroadcaster.StartStructuredLogging(0)
eventBroadcaster.StartRecordingToSink(&typedcorev1.EventSinkImpl{Interface: kubeclientset.CoreV1().Events("")})
recorder := eventBroadcaster.NewRecorder(scheme.Scheme, corev1.EventSource{Component: controllerAgentName})
```

### SyncHandler
- Why we send all object to SyncHandler?
- Answer
    - If Submarine change, we need to get Submarine resource
    - If other components change, like deployments, we still need to get Submarine resource because we need to converge the current state and the desired state specified in the yaml

### How Submarine Operator Work?
- [TODO] Need to create a seperate note for completeness and source code resolution
1. First, we create a Submarine operator and register a bunch of informers to respond to events
2. Then when user create a Submarine resource, the API server will send an event to our operator
3. We had set the submarine informer's `ADDFunc` to `enqueueSubmarine`, so the event will be put into the workqueue (a namespace/name string)
4. After that, the worker will pull the object out of the workqueue. We parse it and retrieve the Submarine resource to know its spec and status. We also do some checking to ensure that this Submarine resource is valid.
5. Afterwards, we make a copy and inspect the state of the Submarine resource.
    - If `New`: validate the Submarine resource and move the state to `Creating`
    - If `Creating`: Create the relevant resources specified in the Submarine spec and move the state to `Running`
    - If `Running`: Because we are signaled that some resources, we create the resources again
    - Note:
        - After each state, we will call `Update`, the corresponding `UpdateFunc` is enqueue again. Therefore, we will examine again until next cycle. (This is the state machine of kubernetes)
        - We will continute this step until the resources is stable (the number of components are the same), and the update process will be stopped in `updateSubmarineStatue` because it compare if the copy is the same as the original
        - The `createSubmarine` will not create a resource twice, it only check it there's a gap between two states. Hence, it's safe to call this function several time to sync two states. But I wonder whether there is more efficient way to do this?
        - About `handleObject`: All update will pass through this, why? Imagine two scenarios: (1) Update the Submarine resource itself. (2) Update other resources. The first scenario, we need the Submarine itself, so it's trivial. The second one is tricker. Although you may think we only want to notice about the specific resources. However, we still need to compare to the Submarine resource itself to converge current state and desired state. To sum up, no matter what, we need to get the Submarine resources itself, so it's reasonable to simply call `handleObject` for it's simplicity.
6. The process loop until the submarine operator ends

## 10/14
1. In Run Operator End-to-end Tests, why we have to evaluate the minikube docker-env
```bash
# Step1: Build image "submarine-operator" to minikube's Docker 
eval $(minikube docker-env)
make image

# Step2: Run Tests
## one can add -v to see additional logs
go test ./test/e2e
```
2. Where do our project put the code generator? At vendor?
3. How is the controller authenticated out-of-cluster?
```bash
./submarine-operator
---
start watching...
```