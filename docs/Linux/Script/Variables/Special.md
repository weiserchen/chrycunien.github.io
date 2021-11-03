# Special

## Exit Status
The exit status of the previous command will be stored in this variable: `?`.
```bash
$ echo "${?}"
```

### Example
```bash
# Only display if the UID does NOT match 1000.
UID_TO_TEST_FOR='1000'
if [[ "${UID}" -ne "${UID_TO_TEST_FOR}" ]]
then
  echo "Your UID does not match ${UID_TO_TEST_FOR}."
  exit 1
fi

# Test if the command succeeded.
if [[ "${?}" -ne 0 ]]
then
  echo 'The id command did not execute successfully.'
  exit 1
fi
echo "Your username is ${USER_NAME}"

# Explicitly declare exit status as 0
# Else the exit status will be the previous command exit status
# Why? for example, you execute a command, but it will not fail but only set the exit status
# To limit the scope of this script, by adding `exit 0`, once the result is not disastrout, it will 
# the exist status to 0.
exit 0
```

## Command Line Arguments

### Special Variables
- `${0}`, `${1}`, ...: command-line arguments
- `${#}`: the number of arguments
- `${@}`: a list of positional arguments except for `${0}`, evaluates to [`${1}`, `${2}`, ...]
- `${*}`: nearly the same as `${@}`, but separated by a space, "$1c$2c"
- Use `man bash` and search for `Special Paramters` for more information.

### Example
```bash
#!/bin/bash

# This script generates a random password for each user specified on the comand line.

# Display what the user typed on the command line.
echo "You executed this command: ${0}"

# Display the path and filename of the script.
echo "You used $(dirname ${0}) as the path to the $(basename ${0}) script."

# Tell them how many arguments they passed in.
# (Inside the script they are parameters, outside they are arguments.)
NUMBER_OF_PARAMETERS="${#}"
echo "You supplied ${NUMBER_OF_PARAMETERS} argument(s) on the command line."

# Make sure they at least supply one argument.
if [[ "${NUMBER_OF_PARAMETERS}" -lt 1 ]]
then
  echo "Usage: ${0} USER_NAME [USER_NAME]..."
  exit 1
fi

# Generate and display a password for each parameter.
for USER_NAME in "${@}"
do
  PASSWORD=$(date +%s%N | sha256sum | head -c48)
  echo "${USER_NAME}: ${PASSWORD}"
done
```

## Misc

### Previous command
- `!`: Adding this character before a partial command will execute the most recent command with the prefix specified
```bash
# Some commands
$ vim test.sh
$ ./test.sh

# Execute the most recent command that start with v 
# -> vim test.sh
$ !v

# Execute the most recent command that start with
# -> ./test.sh
$ !./

# Execute the most recent command
# -> !./test.sh
$ !!

# Expand to the last part of the previous command
# But it will also print the command as well in the output
# echo 'Hello' > test.txt
# -> cat test.txt
# -> ... content of test.txt
$ cat !$
```

### Command Substitution
You can use `$()` to enclose a command, and the result can be assigned to another variable.
```bash
USER_NAME=$(id -un)
echo "${USER_NAME}"
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
- https://cloudacademy.com/course/password-generation-shell-script-arguments-1518