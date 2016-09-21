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
    You can call the lo functions in one of the two ways
    - *Pass a string arugment*
    ```
    L.verbose("verbose");
    L.debug("debug");
    L.info("info");
    L.log("log");
    L.warn("warn");
    L.error("error");
    L.critical("critical");
    ```
    - *Pass an object with some custom keys for the log. `log` key is the one with string message.*
    ```
    L.verbose({dummy_key:'dummy_value',log:"verbose"});
    ```

#Available Levels
- `verbose`
- `debug`
- `info`
- `log`
- `warn`
- `error`
- `critical`

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
  
  
#Sample Logs
```
{"name":"myapp","hostname":"myMac","pid":54195,"level":60,"logid":123,"service":"dummy_test_service","url":"dummy_test_url","log_level":"info","msg":"info","time":"2016-09-20T08:41:42.173Z","v":0}
{"name":"myapp","hostname":"myMac","pid":71589,"level":10,"logid":123,"service":"dummy_test_service","url":"dummy_test_url","log_level":"verbose","dummy_key":"dummy_value","msg":"verbose","time":"2016-09-21T07:26:26.655Z","v":0}
```
