#! /usr/bin/env bash

export PS4=""
set -x

# You must run this file with `source ./add-shared-libraries` to run it in the
# context of the current shell so the environment variables it modifies affect
# that same shell.

# mongodb-memory-server needs libcrypto.so.1.1 and libssl.so.1.1 to run
# The two libraries should be in $HOME/opt/lib
export LD_LIBRARY_PATH=$HOME/opt/lib:$LD_LIBRARY_PATH