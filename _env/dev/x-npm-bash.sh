#!/bin/bash

CONTAINER_NAME="albumstore_workspace_1"
docker exec -it ${CONTAINER_NAME} bash "$@"
