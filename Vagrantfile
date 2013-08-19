# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define :web do |web|
    web.vm.box = "wheezy64"
    web.vm.box_url = "https://www.dropbox.com/s/l0ed9qeozsxvymf/wheezy64.box"
    web.vm.hostname = "web.local"
    web.vm.synced_folder "www/", "/srv/website"
    web.vm.synced_folder "api/", "/srv/api"
    web.vm.network :forwarded_port, guest: 80, host: 3280
    web.vm.network :private_network, ip: "192.168.56.100"

    web.vm.provision :shell, :path => "provision_scripts/provision_web.sh"
  end

  config.vm.define :db do |db|
    db.vm.box = "wheezy64"
    db.vm.box_url = "https://www.dropbox.com/s/l0ed9qeozsxvymf/wheezy64.box"
    db.vm.hostname = "db.local"
    db.vm.synced_folder "db/", "/srv/db"
    db.vm.network :private_network, ip: "192.168.56.101"

    db.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--memory", 1024]
    end

    db.vm.provision :shell, :path => "provision_scripts/provision_db.sh"
  end

  config.vm.define :win do |win|
    win.vm.box = "winserv2008r2"
#    win.vm.box_url = ""
    win.vm.hostname = "win.local"
    win.vm.network :private_network, ip: "192.168.56.129"

    win.vm.provider "virtualbox" do |v|
      v.customize "pre-boot",
        ["sharedfolder", "add", :id,
         "--name", "Vagrant", "--hostpath", "/Users/bceverly/marketing-ops/WinNet"
        ]
#      v.customize "post-boot", 
#        ["guestcontrol", :id, 
#         "exec", 
#         "--image", "c:\\windows\\system32\\netsh.exe", 
#         "--username", "vagrant", 
#         "--password", "vagrant", 
#         "--wait-exit", 
#         "interface", "ip set address name=\"Local Area Connection 2\" static 192.168.56.102 255.255.255.0 192.168.56.1"
#        ]
    end
  end
end
