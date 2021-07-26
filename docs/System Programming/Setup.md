# Setup

In this note, I use `Go` as the programming language. And I use `Ubuntu 20` as my main platform. All the following should be able to run in any Linux distribution. I'm using zsh, you can follow [this](https://joechang0113.github.io/2020/03/23/ubuntu-install-oh-my-zsh.html) instruction to download it.

## Go installtion
1. Go to the [Download Website](https://golang.org/dl/). Download the latest version for your platform.
2. Extract the compressed file using `sudo tar -C /usr/local -xzf <THE_FILE.tar.gz>`
3. Add `export PATH=$PATH:/usr/local/go/bin` to `~/.zshrc`.
5. Type `source ~/.zshrc` in your terminal to load the new env variable.
4. Type `go version` in your terminal to ensure that you have successfully download it.
5. I recommend using `VSCode` as the editor. You can use what you want.
6. Install go extension in the VSCode to help you write code more efficiently.