
// WINSTON - LOGGER 
import fs      = require('fs'); 
import path    = require('path'); 
import winston = require('winston'); 

// SECTION 0: Logger 
const logDir = './log'; 
// Sync (blocked call to OS; ensure directory's existence or create one )
if ( !fs.existsSync(logDir) ) {  
    fs.mkdirSync(logDir);        
}

// const transport = new( require('winston-daily-rotate-file') ) 
const transport = new winston.transports.File
                ( 
                    {
                        datePattern:   'yyyy-MM-dd'
                      , name:          'file' 
                      , filename:      path.join( __dirname, logDir, 'combined.log')
                      , level:         'debug'  
                      , prepend:       true
                    }
                );

const logger = new winston.Logger ( {
transports: [ transport ]
} );

export { logger }; 

// end