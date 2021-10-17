# Overview

- Docker Compose simplify the deployment of docker containers.
- Declarative instead of imperative.
- Template
```yaml
version: ...
services: 
  ...
volumes:
  ...
networks:
  ...
```

## Compose File
- Some configuration may only apply to swarm mode
- Some options are specified in the CLI

### Version
- A string like `'3'`.
- Can conlude minor version like `'3.4'`
- If left unspecified, the default is `'3.0'`
- This define how to interpret the compose file

### Services
- Services in your applications
- Nested Mapping
- Specify name for each container.
- Example:
```yaml
services:
  webapp:
    image: app
    ports:
    - "5000:5000"
    depends_on:
    - redis
  redis:
    image: redis
```
- Explanation
    - `webapp`: name of the container
    - `image`
        - image for the container
        - if you want to build on the fly, use `build:`
        - `build`
            - `context`: the directory of the app
            - `dockerfile`: alternative of the dockerfile
            - `args`: the arguments for build
            - https://docs.docker.com/compose/compose-file/compose-file-v3/
    - `ports`: a sequence of port mapping string
    - `depends_on`
        - Dependency for other containers
        - However, it still has no guarantee whether that container is ready for use, in this case, use some scripts to delay the initialization.

- Others options
    - `-e, --env` => `environment`
    - `-v, --volume, --mount` => `volumes`
    - `-p` => `ports`
    - ... 
-  Another Examples: `docker run --name app-cache -p 6379:6379 redis:4.0.6 redis-server --appendonly yes`
```yaml
version: '3'
services:
  app-cache:
    image: redis:4.0.6
    ports:
    - "6379:6379"
    command:
    - "redis-server"
    - "--appendonly"
    - "yes"
```

### Volumes
- Allows naming and sharing of volumes
- Support external volumes
```yaml
version: '3'
services:
  app-cache:
    image: redis:4.0.6
    volumes:
    # Named Volume
    - named-volume:/data
    # Compose File Relative Path
    - ./cache:/tmp/cache
    # Auto-generated voume
    - /tmp/stuff
volumes:
  named-volume:
  external-volume:
    external: true
```

### Networks
- One network created by default
- Suppose
```yaml
services:
  webapp:
    image: app
  cache:
    image: redis
    ports:
    - "36379:6379"
```
- In the default network
    - cache can reach web via `http://web:80`
    - web can reach redis via `redis://cache:6379`
- One the host machine
    - host can reach cache via `redis://localhost:36379`
    - host cannot reach web
- Custom network can be created through `external: true`
- Another example
```yaml
version: '3'
services:
  proxy:
    image: repo/proxy
    networks:
    - frontend
  app:
    image: repo/app
    networks:
    - frontend
    - backend
  db:
    image: redis
    networks:
      backend:
        aliases:
        - database
networks:
  frontend:
  backend:
    external: true
```

### Varialb Substitution
- Use shell environment in the Compose file
- Can use `$VAR` or `${VAR}`
- Substitute an empty string if the variable is not set
```yaml
services:
  proxy:
    image: 'redis:${REDIS_VERSION}'
```
```bash
export REDIS_VERSION=4.0.5
```

### Extension Fields
> **WARNING**: This is only for version 3.4 or higher!
- Reuse configuration fragments
- Root keys beginning with `x-`
```yaml
version: '3.4'
x-logging:
  &default-logging
  options:
    max-size: '10m'
    max-file: 7
  driver: json-file
services:
  web:
    image: repo/app
    logging: *default-logging
  cache:
    image: redis
    logging: *default-logging
```

## CLI
- Run multiple isolated environments
- Parallel execution model
- Compose file change detection

### Usage
- `docker-compose [OPTIONS] [COMMAND] [ARGS]`
- Connect to host by default
    - Connect to remost host using `-H`
    - Secure connection using `--tls*` options
- Looks for `docker-compose.(yml|yaml)`
    - `-f` specifies the another file
- Projects to represent isolated apps
    - Use directory as project name
    - Use `-p` for custom name

### Commands
- Many generalize docker commands
- Two commands are introduced by Compose
    - up:
        - Creates networks and named volumes
        - Builds, creates, starts, and attaches to service containers
        - Perform change detection
    - down:
        - Remove service containers, named and default networks
        - Leaves volume and images by default
- `config` command: used for checking the correctness of the compose file
- `build` command: used for building images for your application

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/