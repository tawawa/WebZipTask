
var _ = require('underscore');

var config = {
    setVars: setEnvironment
};

function setEnvironment(req) {
    if (req.webtaskContext != null) {
        var secrets = req.webtaskContext.data;
        _.each(secrets, function(value,key) {
            //console.log(key,value);
            config[key] = value;
        });
    }
    else {
        require('dotenv').config();
        _.each(process.env, function(value,key) {
            //console.log(key,value);
            config[key] = value;
        });
    }
    /*
    _.each(config, function(key,value) {
        console.log(key,value);
    });
    */
}

module.exports = config;
