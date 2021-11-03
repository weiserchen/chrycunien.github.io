# Numeric Operations

## Numeric Expansion
- `$(( ))` is called numeric expansion. Bash will expand the expression inside into a numeric value. Don't be confused with `$()`, which is command substitution.
- Bash does not do any rounding, it just omit the value after the decimal point. If you want to get precise result, please refer to `bc` command.

### Examples
```bash
$ NUM=$(( 1 + 2 ))
# NUM = 3
# also -*/%

$ (( NUM++ ))
# NUM = 4
# also --

$ (( NUM += 3 ))
# NUM = 7
# also -=/*=//=/%=

$ NUM=$(( NUM += 6 ))
# NUM = 13

$ A='3'
$ B='4'
$ C=$(( A + B ))
# C = 7
```

## Other Tools
```bash
$ type -a bc
bc is /usr/bin/bc
$ type -a let
let is a shell builtin
$ type -a expr
expr is /usr/bin/expr
```

## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520