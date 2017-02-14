#!/usr/bin/env bash

zip -r resources.zip resources
echo -n "module.exports = '" > resources.js
base64 resources.zip | perl -pe 's/\n//g' >> resources.js
echo "';" >> resources.js

exit

name='hello'

npm install
npm run bundle

if wt ls | grep "^Name:\s*$name\s*$"
then
    wt rm $name
fi

secrets=$(perl -ne 'print " --secret $1=$2" if (/^([^=]+)=(.*)$/);' ".env")

wt create --name $name ./build/bundle.js $secrets


curl https://wt-eddo888-tpg-com-au-0.run.webtask.io/hello/fred

