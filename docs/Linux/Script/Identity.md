# Identity

Unix systems use `UID` (user ID) to identify a user. The UID of root is `0`.

## Get User ID
You can use `man bash` to find the UID documentation.
```bash
$ echo "${UID}"
```

## Get User Name
```bash
# (id -un) = whoami
$ USER_NAME=$(id -un)
$ echo "${USER_NAME}"
```

## Full script
```bash
#!/bin/bash

# Display the UID and username of the user executing this script.
# Display if the user is the root user or not.

# Display the UID
echo "Your UID is ${UID}"

# Display the username
USER_NAME=$(id -un)
echo "Your username is ${USER_NAME}"

# Display if the user is the root user or not.
if [[ "${UID}" -eq 0 ]]
then
  echo 'You are root.'
else
  echo 'You are not root.'
fi
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/

