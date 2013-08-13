#!/bin/bash

LOCKFILE=/tmp/provision_db
if [ -e ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts

touch /tmp/provision_db
