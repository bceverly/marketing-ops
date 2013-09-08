#!/bin/bash

LOCKFILE=/tmp/provision_api

if [ -f ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts
echo '192.168.56.101 db db.local' >> /etc/hosts

sudo forever start -a /srv/api/main.js
sudo forever start -a /srv/custom/CustomizationServer.js
sudo forever start -a /srv/custom/remoteAPI.js

sudo apt-get --quiet -y install redis-server > /dev/null

touch ${LOCKFILE}
