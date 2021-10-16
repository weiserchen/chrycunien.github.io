# IO flow


## File descriptor
Everything in a Unix-like system is a file, including IO. Each file has a file descriptor associated with it.

There are 3 special file descriptors
- `STDIN` `0`: standard input, like you keyboard, other file, ...
- `STDOUT` `1`: like your console, monitor, ...
- `STDERR` `2`: usually the same as you console, but can be another file, too

Each file descriptors point to some file (a reference), so when you do some redirection, it actually let the descriptor point to another file (not changing the previous reference). (You will create a new reference if you reference a new file!)

## Redirection and Pipe
We can change the default setting of the `STDIN`, `STDOUT`, or `STDERR` to other files through redirection and pipe.
- redirection: redirect `STDIN`, `STDOUT`, or `STDERR` to some **file** (like a txt, device, ...)
- pipe: redirect the `STDIN`, `STDOUT`, or `STDERR` to the next **command**
- Note: the direction to read redirection in a command is from **LEFT** to **RIGHT**

### Operator
- `<` = `0<`: redirect `STDIN` to another file
- `>` = `1>`: redirect `STDOUT` to another file
- `2>`: redirect `STDERR` to another file
- `&1`: the `1` file descriptor
- `2>&1` (old way): redirect `STDERR` to descriptor `1` (`STDOUT`)
- `&>` (new way): redirecto both `STDOUT` and `STDERR` to `1` (`STDOUT`)
- `>&2`: redirect `STDOUT` to `STDERR`
- `|`: pipe the `STDOUT` to the next command
- `|&`: pipe both `STDOUT` and `STDERR` to the next command
- `/dev/null`: null device (just like a black hole)
- `2>&1 >/dev/null`: send only `STDERR` to the next command
    - First, redirect `STDERR` to `STDOUT` (actually make the `STDERR` point to the same file description that `STDOUT` is currently referring to (see `dup2()` and `open()`))
    - Second, redirect `STDOUT` to `/dev/null`

### Example
```bash
#!/bin/bash

# This script demonstrates I/O redirection.

# Redirect STDOUT to a file.
FILE="/tmp/data"
head -n1 /etc/passwd > ${FILE}

# Redirect STDIN to a program.
read LINE < ${FILE}
echo "LINE contains: ${LINE}"

# Redirect STDOUT to a file, overwriting the file.
head -n3 /etc/passwd > ${FILE}
echo
echo "Contents of ${FILE}:"
cat ${FILE}

# Redirect STDOUT to a file, appending to the file.
echo "${RANDOM} ${RANDOM}" >> ${FILE}
echo "${RANDOM} ${RANDOM}" >> ${FILE}
echo
echo "Contents of ${FILE}:"
cat ${FILE}

# Redirect STDIN to a program, using FD 0.
read LINE 0< ${FILE}
echo
echo "LINE contains: ${LINE}"

# Redirect STDOUT to a file using FD 1, overwriting the file.
head -n3 /etc/passwd 1> ${FILE}
echo
echo "Contents of ${FILE}:"
cat ${FILE}

# Redirect STDERR to a file using FD 2.
ERR_FILE="/tmp/data.err"
head -n3 /etc/passwd /fakefile 2> ${ERR_FILE}
echo
echo "Contents of ${ERR_FILE}:"
cat ${ERR_FILE}

# Redirect STDOUT and STDERR to a file.
head -n3 /etc/passwd /fakefile &> ${FILE}
echo
echo "Contents of ${FILE}:"
cat ${FILE}

# Redirect STDOUT and STDERR through a pipe.
echo
head -n3 /etc/passwd /fakefile |& cat -n

# Send output to STDERR
echo "This is STDERR!" >&2

# Discard STDOUT
echo
echo "Discarding STDOUT:"
head -n3 /etc/passwd /fakefile > /dev/null

# Discard STDERR
echo
echo "Discarding STDERR:"
head -n3 /etc/passwd /fakefile 2> /dev/null

# Discard STDOUT and STDERR
echo
echo "Discarding STDOUT and STDERR:"
head -n3 /etc/passwd /fakefile &> /dev/null

# Clean up
rm ${FILE} ${ERR_FILE} &> /dev/null
```



## References
- https://cloudacademy.com/course/linux-programming-conventions-1519
- https://stackoverflow.com/questions/2342826/how-can-i-pipe-stderr-and-not-stdout