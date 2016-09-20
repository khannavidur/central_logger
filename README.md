# central_logger
A wrapper on [bunyan](https://github.com/trentm/node-bunyan) with custom streams and log keys

#How to use

- REQUIRE
```
var CENTRAL_LOGGER  = require('central_logger');
```

- INSTANTIATE
```
var
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
```

- CALL
```
L.verbose("verbose");
L.debug("debug");
L.info("info");
L.log("log");
L.warn("warn");
L.error("error");
L.critical("critical");
```

#Available Levels
- 'verbose'
- 'debug'
- 'info'
- 'log'
- 'warn'
- 'error'
- 'critical'

#Parameters to pass to constructor

- `name`
 *Name of the logging app.*
 
- `streams`
  *Array of streams per level* [Read More](https://github.com/trentm/node-bunyan#streams)
  
- `logid`
  *Log id of the logs. It is to be kept unique for each app*

- `service`
  *Service name doing the logs*

- `url`
  *URL of the API for which logs are made*
  
  
#Sample Log
```
{"name":"myapp","hostname":"myMac","pid":54195,"level":60,"logid":123,"service":"dummy_test_service","url":"dummy_test_url","log_level":"info","msg":"info","time":"2016-09-20T08:41:42.173Z","v":0}
```
