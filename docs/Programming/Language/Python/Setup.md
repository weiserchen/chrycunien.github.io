# Setup

I use `pyenv` as the version manager for python.

## Using pyenv
- Install `pyenv`
```bash
$ brew install pyenv
```
- Configure `pyenv`
```bash
echo 'eval "$(pyenv init --path)"' >> ~/.zprofile
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```
- Install specific version
```bash
# Set 3.9.0 as global version
$ pyenv install 3.9.0
$ pyenv global 3.9.0

# Set 3.8.0 as local version
$ pyenv install 3.8.0
$ pyenv local 3.8.0
```
- Uninstall specific version
```bash
$ pyenv uninstall 3.8.0
```

## Using miniconda
Go to this [link](https://docs.conda.io/en/latest/miniconda.html) and download you OS installer.

For Windows and Mac, you just need to follow the package installer. 

For Linux, you should run:
```bash
$ chmod +x <the_installer_name>
$ ./<the_installer_name>
```

And then you follow the instructions to install.

If you miss some steps, make sure you can find it through the path.
Add the following command in the `~/.zshrc` or `~/.bash_profile`
```vim
export PATH="${HOME}/miniconda3/bin:$PATH"
```

Then initialize the conda
```bash
$ conda init zsh
```

Behind the scene, it will comment out the export you just added and do some additional setup in `~/.zshrc`.

## References
- https://github.com/pyenv/pyenv
- https://ithelp.ithome.com.tw/articles/10237266