# Checkstyle

## Java

### Using Terminal
> It seems that the current tests are broken.

1. Make sure you install all dependencies and plugins
```bash
$ mvn install
```
2. Check style
```bash
$ mvn checkstyle:check
```
> Notice that you have to run `mvn install` to check the code into the maven local repository, or it may not rebuild the check.

```bash
# If you did not modify the test or you don't want to run test
$ mvn install -DskipTests
```

### Using IDEA
This is written for Mac.

1. Go to `IntelliJ IDEA` -> `Preference` -> `Plugins`. Search for `CheckStyle-IDEA` and then install.
2. After installed, go to `IntelliJ IDEA` -> `Preference` -> `Tools` -> `Checkstyle`.
3. Select version `8.0` and add a new configuration. The file is under `submarine/dev-support/maven-config/checkstyle.xml`

## Python

### Setup Environment
1. Install Miniconda
2. Create virtual environment
```bash
$ conda create -n submarine-dev python=3.6
```
3. Activate environment
```bash
$ conda activate submarine-dev
```
4. Decativate current environment
```bash
$ conda deactivate
```

### Stylecheck
Under submarine folder.

- Prerequisite
```bash
$ brew install isort black
$ python -m pip install flake8 mypy
```
- lint
```bash
$ ./dev-support/style-check/python/lint.sh
```
- auto-format
```bash
$ ./dev-support/style-check/python/auto-format.sh
```
- Errors Handling
```bash
# if it shows Library stubs not installed
$ mypy --install-types
# Then it should succeed
```