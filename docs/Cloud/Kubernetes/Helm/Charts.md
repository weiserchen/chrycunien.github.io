# Charts

- Create a chart
```bash
$ helm create [CHART_NAME]
```

## Chart Structure
```
foo/
├── .helmignore   # Contains patterns to ignore when packaging Helm charts.
├── Chart.yaml    # Information about your chart
├── values.yaml   # The default values for your templates
├── charts/       # Charts that this chart depends on
└── templates/    # The template files
    └── tests/    # The test files
```

## Metadata

### Chart.yaml
```yaml title="Chart.yaml"
apiVersion: v2
name: cloudacademy-webapp
description: A Helm chart for Kubernetes

# A chart can be either an 'application' or a 'library' chart.
#
# Application charts are a collection of templates that can be packaged into versioned archives
# to be deployed.
#
# Library charts provide useful utilities or functions for the chart developer. They're included as
# a dependency of application charts to inject those utilities and functions into the rendering
# pipeline. Library charts do not define any templates and therefore cannot be deployed.
type: application

# This is the chart version. This version number should be incremented each time you make changes
# to the chart and its templates, including the app version.
# Versions are expected to follow Semantic Versioning (https://semver.org/)
version: 0.1.0

# This is the version number of the application being deployed. This version number should be
# incremented each time you make changes to the application. Versions are not expected to
# follow Semantic Versioning. They should reflect the version the application is using.
appVersion: 1.16.0
```

### values.yaml
```yaml title="values.yaml"
# values.yaml contains a structure list of default value
# These values will be references by other templates in the same chart
replicaCount: 2

image:
  repository: nginx
  pullPolicy: IfNotPresent
  tag: ""

service:
  type: ClusterIP
  port: 80

autoscaling:
  enabled: false

nginx:
  conf:
    message: "CloudAcademy DevOps 2020 v1"
```
Usage:
```yaml title="templates/service.yaml"
apiVersion: v1
kind: Service
metadata:
 name: {{ include "webserver.fullname" . }}
 labels:
   {{- include "webserver.labels" . | nindent 4 }}
spec:
 type: {{ .Values.service.type }}
 ports:
   - port: {{ .Values.service.port }}
     targetPort: http
     protocol: TCP
     name: http
 selector:
   {{- include "webserver.selectorLabels" . | nindent 4 }}
```
Custimize values:
```bash
$ helm upgrade ca-demo1 ./cloudacademy-app --set=service.port=9090
```

## Templates
- The `templates` folder collects templates togother
- Each template provides definition for a single cluster resource
- Example:
    - `deployment.yaml` defines the deployment resources
    - `service.yaml` defines the service resources
- The template syntax are subject to go template syntax
- All files under this directory undergo template rendering process

### Example
```yaml title="templates/service.yaml"
apiVersion: v1
kind: Service
metadata:
 name: {{ include "webserver.fullname" . }}
 labels:
   {{- include "webserver.labels" . | nindent 4 }}
spec:
 type: {{ .Values.service.type }}
 ports:
   - port: {{ .Values.service.port }}
     targetPort: http
     protocol: TCP
     name: http
 selector:
   {{- include "webserver.selectorLabels" . | nindent 4 }}
```

### NOTES.txt
- Contains end user instruction to help execute this chart
- Will be display when using `helm install` or `helm upgrade`
- Can also be written into a template for dynamically generate information

### _helpers.tpl
- Contains a number of template partial that are useful in other template files
- Usage: `{{ include "webserver.fullname" . }}`
```tpl
{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "webserver.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "webserver.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "webserver.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "webserver.labels" -}}
helm.sh/chart: {{ include "webserver.chart" . }}
{{ include "webserver.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "webserver.selectorLabels" -}}
app.kubernetes.io/name: {{ include "webserver.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
```

### tests
- Contains one or more tests you wrote
- Validate the chart once deployed
- Typically implemented by kubernetes `Job` or `Pod` resource
- Should return a `0` exit status code to be interpreted by helm as a successful test
- Should have notation `helm.sh/hool: test` under the test manifest file
- Usage: `helm test [FILE]`

## Packaging
- After finish your chart, you have to package the chart
- Usage: `helm package [CHART DIR]`
- It produces an archive named after what you define in the `Chart.yaml` file
- With convention: `[NAME]-[version].tgz`

## Installation
```bash
# Install directly provided a value
$ helm install ca-demo1 cloudacademyapp-0.1.3.tgz --set app.color=red

# Dry-run
# Render the template and output the kubernetes manifest file
# so that you can see what will be installed in the cluster
$ helm install ca-demo1 cloudacademyapp-0.1.3.tgz --dry-run
```

## Hosting
- Before you can host a chart, you have to create the index file
- Will search recursively under this directory for all chart archive and produce related information bundled with creation time
```bash
# Produce an index.yaml with the given chart archive that can be served by a web server
$ helm repo index .
```

## Repository Managment
```bash
# Add chart archive to local repository and run a web server
$ helm repo add local http://127.0.0.1:8080

# Update the chart archive
$ helm repo update

# Search for all chart named cloudacademy in the configured repository
$ helm search repo cloudacademy

# Install the chart from the local repository
$ helm install ca-demo1 local/cloudacademyapp --set color.red=true
```

## References
- https://cloudacademy.com/course/introduction-to-helm-1034
- https://github.com/cloudacademy/helm-demo