# Special

This note document several special syntax
- `--`: it signifys the end of command options, after that only positional arguments are taken
```bash
# Normally, it means to find a pattern in reverse (not select)
$ grep pattern -v

# While in this example we want to find a pattern in a file named `-v`
$ grep -- pattern -v

# Therefore, we can conclude that all arguments after `--` will be treated as
# normal positional arguments, instead of command flags
```
- `VAR=XXX CMD [option]`: In this pattern, you can temporarily set a env variable
```bash
# We temporarily set a env variable `GOOS` equals `linux`
# , which make the go compiler use linux architecture to
# compile the binary this time, and will fall back to
# normal setting after this command is finished.
$ GOOS=linux go build -o submarine-operator .
```
- `${parameter:-word}` means if `parameter` is unset or null, the expansion of `word` will be used
```bash
# If the `CODEGEN_PKG` is not setm then is will expand to `cd "${SCRIPT_ROOT}"`
$ CODEGEN_PKG=${CODEGEN_PKG:-$(cd "${SCRIPT_ROOT}"; ls -d -1 ./vendor/k8s.io/code-generator 2>/dev/null || echo ../code-generator)}
```
- `set` built-in command: This command set differnet shell options. For more [information](https://ss64.com/bash/set.html).
```bash
# Tell shell do not ignore unset variable, if found, throw an error
$ set -u

# Abort execution if error occured
$ set -e
```
- `<<` vs `<<<` vs `< <()`: The explanation is in the command block. For more [information](https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash).
```bash
# << is called here-document. 
# It is used to signal the command what will be the ending string.
$ wc << EOF
> one two three
> four five
> EOF

# <<< is called here-string.
# Equivalent of `echo '5*4' | bc`
$ bc <<< 5*4

# <() is called process substitution. 
# Process substitution feeds the output of a process (or processes) into the stdin of another process.
$ $ echo <(echo bar)

# < <() means redirect the result of <() as the input to the command
# The first < is the simple redirection
$ wc < <(echo bar;echo foo)
```

## References
- https://unix.stackexchange.com/questions/11376/what-does-double-dash-mean
- https://askubuntu.com/questions/205688/whats-the-difference-between-set-export-and-env-and-when-should-i-use-each
- https://unix.stackexchange.com/questions/30470/what-does-mean-in-a-shell-script
- https://www.tutorialdocs.com/article/set-command-in-bash.html
- https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash