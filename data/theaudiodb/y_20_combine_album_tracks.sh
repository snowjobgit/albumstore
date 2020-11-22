#!/bin/bash

outputFile="albumTracks.js"

echo "export const albumTracksListDB = {" > $outputFile

for file in /home/node/react/data/theaudiodb/album_tracks/*
do

    if [[ -f $file ]]; then
        filename=$(basename -- "$file")
        albumId="${filename%.*}"
        fileContents=$(cat $file | jq -c '[.track[] | {idTrack, strTrack, strTrackThumb, strMusicVid, intTrackNumber}]')

        echo  "$albumId: $fileContents," >> $outputFile
    fi

done

echo "};" >> $outputFile
