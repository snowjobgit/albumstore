#!/bin/bash

source .env

docker-compose build

docker-compose up -d --force-recreate --remove-orphans