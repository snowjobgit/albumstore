#!/bin/bash

source .env

for file in /home/node/react/data/theaudiodb/album_info/*
do

    if [[ -f $file ]]; then
        filename=$(basename -- "$file")
        albumId="${filename%.*}"
        artistId=$(cat $file | jq -c '.album[] | .idArtist' | sed -e 's,",,g')

        echo "$artistId"
        #echo  "$albumId: $fileContents," >> $outputFile

        url="https://theaudiodb.com/api/v1/json/1/album.php?i=$artistId"
        file="${artistId}.json"

        curl "$url" |
            jq -cr '.album[]' |
            jq -cr '.idAlbum, {
                idAlbum, 
                idArtist,
                idLabel,
                strAlbum,
                strArtist,
                intYearReleased,
                strStyle,
                strGenre,
                strLabel,
                strReleaseFormat,
                intSales,
                strAlbumThumb,
                strAlbumThumbBack,
                strAlbumCDart,
                intScore,
                strDescriptionEN
        }' | while read -r idAlbum && read -r object
        do
            echo "{\"album\":[$object]}" > "/home/node/react/data/theaudiodb/album_info/$idAlbum.json"
        done

    fi

done

