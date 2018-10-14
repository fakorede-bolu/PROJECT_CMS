// required built in modules
const database = require('../mongo/collections/User');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
// const path = require('path')

// required created modules

const helpers = require('./helpers');

// Connection URL
const url = 'mongodb://localhost:27017/trends_blog';

// setting up the routing handler objects
const handlers = {};


// setting up the ping handler to be called by the chosenHandler if chosen
handlers.ping = (options, callback) => {
    callback(200)
 }

// setting up the not found handler
handlers.notFound = (options, callback) => {
    callback(404)
}

/*
 * HTML HANDLERS
 * 
*/

// Index page handler
handlers.index = (options, callback) => { 
    
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Blog Home - Start Bootstrap Template',
        'head.description': 'This is the meta description',
        'body.title': 'Hello templated world!'
    }

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
  

   helpers.htmlToString('partials/_navigation', getHtml);

    // Index handler callback passed into the read template
   const indexCallback = (error, string) => {
        // checking for error...
        if (!error && string ) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if(!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback); 
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('home/index', templateData, indexCallback);
    }

};

// About page handler
handlers.about = (options, callback) => {
    
    // preparing data for interpolation
    const templateData = {
        'head.title': ' About Page',
        'head.description': 'this is the about page, something about us',
        'body.title': 'Hello templated world!'
    }
    
    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);
    

    // Index handler callback passed into the read template
    const aboutCallback = (error, string) => {
        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('about/about', templateData, aboutCallback);
    }
};

// Register page handler
handlers.register = (options, callback) => {
    
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Register Page',
        'head.description': 'this is the register page'

    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);
    

    // Index handler callback passed into the read template
    const registerCallback = (error, string) => {
        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('register/register', templateData, registerCallback);
    }
};

// Admin page handler
handlers.admin = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Register Page',
        'head.description': 'this is the register page'
    };

    // get the dashboard for the admin body
    helpers.htmlToString('_footer', (string) => {
        templateData["admin.footer"] = string
    });

    // get the dashboard for the admin body
    helpers.htmlToString('partials/_dashboard', (string) => {
        templateData["admin.body"] = string
    });


    // Index handler callback passed into the read template
    const registerCallback = (error, string) => {
        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('Admin/index', templateData, registerCallback);
    }
};

// all blog posts html handler
handlers.posthtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Register Page',
        'head.description': 'this is the register page'
    };

    // get  the admin body
    helpers.htmlToString('Admin/allposts', (string) => {
        templateData["admin.body"] = string
    });

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);

    

    // Index handler callback passed into the read template
    const registerCallback = (error, string) => {

        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('Admin/index', templateData, registerCallback);
    }
};

// get all the posts
handlers.allPosts = (options, callback) => {
    if (options.reqMethod === 'get') {
        // connect to the database
        MongoClient.connect(url, function (err, client) {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                // 2. Read the collection Users
                const collection = db.collection("Posts").find();

                //4. convert to array and send response with the callback
                collection.toArray((err, result) => {
                    const User = typeof (result) === 'object' && result.length > 0 ? result : false
                    if (!err && User) {
                        callback(200, result.reverse(), 'json')
                    } else {
                        callback(400, { "Error": "User not found" })
                    }
                    // 
                    // console.log(result);

                });
            }
            client.close();
        });
    }
};

// individual blog post
handlers.posthtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Blog Page',
        'head.description': 'This is the blog Individual Page'
        
    }

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);

    // Index handler callback passed into the read template
    const indexCallback = (error, string) => {
        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('singlepost/index', templateData, indexCallback);
    }
};

/*
 * -------------------------------POST CREATE HANDLERS -------------------------
 */

handlers.create = (options, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._create[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};


// the handlers for the create posts
handlers._create = {};

// create blogs html handler {GET METHOD}
handlers.getcreatehtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);


    // get the admin body
    helpers.htmlToString('Admin/createpost', (string) => {
        templateData["admin.body"] = string
    })

    // Index handler callback passed into the read template
    const registerCallback = (error, string) => {

        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('Admin/index', templateData, registerCallback);
    }
};

// Create Posts handler (POST METHOD)
handlers._create.post = (options, callback) => {
    
    if (options.reqMethod === 'post') {
        
        // 1. do validations on the incoming post title, and post
        const title = typeof (options.body.title) === 'string' && options.body.title.length > 0 ? options.body.title : false;
        
        const status = typeof (options.body.status) === 'string' && options.body.status.length > 0 ? options.body.status : 'public';

        const allowComments = typeof (options.body.allowComments) === 'boolean' && options.body.allowComments === true ? true : false;

        const textBody = typeof (options.body.textBody) === 'string' && options.body.textBody.length > 0 ? options.body.textBody : false;

        const fileObject = typeof (options.body.file) === 'object' && Object.keys(options.body.file).length > 0 ? options.body.file : false;

        let fileName = 'default';

        // Create the dates
        let now = new Date();

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        let day = now.getDate()

        let month = now.getMonth();

        let year = now.getFullYear()

        const date = `${months[month]}-${day}-${year}` 

        if (fileObject) {
            fileName = date + '-' + fileObject.name
             helpers.uploadFile(options.body.file, (error) => {
                if (error) {
                    callback(500, { 'Error': 'Could not save file' })
                    
                } else {
                    callback(200)
                }
               
            });
        }    
    
        // 2. if we have the two, continue with code
        if (title && textBody) {
            // connect to the database
            MongoClient.connect(url, function (err, client) {
                // if error callback with 500 nd if there is no error, execute code (in step 1-6)
                if (err) {
                    callback(500, { "Error": "could not connect to mongo" })
                } else {
                    //1. Save the exert database we are using as db
                    const db = client.db("blog_cms");
                    console.log("Connected successfully to server");

                    // 2. create Collection
                     db.createCollection("Posts", database.post);

                    //  3. read collection
                    const collection = db.collection("Posts");

                    // Insert gotten data into the db
                    collection.insert({
                        title: title,
                        status: status,
                        allowComments: allowComments,
                        textBody: textBody,
                        fileImage: fileName,
                        dateCreated: date
                    }, (error, savedPost) => {
                        // 5. if no error, callback with a 200 and the saved User object and the content-Type
                        if (!error && savedPost) {
                            callback(200, savedPost.ops[0], 'json');           
                        } else {
                            // 6. if error, callback with a 500
                            callback(500, { "Error": "could not save user" })
                        }

                    });
                }
                client.close();
            });
        } else {
            callback(400, {"Error" : "required field missing"})
        }

    } 

} 

// get single posts
handlers._create.get = (options, callback) => {
    id = typeof (options.queryString.id === "object") && options.queryString.id.length > 10 ? options.queryString.id : false;

    if (options.reqMethod === 'get' && id) {
        // connect to the database
        MongoClient.connect(url, function (err, client) {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                // 2. Read the collection Users
                const collection = db.collection("Posts").find({ _id: ObjectId(id) });

                //4. convert to array and send response with the callback
                collection.toArray((err, result) => {
                    const User = typeof (result) === 'object' && result.length > 0 ? result : false
                    if (!err && User) {
                        callback(200, result[0], 'json')
                    } else {
                        callback(400, { "Error": "Post not found" })
                    }
                    // 
                    // console.log(result);

                });
            }
            client.close();
        });
    }
}

// --------UPDATE A POST-----------
handlers._create.put = (options, callback) => {
    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;
    console.log(id);

    // {reqMethod, queryString, body, trimmedPath, reqHeaders} = options;
    // reject all request that is not put
    if (options.reqMethod === 'put' && id) {
        // connect to the database
        MongoClient.connect(url, (err, client) => {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                // 2. Read the collection Users
                db.collection('Posts').updateOne( { _id: ObjectId(id) },
                    { $set: { title: options.body.title, status: options.body.status, allowComments: options.body.allowComments, textBody: options.body.textBody }, $currentDate: { lastModified: true } }, (error, response) => {
                        if (!error && response) {
                            const collection = db.collection("Posts").find({ _id: ObjectId(id) });
                            //3. convert to array and send response with the callback
                            collection.toArray((err, result) => {
                                if (!err && result) {
                                    callback(200, result, 'json')
                                } else {
                                    callback(500, { 'Error': 'Could not retrieve the post' })
                                }
                            });
                        } else {
                            callback(500, { 'Error': 'Could not retrieve the post' });
                        };


                        client.close();
                    }
                )
            };
        });
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// --------DELETE A POST-------------
handlers._create.delete = (options, callback) => {
    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;
    console.log(id);

    // {reqMethod, queryString, body, trimmedPath, reqHeaders} = options;
    // reject all request that is not put
    if (options.reqMethod === 'delete' && id) {
        // connect to the database
        MongoClient.connect(url, (err, client) => {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                db.collection('Posts').deleteOne(
                    { _id: ObjectId(id) },
                    (error, response) => {
                        if (!error && response) {
                            const collection = db.collection("Posts").find({});

                            //3. convert to array and send response with the callback
                            collection.toArray((error, result) => {
                                if (error) {
                                    callback(403, { "Error": "could not retrieve the users" })
                                }
                                callback(200, result, 'json')
                            });
                        } else {
                            callback(500, { 'Error': 'Could not delete the user' })
                        };


                        client.close();
                    }
                )
            };
        });
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// ----------------------------EDIT POSTS HTML---------------------------
handlers.edithtml = (options, callback) => {
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length > 0 ? options.queryString.id : false;
    // console.log(typeof (options.queryString.id));

    if (id) {
        // preparing data for interpolation
        const templateData = {
            'head.title': 'Edit Post',
            'head.description': 'this is the Create Post page'
        };

        const getHtml = (string) => {
            templateData["body.nav"] = string
        };


        helpers.htmlToString('partials/_navigation', getHtml);

        // get the side bar for the admin
        helpers.htmlToString('partials/_adminsidebar', (string) => {
            templateData["body.admin-side-nav"] = string
        });

        // get the admin body
        helpers.htmlToString('partials/edit', (string) => {
            templateData["admin.body"] = string
        })

        // Index handler callback passed into the read template
        const registerCallback = (error, string) => {

            // checking for error...
            if (!error && string) {
                // the callback with the unitempcallback
                const uniTempCallback = (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                }

                // Add the universal header and footer
                helpers.addUniversalTemplates(string, templateData, uniTempCallback);
            } else {
                callback(500, undefined, 'html');
            }

        }

        // Reject any request that is not a Get Method.
        if (options.reqMethod === 'get') {
            // Read in a template as a string
            helpers.readTemplate('Admin/index', templateData, registerCallback);
        } else {
            callback(400, { 'Error': 'file not found' })
        }
    
    } else {
        callback(400, {"Error": "This post does not exist"})
    }   

};

// favicon
handlers.favicon = (options, callback) => {
    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', favCallback);

        //favicon callback with error or favicon data
        favCallback = (error, favData) => {
            if (!error && favData) {
                // Callback the favData
                callback(200, favData, 'favicon');
            } else {
                callback(500);
            }
        } 

    } else {
        callback(405);
    };
};

// public assets handler
handlers.public = (options, callback) => {
    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {
        // Get the filename being requested
        const trimmedAssetName = options.trimmedPath.replace('public/', '').trim();

        if (trimmedAssetName.length > 0) {
            //static callback with error or favicon data
            staticCallback = (error, staticData) => {
                if (!error && staticData) {
                    // determine the content type (default to plain text)
                    let contentType = 'plain';

                    if (trimmedAssetName.indexOf('.css') > -1 ) {
                        contentType = 'css';
                    };

                    if (trimmedAssetName.indexOf('.png') > -1) {
                        contentType = 'png';
                    };

                    if (trimmedAssetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    };

                    if (trimmedAssetName.indexOf('.ico') > -1) {
                        contentType = 'favicon';
                    };


                    // Callback the data
                    callback(200, staticData, contentType);

                } else {
                    callback(500);
                }
            }
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName, staticCallback); 
        } else {
            callback(404);
        }

    } else {
        callback(405);
    };
};

// Users Handler
handlers.users = (options, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._users[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};

handlers._users = {};



// Login Handler
handlers.login = (options, callback) => {
    const acceptableMethods = ['post', 'get'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._login[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};

handlers._login = {};

// post Users Handler
handlers._users.post = (options, callback) => {

    const name = typeof (options.body.name) === 'string' && options.body.name.length > 0 ? options.body.name : false;

    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;
    // Reject any request that is not a Post Method.
    if (options.reqMethod === 'post' && name && email && password) {
        // connect to the database
        MongoClient.connect(url, function (err, client) {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                //2. create the Users collection we are using in the database
                db.createCollection("Users", database.User);

                
                // 3. Read the collection Users
                const collection = db.collection("Users");

                // 4. hash the password
                const hashedPassword = helpers.hash(options.body.password);

                // make the email field unique
                db.collection("Users").createIndex( {"email" : 1 }, {unique: true}, (error, pass) => {
                    if (!error && pass) {
                        // 5. Insert data into the collection and use to callback to check for success or error.
                        collection.insert({
                            name: name,
                            email: email,
                            password: hashedPassword
                        }, (error, savedUser) => {
                            // 5. if no error, callback with a 200 and the saved User object and the content-Type
                            if (!error && savedUser) {
                                callback(200, savedUser.ops[0], 'json');
                            } else {
                                // 6. if error, callback with a 500
                                callback(500, { "Error": "could not save user" })
                            }
                        });
                    } else {
                        callback(400, {"Error": "this Email is already taken or invalid"})
                    }
                    client.close();
                })
            }
        });
    }else {
        callback(400, { 'Error': 'Missing the required field' });
    }
};

// get Users Handler
handlers._login.post = (options, callback) => {

    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;
    console.log(email);

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;

    console.log(password);
    
     
    if (options.reqMethod === 'post' && email && password) {
        // connect to the database
        MongoClient.connect(url, function (err, client) {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                // 2. Read the collection Users
               const collection = db.collection("Users").find({ email : email });

                // 3. Hash the incoming password
                const hashedPassword = helpers.hash(password);

                //4. convert to array and send response with the callback
                collection.toArray((err, result) => {
                    const User = typeof(result) === 'object' && result.length > 0 ? result : false
                    if (!err && User) {
                        if (result[0].password === hashedPassword && result[0].email === email) {
                            callback(200, result, 'json')
                        } else {
                            callback(400, {"Error" : "required field missing or incorrect"})
                        }
                    } else {
                        callback(400, {"Error": "User not found"})
                    }
                    // 
                    console.log(result);
    
                });
            }
            client.close();
        });
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// login html page handler
handlers._login.get = (options, callback) => {

    // preparing data for interpolation
    const templateData = {
        'head.title': 'login Page',
        'head.description': 'this is the login page'
    }

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };


    helpers.htmlToString('partials/_navigation', getHtml);
    // Index handler callback passed into the read template
    const aboutCallback = (error, string) => {
        // checking for error...
        if (!error && string) {
            // the callback with the unitempcallback
            const uniTempCallback = (error, fullString) => {
                if (!error && fullString) {
                    // Return that page as HTML now the fullSting
                    callback(200, fullString, 'html');
                } else {
                    callback(500, undefined, 'html');
                }
            }

            // Add the universal header and footer
            helpers.addUniversalTemplates(string, templateData, uniTempCallback);
        } else {
            callback(500, undefined, 'html');
        }

    }

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        // Read in a template as a string
        helpers.readTemplate('login/login', templateData, aboutCallback);
    }
};


// Update Users Handler
handlers._users.put = (options, callback) => {

    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;

    // {reqMethod, queryString, body, trimmedPath, reqHeaders} = options;
    // reject all request that is not put
    if (options.reqMethod === 'put' && id) {
        // connect to the database
        MongoClient.connect(url,  (err, client) => {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                Users = db.collection("Users");
                // 2. Read the collection Users
                db.collection('Users').updateOne(
                    { _id: ObjectId(id) },
                    { $set: { firstName: options.body.firstName, lastName: options.body.lastName }, $currentDate: { lastModified: true }}, (error, response) => {
                        if (!error && response) {
                            const collection = db.collection("Users").find({ _id: ObjectId(id) });
                            //3. convert to array and send response with the callback
                            collection.toArray((err, result) => {
                                if (!err && result) {
                                    callback(200, result, 'json')
                                } else {
                                    callback(500, { 'Error': 'Could not retrieve the user' })
                                }
                            });
                        } else {
                            callback(500, { 'Error': 'Could not delete the user' });
                        };

                        
                        client.close();
                    }
                )
            };
        });
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// Delete Users Handler
handlers._users.delete = (options, callback) => {
    // check for the id sent
    const id = typeof(options.queryString.id.trim()) === 'string' ? options.queryString.id.trim() : false;

    if (id && options.reqMethod === "delete") {
      // Connect to the database
      MongoClient.connect(url, (err, client) => {
          // if error callback with 500 nd if there is no error, execute code (in step 1-6)
          if (err) {
              callback(500, { "Error": "could not connect to mongo" })
          } else {
              //1. Save the exert database we are using as db
              const db = client.db("blog_cms");
              console.log("Connected successfully to server");

              // 2. Read the collection Users
              db.collection('Users').deleteOne(
                  { _id: ObjectId(id) },
                 (error, response) => {
                      if (!error && response) {
                          const collection = db.collection("Users").find({});

                          //3. convert to array and send response with the callback
                          collection.toArray((error, result) => {
                              if (error) {
                                  callback(403, { "Error": "could not retrieve the users" })
                              }
                              callback(200, result, 'json')
                          });
                      } else {
                          callback(500, { 'Error': 'Could not delete the user' })
                      };

                     
                      client.close();
                  }
              )
          };
      })
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

module.exports = handlers;


// HANDLERS.JS PSUEDO CODE

/*
 * 1. the handler module starts with the handlers object which will hold the various kind of handlers for thee routes called under the server file under the router object
 * 
 * 2. the handlers.notfound is important and invokes the handlersCallback passing to it just the statusCode usind the callback parameter.
 * 
 *       ---------------------------------HANDLERS.INDEX----------------------------------------
 *                   always check the error and string nd pass the response for the else
 * 
 * 3. the handlers.index takes the options parameter and the callback which will be used to invoke the handlers callback in the server file as specified by the chosenHandler which now holds the handler.index if it is called
 * 
 * 4. the handler.index is used for serving index.html file.
 * 
 * 5. we need to get the file using the fs built in module and we did all that with the helpers.readTemplate function that will need the fileName (index), the templateData which are objects we want to read into the html file and the indexCallback that will be invoked by the readTemplate helper by passing it two argument (the error nd the string ) gotten from reading the file with the built in fs module.
 * 
 * the invoking is like i am now calling this function in my own code. Hence, the code is writing awaiting a call.
 * 
 * 6. the indexCallback takes the error nd the string as arguments as stated in step 5 and we check for if no error nd if there is a string and if there is no error nd there is a string, we call a adduniversaltemplate helper which is used to add the header nd footer template to the body html. it takes the string which is now the read html file and the templateData and its own callback (uniTempCallback) which will be invoked by the adduniversaltemplate to send its own final data out.
 * 
 * 7. the uniTempCallback takes the error and fullString after the concartination is done and pass in the statuscode, the finalString as the statusMsg and the contentType.
 * 
 * 
 */