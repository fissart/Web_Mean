call plug#begin()
" Plug 'https://github.com/neoclide/vim-jsx-improve'
Plug 'https://github.com/907th/vim-auto-save'
" Plug 'https://github.com/latex-lsp/texlab'
" Plug 'tyru/open-browser.vim' " opens url in browser
" Plug 'http://github.com/tpope/vim-surround' " Surrounding ysw)
" Plug 'https://github.com/preservim/nerdtree', { 'on': 'NERDTreeToggle' }
" Plug 'https://github.com/ap/vim-css-color' " CSS Color Preview
" Plug 'https://github.com/tpope/vim-commentary' " For Commenting gcc & gc
Plug 'https://github.com/lervag/vimtex'
Plug 'https://github.com/vim-autoformat/vim-autoformat'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
" Plug 'https://github.com/vim-latex/vim-latex'
Plug 'honza/vim-snippets'
Plug 'SirVer/ultisnips'
Plug 'https://github.com/ckunte/latex-snippets-vim'
call plug#end()
" CocInstall coc-json coc-tsserver
" CocInstall coc-vimtex
let g:auto_save = 1
let g:auto_save_events = ["InsertLeave", "TextChangedI"]

let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"

" If you want :UltiSnipsEdit to split your window.
let g:UltiSnipsEditSplit="vertical"

