#! /usr/bin/env bash

# Set sets shell options, -x will print command before it's run. PS4 is it's prompt. Set to empty for command to show without any other text or formatting around it.
export PS4=""
set -x

./setup-docker-for-skaffold.sh

skaffold dev