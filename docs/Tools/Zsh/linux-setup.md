# Ubuntu Setup

## Zsh Setup
1. Type the following commands, and then restart.
```bash
$ sudo apt install zsh
$ chsh -s $(which zsh)
```
2. Then follow a series of instructions to install zsh.

## Zim Setup
1. Install zim
```bash
$ curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```
2. Run the following commands
```vim
$ vim ~/.zimrc

# Then add the following line to bottom of ~/.zimrc
# `zmodule romkatv/powerlevel10k`

$ zimfw install
```
3. Fully restart the terminal.

## powerlevel10k Setup
1. You need to install the nerdfont. You can follow this [instruction](https://holychung.medium.com/%E5%88%86%E4%BA%AB-oh-my-zsh-powerlevel10k-%E5%BF%AB%E9%80%9F%E6%89%93%E9%80%A0%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%94%A8%E7%9A%84-command-line-%E7%92%B0%E5%A2%83-f66846117921)
2. After successfully installed the font, you can restart the terminal to see it to take effect.

