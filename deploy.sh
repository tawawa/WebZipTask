#!/usr/bin/env bash

if [ -f resources.zip ]
then
    rm resources.zip
fi

pushd resources > /dev/null
zip -r ../resources.zip *
popd > /dev/null

# build a base64 resource variable that will be unzipped locally on run
echo -n "module.exports = '" > resources.js
base64 resources.zip | perl -pe 's/\n//g' >> resources.js
echo "';" >> resources.js

name='WebZipTask'

npm install
npm run bundle

if wt ls | grep "^Name:\s*$name\s*$"
then
    wt rm $name
fi

secrets=$(perl -ne 'print " --secret $1=$2" if (/^([^=]+)=(.*)$/);' ".env")

wt create --name $name ./build/bundle.js $secrets


