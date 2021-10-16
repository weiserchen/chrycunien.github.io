# User Input

## Prompt
Prompt is a way to interactively get data from user.
- Use `help read` for more information
- Actually you can specify multiple variable you want to read
```bash
$ read -p 'Enter the username to create: ' USER_NAME

# Read multiple variables at the same time
# You have to put a space between each variable
$ read -p "TEST: " var1 var2 var3
# TEST: 1 2 3
```

## Create User
- `-c` --comment: It is generally a short description of the login, and is currently used as the field for the user's full name.
- `-m` --create-home: Create the user's home directory if it does not exist. By default, if this option is not specified and CREATE_HOME is not enabled, no home directories are created.
- Use `man useradd` for more information
```bash
# By putting COMMENT in quote, it ensure that all comment will be seen as a single entity, not affected by characters like spaces.
$ useradd -c "${COMMENT}" -m ${USER_NAME}
```

### Convention
- By covention, a username is less than 8 characters. So if your username is longer than that, it may not be fully displayed in some commands like `ps -ef`
- Also, you cannot use some special characters just like you register in some website.
```bash
$ sudo useradd dougstamper

# Use login shell
$ sudo su - dougstamper

# Notice that the username is not fully displayed
$ ps -ef
# Result:
# dougsta+ ...
```

### Configuration
- You can see the `CONFIGURATION` field in the man page to see some configs when creating a user.
- The default config is stored in `/etc/login.defs`


## Set user's password
A default scene for this is that an admin will set a default password and then a new user uses this default password and then change to a new password.
- `--stdin`: Get data from standard input (pipe)
- `-e` --expire: force user to change the password when they first login
```bash
# OR: `echo "${USER_NAME}:${PASSWORD}" | chpasswd`
$ echo ${PASSWORD} | passwd --stdin ${USER_NAME}

# Force password change on first login.
passwd -e ${USER_NAME}
```

## Run the script
- Only root can creat a user.
```bash
$ sudo ./create-user.sh
```

## Check the user is created
```bash
$ cat /etc/passwd
# Or
$ tail /etc/passwd
```

## Switch to a new account
- We are not using `sudo` because vagrant is just a normal user, we can't trust it.
- If you use `sudo` to login, it will require no password
- `-` means login shell
- The first time you login this account, it will force you to change the password.
```bash
$ su - jsmith
```

## Full script
```bash
#!/bin/bash

# This script creates an account on the local system.
# You will be prompted for the account name and password.

# Ask for the user name.
read -p 'Enter the username to create: ' USER_NAME

# Ask for the real name.
read -p 'Enter the name of the person who this account is for: ' COMMENT

# Ask for the password.
read -p 'Enter the password to use for the account: ' PASSWORD

# Create the user.
useradd -c "${COMMENT}" -m ${USER_NAME}

# Set the password for the user.
# NOTE: You can also use the following command:
#    echo "${USER_NAME}:${PASSWORD}" | chpasswd
echo ${PASSWORD} | passwd --stdin ${USER_NAME}

# Force password change on first login.
passwd -e ${USER_NAME}
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
