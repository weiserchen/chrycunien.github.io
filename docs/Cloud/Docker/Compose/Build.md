# Build

- Use Dockerfile for image build construction
- Compose file `build` key
- `docker compose` + `up` or `build`

## Compose file
- Two forms
```yaml
build: ./dir

build:
  context: ./dir
  dockerfile: the.dockerfile
  args:
    buildno: 1
  # add this line for custom tag
  # image: name:tag
```

## Commands
- `docker-compose up`
    - Build image for those had not been build, and will not rebuilt those old ones
    - Add `--build` to always build images
- `docker-compose build`
    - Re/builds images without starting
    - `--no-cache`: prevent using layer cache and rebuild all layers
    - `--pull`: always pull new version of the base image

## Example
- `dev.Dockerfile`:
```dockerfile
FROM node:6 

RUN npm install --global nodemon

RUN mkdir src
WORKDIR /src
ADD ./src/package.json /src/package.json
RUN npm install 

EXPOSE 3000

CMD ["nodemon", "-L", "/src/app/bin/www"]
```

- `dev-docker-compose.yml`
```yaml
version: '3'
services: 
  app:
    build: 
      context: .
      dockerfile: dev.Dockerfile 
    image: accumulator
    ports:
      - "3000:3000"
    environment: 
      - NODE_ENV=development
      - DB_HOST=app-db 
    volumes: 
      - "./src:/src/app"
    depends_on: 
      - app-db 
    networks: 
      - backend
  app-db:
    image: mongo:3
    networks: 
      - backend 
networks: 
  backend:
```

## References
- https://docs.docker.com/compose/compose-file/compose-file-v3/
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/
