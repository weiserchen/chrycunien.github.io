# Main

This page document explanation for several parts in the `main.go`.

## Initialization
```go
func main() {
	klog.InitFlags(nil)
	flag.Parse()

    // set up signals so we handle the first shutdown signal gracefully
	stopCh := signals.SetupSignalHandler()

    ...
}

func init() {
	flag.StringVar(&kubeconfig, "kubeconfig", "", "Path to a kubeconfig. Only required if out-of-cluster.")
	flag.StringVar(&masterURL, "master", "", "The address of the Kubernetes API server. Overrides any value in kubeconfig. Only required if out-of-cluster.")
}
```

## Create Client
- `clientcmd` takes the config path and load it from the specified URL and then return a config object
- `kubernetes.NewForConfig` takes a config to create a client object to talk to default resources
- `clientset.NewForConfig` takes a config to create a client object to talk to our custom resources
- The type after these clients are actuall `ClientSet` because they are a set of client to communicate to several kubernetes resources like `deployment`, `pod`, ...
```go
func main() {
    ...

	cfg, err := clientcmd.BuildConfigFromFlags(masterURL, kubeconfig)
	if err != nil {
		klog.Fatalf("Error building kubeconfig: %s", err.Error())
	}

	kubeClient, err := kubernetes.NewForConfig(cfg)
	if err != nil {
		klog.Fatalf("Error building kubernetes clientset: %s", err.Error())
	}

	exampleClient, err := clientset.NewForConfig(cfg)
	if err != nil {
		klog.Fatalf("Error building example clientset: %s", err.Error())
	}

    ...
}
```

## Create Controller
- `kubeinformers.NewSharedInformerFactory` creates informer factory that handles the creation of informers
- Why it is called `NewSharedInformerFactory` is owing to the shared nature of informers. Imagine if you create a new informer for each single deployment, it is a waste. Therefore we create a single instance (maybe more than 1) of **deployment** informer that shared across all objects to handle all requests from the `deployment` resource type.

```go
func main() {
	...

	kubeInformerFactory := kubeinformers.NewSharedInformerFactory(kubeClient, time.Second*30)
	exampleInformerFactory := informers.NewSharedInformerFactory(exampleClient, time.Second*30)

	controller := NewController(kubeClient, exampleClient,
		kubeInformerFactory.Apps().V1().Deployments(),
		exampleInformerFactory.Samplecontroller().V1alpha1().Foos())

	// notice that there is no need to run Start methods in a separate goroutine. (i.e. go kubeInformerFactory.Start(stopCh)
	// Start method is non-blocking and runs all registered informers in a dedicated goroutine.
	kubeInformerFactory.Start(stopCh)
	exampleInformerFactory.Start(stopCh)

	if err = controller.Run(2, stopCh); err != nil {
		klog.Fatalf("Error running controller: %s", err.Error())
	}
}
```

## References
- https://github.com/kubernetes/sample-controller/