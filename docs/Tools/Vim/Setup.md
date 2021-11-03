# Vim Setup

## Settings

### Optional
- Go to [this website](https://github.com/sickill/vim-monokai) and download the font `monokai`.
- Put the following configuration in `~/.vimrc`

### General Setup
- Basic setup
    - `wrap` is to fold text because the screen cannot fit in.
```bash
set nocompatible
syntax enable
set number
set ruler
set ignorecase
set smartcase
set incsearch
set ai
set si
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
set smarttab
set confirm
set backspace=indent,eol,start
set history=1000
set showcmd
set showmode
set wrap
set autowrite
set mouse=a
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
set wildmenu
set lbr
set t_Co=256
set cursorline
set hlsearch
set scrolloff=5
set laststatus=2
set textwidth=80
```
- Plugins
    - Install Vim-Plug
    ```bash
    $ curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
    ```
    - Add configuration in `~/.vimrc`
    ```vim
    call plug#begin('~/.vim/plugged')
    Plug 'tpope/vim-sensible'
    Plug 'vim-airline/vim-airline'
    Plug 'vim-airline/vim-airline-themes'
    call plug#end()

    " Use fruit_punch theme
    " You can set manually by `:AirlineTheme fruit_punch`
    let g:airline_theme='fruit_punch'
    ```
    - Install
    ```vim
    " This is the vim command
    :PlugInstall
    ```

## Reference
- https://github.com/junegunn/vim-plug
- https://vimzijun.net/2016/09/21/vim-plug/
- https://github.com/tpope/vim-sensible
- https://github.com/vim-airline/vim-airline
- https://github.com/vim-airline/vim-airline/wiki/Screenshots