
var _ = require('underscore');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var metadata = require('./webtask.json');
var config = require('./config');
var zipper = require('node-zip');
var resources = require('./resources.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next) {
    config.setVars(req);
    next();
});

app.get('/*', (req, res) => {
    console.log('url',req.url);

    if (req.webtaskContext === undefined) {
        console.log('loading data');
        var data = {};
        var unzip = new zipper(resources, {
            base64: true,
            checkCRC32: true
        });
        _.each(unzip.files, function(value, name) {
            data[name] = value._data;
        });
        var url = req.url.substring(1);
        res.status(200).send(data[url]);
    }
    else {
        req.webtaskContext.storage.get(function(err, data) {
            if (err) {
                return res.status(400).send('awooga');
            }
            
            if (data === undefined) {
                console.log('loading data');
                data = {};
                var unzip = new zipper(resources, {
                    base64: true,
                    checkCRC32: true
                });
                _.each(unzip.files, function(value, name) {
                    data[name] = value._data;
                });

                req.webtaskContext.storage.set(data, function(err) {
                    if (err) {
                        console.log('err',err);
                    }
                });
            }

            var url = req.url.substring(1);
            res.status(200).send(data[url]);
        });
    }

});

// This endpoint would be called by webtask-gallery to dicover your metadata
app.get('/meta', function (req, res) {
    res.status(200).send(metadata);
});

module.exports = app;
