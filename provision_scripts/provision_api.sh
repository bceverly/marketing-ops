#!/bin/bash

LOCKFILE=/tmp/provision_api

if [ -f ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts
echo '192.168.56.101 db db.local' >> /etc/hosts
echo '192.168.56.102 win win.local' >> /etc/hosts
echo '192.168.56.103 api api.local' >> /etc/hosts
echo '192.168.56.104 custom custom.local' >> /etc/hosts

sudo forever start -a /srv/api/mainRestServer.js --minUptime 1000 --spinSleepTime 10000
sudo forever start -a /srv/custom/customizationRestServer.js --minUptime 1000 --spinSleepTime 10000

sudo apt-get --quiet -y install redis-server > /dev/null

touch ${LOCKFILE}
