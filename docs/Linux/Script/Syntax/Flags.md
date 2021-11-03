# Flags

## getopts
- `getopts` is a shell built-in
- `getopts` is not equal to `getopt`, which is another command
```bash
$ type -a getopts
getopts is a shell builtin
getopts is /usr/bin/getopts

$ type -a getopt
getopt is /usr/bin/getopt
```
- `:` after a flag means that it must be parsed. For example, `vl:s` means that only when using `l` flag, you should specify a value after it, like `-l foobar`.
- `${OPTARG}` is the variable to store the result of each parsing.
- To parse all flags, you must use a `while` loop to wrap the `case`.
- `?` is the default match case.
- `usage()`: usually we will provide a usage function to tell user how to use this script

### Complete Form
```bash
while getopts vl:s OPTION
do
  case ${OPTION} in
    v)
      VERBOSE='true'
      log 'Verbose mode on.'
      ;;
    l)
      LENGTH="${OPTARG}"
      ;;
    s)
      USE_SPECIAL_CHARACTER='true'
      ;;
    ?)
      usage
      ;;
  esac
done
```

### Compact Form
```bash
while getopts 'rc:m:' flag; do
  case "${flag}" in
    c) CPUs="${OPTARG}" ;;
    m) MEMORY="${OPTARG}g" ;;
    r) RESET="true" ;;
    ?) helpFunc ;;
  esac
done
```

## Example
- `OPTIND` is the index of the first extra argument (or the next index of the last flag). For example, it you specify to flag `-la`, then the value of `OPTIND` is 3.
```bash
#!/bin/bash

# This script generates a random password.
# The user can set the password length with -l and add a special character with -s.
# Verbose mode can be enabled with -v.

usage() {
  echo "Usage: ${0} [-vs] [-l LENGTH]" >&2
  echo 'Generate a random password.' >&2
  echo '  -l LENGTH  Specify the password length.' >&2
  echo '  -s         Append a special character to the password.' >&2
  echo '  -v         Increase verbosity.' >&2
  exit 1
}

log() {
  local MESSAGE="${@}"
  if [[ "${VERBOSE}" = 'true' ]]
  then
    echo "${MESSAGE}"
  fi
}

# Set a default password length.
LENGTH=48

while getopts vl:s OPTION
do
  case ${OPTION} in
    v)
      VERBOSE='true'
      log 'Verbose mode on.'
      ;;
    l)
      LENGTH="${OPTARG}"
      ;;
    s)
      USE_SPECIAL_CHARACTER='true'
      ;;
    ?)
      usage
      ;;
  esac
done

# Remove the options while leaving the remaining arguments.
shift "$(( OPTIND - 1 ))"

if [[ "${#}" -gt 0 ]]
then
  usage
fi

log 'Generating a password.'

PASSWORD=$(date +%s%N${RANDOM}${RANDOM} | sha256sum | head -c${LENGTH})

# Append a special character if requested to do so.
if [[ "${USE_SPECIAL_CHARACTER}" = 'true' ]]
then
  log 'Selecting a random special character.'
  SPECIAL_CHARACTER=$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)
  PASSWORD="${PASSWORD}${SPECIAL_CHARACTER}"
fi

log 'Done.'
log 'Here is the password:'

# Display the password.
echo "${PASSWORD}"

exit 0
```

## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520
- https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash