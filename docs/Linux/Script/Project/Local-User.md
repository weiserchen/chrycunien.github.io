# Local User

These scripts will automatically create default user.
## Create User

### Version 1
- Read user input using prompt.
- Require user to input name, comment, and password.
- Force user to change password when first login.
- Display the account information at last.
```bash
#!/bin/bash

# Make sure this script is executed by root
if [[ "${UID}" -ne 0 ]]
then
  echo 'You are not root'
  exit 1
fi

# Enter username
read -p "Enter your username: " USER_NAME

# Enter name for the account
read -p "Enter the real name for this user or application: " COMMENT

# Enter password
read -p "Enter your password: " PASSWORD

# Create a new user
useradd -c "${COMMENT}" -m "${USER_NAME}"

# Set default password
echo ${PASSWORD} | passwd --stdin ${USER_NAME}

# Check if the creation of user success or not
if [[ "${?}" -ne 0 ]]
then
  echo 'The account could not be created!'
  exit 1
fi

# Force password change on first login.
passwd -e ${USER_NAME}

echo "Your username is: ${USER_NAME}"
echo "Your default password is: ${PASSWORD}"
echo "Your host is: ${HOSTNAME}"
```

### Version 2
- Use command-line argument for user input instead of prompt.
- Add usage info.
- Auto-generate password by default.
```bash
#!/bin/bash

# Make sure this script is executed by root
if [[ "${UID}" -ne 0 ]]
then
  echo 'Please run with sudo or root'
  exit 1
fi

if [[ "${#}" -ne 3 ]]
then
  echo "Usage: ${0} USER_NAME [COMMENT]..."
  echo "Create an account on local user system by providing username and comments field"
  exit 1
fi

USER_NAME="${1}"

# Shift out the USER_NAME
shift
COMMENT="${*}"

SPECIAL_CHARACTER=$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)
PASSWORD="$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48)${SPECIAL_CHARACTER}"

# Create a new user
useradd -c "${COMMENT}" -m "${USER_NAME}"

# Set default password
echo ${PASSWORD} | passwd --stdin ${USER_NAME}

# Check if the creation of user success or not
if [[ "${?}" -ne 0 ]]
then
  echo 'The account could not be created!'
  exit 1
fi

# Force password change on first login.
passwd -e ${USER_NAME}

echo "Your username is: ${USER_NAME}"
echo "Your default password is: ${PASSWORD}"
echo "Your host is: ${HOSTNAME}"
```

### Version 3
- Output error messages to `STDERR`
- Suppress outputs of other commands (`&> /dev/null`)
```bash
#!/bin/bash

# Make sure this script is executed by root
if [[ "${UID}" -ne 0 ]]
then
  echo 'Please run with sudo or root' >&2
  exit 1
fi

if [[ "${#}" -ne 3 ]]
then
  echo "Usage: ${0} USER_NAME [COMMENT]..." >&2
  echo "Create an account on local user system by providing username and comments field" >&2
  exit 1
fi

USER_NAME="${1}"

# Shift out the USER_NAME
shift
COMMENT="${*}"

SPECIAL_CHARACTER=$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)
PASSWORD="$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c48)${SPECIAL_CHARACTER}"

# Create a new user
useradd -c "${COMMENT}" -m "${USER_NAME}" &> /dev/null

# Set default password
echo ${PASSWORD} | passwd --stdin ${USER_NAME} &> /dev/null

# Check if the creation of user success or not
if [[ "${?}" -ne 0 ]]
then
  echo 'The account could not be created!' >&2
  exit 1
fi

# Force password change on first login.
passwd -e ${USER_NAME} &> /dev/null

echo "Your username is: ${USER_NAME}"
echo "Your default password is: ${PASSWORD}"
echo "Your host is: ${HOSTNAME}"
exit 0
```

## Delete User

### Command
- `userdel` is used to delete user. (only used by root user)
```bash
# You cannot find user in normal node
# That is because it is a system command, 
# which is located under /usr/sbin instead of /usr/bin
$ type -a userdel
-bash: type: userdel: not found
```
- `-f` forcibly remove remove user and it's home directory and mail pool even if the user is logged in. (Hence dangerous)
- `-r` remove user and it's home directory and mail pool

### Example
- Usage: `sudo ./delete-user.sh`
```bash
#!/bin/bash

# This script deletes a user.

# Run as root.
if [[ "${UID}" -ne 0 ]]
then
   echo 'Please run with sudo or as root.' >&2
   exit 1
fi

# Assume the first argument is the user to delete.
USER="${1}"

# Delete the user.
userdel ${USER}

# Make sure the user got deleted.
if [[ "${?}" -ne 0 ]]
then
  echo "The account ${USER} was NOT deleted." >&2
  exit 1
fi

# Tell the user the account was deleted.
echo "The account ${USER} was deleted."

exit 0
```

### A Complex Example
- First, it checks for root privilege.
- Next, it parse arguments to determine whether to `delete`, `remove`, or `archive`.
- Plus, it checks that the user is not a system user.
- You have to give at least 1 user.
- Last, it will perform processing and checks for result and then display the performed actions.
```bash
#/usr/bin/env bash

readonly ARCHIVE_DIR='/archive'

# Usage function to tell user how to use the script
usage() {
  echo "Usage ${0} [-dra] USER [USERN]..." >&2
  echo "Disable accounts." >&2
  echo "  -d   Deletes accounts instead of disable them" >&2
  echo "  -r   Rremoves the home directory associated with the accounts" >&2
  echo "  -a   Creates an archive of the home directory with the accounts" >&2
  echo "       and stores the archive in /archives directory." >&2
  exit 1
}

# Check if the user exists and not a system user
check_id() {
  USER_ID=$(id -u "${1}")
  if [[ "${?}" -ne 0 ]]
  then
    echo "Account ${1} does not exist!" >&2
    exit 1
  fi

  if [[ "${USER_ID}" -lt 1000  ]]
  then
    echo "Should not delete system account: ${1}" >&2
    exit 1
  fi
}

archive() {
  local HOME_DIR="/home/${1}"
  local ARCHIVE_FILE="${ARCHIVE_DIR}/${1}.tar.gz"

  if [[ "${ARCHIVE}" = 'true' ]] ; then
    if [[ ! -d "${ARCHIVE_DIR}" ]] ; then
      echo "Archive Directory does not exist!" >&2
      exit 1
    fi 

    tar -zcf "${ARCHIVE_FILE}" "${HOME_DIR}" 2>&1 > /dev/null
    if [[ "${?}" -ne 0 ]] ; then
      echo "Failed to create archive ${ARCHIVE_FILE}!" >&2
      exit 1
    fi
    echo "Successfully archive account ${1} to ${ARCHIVE_FILE}!" >&2
  fi
}

delete() {
  userdel "${REMOVE}""${1}"
  if [[ "${?}" -ne 0 ]] ; then
    echo "Failed to delete account ${1}!" >&2
    exit 1
  fi
  echo "Successfully delete account ${1}!" >&2
}

disable() {
  chage -E 0 "${1}"
  if [[ "${?}" -ne 0 ]] ; then
    echo "Failed to disable account ${1}!" >&2
    exit 1
  fi
  echo "Successfully disable account ${1}!" >&2
}

# Check if the user has root privilege
if [[ "${UID}" -ne 0 ]]
then
  echo "You are not root!" >&2
  exit 1
fi

# Parse arguments
while getopts 'dra' flag; do
  case "${flag}" in
    d) DELETE='true' ;;
    r) REMOVE='-r' ;;
    a) ARCHIVE='true' ;;
    ?) usage ;;
  esac
done

# Get extra arguments
shift "$(( $OPTIND - 1 ))"

if [[ "${#}" -eq 0 ]]
then
  echo "You have to give at least one account name!" >&2
  usage
fi

# Archive users home directories
if [[ ! -d "${ARCHIVE_DIR}" ]]; then
  mkdir -p "${ARCHIVE_DIR}"
  if [[ "${?}" -ne 0 ]] ; then
    echo "Failed to create archive directory: ${ARCHIVE_DIR}!" >&2
    exit 1
  fi
fi

# Process commands
for USERNAME in "${@}"; do
  echo "Processing user: ${USERNAME}" >&2

  # Check Account UID
  check_id "${USERNAME}"

  # Make archive for this user
  archive "${USERNAME}"

  if [[ "${DELETE}" = 'true' ]] ; then
    delete "${USERNAME}"
  else
    disable "${USERNAME}"
  fi
done
```

## Disable Users

### Chage
- `chage` is the command to set the expire date of an account.
- `0` means disable right now.
- `-1` means never disable.
```bash
# Disable
$ sudo chage -E 0 wizard

# Permanently enable
$ sudo chage -E -1 wizard
```

### Passwd
- `passwd` is another way to disable accounts.
- However, it won't disable ssh access, so prevent to use it.
```bash
# Lock user
$ sudo passwd -l wizard

# Unlock user
$ sudo passwd -u wizard
```

### Nologin
- The last way is to set the default login shell to `nologin` so that it cannot perform login action.
```bash
$ sudo usermod -s /sbin/nologin wizard
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520