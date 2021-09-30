# Commands

- Check the status of the vm
```bash
$ vagrant status
```
- Connect to the vm
```bash
$ vagrant ssh
$ vagrant ssh <vm_name>
```
- Stop the virtual machine (totally shutdown)
```bash
# In the guest vm
$ exit 
# In host
$ vagrant halt 
$ vagrant halt <vm_name>
```
- Reload the vagrant file (if the configuration change)
```bash
# reload = halt + up
$ vagrant reload
```
- Ping virtual machine, you may have to setup the private network first.
```vagrant title="Vagrantfile"
config.vm.network "private_network", ip: "10.9.8.7"
```
```bash
# -c means how many packet
$ ping -c 3 10.9.8.7
```
- You can access the project content under `/vagrant` in the guest vm
```bash
# In the guest vm
cat /vagrant/Vagrantfile
```