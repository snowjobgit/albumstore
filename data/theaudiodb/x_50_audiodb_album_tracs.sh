#!/bin/bash

for file in /home/node/react/data/theaudiodb/album_info/*
do

    if [[ -f $file ]]; then
        filename=$(basename -- "$file")
        albumId="${filename%.*}"

        #echo  "$albumId: $fileContents," >> $outputFile

        url="https://theaudiodb.com/api/v1/json/1/track.php?m=$albumId"
        file="${albumId}.json"

        curl "$url" > "/home/node/react/data/theaudiodb/album_tracks/$file"
    fi

done

