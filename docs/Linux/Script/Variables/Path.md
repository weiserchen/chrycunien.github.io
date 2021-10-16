# Path

This section introduce the `PATH` environment variable.
- Use `man bash` and search for `PATH`. You may need to search for a little bit time.
- Path is a colon separated list of directories in which the shell look for commands.
- The shell will search for commands **in orders**, which means you can intercept a command by adding a new path before the original path. (like `export PATH="/my/new/directory:${PATH}"`)
- The command may be hashed (and stored in the shell for quick lookup), if you want to reset the hashed table, use `hash -r`

```bash
$ echo "${PATH}"
# You may see something like this:
# /usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/usr/sbin:/home/vagrant/bin

# Find where is a command located
$ which head

# Find all possible commands
$ which -a head
```

## File Path
- `basename`: strip to file path (left file name)
- `dirname`: strip the file part (left directory name)
- These two commands will not bother whether this path exist or not
- Use `man basename` and `man dirname` for more information.

```bash
$ basename /vagrant/test.sh
# Result:
# test.sh

$ dirname /vagrant/test.sh
# Result:
# /not

$ basename /not/exist
# Result:
# exist

$ dirname /not/exist
# Result:
# /vagrant

```


