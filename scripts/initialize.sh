
#!/bin/bash 

cd /home/ubuntu/Dajavas/server
npm install
npm install pm2@latest -g
sudo apt-get update
sudo apt-get install authbind

sudo touch /etc/authbind/byport/443
sudo chown ubuntu /etc/authbind/byport/443
sudo chmod 755 /etc/authbind/byport/443
