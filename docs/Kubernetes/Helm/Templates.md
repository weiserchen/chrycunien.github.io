# Templates

- The template for helm is golang-based.

## Syntax
- Message in between `{{}}` will be replaced by some other data.
- Helm has several built-in objects like `Values` (values.yaml), `Release`, ... . You can find them in helm documentation.
- `include` can be used to replace code that defined in `_helpers.tpl`
- `{{-` tell the engine to chomp whitespace characters (space, newline, tab, ...)
- `.` after `{{ include "webserver.fullname" . }}` is the passed-in scope, `.` means top-level scope
- `|` pipe the result to the next template command (like `nindent`)
- `indent [n]` make sure that the line is correctly indented
- `nindent` prepend a `\n` to the indented string
- `if`, `end` ared used in control flow
- `$` always means the root context but not inner scope

You can refer to this [link](https://helm.sh/docs/chart_template_guide/function_list/) for more information.

## ConfigMap Template
- Sometimes, you may want to convert an existing manifest file to a template

### Before
In this configmap, we add a config data for nginx.
However, some part of information shouldn't be hardcoded like:
- name
- `/` message
- `/release/name` message
- `/release/revision` message

```yaml 
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
  namespace: cloudacademy
data:
  nginx.conf: |-
    server {
        listen 80;
        server_name localhost;

        location / {
            return 200 'CloudAcademy DevOps 2020 v1\n';
            add_header Content-Type text/plain;
        }

        location /release/name {
            return 200 'nginx\n';
            add_header Content-Type text/plain;
        }

        location /release/revision {
            return 200 '1\n';
            add_header Content-Type text/plain;
        }
    }
```

### After
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "webserver.fullname" . }}
  namespace: cloudacademy
data:
  nginx.conf: |-
    server {
        listen 80;
        server_name localhost;

        location / {
            return 200 '{{ .Values.nginx.conf.message }}\n';
            add_header Content-Type text/plain;
        }

        location /release/name {
            return 200 '{{ .Release.Name }}\n';
            add_header Content-Type text/plain;
        }

        location /release/revision {
            return 200 '{{ .Release.Revision }}\n';
            add_header Content-Type text/plain;
        }
    }
```

## Deployment Template
Deployment template is very similar to ConfigMap template.


### Example
There are several field that would be modified in the deployment template
- metadata
    - name
    - labels
- spec
    - replicas
    - matchLabels
    - template.metadata
        - annotation
        - labels
    - template.spec.container
        - name
        - image
        - ...
    - template.volumes
        - configMap
        - secret
        - ...
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "webserver.fullname" . }}
  labels:
    {{- include "webserver.labels" . | nindent 4 }}
spec:
{{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
{{- end }}
  selector:
    matchLabels:
      {{- include "webserver.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
      labels:
        {{- include "webserver.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          volumeMounts:
          - name: nginx-config
            mountPath: /etc/nginx/conf.d/default.conf
            subPath: nginx.conf
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
      volumes:
      - name: nginx-config
        configMap:
          name: {{ include "webserver.fullname" . }}-config
```

## Service Template
There are some field that is commonly used by the template
- metadata:
    - name
    - labels
- spec:
    - type
    - ports.port
    - selector

### Example
```yaml
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

## Linting and Testing
```bash
# Lint the template
$ helm lint ./webserver

# Test the template (dry-run)
$ helm install ca-demo1 ./webserver --dry-run

# Then actually install the chart
$ helm install ca-demo1 ./webserver
```

## References
- https://helm.sh/docs/chart_template_guide/function_list/
- https://cloudacademy.com/course/introduction-to-helm-1034
- https://github.com/cloudacademy/helm-demo