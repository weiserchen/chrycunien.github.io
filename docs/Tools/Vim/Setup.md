# Vim Setup

## Settings
-  Go to [this website](https://github.com/sickill/vim-monokai) and download the font `monokai`.
-  Put the following configuration in `~/.vimrc`
- Simplified Version
```bash
set nocompatible

"#######################################################
syntax enable
set number
set noruler
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
set history=500
set showcmd
set showmode
set nowrap
set autowrite
set mouse=a
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
set wildmenu
set lbr
"
""#######################################################
" Color
set t_Co=256
" colo torte
set cursorline
" set cursorcolumn
set hlsearch
"set background=dark
set scrolloff=5

"#######################################################
" statusline
set laststatus=2
```
- Complete Version (At least for mac)
```bash
"#######################################################
set nocompatible

"#######################################################
syntax enable
set number
set noruler
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
set history=500
set showcmd
set showmode
set nowrap
set autowrite
set mouse=a
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
set wildmenu
set lbr

"#######################################################
" Color
set t_Co=256
set cursorline
set hlsearch
set guifont=Fira\ Code:h12
set scrolloff=5
set list listchars=tab:\:\ ,trail:·,extends:?,precedes:?,nbsp:×
" To use monokai, uncomment this line
" colorscheme monokai

"#######################################################
" statusline
set laststatus=2
set statusline=%#filepath#[%{expand('%:p')}]%#filetype#[%{strlen(&fenc)?&fenc:&enc},\ %{&ff},\ %{strlen(&filetype)?&filetype:'plain'}]%#filesize#%{FileSize()}%{IsBinary()}%=%#position#%c,%l/%L\ [%3p%%]
hi filepath cterm=none ctermbg=238 ctermfg=40
hi filetype cterm=none ctermbg=238 ctermfg=45
hi filesize cterm=none ctermbg=238 ctermfg=225
hi position cterm=none ctermbg=238 ctermfg=228
function IsBinary()
    if (&binary == 0)
        return ""
    else
        return "[Binary]"
    endif
endfunction
function FileSize()
    let bytes = getfsize(expand("%:p"))
    if bytes <= 0
        return "[Empty]"
    endif
    if bytes < 1024
        return "[" . bytes . "B]"
    elseif bytes < 1048576
        return "[" . (bytes / 1024) . "KB]"
    else
        return "[" . (bytes / 1048576) . "MB]"
    endif
endfunction

"#######################################################
" encode
if has("multi_byte")
    set fileencodings=utf-8,utf-16,big5,gb2312,gbk,gb18030,euc-jp,euc-kr,latin1
else
    echoerr "If +multi_byte is not included, you should compile Vim with big features."
endif
```

## Reference
- https://magiclen.org/vimrc/
- http://wiki.csie.ncku.edu.tw/vim/vimrc
- https://github.com/sickill/vim-monokai