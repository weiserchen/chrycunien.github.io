# Dockerfile

## Prerequisites
- Enter root privilege
```bash
sudo su
```
- Install and update yum packages
```bash
yum install epel-release -y
yum update
```
- Install Go
```bash
yum install golang -y 
```
- Verify Installation
```bash
go version
```
- Install vim
```bash
sudo yum install vim-enhanced -y  
```

## Example 1

### Source code 
`hello.go`:
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}

// go build hello.go
```
### Dockerfile configuration
```dockerfile
FROM scratch
COPY hello /
CMD ["./hello"]
```
- `FROM`: the base image
    - `scratch`: the minimalist base
- `COPY`: copy file from host to container
    - `COPY <src> <dest>`
- `CMD`: command to execute
    - `CMD ["<binary/command>", "arg1", ...]`

## Create an image
- You can also made an container into an image.
```bash
sudo docker commit <container_id> <new_image_name>
# sudo docker commit d381ad9a146f ubuntu_python
```
- To change the initial command:
```bash
sudo docker --change='CMD [commands]' commit <container_id> <new_image_name>
# sudo docker commit --change='CMD ["python", "-c", "import this"]' d381ad9a146f ubuntu_python
```

## Build image

### Build with tag name
```bash
docker build -t greeting .
```
- `docker build -t <tag_name> <directory>`

## Example 2

### Source Code
`webapp.go`:
(This server is dangerous, don't use in production!)
```go
package main

import (
	"fmt"
	"net/http"
	"os"
)

func hostHandler(w http.ResponseWriter, r *http.Request) {
	name, err := os.Hostname()

	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, "<h1>Hostname: %s</h1>", name)
	fmt.Fprintf(w, "<h1>Environment vars:</h1><br>")
	fmt.Fprintf(w, "<ul>")

	for _, evar := range os.Environ() {
		fmt.Fprintf(w, "<li>%s</li>", evar)
	}

	fmt.Fprintf(w, "</ul>")
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Awesome site in Go!</h1><br>")
	fmt.Fprintf(w, "<a href='/host/'>Host info<br>")
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/host/", hostHandler)
	http.ListenAndServe(":8080", nil)
}
```

### Build Executable
Important!! You need to use static linking because go use dynamical linking by default.
In this situation, the `CGO_ENABLED=0` disable this behavior. You can find more information in the references.
```bash
CGO_ENABLED=0 go build webapp.go
```

### Dockerfile
```docker
FROM scratch
COPY webapp /
EXPOSE 8080
CMD ["./webapp"]
```

### Run
```bash
docker build -t "webapp" .
docker run --name=webapp -d webapp
# Output like: 00ceff55fe44a5cb46283f5d2b516877518db2b271215f9aa4e1b1891adedb51
# This is the container id
```
- `--name=webapp`: lable the container id as webapp for better management
- `-d`: detached mode, let container run in the background
- `-P`: map port to the host, like `0.0.0.0:49153->8080/tcp` (use docker ps)
- `-p`: map a specified port to host, `-p <host_port>:<container_port>`, like `-p 3000:8080`


### Inspect
```bash
docker inspect 00ceff55fe44a5cb46283f5d2b516877518db2b271215f9aa4e1b1891adedb51
```
- `docker inspect <container_id>`

You will find the ip address of the container, use it to connect to the container
```bash
curl 172.17.0.2:8080
```
- `curl <ip_address>:<port>`

## Tagging
- Tag when building, `latest` is the default tag.
```bash
docker build -t <tag>:<version> .
```
- Tag the existing images (add another tag to an image)
```bash
docker tag demo:latest demo:v1
```

## Another Example
```dockerfile
# Python v3 base layer
FROM python:3

# Set the working directory in the image's file system
WORKDIR /usr/src/app

# Copy everything in the host working directory to the container's directory
COPY . .

# Install code dependencies in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Indicate that the server will be listening on port 5000
EXPOSE 5000

# Set the default command to run the app
CMD [ "python", "./src/app.py" ]
```


## References
- https://www.cyberithub.com/install-go-on-centos/
- https://www.javatpoint.com/how-to-install-vim-on-centos
- https://www.arp242.net/static-go.html
- https://docs.docker.com/engine/reference/builder/
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
