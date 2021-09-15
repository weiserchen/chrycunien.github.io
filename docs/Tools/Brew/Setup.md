# Setup

1. Go to the official website to download brew.
```bash
# Maybe you have to run this command to install some other tools
$ xcode-select --install
# You'd better check whether this link is changed
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. Check if correctly installed
```bash
$ brew --version
```
3. Examples
```bash
$ brew install node

# Note:
# Sometimes, it will spend a lot of times downloading some dependencies.
# 
# If it takes so long, it will be interrupted by itself, which serves as a mechanism
# to prevent blocking.
# 
# In some special situations, you have to manually install the dependency because it takes
# too long to download its manifest file. You can find the dependency list in somewhere the
# terminal output. Use `brew install <dep>` as you used before.
```
