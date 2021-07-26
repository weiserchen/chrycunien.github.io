# Intro
Each process has a directory assosiated with it called **working directory**, which is inherited by the parent process.

The **absolute** path is the combination of **working directory** and **relative path**. 

The file system provides the following notation to navigate among the system:
- `.` means the current directory
- `..` means the parent directory
- `~` means the user's home directory
- `/` means the root directory

```bash
# Print working directory
$ pwd

# Change directory
$ cd 
```

Go provides several funtinalities in `path/filepath` and `os` for manipulating the file path.