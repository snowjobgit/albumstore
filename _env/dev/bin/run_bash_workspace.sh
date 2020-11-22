#!/bin/bash

CONTAINER_NAME="reacalc_workspace_1"
docker exec -it ${CONTAINER_NAME} bash "$@"
