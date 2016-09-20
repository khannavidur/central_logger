/* 
    jshint 
        multistr    : true,
        node        : true 
*/
"use strict";

var
    /*
        PROJECT FILES
    */
    CENTRAL_LOGGER  = require('../index.js'),

    /*
        GLOBAL VARIABLES
    */
    L               = new CENTRAL_LOGGER({
        name        : 'myAppLogger',
        logid       : 123,
        service     : 'dummy_test_service',
        url         : 'dummy_test_url',
        streams     : [
        {   
            level   : 'verbose',
            stream  : process.stdout

        },
        {
            level   : 'warn',
            path    : '/Users/vidur/vidur_bunyan_logs.log'
        }]
    });

L.verbose("verbose");
L.debug("debug");
L.info("info");
L.log("log");
L.warn("warn");
L.error("error");
L.critical("critical");
