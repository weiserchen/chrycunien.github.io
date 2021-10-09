# Java

## SDK
1. Install sdkman
```bash
$ curl -s "https://get.sdkman.io" | bash
```
2. Restart or `source` the `~/.zshrc` or `~/.bash_profile`
3. Find a version to install
```bash
$ sdk list java
```
4. Install JDK 8
```bash
$ sdk install java 8.0.292.j9-adpt
```

## IntelliJ
1. Download the tar.gz file
2. Extract directory to /opt
```bash
$ sudo tar -xzf ideaIU.tar.gz -C /opt
```
3. Rename directory
```bash
$ cd /opt
$ sudo mv ideaxxxxx idea-IU
```
4. Add the script in `PATH` env variable (I use zsh)
```bash
export PATH="${PATH}:/opt/idea-IU/bin"
```
5. Run the script (you have to login or enter license at the first time)
```bash
$ idea.sh
```

## Maven
1. Download zip or tar.gz ([maven 3.6.3](https://archive.apache.org/dist/maven/maven-3/3.6.3/))
2. Extract the file (I use unzip or you can follow this [link](https://maven.apache.org/install.html))
```bash
$ unzip apache-maven-3.6.3-bin.zip
```
3. Move the directory to `/opt` 
```bash
$ sudo mv apache-maven-3.6.3 /opt/maven
```
4. Add the bin location to `PATH` variable
```bash
export PATH="${PATH}:/opt/maven/bin"
```
5. Check success
```bash
$ mvn -v
```

## References
- https://www.jetbrains.com/help/idea/installation-guide.html#standalone