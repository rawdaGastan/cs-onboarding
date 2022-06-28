#!/bin/sh
mkdir -p /var/run/sshd
mkdir -p /root/.ssh/ 
chmod 600 ~/.ssh
chmod 600 /etc/ssh/*
chmod 600 ~/.ssh/authorized_keys
echo $SSH_KEY > /root/.ssh/authorized_keys
/usr/sbin/sshd
echo root:hamada | chpasswd

cd /client
npm run serve -- --port 8085
sleep 1000000
