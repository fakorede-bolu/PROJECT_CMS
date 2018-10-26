// required built in modules
const database = require('../mongo/collections/User');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const lib = require("./data");
// const path = require('path')

// required created modules

const helpers = require('./helpers');

// Connection URL
const url = 'mongodb://localhost:27017';

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
// Category Html 
handlers.categoryhtml = (options, callback) => {
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
    helpers.htmlToString('Admin/category', (string) => {
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

// Edit Category Html
handlers.categoryEdithtml = (options, callback) => {
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
    helpers.htmlToString('partials/editcategory', (string) => {
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

// get all the posts html
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

// create blogs html handler
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

// individual blog post html
handlers.individualPosthtml = (options, callback) => {
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

// Edit Post html
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
        callback(400, { "Error": "This post does not exist" })
    }

};

/*
 *
 * ----------------------------API Handlers------------------------------------
 * 
 */

// Category Handler
handlers.categories = (options, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._categories[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};

handlers._categories = {};

// Category - get
// Required data - category
// Optional data -  none.
// @TODO make only authenticated users to assess this route
handlers._categories.post = (options, callback) => {
   const category = typeof(options.body.category) === 'string' && options.body.category.length > 0 ? options.body.category : false;

    // Create the dates
    const date = lib.date();

    if (category) {
        // create category data
        const data = {
            category: category,
            date: date
        }
        // Insert into the category collection in the database
        lib.create("Category", data, (error, category) => {
            if(!error && category) {
                callback(200, category, 'json')
            } else {
                callback(500, {"Error" : "Could not creare the category"})
            }
        })      
    } else {
        callback(400, {"Error" : "Missing required field"})
    }
}


// Category - get
// Required data - id
// Optional data -  none.
handlers._categories.get = (options, callback) => {
    const {queryString} = options;
    const id = typeof (queryString.id) === 'string' && queryString.id.length > 0 ? queryString.id : false;
    if (options.reqMethod === 'get' && id) {
        const data = { _id: ObjectId(id) }
       lib.read("Category", data, (error, data) => {
           if (!error && data) {
               callback(200, data[0], 'json');
           } else {
               callback(500, {"Error" : "Could not read this category"});
           }
       })
    } else {
        callback(400, { "Error": "Missing required field" } );
    }
};

// Category - put
// Required data - id
// Optional data -  none.
handlers._categories.put = (options, callback) => {
    // validate the required data
  const id = typeof(options.queryString.id) === 'string' && options.queryString.id.length > 0 ? options.queryString.id : false;
  
  if (options.reqMethod === 'put' && id) {
    // create the find data requirement object
    const data = { _id: ObjectId(id) };
    // Create the update Object
    const updateData = { category: options.body.category };

    lib.update("Category", data, updateData, (error, data) => {
        if (!error && data) {
            lib.read("Category", data, (error, category) => {
               if (!error, category) {
                   callback(200, category, 'json');
               } else {
                   callback(500, { "Error": "Could not read the Category" })
               } 
            });
        } else {
            callback(500, {"Error" : "Could not update the Category" })
        }
    });

  } else {
      callback(400, { "Error": "Missing required field" });
  }

};

// Category - delete
// Required data - id
// Optional data -  none.
handlers._categories.delete = (options, callback) => {
    // Validate the required data
    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;

    // reject all request that is not delete
    if (options.reqMethod === 'delete' && id) {
        
        // Delete the Category with the given id
        const data = { _id: ObjectId(id) }

        lib.delete("Category", data, (error) => {
            if (!error) {
                callback(200)
            } else {
                callback(500, { 'Error': 'Could not delete the specified category' });
            }
        })
       
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// All Category - get
// Required Data - id
// Optional data - none
handlers.allCategories = (options, callback) => {
    const { reqMethod } = options;

    if ( reqMethod === 'get') {
        
        // Read all the Category 
        lib.read("Category", null, (error, category) => {
            if (!error && category) {
                callback(200, category.reverse(), 'json')
            } else {
                callback(500, { 'Error': 'Could not read the categories' }) 
            }
        })
        
    } else {
        callback(400, {'Error' : 'Required field missing'});
    }

};


/*
 * Post Handler
 */
// TODO, make only authenticated users to assess this route.
handlers.post = (options, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._post[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};


// the handlers for the create posts
handlers._post = {};



// Create Posts handler (POST METHOD)
// Required Data - title, status, category,  textBody
// Optional Data - allowcomments, fileObj
handlers._post.post = (options, callback) => {

    // 1. do validations on the required data
    const title = typeof (options.body.title) === 'string' && options.body.title.length > 0 ? options.body.title : false;

    const status = typeof (options.body.status) === 'string' && options.body.status.length > 0 ? options.body.status : 'public';

    const category = typeof (options.body.category) === 'string' && options.body.category.length > 0 ? options.body.category : false;


    const allowComments = typeof (options.body.allowComments) === 'boolean' && options.body.allowComments === true ? true : false;

    const textBody = typeof (options.body.textBody) === 'string' && options.body.textBody.length > 0 ? options.body.textBody : false;

    const fileObject = typeof (options.body.file) === 'object' && Object.keys(options.body.file).length > 0 ? options.body.file : false;

    // Only execute code if the required datas passed validation
    
    if (options.reqMethod === 'post' && title && status && category && textBody) {
        
        // Create the fileName and set it to default.
        let fileName = 'default';

        // Create the dates
       const date = lib.date()

        // Set the file (image) name and then upload the file to the photo url if there is a fileObject
        if (fileObject) {
            fileName = date + '-' + fileObject.name
             helpers.uploadFile(options.body.file, (error) => {
                if (error) {
                    callback(500, { 'Error': 'Could not save file' })
                } else {
                    callback(200)
                }
               
            });
        };

        //Read the category selected by the user using the category name and Pass the category Id to the Post Obj
        // 1. Create the category object to read the data
        const categoryData = {category : category};

        // 2. Get the category from the Category collection in the database And create the Post Object
        lib.read("Category", categoryData, (error, category) => {
            if(!error && category) {
        // 3. Create the Post Object to be inserted into the database
                const postData = {
                    title: title,
                    status: status,
                    category: category[0]._id,
                    allowComments: allowComments,
                    textBody: textBody,
                    fileImage: fileName,
                    dateCreated: date
                };

        // 4. Insert into the Post collection in the database
                lib.create("Posts", postData, (error, post) => {
                    if(!error && post) {
                        callback(200, post, 'json');
                    } else {
                        callback(500, { "Error": "Could not create new post" });
                    }
                })
            } else {
                callback(500, {"Error" : "Could not get the category"});
            }
        });
    } else {
        callback(400, {"Error" : "Missing required field"});
    }
};

// Posts Handler - Get
// Required Data - id
// Optional Data - none
handlers._post.get = (options, callback) => {
    id = typeof (options.queryString.id === "object") && options.queryString.id.length > 10 ? options.queryString.id : false;

    if (options.reqMethod === 'get' && id) {
    // read the post for the specified post id and callback 200 with the data retrived if no error
        const data = {_id : ObjectId(id) }

        lib.read("Posts", data, (error, post) => {
            if(!error && post) {
                callback(200, post[0], 'json');
            } else {
                callback(500, { "Error": "Could not get the specified post" })
            }
        })
    
    } else {
        callback(400, {"Error" : "Missing required field"})
    }
}

// Posts Handler - Put
// Required Data - id, category
// Optional Data - none
handlers._post.put = (options, callback) => {
    
    const { reqMethod, queryString, body } = options;
    
    const id = typeof (queryString.id) === 'string' ? queryString.id : false;

    const category = typeof(body.category) === 'string' && body.category.length > 0 ? body.category : false;


    // reject all request that is not put
    if (reqMethod === 'put' && id && category) {

        // get all the objects for the data to read and update.
        const categoryData = { category: category };

        const postData = { _id: ObjectId(id) };

        // read the category with the categoryData
        lib.read("Category", categoryData, (error, category) => {
            if(!error && category) {
                const updateData = { title: body.title, status: body.status, category: category[0]._id, allowComments: body.allowComments, textBody: body.textBody };
        // read the Post and update it
                lib.update("Posts", postData, updateData, (error, post) => {
                    if (!error, post) {
                        callback(200, post, 'json');
                    } else {
                        callback(500, { "Error": "Could not get the Post" });
                    }
                })
            } else {
                callback(500, {"Error" : "Could not get the Category"})
            }
        })
        


    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

// Delete Post - Delete
// Required Data - id
// Optional Data - none
handlers._post.delete = (options, callback) => {
    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;
    console.log(id);

    // reject all request that is not delete
    if (options.reqMethod === 'delete' && id) {

        //delete the post with the specified id
       const data =  { _id: ObjectId(id) };

       lib.delete("Posts", data, (err) => {
           if (!err) {
               callback(200)
           } else {
               callback(500, { 'Error': 'Could not delete specified Post' })
           }
       })
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};



/*
 *
 * ----Public Handlers--------------
 * 
 */

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

    const firstName = typeof (options.body.firstName) === 'string' && options.body.firstName.length > 0 ? options.body.firstName : false;
    
    const lastName = typeof (options.body.lastName) === 'string' && options.body.lastName.length > 0 ? options.body.lastName : false;

    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;
    
    const passwordMatch = typeof (options.body.passwordMatch) === 'string' && options.body.passwordMatch.length > 0 && options.body.passwordMatch === password ? options.body.passwordMatch : false;
    // Reject any request that is not a Post Method.
    if (options.reqMethod === 'post' && firstName && lastName && email && password && passwordMatch) {
        // look up the token provided in the header
        // const token = typeof(options.headers.token) === 'string' ? options.headers.token === 
        // if (token) {
            
        // } else {
            
        // }

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
                const hashedPassword = helpers.hash(password);

                // make the email field unique
                db.collection("Users").createIndex( {"email" : 1 }, {unique: true}, (error, pass) => {
                    if (!error && pass) {
                        // 5. Insert data into the collection and use to callback to check for success or error.
                        collection.insert({
                            firstName: firstName,
                            lastName: lastName,
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

// handlers._users.get = 

// get Users Handler
handlers._login.post = (options, callback) => {

    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;
    
     
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

// -------------------------------------TOKENS HANDLER-----------------------------------------
handlers.tokens = (options, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._tokens[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};

handlers._tokens = {};

// Tokens - post
// Required data: email, password
// Optional data: none
handlers._tokens.post = (options, callback) => {
    
    // validate the required data
    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;

    if (email && password) {
      
        // connect to the database and get the user password then compare with the hashed password
        MongoClient.connect(url, function (err, client) {
            // if error callback with 500 nd if there is no error, execute code (in step 1-6)
            if (err) {
                callback(500, { "Error": "could not connect to mongo" })
            } else {
                //1. Save the exert database we are using as db
                const db = client.db("blog_cms");
                console.log("Connected successfully to server");

                // 2. Read the collection Users
                const collection = db.collection("Users").find({ email: email });

                // 3. Hash the incoming password
                const hashedPassword = helpers.hash(password);

                //4. convert to array and send response with the callback
                collection.toArray((err, result) => {
                    const User = typeof (result) === 'object' && result.length > 0 ? result : false
                    if (!err && User) {
                        if (result[0].password === hashedPassword && result[0].email === email) {
                            //5. create the token object and store it in the database
                            const tokenObj = {
                                email : email,
                                password : hashedPassword
                            }

                            db.collection("Tokens").insert(tokenObj, (error, token) => {
                                if (!error && token) {
                                    callback(200, tokenObj, 'json')
                                    client.close();
                                } else { 
                                    callback(500, { "Error": "could not save token" })
                                    client.close();
                                }
                            })
                        } else {
                            callback(400, { "Error": "required field missing or incorrect" })
                        }
                    } else {
                        callback(400, { "Error": "User not found" })
                    }
                });
            }
            
        });

        
    } else {
        callback(400, {"Error" : "Required field missing"})
    }
};

// Token - get
// Required data: id
// Optional data: none
handlers._tokens.get = (options, callback) => {
    // validate the required data
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
                const collection = db.collection("Tokens").find({ _id: ObjectId(id) });

                //4. convert to array and send response with the callback
                collection.toArray((err, result) => {
                    const Token = typeof (result) === 'object' && result.length > 0 ? result : false
                    if (!err && Token) {
                        callback(200, result[0], 'json')
                        client.close();
                    } else {
                        callback(400, { "Error": "Post not found" })
                        client.close();
                    }
                    // 
                    // console.log(result);

                });
            }
            
        });
    } else {
       callback(400, {"Error": "Missing required field"}) 
    }
};

// Token - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = (options, callback) => {
    // validate the required data
    const id = typeof (options.queryString.id === "object") && options.queryString.id.length > 10 ? options.queryString.id : false;

    if (id && options.reqMethod === 'delete') {
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
                db.collection('Tokens').deleteOne(
                    { _id: ObjectId(id) },
                    (error) => {
                        if (!error) {
                            callback(200);
                        } else {
                            callback(500, {"Error" : "could not delete token"})
                        }
                    }
                )
            };
        });
    } else {
        callback(400, {"Error" : "Missing required field"})
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