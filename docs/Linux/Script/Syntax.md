# Syntax

## Loop
- `if COMMANDS; then COMMANDS; [ elif COMMANDS; then COMMANDS; ]... [ else COMMANDS; ] fi`
- `help if` to see if syntax
- `test` is a command to evaluate expression, which is also used in the `if` command. Use `help test` to see more information.
- Besides `-eq`, we also can use `-ne`, `-lt`, `-le`, `-gt`, or `-ge`.
- You can use `;` as a command delimeter, but using `\n` is more readable.
```bash
#!/bin/bash

# Display if the user is the root user or not.
# [] is old syntax, [[]] is newer
# Note that [[]] is specific to bash
if [[ "${UID}" -eq 0 ]]
then
  echo 'You are root.'
else
  echo 'You are not root.'
fi
```

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

## Misc

### Command result
You can use `$()` to enclose a command, and the result can be assigned to another variable.
```bash
USER_NAME=$(id -un)
echo "${USER_NAME}"
```

## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/