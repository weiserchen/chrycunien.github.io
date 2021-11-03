# Find files

## Overview
- The terminal will find commands under `$PATH` environment variables.
- `$PATH` is a colon (`:`) separated string, which stores possible directories of executable binary
```bash
$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/sbin:/home/vagrant/bin
```
- You can add path in `~/.zshrc` or `~/.bashrc`.
```bash 
export PATH="${PATH}:/the/path/you/want/to/add"
```
- And then you can reopen the terminal or `source ~/.zshrc` to load the configuration in the current shell.

## Locate
- `locate` shows all matching files in the dbs.
```bash
$ locate userdel
/usr/sbin/luserdel
/usr/sbin/userdel
/usr/share/bash-completion/completions/userdel
/usr/share/man/de/man8/userdel.8.gz
/usr/share/man/fr/man8/userdel.8.gz
/usr/share/man/it/man8/userdel.8.gz
/usr/share/man/ja/man8/userdel.8.gz
/usr/share/man/man1/luserdel.1.gz
/usr/share/man/man8/userdel.8.gz
/usr/share/man/pl/man8/userdel.8.gz
/usr/share/man/ru/man8/userdel.8.gz
/usr/share/man/sv/man8/userdel.8.gz
/usr/share/man/tr/man8/userdel.8.gz
/usr/share/man/zh_CN/man8/userdel.8.gz
/usr/share/man/zh_TW/man8/userdel.8.gz
```
- It maintains a cache (db) so you don't have to walk through all folders again and again.

## Updatedb
- If you add you custom files, you have to update the cache (if you want to use `locate` command) to be found in the db.
```
$ sudo updatedb
```
- Add you can use `locate` again to see the change.
- It uses a cronjob to update daily.

## Find
- `find` command is to do exhause search of a file in a given directory hierarchy. The default is `.`.
- `-name` specify the name of file under the directory.
```bash
$ find /usr/bin -name passwd
```
- This command has you own permission, so if may encounter `Permission Denied` issues if you do not have the permission to read that file or directory.

## References
- https://cloudacademy.com/course/shell-scripting-parsing-command-line-options-1520