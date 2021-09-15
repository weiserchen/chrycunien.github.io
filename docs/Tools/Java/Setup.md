# Setup

I will use `SDKMan` as jdk manager

## Installation
```bash
# Download source
$ curl -s "https://get.sdkman.io" | zsh

$ source "$HOME/.sdkman/bin/sdkman-init.sh"

# Verify installation
$ sdk version
```

## Install Java
```bash
# List all available version
$ sdk list java

# Install example
$ sdk install java 11.0.11.j9-adpt
```

## References
- https://sdkman.io/install