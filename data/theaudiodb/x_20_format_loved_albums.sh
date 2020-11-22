#!/bin/bash

source .env

jq '.loved[] | .idAlbum' ${MOSTLOVED_DATA} > x_loved_albumIds.json