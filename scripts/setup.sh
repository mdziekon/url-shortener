#!/bin/bash

docker-compose -f docker-compose.pre-setup.yml up --build

docker-compose -f docker-compose.setup.yml up --build --exit-code-from=finish-setup

docker-compose -f docker-compose.setup.yml down

echo 'Setup complete'
