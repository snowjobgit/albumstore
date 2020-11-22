#!/bin/bash

#docker run --rm -it --net tor-proxy jess/httpie -v --json https://check.torproject.org/api/ip
#docker run --rm -it --net tor-proxy jess/httpie -v --json https://jsonip.com/

#sleep $[ ( $RANDOM % 20 )  + 1 ]s

outputFile="albumsList.js"
echo > $outputFile

echo "export const albumsListDB = {" > $outputFile

for file in /home/node/react/data/theaudiodb/album_info/*
do

    if [[ -f $file ]]; then
        filename=$(basename -- "$file")
        albumId="${filename%.*}"
        fileContents=$(cat $file | jq -c '.album[] | {idArtist, strAlbum, strArtist, intYearReleased, intSales, intScore, strStyle, strGenre, strReleaseFormat, strAlbumThumb, strAlbumThumbBack, strAlbumCDart, strDescriptionEN}')

        echo  "$albumId: $fileContents," >> $outputFile
    fi

done

echo "};" >> $outputFile
