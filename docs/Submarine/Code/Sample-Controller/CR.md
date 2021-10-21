# Custom Resources

Steps to create a custom resources
1. Create a CRD (custom resource definition)
2. Create a CR
3. Write a controller to control this CR

In this page, we only introduct CRD and CR.

## CRD
- `CRD`: custom resource definition
- Before we create a CR, we need to create a CRD first because at this moment Kubernetes didn't know what your CR looks like. By creating a CRD, Kubernetes knows there is a new type and can create a new object for you later.

### Fields Explanation
- `metadata.name`: it must be `spec.name.plural` + `metadata.name`
- `spec.group`: the API group name of your cr
- `spec.versions`: the list of versions the cr supports 
- `spec.versions.[*].schema`: the restriction (validation) of fields of cr (see Client-Go code explanation)
- `spec.names`: the type (kind) that will be used to create a cr
- `spec.versions.[*].subresources`: allow api server to request for subresources like `/status` (see Client-Go code explanation)

### Examples
```yaml title="crd.yaml"
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: foos.samplecontroller.k8s.io
  # for more information on the below annotation, please see
  # https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/2337-k8s.io-group-protection/README.md
  annotations:
    "api-approved.kubernetes.io": "unapproved, experimental-only; please get an approval from Kubernetes API reviewers if you're trying to develop a CRD in the *.k8s.io or *.kubernetes.io groups"
spec:
  group: samplecontroller.k8s.io
  versions:
    - name: v1alpha1
      served: true
      storage: true
      schema:
        # schema used for validation
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                deploymentName:
                  type: string
                replicas:
                  type: integer
                  minimum: 1
                  maximum: 10
            status:
              type: object
              properties:
                availableReplicas:
                  type: integer
      # subresources for the custom resource
      subresources:
        # enables the status subresource
        status: {}
  names:
    kind: Foo
    plural: foos
  scope: Namespaced
```

## CR

A CR is a resource that you actually want to create

### Fields Explanation
- `apiVersions`: specify the api group and version of the cr you want to use
- `kind`: the same as `spec.names.kind` in the crd
- `spec`: you have to specify those defined in `spec.versions.[*].schema` in the crd

### Examples
```yaml title="example.yaml"
apiVersion: samplecontroller.k8s.io/v1alpha1
kind: Foo
metadata:
  name: example-foo
spec:
  deploymentName: example-foo
  replicas: 1
```

## References
- https://github.com/kubernetes/sample-controller/