# Create User

These scripts will automatically create default user.

## Version 1
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

## Version 2
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

## Version 3
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