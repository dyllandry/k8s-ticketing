#! /usr/bin/env bash
if [ ! -L /var/run/docker.sock ]; then
    export PS4=""
    set -x
    # This is because skaffold needs help looking in the right directory for the docker socket when you're using docker desktop.
    sudo ln -s "$HOME/.docker/desktop/docker.sock" /var/run/docker.sock
else
    set +x
    echo "symlink at /var/run/docker.sock already exists, not creating"
fi


