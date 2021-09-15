# Setup

## Install Iterm2
1. Install iterm2
```bash
$ brew install --cask iterm2
```
2. Setup colors. (Follow the instruction of this [website](https://iterm2colorschemes.com/))
3. Setup hotkey
    - Go to `Preference` -> `Keys` -> `HotKey` -> `Create a Dedicated HotKey Window`
    - Press `HotKey` field to start recording
    - I choose `option` +`3` as my hotkey
    - You have to prevent hotkey collison or trap in you OS or another softwares 
4. Then you can go to the `Profile` -> `HotKey Window` to customize your hotkey window

## Install Zim
```bash
$ curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

## Install Powerlevel10k
1. Add powerlevel 10k in the `~/.zimrc` file
```
$ vim ~/.zimrc

# Then add the following line to bottom
# `zmodule romkatv/powerlevel10k`
```
2. Install zmodule
```bash
$ zimfw install
```
3. After installing, restart the iterm2
4. When you restart, you will see p10k configure program automatically pop up, follow the instruction.
    - It will ask you to install some additional font
    - After installation, please **fully** restart or it will not take effect
    - Once it show up some icon (like diamon, lock, ...), it means you successfully install the font
    - The last step is to follow the further instructions, and choose whatever setting you like
5. Add font to VSCode
    - Go to `Code` -> `Preference` -> `Settings`
    - Search for `terminal.integrated.fontFamily`
    - Add `MesloLGS NF` to the box

## References
- https://github.com/zimfw/zimfw
- https://medium.com/@white1033/%E8%B6%85%E7%B0%A1%E5%96%AE-%E5%BF%AB%E9%80%9F%E6%89%93%E9%80%A0%E6%BC%82%E4%BA%AE%E5%8F%88%E5%A5%BD%E7%94%A8%E7%9A%84-zsh-%E7%B5%82%E7%AB%AF%E7%92%B0%E5%A2%83-c81874368264
- https://github.com/romkatv/powerlevel10k/issues/671
- https://github.com/romkatv/powerlevel10k/blob/master/font.md