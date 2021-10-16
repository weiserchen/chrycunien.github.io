# Vagrant

## Installation
```bash
$ brew install vagrant
```

## Commands
```bash
# Download vagrant box image
$ vagrant add box <user>/<box>
$ vagrant add box jasonc/centos7

# Initialize vagrant
$ mkdir vm1
$ cd vm1
$ vagrant init jasonc/centos7

# Start the virtual machine
$ vagrant up <vm_name>
# Start all vm defined in the vagrant file
$ vagrant up

# Connect to virtual machines
$ vagrant ssh <vm_name>
# If you only have 1 vm
$ vagrant ssh 

# Some other operations
$ vagrant halt <vm_name>
$ vagrant suspend <vm_name>
$ vagrant resume <vm_name>
$ vagrant destory <vm_name>

# List options
$ vagrant
```

## Vagrant file
- The basic configuration:
```vagrant
Vagrant.configure("2") do |config|
  config.vm.box = "jasonc/centos7"
  config.vm.hostname = "linuxsvr1"
  config.vm.network "private_network", ip: "10.2.3.4"
  config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  config.vm.provider "virtualbox" do |vb|
    vb.gui = true
    vb.memory = "1024"
  end
  config.vm.provision "shell", path: "setup.sh"
end
```
- Multiple vm
```vagrant
Vagrant.configure("2") do |config|
  config.vm.box = "jasonc/centos7"
  
  # The `do` is actually specify the vm entity you want to setup
  config.vm.define "server1" do |server1|
    server1.vm.hostname = "server1"
    config.vm.network "private_network", ip: "10.2.3.4"
  end

  config.vm.define "server2" do |server2|
    server2.vm.hostname = "server2"
    config.vm.network "private_network", ip: "10.2.3.5"
  end
end
```