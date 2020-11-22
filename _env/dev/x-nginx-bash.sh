#!/bin/bash

CONTAINER_NAME="albumstore_nginx_1"
docker exec -it ${CONTAINER_NAME} bash "$@"
