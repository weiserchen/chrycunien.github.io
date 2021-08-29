# Docker Network

## Default (Bridge) network
This is created in isolation with host network. Usually start with `172.x.x.x`.

### Commands
- List docker network
```bash
docker network ls
```
- You can hit `Ctrl+p` + `Ctrl+q` to exit the container without closing it.
- List the local network (in one of the container)
```bash
arp-scan --interface=eth0 --localnet
```


### Dockerfile
The webapp is the application previously used in `Docker-file.md`.
```dockerfile
FROM ubuntu:16.04

RUN apt update && apt install -y \
    arp-scan \
    iputils-ping \
    iproute2

COPY webapp /

CMD ["/bin/bash"]
```

### Build

```bash
docker build -t "ubuntu_networking" .
```

## Host Network
This network has no isolation with host network.

### Commands
- Specify host network.
```bash
docker run -d --network=host ubuntu_networking /webapp
```

## None Network

### Commands
- Specify none network.
```bash
docker run -it --network=none ubuntu_networking 
```
- Try to ping `google.com`, and it will fail.
- List IP address, and only loopback network is present
```bash
ip addr
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
