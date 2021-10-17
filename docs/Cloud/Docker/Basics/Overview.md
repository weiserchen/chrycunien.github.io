# Docker Overview

## Example
```bash
sudo docker run -it ubuntu /bin/bash
```

### Commands
- `docker <command> [flags] <image> [cmds]`
- `run`: start creating a container, if some images specified are not found locally, it will automatically pull it from the remote repository, and then execute the following commands
- `-i`: interactive, redirect the standard IO
- `-t`: pseudo tty (terminal)
- `<image>`: the docker image you want to start
- `<cmds>`: the commands you want to execute after the container starts (in the container)

## Image vs Container
- Image is a **template**.
- Container is an **instalce** of image.
- Just as a program vs a running application

### Images
- Consists of layers represent file changes (like jounaling, or git).
- Show existing images:
```bash
sudo docker images
```
- The image id is the fragment `SHA256` of the image.
- Search for relevant images
```bash
sudo docker search <image_name>
```

### Containers
- Show running containers
```bash
sudo docker ps
```
- Show all previous running containers
```bash
sudo docker ps -a
```
- To restart an used container. (use `docker ps` to find the container name)
    - Start the container
    ```bash
    sudo docker start <container_name>
    ```
    - Attach to that container
    ```bash
    sudo docker attach <container_name>
    ```
- To stop an container
```bash
sudo docker stop <container_id>
```
- To run another command in an container
```bash
sudo docker exec -it web-server /bin/bash
```
- Remove a stopped container
```bash
sudo docker rm <container_id>
```
- Remove all stopped containers
```bash
sudo docker container prune
```
- Remove an image
```bash
sudo docker rmi <image_id>
```

## Login
- To push image to Docker Hub, create an account and use
```bash
docker login
```
- Then enter your username and password
- In order to upload an image, you have to specify an tag with naming covention `<your_username>/<image_name>:<version>`
- Use `docker push <image_name>` to upload an image.


## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/

