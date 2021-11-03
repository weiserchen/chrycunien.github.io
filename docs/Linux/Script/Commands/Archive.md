# Archive

## Overview
- `.tar` is a Linux archive standard, used to package files or directories into a single file
- `.tar.gz` = `.tgz` is a gzip compressed version of tar file

## Tar
- `tar` command is the package command of Linux.
- `-c` create an archive.
- `-t` peek the archive content without extracting it.
- `-v` increase verbosity so you can see which files you archive when you execute `tar` command
- `-f` specify the file name of the archive.
- `-z` compressed the archive in the same time.
- Usually, you will use this combination `tar -zcvf`, `tar -ztvf`, or `tar -zxvf`
- `tar zcvf` is an old syntax. You can replace it with `tar -zcvf` (or `tar -z -c -v -f` in any order)
- If you compressed the top-level directory, it will remove the `/` prefix. For instace, `/etc` -> `etc` to prevent you from accidentally overwrite the original directory.
```bash
# Archive and compress file
$ tar -zcvf test.tar.gz test/
# -> test.tar.gz

# Peek archive content
$ tar -ztvf test.tar.gz

# Extract archive content
$ tar -zxvf test.tar.gz
```
## Zip
- `gzip` is a compressed command of Linux.
- `gunzip` is a uncompressed command of Linux.
```bash
$ gzip test.tar
# -> test.tar.gz

$ gunzip test.tar.gz
# -> test.tar
```
- `gzip` and `gunzip` can also be used to compressed a general file into a `.zip` file.

## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520