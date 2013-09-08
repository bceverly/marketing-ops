#!/bin/bash

LOCKFILE=/tmp/provision_db
if [ -f ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts
echo '192.168.56.103 api api.local' >> /etc/hosts

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ wheezy-pgdg main" >> /etc/apt/sources.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get --quiet update > /dev/null
sudo apt-get --quiet -y install postgresql-9.2 > /dev/null

sudo -u postgres psql template1 << EOF
  ALTER USER postgres with encrypted password 'postgres';
  CREATE DATABASE marketingops OWNER postgres;
EOF

sudo sh -c 'echo "host all all samenet md5" >> /etc/postgresql/9.2/main/pg_hba.conf'
sed "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/9.2/main/postgresql.conf > /tmp/postgresql.conf
sudo mv /tmp/postgresql.conf /etc/postgresql/9.2/main/postgresql.conf
sudo service postgresql restart

liquibase --driver=org.postgresql.Driver --changeLogFile=/srv/db/marketingops.xml --url="jdbc:postgresql://192.168.56.101/marketingops" --username=postgres --password=postgres --classpath=/usr/local/bin/postgresql-9.2-1003.jdbc4.jar update

touch ${LOCKFILE}
