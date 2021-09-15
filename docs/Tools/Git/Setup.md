# Setup

1. Install git via package manager (brew for mac)
```bash
$ brew install git
```
2. Config setup
```bash
$ git config --global user.name "<github_username>"
$ git config --global user.email "<github_email>"
$ git config --global  color.ui true
$ git config --global  core.editor vim
$ git config --global  core.ignorecase true
```
3. Generate SSH key
```bash
# Generate ssh key
# All you need to do is keep pressing enter
$ ssh-keygen -t rsa

# You will find id_rsa and id_rsa.pub
$ ls ~/.ssh
```
4. Upload SSH key to Github
    - Go to `settings` -> `SSH and GPG keys` -> `New SSH Key`
    - Paste the content of `id_rsa.pub` in the `Key` field. (You can use `cat id_ras.pub`)
    - Add the name of the key in `Title` field and press `Add SSH Key`.
5. Check you can connect to github.
```bash
$ ssh -T git@github.com

# You may see something like this:
# The authenticity of host 'github.com (52.192.72.89)' can't be established.
# RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
# Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
# Warning: Permanently added 'github.com,52.192.72.89' (RSA) to the list of known hosts.
# Hi woodcutter-eric! You've successfully authenticated, but GitHub does not provide shell access.
```

## References
- https://zlargon.gitbooks.io/git-tutorial/content/config.html
- https://zlargon.gitbooks.io/git-tutorial/content/remote/new_project.html