#!/bin/bash

LOCKFILE=/tmp/provision_web
DEFAULT_SITE=/etc/apache2/sites-available/default

if [ -f ${LOCKFILE} ];
then
  exit 0
fi

echo '192.168.56.100 web web.local' >> /etc/hosts
echo '192.168.56.101 db db.local' >> /etc/hosts
echo '192.168.56.102 win win.local' >> /etc/hosts
echo '192.168.56.103 api api.local' >> /etc/hosts
echo '192.168.56.104 custom custom.local' >> /etc/hosts

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

touch ${LOCKFILE}
