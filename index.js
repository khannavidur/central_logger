/* 
    jshint 
        multistr    : true,
        node        : true 
*/
"use strict";

var
    /*
        NPM THIRD PARTY
    */
    BUNYAN              = require('bunyan'),
    MOMENT              = require('moment'),
    _                   = require('lodash'),

    /*
        GLOBAL VARIABLES
    */
    LOG_LEVELS          = {
        'verbose'       : 'trace',
        'debug'         : 'debug',
        'info'          : 'info',
        'log'           : 'info',
        'warn'          : 'warn',
        'error'         : 'error',
        'critical'      : 'fatal'
    };

function central_logger(opts) {
    var
        self            = this;
    
    /*
        Setting Log Configurations
    */   
    self.BUNYAN_CONFIG  = {
        name            : _.get(opts,'name','myapp'),
        streams         : _.get(opts,'streams',[])
    };

    /*
        Setting stream levels
    */
    self.BUNYAN_CONFIG.streams.forEach(function(streamUnit){
        if(_.get(streamUnit,'level','')){
            _.set(streamUnit,'level',_.get(LOG_LEVELS,streamUnit.level,''));
        }
    });

    /*
        Setting default json to be used in every log
    */
    self.DEFAULT_LOG    = {
        logid           : opts.logid    || MOMENT().format('YYYYMMDDHHmmsss'),
        service         : opts.service  || '',
        url             : opts.url      || '',
        log_level       : ''
    };

    /*
        Initiating bunyan instance
    */
    try{
        self.BUNYAN_LOG = BUNYAN.createLogger(self.BUNYAN_CONFIG);
    } catch(error){
        console.error('Error - ',error);
    }

    self._exposeLevels();
}

central_logger.prototype._exposeLevels = function() {
    var
        self            = this,
        bunyan_level    = null;

    Object.keys(LOG_LEVELS).forEach(function(log_level) {
        self[log_level] = function(log_string) {
            self.DEFAULT_LOG.log_level = log_level;
            try {
                bunyan_level    = LOG_LEVELS[log_level];
                self.BUNYAN_LOG[bunyan_level](self.DEFAULT_LOG,log_string);
            } catch (error){
                console.error('Error - ',error);
            }
        };
    });
};

module.exports = central_logger;
