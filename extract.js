
var _ = require('underscore');
var fs = require('fs');
var zipper = require('node-zip');

var data = require('./resources.js');

console.log('data',data);
    
var unzip = new zipper(data, {
    base64: true,
    checkCRC32: true
});

var files = unzip.files;
//console.log('files',files);

_.each(files, function(value,name) { 
    console.log(name, value._data);
});
