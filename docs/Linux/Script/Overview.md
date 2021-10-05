# Overview

Shell script is a series of commands that automate a complex process. 

## Basics
- `#!/bin/bash`: this lines told that we want to use `/bin/bash` as the interpreter. In not set, it will use the default shell (`zsh` in Mac). The `#!` is called Shebang, the combination of `#` (sharp, pound sign) and `!` (bang, exclamation mark). This linke is really helpful if you collaborate with you team. You always have to specify this line if you don't want to break the process if someone use a different shell in his/her computers.
- You will add a lot of commands to document this script unless you want to see a garbage after 3 months later.
- You can add only commands but also some control commands (if, for) to control the execution flow.

### Structure
```bash title=test.sh
#!/bin/bash

# comment1
VAR='1234312'
command 1

# comment2
command 2
```

### Execution
```bash
# Add execution privilege to the script
# Or you can use `chmod 755 ./test.sh`
$ chmod +x ./test.sh

# Execute in sub-shell
# or sh ./test.sh
$ ./test.sh

# Execute in current shell
# or . ./test.sh
$ source ./test.sh
```


## References