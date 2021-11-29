# Solution to exercise 1.

## Step 1
docker run -d --name mywebserver -p 8080:80 nginx

## Step 2
docker exec -it mywebserver sh

## Step 3
apt-get update 
apt-get install curl

curl localhost

## Step 4
apt-get install nano
nano /usr/share/nginx/html/index.html

## Step 5
docker run --name mywebclient -it ubuntu sh

apt-get update
apt-get install iputils-ping

docker inspect mywebserver 
(outputs _mywebserver_IP_address_)

ping _mywebserver_IP_address_

## Step 6
docker rm mywebclient
docker rmi ubuntu

## Step 7
docker stop mywebserver
docker rm mywebserver

(or faster: `docker rm -f mywebserver`)

docker rmi nginx