#!/bin/bash

source .env

for line in $(cat x_loved_albumIds.json)
do

    # remove quotes
    albumId=$(echo $line | sed -e 's,",,g')

    url="https://theaudiodb.com/api/v1/json/1/album.php?m=$albumId"
    file="${albumId}.json"

    #echo $url
    #echo $file

    curl -o "/home/node/react/data/theaudiodb/album_info/$file" "$url"

done

