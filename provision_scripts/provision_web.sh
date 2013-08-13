#!/bin/bash

LOCKFILE=/tmp/provision_web
if [ -e ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.101 db db.local' >> /etc/hosts

touch /tmp/provision_web
