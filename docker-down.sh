docker compose down
docker rm -f $(docker ps -a -q) 
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)