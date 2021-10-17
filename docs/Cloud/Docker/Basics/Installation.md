# Installation

## Create a Vagrant VM
```bash
mkdir docker-intro 
cd docker-intro
vagrant init centos/7
vagrant up
```

## Connect Using SSH
```bash
vagrant ssh
```

## Install and Update prerequisites
```bash
sudo yum remove docker docker-common docker-selinux docker-engine
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

## Install Docker
```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce -y
```

## Verify Installation
- Start Docker (Each time you reload the VM)
```bash
sudo systemctl start docker
```
- View Status
```bash
sudo systemctl status docker
```
- Run a **hello-world** container
```bash
sudo docker run hello-world
```

You should see the following messages:
```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
```

## Add user without root privilege

### Docker Group
- Check docker is in the group
```bash
grep docker /etc/group
```
- If not, add the `docker` group
```bash
sudo groupadd docker
```

### Docker user
- Add user to `docker` group
```bash
sudo gpasswd -a $USER docker
```
- Login again
```bash
newgrp docker
```

### Verification
- Check whether you can use this command
```bash
docker info
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
- https://app.vagrantup.com/centos/boxes/7

