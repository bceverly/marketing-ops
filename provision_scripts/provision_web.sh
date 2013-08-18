#!/bin/bash

LOCKFILE=/tmp/provision_web
DEFAULT_SITE=/etc/apache2/sites-available/default

if [ -e ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.101 db db.local' >> /etc/hosts
sudo forever start -a /srv/api/main.js

# Set up the default apache2 site
sudo echo '<VirtualHost *:80>' > ${DEFAULT_SITE}
sudo echo '  DocumentRoot /srv/website' >> ${DEFAULT_SITE}
sudo echo '  <Directory />' >> ${DEFAULT_SITE}
sudo echo '    Options FollowSymLinks' >> ${DEFAULT_SITE}
sudo echo '    AllowOverride None' >> ${DEFAULT_SITE}
sudo echo '  </Directory>' >> ${DEFAULT_SITE}
sudo echo '  <Directory /srv/website/>' >> ${DEFAULT_SITE}
sudo echo '    Options Indexes FollowSymLinks MultiViews' >> ${DEFAULT_SITE}
sudo echo '    AllowOverride None' >> ${DEFAULT_SITE}
sudo echo '    Order allow,deny' >> ${DEFAULT_SITE}
sudo echo '    allow from all' >> ${DEFAULT_SITE}
sudo echo '  </Directory>' >> ${DEFAULT_SITE}
sudo echo '</VirtualHost>' >> ${DEFAULT_SITE}

sudo apachectl restart

touch /tmp/provision_web
