    set nu
    set nocompatible              " be iMproved, required
    filetype off                  " required
    set shell=/bin/bash
    syntax on
    set hls
	" set nohls     #关闭高亮

    set tabstop=4
    set shiftwidth=4
    set rtp+=~/.vim/bundle/vundle/
    call vundle#rc()

    " let Vundle manage Vundle
    " required!
    Bundle 'gmarik/vundle'

    " vim-scripts repos
    Bundle 'FencView.vim'
    Bundle 'The-NERD-tree'
    Bundle 'The-NERD-Commenter'
    Bundle 'ShowTrailingWhitespace'
    Bundle 'ctrlp.vim'
    Bundle 'SuperTab'
    Bundle 'grep.vim'
    Bundle 'functionlist.vim'
    Bundle 'taglist.vim'
	Bundle 'git://git.wincent.com/command-t.git'
	Bundle 'genutils'
    "
    "
    filetype plugin indent on
    " required!
	"
	let NERDTreeWinPos="right"
	map <F1> :CtrlP<CR>
	map <F2> :tabp<CR>
    map <F3> :NERDTreeMirror<CR>
    map <F3> :NERDTreeToggle<CR>
	map <F4> :TlistToggle<CR>
	map <F5> :tabnew<CR>
