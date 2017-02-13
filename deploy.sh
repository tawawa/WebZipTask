#!/usr/bin/env bash

name='hello'

npm install
npm run bundle

if wt ls | grep "^Name:\s*$name\s*$"
then
    wt rm $name
fi

secrets=$(perl -ne 'print " --secret $1=$2" if (/^([^=]+)=(.*)$/);' ".env")

wt create --name $name ./build/bundle.js $secrets


curl https://wt-eddo888-tpg-com-au-0.run.webtask.io/hello

