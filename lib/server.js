
// required built-in modules
const http = require("http");
const URL = require('url');

// required created modules
const handlers = require("./handlers");
const config = require("./config");
const helpers = require("./helpers");


// setting the http server
const server = http.createServer();

// The request handler function 
const requestHandler = (request, response) => {


    // get the parameters from the request Object
    const { method, url, headers } = request;

    // get the url and parse it
    const parsedUrl = URL.parse(url, true);

    // get the headers
    const reqHeaders = headers;

    // get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the query string 
    const queryString = parsedUrl.query;

    // convert the method to lower case
   const reqMethod = method.toLowerCase();

    // handling the post or put incoming request
    let body = [];
    
    // listen to the data event on request
    request.on('data', (chunk) => {
        body.push(chunk);
    })

    // end event on the request
    request.on('end', () => {
        body = Buffer.concat(body).toString();

        // handling routes functions

        const options = {
            reqHeaders,
            trimmedPath,
            queryString,
            reqMethod,
            body: helpers.parseJsonToObject(body)
        }

        // checking and choosing a specific handler from the router and storing the handler in chosenHandler variable.
        let chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // If the request is within the public directory, use the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler

        // handlers callback function for the statusCode and json obj or string or just not undefined
        handlersCallback = (statusCode, statusCodeObj, contentType) => {
            // check for the type of statusCode
            statusCode = typeof statusCode === 'number' ? statusCode : 200;

            // check for the type of contentType
            contentType = typeof contentType === 'string' ? contentType : 'json';


            let statusCodeStr = '';
            // checking for contentType
            if(contentType === 'json') {
                // Return the response
                response.setHeader('Content-Type', 'application/json')

                // check for the type of statuscode object
                statusCodeObj = typeof statusCodeObj === 'object' ? statusCodeObj : {};
                
                // Convert the payload to a string
                statusCodeStr = JSON.stringify(statusCodeObj);

            } 
            
            if (contentType === 'html') {
                // Return the response
                response.setHeader('Content-Type', 'text/html');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj === 'string' ? statusCodeObj : '';
                
            };

            if (contentType === 'favicon') {
                // Return the response
                response.setHeader('Content-Type', 'image/x-icon');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            };

            if (contentType === 'css') {
                // Return the response
                response.setHeader('Content-Type', 'text/css');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            };

            if (contentType === 'png') {
                // Return the response
                response.setHeader('Content-Type', 'image/png');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            }

            if (contentType === 'jpg') {
                // Return the response
                response.setHeader('Content-Type', 'image/jpeg');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            }

            if (contentType === 'font-awesome') {
                // Return the response
                response.setHeader('Content-Type', 'application/font-woff');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            }

            if (contentType === 'plain') {
                // Return the response
                response.setHeader('Content-Type', 'text/plain');

                // check for the type of statuscode object
                statusCodeStr = typeof statusCodeObj !== 'undefined' ? statusCodeObj : '';

            }

            // general responses to all content-types
            response.writeHead(statusCode);
            response.end(statusCodeStr)

            // Log the request path
            // console.log('returning this response ', statusCode);
        }

        // calling the handler function with the chosenHandler variable
        chosenHandler(options, handlersCallback);

    })

    // request error
    request.on('error', (err) => {
        response.statusCode = 400;
        response.end();
    })

    // response error
    response.on('error', (err) => {
        console.error(`this is the error, ----->> ${err}`);
    });

   
};

// defining the request router
router = {
    'ping' : handlers.ping,
    'about' : handlers.about,
    '' : handlers.index,
    'public' : handlers.public,
    'users' : handlers.users,
    'login' : handlers.login,
    'register': handlers.register,
    'admin' : handlers.admin,
    'posts' : handlers.posthtml,
    'post/create' : handlers.getcreatehtml,
    'api/allpost' : handlers.allPosts,
    'post/edit' : handlers.edithtml,
    'api/post' : handlers.create,
    'post' : handlers.posthtml
};

// handling the server request event
server.on('request', requestHandler);

// the listening method on server
server.listen(config.httpPort, () => {
    console.log(`server is listening on port ${config.httpPort} in ${config.envName} mode`)
});



// PSEUDO CODE FOR SERVER.JS

/*
 * 1. create the server  and pass in the callback function for it when it is called with the request event.
 * 
 * 2. get all the available needed parameters such as method, url, querystring, and so on
 * 
 * 3. store their values in a options object.
 * 
 * 4. the options object will be used by the chosenHandler as an argument
 * 
 * 5. create a chosenHandler variable for determining the handler to be called based on the request that comes in
 * 
 * 6. the chosenHandler will be determined by using the router object that stores the trimmedPath as a key and the      corresponding value as the chosen handler to call in association with the path the user sents. we check for the typeof router[trimmedPath] if it is not undefined 
 * 
 * 7. with the chosenHandler variable now holding the specific handler gotten from the router object based on the trimmedPath requested by the user, the chosenHandler variable now holds a handler function and we now call it by passing the options object and the handlerCallback
 * 
 * 8. the handler function comes from a handler object module created and called at the top of the file under the created module required.
 * 
 * 9. the handler function takes two parameters, the option object and the handlersCallback
 * 
 * 10. the options object now contains all the available parameters from the incomingRequest which the request argument passed into the requestHandler function and each handler can make use of it to determine it function (each explained in the handler file)
 * 
 * 11. the handlerCallback takes 3 argument; the statusCode, the statusMsg(json, string, !undefined) and the contentType and these values are determined by each handler when it is called.
 * 
 * 12. the chosenHandler also since the public handler will only be called when you call the public trimmedPath, that means all the files in the public directory will not get called hence, we set the chosenHandler for any route (trimmedPath) that includes the indexof public/ using the (indexof (public/) > -1) to be defaulted to the handlers.public function.
 * 
 * 12. the statusCode is inserted into the header with response.writeHead, the statusMsg is converted into a string for the json and html and just checked to see if it is not undefined for the other static files and the value is stored as string in statusCodeStr variable and that is passed into  response.end as an argument to be displayed.
 * 
 * 
 * N.B:: always check for the typeof the incoming variables and if it is not the type you are expecting, set it to a some default type.
 * 
 * N.B:: the handlerCallback is what will always be referred to as simply callback in the handlers module.
 * 
 */