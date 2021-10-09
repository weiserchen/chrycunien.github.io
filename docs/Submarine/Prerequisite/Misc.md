# Misc

## Go
1. Download `tar.gz` on your computer
2. Extract the folder
```bash
$ sudo tar -C /usr/local -xzf go1.17.2.linux-amd64.tar.gz
```
3. Add it to the `PATH` variable
```bash 
export PATH="${PATH}:/usr/local/go/bin"
```
4. Verify go
```bash
$ go version
```

## Node
1. Install `nvm`
```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
2. Instal NodeJS 14
```bash
$ nvm install 14
```
3. Check installation
```bash
$ nvm -v
$ node -v
$ npm -v
```

## Python
1. Go to this [link](https://docs.conda.io/en/latest/miniconda.html) and download the installer and then install.
2. Install Miniconda
3. Create virtual environment
```bash
# To init conda
$ /home/chiao/miniconda3/bin/conda init zsh

# Then you can use conda as a short command
$ conda create -n submarine-dev python=3.6
```
4. Activate environment
```bash
$ conda activate submarine-dev
```
5. Decativate current environment
```bash
$ conda deactivate
```


## Refereces
- 