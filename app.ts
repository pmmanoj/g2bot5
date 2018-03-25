// bot5 (DEV branch)

// SECTION 0: REQUIRES 
    import fs      = require('fs'); 
    import path    = require('path'); 

    // LOGGER
    import { logger } from "./winston";  

    // ENV variables 
    require ( 'dotenv-extended' ).load(); 

    var builder = require('botbuilder'); 
    var restify = require('restify');

    // ----- Quick Debug area -----
    console.log(' App ID %s',   process.env.MicrosoftAppId )
    console.log(' Password %s', process.env.MicrosoftAppPassword )

    logger.info (" Winston Logger . . . has started"); 

    // ------ End Debug area ------



// SECTION 1: Setup BOT Server; REST endpoints, PORT listener, BOT process

    // Restify: BOT local listener
    var server = restify.createServer(); 
        server.listen( process.env.port || 
                       process.env.PORT || 
                       3978, 
                       function() {  
                          console.log( '%s listening to %s', server.name, server.url ); 
                      } );

    // Connector: BOT Service (Remote) in Azure
    var connector = new builder.ChatConnector( 
       {   appId: process.env.MicrosoftAppId,
          appPassword: process.env.MicrosoftAppPassword 
       }
    ); 
       /*
       {   appId: null
         , appPassword: null
       } );
       */

    // LISTEN on REST endpoint
    server.post( '/api/messages', 
                 connector.listen() ); 

// SECTION 2: Setup BOT Dialog 
    // STORAGE
        // TODO 1: Integrate AZURE storage (CosmosDB and TableStorage)
        // TODO 2: Custom storage (MongoDB: on LOCALHOST which is running on-premise)

    var inMemoryStorage = new builder.MemoryBotStorage();

    var bot = new builder.UniversalBot( connector, 
        [ // array starts here 
            function(session: any) { 
                builder.Prompts.text( session, 
                                               "Welcome and Hello! I am your A.I bot !!" 
                                            +  ". . . . . first, we will try simple stuff :-) "
                                            +  " ---> " 
                                     ); 
            },

            function( session: any, results: any ) { 
                logger.info(" Entering Response zone ... ");
                  session.endDialog( `Hello ${ results.response } !! ` ); 
                logger.info(" Exiting Response zone ... ");

            }
        ] ); 
















