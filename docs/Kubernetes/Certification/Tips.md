# Tips

- Set up auto completion
```bash
# Follow instruction for your terminal
kubectl completion --help

# In Linux, the default one is usually bash
source <(kubectl completion bash)
```
- Set up namespace short cut
```bash
# Set the config and specify that we will use namespace 'labels' as default
kubectl config set-context $(kubectl config current-context) --namespace=labels

# Set alias to quickly switch between namespace
# Usage: kcd <namespace> 
alias kcd='kubectl config set-context $(kubectl config current- context) --namespace '
```
- Set up vim editor
```bash
# Open vimrc
vim ~/.vimrc
```
```vim title="~/.vimrc"
" Most common
set number
set ruler
set ai
set si

" Optional
syntax enable
set ignorecase
set smartcase
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
set smarttab
set confirm
set history=500
set wildmenu
set lbr
```