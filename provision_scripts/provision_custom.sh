#!/bin/bash

LOCKFILE=/tmp/provision_custom

if [ -f ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts
echo '192.168.56.101 db db.local' >> /etc/hosts
echo '192.168.56.102 win win.local' >> /etc/hosts
echo '192.168.56.103 api api.local' >> /etc/hosts
echo '192.168.56.104 custom custom.local' >> /etc/hosts

sudo forever start -a /srv/custom/CustomizationServer.js

touch ${LOCKFILE}
