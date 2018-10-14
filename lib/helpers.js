// built in modules
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// required created modules
const config = require('./config');

// define the helpers object
const helpers = {};

// Hash password
helpers.hash = (password) => {
    if (typeof (password) === 'string' && password.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(password).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Parse a JSON String to an object in all cases, without throwing
helpers.parseJsonToObject = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return {};
    }
}
// convert html files to string for templating
helpers.htmlToString = (templateName, htmlCallback) => {
    // check for the templatename type and validate
    templateName = typeof templateName === 'string' && templateName.length > 0 ? templateName : false;

    // only continue if the templatename.
    if (templateName) {
        // check for the template name directory
        const templateDir = path.join(__dirname, './../templates/');

        // read the template file
        fs.readFile(templateDir + templateName + '.html', 'utf8', (err, string) => {
            if (!err && string) {
            htmlCallback(string)
            }
        })
    } else {
        indexCallback('a valid template name was not specified');
    }


}

// Move the uploaded files to the public directory
helpers.uploadFile = (file) => {
    
    // 1. get the default path to the public directory
    const fileDir = path.join(__dirname, '../public/photos/');

    const fileObj = typeof(file) === 'object' ? file : false;

    // Create the dates
    let now = new Date();

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let day = now.getDate()

    let month = now.getMonth();

    let year = now.getFullYear()

    const date = `${months[month]}-${day}-${year}` 

    fileName = date + '-' + fileObj.name


    if (fileObj) {
        // Grab the extension to resolve any image error
        // var ext = file.data.split(';')[0].match(/jpeg|png|gif/)[0];

        // strip off the data: url prefix to get just the base64-encoded bytes
        var data = file.data.replace(/^data:image\/\w+;base64,/, "");

        var buf =  Buffer.from(data, 'base64');

        fs.writeFile(fileDir + fileName, buf, (err) => {
            if (err) {
                callback(error);
            };
        })
    }
   
  
}

helpers.readTemplate = (templateName, templateData, indexCallback) => { //helperCallback will be called by any helper trying to access it and it has nothing to do with the readTemplate, it carries the result of the readTemplate checked with if conditional to the other helpers or handlers trying to access it.
    // check for the templatename type and validate
    templateName = typeof templateName === 'string' && templateName.length > 0 ? templateName : false;

    templateData = typeof (templateData) === 'object' && templateData !== null ? templateData : {};


    // readFile callback
    const readFileCallback = (error, string) => {
        // check for error
        if (!error && string && string.length > 0) {
            // Do interpolation on the string 
            const finalString = helpers.interpolate(string, templateData);

            // calling the expected callback for any other usage of the readtemplate parameter with the values it is expecting 
            indexCallback(false, finalString); //false means no error
        } else {
            indexCallback('no template could be found')
        }
        
    }

    // only continue if the templatename.
    if (templateName) {
        // check for the template name directory
        const templateDir = path.join(__dirname, './../templates/');

        // read the template file
        fs.readFile(templateDir + templateName + '.html', 'utf8', readFileCallback)
    } else { 
        indexCallback('a valid template name was not specified');
    }
}

// Add the universal header and footer to as string, and pass provided Templatedata object to the readTemplate helpers
helpers.addUniversalTemplates = (string,  templateData, uniTempCallback) => {
    string = typeof (string) === 'string' && string.length > 0 ? string : '';

    templateData = typeof (templateData) === 'object' && templateData !== null ? templateData : {};

    // get header callback
    const getHeaderCallback = (error, headerString) => { //the error and headerString is received from the handlerCallback of the readTemplate helper when it was called with the header templateName
        if(!error && headerString) {
            // Get the footer
            helpers.readTemplate('_footer', templateData, (error, footerString) => {
               
                if (!error && footerString ) {
                    if (string.indexOf("DOCTYPE") > -1) {
                        uniTempCallback(false, string);
                    } else  {
                      const fullString = headerString + string + footerString
                        uniTempCallback(false, fullString);
                    }
                    
                }

            })
        } else {
            uniTempCallback('Could not find the header template');
        }
    }

    // Get the header
    helpers.readTemplate('_header', templateData, getHeaderCallback)
    
}

// Take a given string and a templateData object and find/replace all the keys within it (to be called by readTemplate handler)
helpers.interpolate = (string, templateData) => {
    string = typeof(string) === 'string' && string.length > 0 ? string : '';

    templateData = typeof(templateData) === 'object' && templateData !== null ? templateData : {};

    // Add the templateGlobals to the templateData Object, pretending their key name with globals
    for (const keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            templateData['global.'+ keyName] = config.templateGlobals[keyName];    
        }
    }

    // for each key in the templateData Object, insert its value into the string at the corresponding placeholder
    for (const key in templateData) {
        if (templateData.hasOwnProperty(key) && typeof(templateData[key]) === 'string') {
            const replace = templateData[key];
            const find = '{'+key+'}';
            string = string.replace(find, replace);
            
        }
    }
    return string;
};

// to get the contents of a static (public) asset
helpers.getStaticAsset = (fileName, staticCallback) => {
    fileName = typeof(fileName) === 'string' && fileName.length > 0 ? fileName : false;

    if (fileName) {
        // read file callback
        const fileCallback = (error, publicData) => {
            if (!error && publicData) {
                staticCallback(false, publicData);
            } else {
                staticCallback('No file could be found');
            }
        }
        // define the public directory
        const publicDir = path.join(__dirname, '/../public/');
        fs.readFile(publicDir + fileName, fileCallback);
    } else {
        callback('A valid file name was not specified');
    }
}

module.exports = helpers;

// PSEUDO-CODE FOR HELPERS.JS

/*
 * 
 * helpers hold the functions used for various functions in the handlers module
 * 
 * ------------------------READ TEMPLATE HELPERS-----------------------------------
 * 
 * 1. the read template helper is used to read the html file inside of the templates directory.
 * 
 * 2. it takes the templatename, templatedata and the indexcallback(that it calls to determine the indexcallback parameters in the handlers.index);
 * 
 * 3. check for the typeof the templateName and templateData.
 * 
 * 4. using the fs built in module and the readFile key in the fs object to read the file of the template name as the first parameter and it has a callback which doesnt get called we only check for the value it holds and firstly get the template direcory jusign the path built in module.
 * 
 * 5. we check if the error is not there and we have a string and also string that is greater than 0 in length and if it passes, we call the interpolate handler to get the final string (which contains the header + the string we read + the footer).
 * 
 * 6. 
 *  
 */