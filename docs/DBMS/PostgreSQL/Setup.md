# Setup

## Installation
```bash
$ brew install postgresql
```

## Add default user
```bash
$ /usr/local/opt/postgres/bin/createuser -s postgres
```
You may look for **peer authentication** of postgres.

## Login

### Default user
```bash
$ psql postgres
```
```
postgres=# select current_user;
```

### Postgres
```bash
$ psql -U postgres
```
```
postgres=# select current_user;
```
