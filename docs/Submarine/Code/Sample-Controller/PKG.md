# PKG resources

The package is under the `/pkg/apis/samplecontroller/v1alpha1` directory.

## Code Generation
Because go does not have generic, the idiomatic way is to use code generation. Kubernetes uses this approach to define custom resources first and generate the related code with the help of the code generator. 

By adding comments like this:
```
// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
```
Kubernetes helps generate relevant code given the options you specify.

See Client-Go code for more explanation.

## Resource Types
- You define the struct of custom resource, this is used to map to Kubernetes Object
- `metav1.TypeMeta`: map to `apiVersions` and `kind` in the manifest file
- `metav1.ObjectMeta`: map to `metadata` in the manifest file
- `Spec`: map to `spec` in the manifest file
- `Status`: map to `status` in the manifest file (only after the resource is created)
- See Client-Go code explanation

```go title="types.go"
package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Foo is a specification for a Foo resource
type Foo struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   FooSpec   `json:"spec"`
	Status FooStatus `json:"status"`
}

// FooSpec is the spec for a Foo resource
type FooSpec struct {
	DeploymentName string `json:"deploymentName"`
	Replicas       *int32 `json:"replicas"`
}

// FooStatus is the status for a Foo resource
type FooStatus struct {
	AvailableReplicas int32 `json:"availableReplicas"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// FooList is a list of Foo resources
type FooList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata"`

	Items []Foo `json:"items"`
}
```

## Docs
- This file defines the documentation of the controller
```go title="doc.go"
// +k8s:deepcopy-gen=package
// +groupName=samplecontroller.k8s.io

// Package v1alpha1 is the v1alpha1 version of the API.
package v1alpha1 // import "k8s.io/sample-controller/pkg/apis/samplecontroller/v1alpha1"
```

## Register the Type
- `scheme`:
	- It is the Kubernetest type system, which controls api group and version
	- `AddToScheme` is a global function that registers this API group & version to a scheme, which is used in `controller.go` to register the custom type so that the client know how to interact with this resources
- `Kind` is the representation of object stored in etcd
- `Resource` is the representation of object served by API server
- `Kind` and `Resource` have some mapping between each other (maybe many-to-many)

```go title="register.go"
package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"

	samplecontroller "k8s.io/sample-controller/pkg/apis/samplecontroller"
)

// SchemeGroupVersion is group version used to register these objects
var SchemeGroupVersion = schema.GroupVersion{Group: samplecontroller.GroupName, Version: "v1alpha1"}

// Kind takes an unqualified kind and returns back a Group qualified GroupKind
func Kind(kind string) schema.GroupKind {
	return SchemeGroupVersion.WithKind(kind).GroupKind()
}

// Resource takes an unqualified resource and returns a Group qualified GroupResource
func Resource(resource string) schema.GroupResource {
	return SchemeGroupVersion.WithResource(resource).GroupResource()
}

var (
	// SchemeBuilder initializes a scheme builder
	SchemeBuilder = runtime.NewSchemeBuilder(addKnownTypes)
	// AddToScheme is a global function that registers this API group & version to a scheme
	AddToScheme = SchemeBuilder.AddToScheme
)

// Adds the list of known types to Scheme.
func addKnownTypes(scheme *runtime.Scheme) error {
	scheme.AddKnownTypes(SchemeGroupVersion,
		&Foo{},
		&FooList{},
	)
	metav1.AddToGroupVersion(scheme, SchemeGroupVersion)
	return nil
}
```

## Signal
- The signal package writes how to set up a signal handler
- The principle under the hood is to receive `SIGTERM` and `SIGKILL`
- When receive the first stop signal, start graceful shutdown; if receive the second one, exit immediately
- When call `close(stop)`, the blocking code block on the other side will be removed, so it will allow some termination process to execute and cleanup resources
```go
var onlyOneSignalHandler = make(chan struct{})

// SetupSignalHandler registered for SIGTERM and SIGINT. A stop channel is returned
// which is closed on one of these signals. If a second signal is caught, the program
// is terminated with exit code 1.
func SetupSignalHandler() (stopCh <-chan struct{}) {
	close(onlyOneSignalHandler) // panics when called twice

	stop := make(chan struct{})
	c := make(chan os.Signal, 2)
	signal.Notify(c, shutdownSignals...)
	go func() {
		<-c
		close(stop)
		<-c
		os.Exit(1) // second signal. Exit directly.
	}()

	return stop
}
```


## References
- https://github.com/kubernetes/sample-controller/