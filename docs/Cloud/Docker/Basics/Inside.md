# Docker inside

## Docker location

First run commands to escalate privilege
```bash
sudo su
```

### Behind the Scene
- List the content of docker directory
```bash
ls -als /var/lib/docker
```
- Show image layers
```bash
ls -als /var/lib/docker/image/overlay2/imagedb/content/sha256/
```
- Show content
```bash
cat /var/lib/docker/image/overlay2/imagedb/content/sha256/<file_name> | python -m json.tool
```

### View general information
- A normal way to get general information about an image.
```bash
docker inspect ubuntu
```
- View docker info
```bash
docker info
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
