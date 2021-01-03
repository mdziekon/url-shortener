#!/bin/bash

docker-compose -f docker-compose.setup.yml up --build & > /dev/null &

# TODO: Hardcoded wait period to wait for the processes to finish and then close the containers.
# In real life, should not be implemented like this to prevent unfinished setups.
sleep 10s

docker-compose -f docker-compose.setup.yml down

echo 'Setup complete'
