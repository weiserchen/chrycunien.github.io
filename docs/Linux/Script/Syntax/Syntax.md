# Syntax

## Condition
- `if COMMANDS; then COMMANDS; [ elif COMMANDS; then COMMANDS; ]... [ else COMMANDS; ] fi`
- `help if` to see if syntax
- `test` is a command to evaluate expression, which is also used in the `if` command. Use `help test` to see more information.
- Besides `-eq`, we also can use `-ne`, `-lt`, `-le`, `-gt`, or `-ge`.
- You can use `;` as a command delimeter, but using `\n` is more readable.
- More information: [this link](https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php)
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

## Loop

### For Each Loop
- `for: for NAME [in WORDS ... ] ; do COMMANDS; done`
- Use `help for` for more information
- More information: [this link](https://www.cyberciti.biz/faq/bash-for-loop/)
```bash
for USER_NAME in "${@}"
do
  PASSWORD=$(date +%s%N | sha256sum | head -c48)
  echo "${USER_NAME}: ${PASSWORD}"
done
```

### While Loop
- `while COMMANDS; do COMMANDS; done`
- Use `help while` for more information
- `true`: return a successful result (it's exit status is always 0)
- Use `help true` or `man true` for more information.

```bash
while [[ "${#}" -gt 0 ]]
do
  echo "Number of parameters: ${#}"
  echo "Parameter 1: ${1}"
  echo "Parameter 2: ${2}"
  echo "Parameter 3: ${3}"
  echo
  shift
done
```

## Misc

### Unix philosophy
Each command do a single thing but it do it really well.
EX:
- `echo` only display character
- `head` only keep some head characters you specify
- ...
```bash
SPECIAL_CHARACTER=$(echo '!@#$%^&*()_-+=' | fold -w1 | shuf | head -c1)
```



## References
- https://cloudacademy.com/course/shell-scripting-user-account-creation-1517/
- https://cloudacademy.com/course/password-generation-shell-script-arguments-1518
- https://www.cyberciti.biz/faq/bash-for-loop/
- https://ryanstutorials.net/bash-scripting-tutorial/bash-if-statements.php