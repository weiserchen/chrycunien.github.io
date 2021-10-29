# Case

## If - Elif - Else
- Syntax: `if COMMANDS; then COMMANDS; [ elif COMMANDS; then COMMANDS; ]... [ else COMMANDS; ] fi`
- You can use if else syntax to manipulate several conditions
- `=`: equals
- `==`: pattern matching
```bash
if [[ "${1}" = 'start' ]] then
  echo 'Starting.'
elif [[ "${1}" = 'stop' ]] then
  echo 'Stopping.'
elif [[ "${1}" = 'status' ]] then
  echo 'Status:'
else
  echo 'Supply a valid option.' >&2
  exit 1
fi
```

## Case
- `case` is a built-in command
```bash
$ type -a case
$ help case

# For more information
$ man bash
# Search for `case`, you will find that it use the same matching rules of pathname expansion
# Search for `pathname expansion`, and then look for the pattern matching section
# Actually, it just like what you normally used in `ls *.txt`
# *: match any string
# ?: match any single character
# [...]: matches any one of the enclosed characters
```
- Syntax: `case WORD in [PATTERN [| PATTERN]...) COMMANDS ;;]... esac`
- Instead of using `if-else`, you can use `case` statement just like `switch` in many programming languages
- The executed order is top-down, the cases are processed in order
- `|`: used for separate multiple patterns
- `;;`: the code block ends when it encounter two semi-colons
```bash title="test.sh"
#!/bin/bash

case "${1}" in
  start) echo 'Starting.' ;;
  stop) echo 'Stopping.' ;;
  status|state|--status|--state) echo 'Status:' ;;
  *)
    echo 'Supply a valid option.' >&2
    exit 1
    ;;
esac
```
- Usage:
```bash
$ ./test.sh start
$ ./test.sh stop
$ ./test.sh status
```


## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520