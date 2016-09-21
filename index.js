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
        self            = this;

    Object.keys(LOG_LEVELS).forEach(function(log_level) {
        self._prototypeLevels(log_level);
    });
};

central_logger.prototype._prototypeLevels = function(log_level) {
    var
        self            = this,
        bunyan_level    = null,
        log_string      = '',
        custom_log      = {};

    self[log_level] = function(log_message) {
        try {
            /*
                if !log_message
                    initializing with empty object
            */
            if(!log_message)
                log_message = {};

            if(typeof log_message === 'string'){
                log_string  = log_message;
                log_message    = {};
            } else {
                log_string = _.get(log_message,'log','');
            }

            _.set(log_message,'log',null);
            delete log_message.log;

            /*
                Copy Superficially and not deep clone
            */
            Object.keys(self.DEFAULT_LOG).forEach(function(default_log_key){
                _.set(custom_log,default_log_key,self.DEFAULT_LOG[default_log_key]);
            });

            /*
                copying custom keys
            */
            Object.keys(log_message).forEach(function(custom_key){
                _.set(custom_log,custom_key,log_message[custom_key]);
            });

            custom_log.log_level = log_level;
            bunyan_level    = LOG_LEVELS[log_level];
            self.BUNYAN_LOG[bunyan_level](custom_log,log_string);
        } catch (error){
            console.error('Error - ',error);
        }
    };
}

module.exports = central_logger;
