# Function

- DRY principle: Don't repeast yourself
- Functions help you organize the same bit of code in the same place so you can reuse it and it servers as a single update point
- The exit status of a function will be the exit status of the last command in the function (unless you use return explicitly)

## Examples
- `local` keyword: to limit the scope of the variable to the function, the variable only exists in the function
- `readonly` keyword: to prevent modification later
- `${@}`: expands to positional arguments, starting from one
- `return` keyword: return from the function
- `exit`: exit the entire script
- `cp -p`: copy the file with its onwership, privilege, timestamp ... properties being preserved
- `logger -t`: log to syslog with name as tag, in centos syslog = `/var/log/messages`
- `date +%F-%N`: Display Full date and Nanoseconds
```bash
#!/bin/bash

# This script demonstrates the use of functions.

log() {
  # This function sends a message to syslog and to standard output if VERBOSE is true.

  local MESSAGE="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then
    echo "${MESSAGE}"
  fi
  logger -t luser-demo10.sh "${MESSAGE}"
}

backup_file() {
  # This function creates a backup of a file.  Returns non-zero status on error.

  local FILE="${1}"

  # Make sure the file exists.
  if [[ -f "${FILE}" ]]
  then
    # Create the file name that is easy to sort files by date
    local BACKUP_FILE="/var/tmp/$(basename ${FILE}).$(date +%F-%N)"
    log "Backing up ${FILE} to ${BACKUP_FILE}."

    # The exit status of the function will be the exit status of the cp command.
    cp -p ${FILE} ${BACKUP_FILE}
  else
    # The file does not exist, so return a non-zero exit status.
    return 1
  fi
}

readonly VERBOSE='true'
log 'Hello!'
log 'This is fun!'

backup_file /etc/passwd

# Make a decision based on the exit status of the function.
# Note this is for demonstration purposes.  You could have
# put this functionality inside of the backup_file function.
if [[ "${?}" -eq '0' ]]
then
  log 'File backup succeeded!'
else
  log 'File backup failed!'
  exit 1
fi
```


## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520