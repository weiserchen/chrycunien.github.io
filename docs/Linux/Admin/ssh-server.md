# Setup SSH server

This tutorial is for Ubuntu 20.04.

1. Update and Install ssh server
```bash
$ sudo apt update
$ sudo apt install openssh-server
```
2. Check ssh server status
```bash
$ sudo systemctl status ssh
```
3. Add firewall rule.
```bash
$ sudo ufw allow ssh
```
4. Connect to the VM
```bash
$ ssh <username>@<ip_address>
# ssh chiao@192.168.100.3
```

## References
- https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-20-04/