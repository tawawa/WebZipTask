
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var metadata = require('./webtask.json');
var config = require('./config');
var zipper = require('node-zip');

var zip = new zipper();
console.log('zip',zip);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req,res,next) {
    config.setVars(req);
    //console.log('domain',config.TENNANT_DOMAIN);
    next();
});

app.get('/*', (req, res) => {
    console.log('url',req.url);

    req.webtaskContext.storage.get(function(err,data) {
        if (err) {
            return res.status(400).send('awooga');
        }
        if (data === undefined) {
            data = {};
            /*
            */
        }
        console.log('data',data);
        
        res.set('Content-Type', 'text/html');
        res.status(200).send(config.message);
    });    

});

// This endpoint would be called by webtask-gallery to dicover your metadata
app.get('/meta', function (req, res) {
    res.status(200).send(metadata);
});

module.exports = app;
