# Syntax

This note is a brief introduction to docker file syntax. For more [information](https://docs.docker.com/engine/reference/builder/).

- `FROM`: Specify the base image
```dockerfile
FROM ubuntu:18.04
```
- `RUN`: Run some commands, usually used in setting up environment
```dockerfile
RUN apt-get update && apt-get install -y wget vim git curl
```
- `ENV`: Set environment variable of the image
```dockerfile
ENV PATH="${PATH}:/usr/src/code"
```
- `ARG`: Used for supplying argument when using `docker build`
```dockerfile
ARG NODE_VER
ADD ./${NODE_VER:-node-v5.9.1-linux-armv7l} /
```
```bash
$ docker build --build-arg NODE_VER=node-v5.9.0-linux-armv7l .
```
- `ENTRYPOINT`: Replace the default command (bash) to the command you specify
```dockerfile
ENTRYPOINT ["echo", "Hello Docker"]
```
- `CMD`: The startup command when you start a container, equals `bash <COMMAND>`
```dockerfile
CMD ["/usr/src/submarine-operator", "-incluster=true"]
```
- `WORKDIR`: Set the working directory
```dockerfile
WORKDIR /usr/submarine
```
- `COPY`: Copy local file to the docker image
```dockerfile
COPY . ${ONOS_ROOT}
```
- `ADD`: Similar to `COPY`, but more powerful, allowing using URL. But recommended to use `COPY` if you don't need the functionality `ADD` provides.
```dockerfile
ADD submarine-operator /usr/src
```

## References
- https://peihsinsu.gitbooks.io/docker-note-book/content/dockerfile-env-vs-arg.html
- https://stackoverflow.com/questions/24958140/what-is-the-difference-between-the-copy-and-add-commands-in-a-dockerfile
- https://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile#:~:text=CMD%20is%20an%20instruction%20that,container%20with%20a%20specific%20executable.
- https://github.com/apache/submarine/blob/master/submarine-cloud-v2/dev.Dockerfile
- https://github.com/opennetworkinglab/onos/blob/master/Dockerfile