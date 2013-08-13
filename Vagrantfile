# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define :web do |web|
    web.vm.box = "wheezy64"
    web.vm.hostname = "web.local"
    web.vm.synced_folder "www/", "/srv/website"
    web.vm.network :forwarded_port, guest: 80, host: 3280
    web.vm.network :private_network, ip: "192.168.56.100"

    web.vm.provision :shell, :path => "provision_scripts/provision_web.sh"
  end

  config.vm.define :db do |db|
    db.vm.box = "wheezy64"
    db.vm.hostname = "db.local"
    db.vm.network :private_network, ip: "192.168.56.101"

    db.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--memory", 1024]
    end

    db.vm.provision :shell, :path => "provision_scripts/provision_db.sh"
  end
end
