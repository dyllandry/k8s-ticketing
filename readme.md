# Setup

There are some things that have to be tweaked on Linux to get Skaffold to work with Docker Desktop. You can run `./setup-docker-for-skaffold.sh` to get it working before running `skaffold dev`.

# JWT Secret

`kubectl create secret generic jwt-secret 
--from-literal=JWT_KEY=<SECRET>`
