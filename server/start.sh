#!/bin/sh
mkdir -p /var/run/sshd
mkdir -p /root/.ssh/ 
echo $SSH_KEY > /root/.ssh/authorized_keys
/usr/sbin/sshd

exec sh