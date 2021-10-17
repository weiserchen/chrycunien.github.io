# Deploy Wordpress

## Source Code 
`wordpress.yml`:
```yaml
version: '3'
services:
  db:
    image: mysql:5.7
    volumes:
    - db_data:/var/lib/mysql
    # always restart if the container exit for any reason 
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
  wordpress:
    depends_on: 
    - db
    image: wordpress:latest
    ports:
    - "8000:80"
    restart: always
    # a different way to declare environments
    environment:
      - WORDPRESS_DB_HOST=db:3306
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
volumes:
  db_data: 
```

## Deploy
- Usage
```bash
# Start using wordpress.yml
docker-compose -f wordpress.yml

# OR you can use -d for detached 
```
- Go to `http://localhost:8000` to verify
- Another options
```bash
# Avoid the restart of link services (like db containers)
docker-compose -f wordpress.yml -d --no-deps wordpress

# Force recreate each container
docker-compose -f wordpress.yml -d --force-recreate
```



## Clean up
- Bring down the Compose
```bash
docker-compose -f wordpress.yml down

# OR use ^c if you do not detach the service
```
- Complete bringdown.
```bash
docker-compose -f wordpress.yml down --rmi all --volumes --remove-orphans
```
- Other options
```bash
# Clean up all containers
docker container prune

# Clean all images
docker image prune -a
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/