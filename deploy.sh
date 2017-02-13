#!/usr/bin/env bash

name='hello'

npm run bundle

if wt ls | grep "^Name:\s*$name\s*$"
then
    wt rm $name
fi

wt create --name $name index.js

curl https://wt-eddo888-tpg-com-au-0.run.webtask.io/hello

