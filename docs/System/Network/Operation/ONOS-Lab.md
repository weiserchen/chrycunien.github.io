# ONOS + mininet

We will use Ubuntu 20.04 for onos. (You can also run on OSX, but you will need to change the installation steps.)

## ONOS 

### Installation
Follow this [instruction](https://ithelp.ithome.com.tw/articles/10244324). We will use a binary release to start onos instead of building the source code.
1. Install some dependencies
```bash
sudo apt -y install git
sudo apt-get update && apt-get upgrade
sudo apt -y install git
sudo apt-get install openjdk-11-jdk
sudo apt-get -y install maven
sudo apt-get update
```
2. Add this to `~/.bashrc`
```bash
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/
export M2_HOME=/opt/maven
export MAVEN_HOME=/opt/maven
export PATH=${M2_HOME}/bin:${PATH}
```
3. Download Onos release (Go to ONOS wiki downloads or following the commands)
```bash
cd ~/Downloads

# Download onos 2.5.0
wget https://repo1.maven.org/maven2/org/onosproject/onos-releases/2.5.0/onos-2.5.0.tar.gz
tar zxvf onos-2.5.0.tar.gz

cd onos-2.5.0

# Start service
./bin/onos-service
# Or ./bin/onos-service start
``` 

### GUI
After complete the previous installation section, you can login to the cli.
1. Go to `localhost:8181/onos/ui/login.html` with username = `onos`, password = `rocks`.

### CLI
After complete the previous installtion section, you can also login to the cli.

1. Generate ssh key (keep pressing `Enter`)
```bash
ssh-keygen -t rsa
```
2. Change onos-user-key
```bash
cd ~/Downloads/onos-2.5.0
./bin/onos-user-key $USER ~/.ssh/id_rsa.pub
```
3. Login to the cli
```bash
cd ~/Downloads/onos-2.5.0
# Login to CLI
./bin/onos
```
4. Install Openflow feature (under cli)
```
onos> app activate org.onosproject.openflow
```

### Cleanup
```
onos> wipe-out please
```

## Mininet

### Installation

Go to this [website](https://github.com/mininet/mininet/releases) and download the latest release. (under the Assets section)

### Create a topology

- Using the default `topo-2sw-2host.py` under the `mininet/custom` directory
```bash
mininet@mininet-vm> sudo mn --mac --switch ovsk,protocols=OpenFlow13 --controller=remote,ip=192.168.100.1 --custom ./mininet/custom/topo-2sw-2host.py --topo mytopo
```
- Or you can define another topology file like this
```bash
mininet@mininet-vm> sudo mn --mac --switch ovsk,protocols=OpenFlow13 --controller=remote,ip=192.168.100.1 --custom ./mininet/custom/mytopo.py --topo mytopo
```
```python title="test.py"
from mininet.topo import Topo

class MyTopo( Topo ):
    "Simple topology example."

    def build( self ):
        "Create custom topo."

        # Add hosts and switches
        leftHost = self.addHost( 'h1' )
        rightHost = self.addHost( 'h2' )
        leftSwitch = self.addSwitch( 's1' )
        rightSwitch = self.addSwitch( 's2' )

        # Add links
        self.addLink( leftHost, leftSwitch )
        self.addLink( leftSwitch, rightSwitch )
        self.addLink( rightSwitch, rightHost )


topos = { 'mytopo': ( lambda: MyTopo() ) }
```
- Check if the switches has correctly configured
```
onos> devices
```

### Discover Hosts
- This command allows onos to know all the hosts that a switch has connected.
```
mininet> pingall
```
- Check if the hosts show up.
```
onos> hosts
```

### Destrop topology
```bash
# Exit the mininet topology
mininet> exit

# Clean up
mininet@mininet-vm> sudo mn -c

# Exit the ssh session
mininet@mininet-vm> exit
```

## Add Flows

### Launch a command
- Create a flow for a device (the id must match in both url and json)
```bash
local> curl -X POST -H "content-type:application/json" http://localhost:8181/onos/v1/flows/of:0000000000000001 -d @./test_1.json --user onos:rocks
```

### Rules
- NOTE: you have to look at which port the switch is configured. The port number is related to topology you just defined. Or you can just find the port in GUI.
- Also, you have to defind each rules on each switch.
- For switch s1 (also host h1)
```json title="h1-1-2.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000001",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "2"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0800"
      },
      {
        "type": "IPV4_DST",
        "ip": "10.0.0.2/32"
      }
    ]
  }
}
```
```json title="h1_2-1.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000001",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "1"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0800"
      },
      {
        "type": "IPV4_DST",
        "ip": "10.0.0.1/32"
      }
    ]
  }
}
```
```json title="h1_arp.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000001",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "FLOOD"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0806"
      }
    ]
  }
}
```
- For switch s2 (also host h2)
```json title="h2-1-2.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000002",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "2"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0800"
      },
      {
        "type": "IPV4_DST",
        "ip": "10.0.0.2/32"
      }
    ]
  }
}
```
```json title="h2_2-1.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000002",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "1"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0800"
      },
      {
        "type": "IPV4_DST",
        "ip": "10.0.0.1/32"
      }
    ]
  }
}
```
```json title="h1_arp.json"
{
  "priority": 60000,
  "timeout": 0,
  "isPermanent": true,
  "deviceId": "of:0000000000000002",
  "treatment": {
    "instructions": [
      {
        "type": "OUTPUT",
        "port": "FLOOD"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0806"
      }
    ]
  }
}
```

### Automation
- You can write a shell script to automate this
```bash
# Add flows for switch 1
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000001 \
    -d @./s1/h1_1-2.json --user onos:rocks
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000001 \
    -d @./s1/h1_2-1.json --user onos:rocks
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000001 \
    -d @./s1/h1_arp.json --user onos:rocks
# Add flows for switch 2
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000002 \
    -d @./s2/h2_1-2.json --user onos:rocks
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000002 \
    -d @./s2/h2_2-1.json --user onos:rocks
curl -X POST -H "content-type:application/json" \
    http://localhost:8181/onos/v1/flows/of:0000000000000002 \
    -d @./s2/h2_arp.json --user onos:rocks
```

## References
- https://ithelp.ithome.com.tw/articles/10244324
- https://ithelp.ithome.com.tw/articles/10243780
- https://ithelp.ithome.com.tw/articles/10249438?sc=rss.iron
- https://hackmd.io/@nosignal/rkXUpWMrz?type=view
- https://stackoverflow.com/questions/52504825/how-to-install-jdk-11-under-ubuntu
- https://github.com/mininet/mininet/blob/master/custom/topo-2sw-2host.py
