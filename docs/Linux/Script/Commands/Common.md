# Common Commands

## Echo
- `''` single quote: It will not expand any variable
- `""` double quote: It will expand variables inside the string
```bash
# Display hello
$ echo 'hello'

# help is a built-in command
$ type -a help
# result: 
# help is a shell builtin

# See help
$ help echo | less
```

## Uptime
```bash
# uptime is not a built-in command
$ type -a uptime
# result:
# uptime is /usr/bin/uptime

$ help uptime
# result:
# -bash: help: no help topics match `uptime'.  Try `help help' or `man -k uptime' or `info uptime'.

# See man
# man: manual
$ man uptime | less
```

## Id
- The specification of ID is in `/etc/login.defs`
- You can use `id <username>` to check if a user exists.
```bash
# Get id info
$ man id

# Get full info
$ id 

# Get uid
$ id -u

# Get username
# equal to `whomai`
$ id -un
$ whoami

# Get root info
$ sudo id
$ sudo id -u
$ sudo id -un
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
