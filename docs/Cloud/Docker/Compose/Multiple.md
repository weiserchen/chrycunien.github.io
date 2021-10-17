# Multiple Compose Files
- Compose can combine compose files
    - Base configuration + overrides
    - Default files
        - `docker-compose.yml`
        - `docker-compose.override.yml`
    - `-f` to specify non-default overrides, can be used multiple times
- `config` to view the final effective configuration
- `-H` to connect to remost host

## An Example
- `Dockerfile`
```dockerfile
FROM python:3 

RUN mkdir /src
WORKDIR /src 
COPY . .
RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```
- `docker-compose.yml`
```yaml
version: '3'
services: 
  web:
    build: .
    ports: 
      - "5000:5000"
  redis:
    image: redis
```
- `dev.docker-compose.yml`
```yaml
version: '3'
services: 
  web:
    volumes: 
      - '.:/src'
```

## Production Considerations
- Remove any `volume`s for source code, let the image self-contained
- Use `restart: always`
- Don't specify specific host ports
- Production mode `environment` variables 
- Additional services like monitoring, logging, ...

## A complex example
- `dev.dockerfile`
```dockerfile
FROM node:6 

RUN npm install --global nodemon

RUN mkdir /src
WORKDIR /src
ADD ./src/package.json /src/package.json
RUN npm install 

EXPOSE 3000

CMD ["nodemon", "-L", "/src/app/bin/www"]
```
- `prod.dockerfile`
```dockerfile
FROM node:6 

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
COPY ./src .

RUN npm install --production && npm run build

CMD ["npm", "start"]
```
- `docker-compose.yml`
```yaml
version: '3'
services: 
  web:
    build: .
    ports: 
      - "5000:5000"
  redis:
    image: redis
```
- `docker-compose.yml`
```yaml
version: '3'
services: 
  app:
    image: your-registry:5000/accumulator
    environment: 
      - NODE_ENV=development
      - DB_HOST=app-db 
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
- `dev.docker-compose.yml`
```yaml
version: '3'
services: 
  app:
    build: 
      context: .
      dockerfile: dev.dockerfile 
    ports:
      - "3000:3000"
    environment: 
      - NODE_ENV=development
    volumes: 
      - "./src:/src/app"
```
- `prod.docker-compose.yml`
```yaml
version: '3'
services: 
  app:
    build: 
      context: .
      dockerfile: prod.dockerfile 
    ports:
      - "8080"
    environment: 
      - NODE_ENV=production
    restart: always
  app-db:
    volumes: 
      - 'db-data:/data/db'
    restart: always
volumes: 
  db-data:
```

- View development configuration
```bash
docker-compose -f docker-compose.yml -f dev.docker-compose.yml config
```
- View production configuration
```bash
docker-compose -f docker-compose.yml -f prod.docker-compose.yml config
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/