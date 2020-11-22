#!/bin/bash

source .env

curl \
    --header "x-rapidapi-key: ${RAPID_API_KEY}" \
    --header "x-rapidapi-host: theaudiodb.p.rapidapi.com" \
    --header "useQueryString: true" \
    -o "./mostloved.json" \
    "https://theaudiodb.p.rapidapi.com/mostloved.php?format=track"

