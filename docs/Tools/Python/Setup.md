# Setup

I use `pyenv` as the version manager for python.

## Installation
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

## References
- https://github.com/pyenv/pyenv
- https://ithelp.ithome.com.tw/articles/10237266