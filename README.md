This repository holds the architectrual prototype for the next generation
cloud version of Marketing Operations.

Overview:

This prototype will demonstrate:
* Ability to have legacy C# code in a DLL that is exposed via Thrift
  to a Node.js REST endpoing
* Ability to access PostgreSQL databases from both Node.js as well as
  C# legacy code
* Ability for a pure HTML web page to make REST calls to retrieve
  data from a pure Node.js service as well as legacy C# data fronted
  through Thrift
* Customization of an HTML page via a custom Javascript file injected at
  render time
* Customization of back end business process in a pre and post fashion
  from a REST call out of an HTML page.
* Writing to a multi-master PostgreSQL database and reading from a read-
  only hot standby of the same
* Ability to spin up virtual environments from Vagrant
* Ability to provision virtual machines via Puppet

Prerequisites:

1.  Install thrift and have the thrift executable in your path
2.  Install Vagrant (http://vagrantup.com)
3.  Install Virtualbox (http://virtualbox.org)
