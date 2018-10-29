// required built in modules
const ObjectId = require('mongodb').ObjectId;
const lib = require("./data");

// required created modules
const helpers = require('./helpers');

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
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/index', templateData, (error, string) => {

            // checking for error...
            if (!error && string) {
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    }
};

// all blog posts html handler
handlers.postHtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/allposts', templateData, (error, string) => {

            // checking for error...
            if (!error && string) { 
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
            });
    }
};
// Category Html 
handlers.categoryHtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/category', templateData, (error, string) => {

            // checking for error...
            if (!error && string) {
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
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
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/editcategory', templateData, (error, string) => {

            // checking for error...
            if (!error && string) {
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    }
};

// Comment Html 
handlers.commentHtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/comments', templateData, (error, string) => {

            // checking for error...
            if (!error && string) { 
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
            });
    }
};

// get all the posts html
handlers.allPosts = (options, callback) => {
    
        if (options.reqMethod === 'get') {
            
            // get all posts by passing the find argument as null
            lib.read("Posts", null, (error, posts) => {
                if (!error && posts) {
                    callback(200, posts.reverse(), 'json')
                } else {
                    callback(400, { "Error": "could not retrieve posts" })
                }
            })
    }
    
};

// create blogs html handler
handlers.CreatePostHtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/createpost', templateData, (error, string) => {

            // checking for error...
            if (!error && string) {
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
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
handlers.editPostHtml = (options, callback) => {
    // preparing data for interpolation
    const templateData = {
        'head.title': 'Create Post',
        'head.description': 'this is the Create Post page'
    };

    const getHtml = (string) => {
        templateData["body.nav"] = string
    };
    // helpers.htmlToString('partials/_navigation', getHtml);

    // Reject any request that is not a Get Method.
    if (options.reqMethod === 'get') {

        //Read in a template as a string
        helpers.readTemplate('Admin/editPost', templateData, (error, string) => {

            // checking for error...
            if (!error && string) {
                // Add the universal header and footer
                helpers.adminHtml(string, templateData, (error, fullString) => {
                    if (!error && fullString) {
                        // Return that page as HTML now the fullSting
                        callback(200, fullString, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    }
};

// login html page handler 
handlers.loginHtml = (options, callback) => {

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

/*
 *
 * ----------------------------API Handlers------------------------------------
 * 
 */

// Tokens Handler
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

        const data = { email: email };

        //  Hash the incoming password to be saved.
        const hashedPassword = helpers.hash(password);

        // Find the User by specified Email to make sure that the Tokens is created for a specified User
        lib.read("Users", data, (error, user) => {
            if (!error && user) {
                // check if the password from the user matches the hashed password provided
                if (user[0].password === hashedPassword) {
                    // create the object to be inserted into the database.
                    const tokenObj = {
                        email: email,
                        password: hashedPassword,
                        userId: user[0]._id
                    };
                    lib.create("Tokens", tokenObj, (error, token) => {
                        if (!error && token) {
                            callback(200, token, 'json')
                        } else {
                            callback(500, { "Error": "Could not create new token for the specified user" })
                        }
                    })
                } else {
                    callback(403, { "Error": "Unauthorized User, cannot create Token" })
                }
                // Create the token for the specified User with the tokenObj
            } else {
                callback(500, { "Error": "Could not find the specified User" })
            }
        })

    } else {
        callback(400, { "Error": "Required field missing" })
    }
};

// Token - get
// Required data: id
// Optional data: none
handlers._tokens.get = (options, callback) => {

    // validate the required data
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

    if (options.reqMethod === 'get' && id) {
        
        // get the token using the id given
        lib.read("Tokens", { _id: ObjectId(id) }, (error, token) => {
            if (!error && token) {
                callback(200, token[0], 'json')
            } else {
                callback(400, { "Error": "Post not found" })
            }
        })
    } else {
        callback(400, { "Error": "Missing required field" })
    }
};

// Token - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = (options, callback) => {
    // validate the required data
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

    if (id && options.reqMethod === 'delete') {
        // Delete the specified token
        lib.delete("Tokens", { _id: ObjectId(id) }, (err) => {
            if (!err) {
                callback(200)
            } else {
                callback(500, { "Error": "Could not delete specified token" })
            }
        })
    } else {
        callback(400, { "Error": "Missing required field" })
    }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = (tokenId, userId, callback) => {
    // Lookup the token by the givenn id
    lib.read("Tokens", { _id: ObjectId(tokenId) }, (error, token) => {
        if (!error && token) {
            // convert the userid in token from type object to type string (Obj1 != Obj2)
            const userTokenId = token[0].userId.toString();
            if (userTokenId === userId) {
                callback(true)
            } else {
                callback(false)
            }
        } else {
            callback(false)
        }
    })

};


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
    
    // Validate the required data and only continue if not false
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;
    
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
  const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;
  
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
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

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
                    dateCreated: date,
                    comments: []
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
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

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
    
    const id = typeof (queryString.id) === 'string' && queryString.id.length === 24 ? queryString.id : false;

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
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

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

// Comments Handler
handlers.comments = (options, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(options.reqMethod) > -1) {
        handlers._comments[options.reqMethod](options, callback);
    } else {
        callback(405);
    }
};

handlers._comments = {}

// Comment Handler - post
// Required Data - comment, postid
// Optional Data - none
handlers._comments.post = (options, callback) => {
    // Verify the required field
    const comment = typeof (options.body.comment) === "string" && options.body.comment.length > 0 ? options.body.comment : false;

    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

    if (comment && id){

        // Get token from the headers
        const token = typeof (options.reqHeaders.token) === 'string' ? options.reqHeaders.token : false;

        // verify that the token is available
        if (token) {
            //Read the specified user from the token sent
            lib.read("Tokens", {_id : ObjectId(token)}, (error, token) => {
                if(!error && token) {
                    // get the user id to be saved as a reference to the user in the comment object
                    const commentObj = {
                        userId : token[0].userId,
                        body: comment,
                        date: lib.date()
                    }

                    // Create and insert the new comment
                    lib.create("Comments", commentObj, (error, comment) => {
                        if (!error && comment) {
                            // read the post and insert the comment into it
                            lib.update("Posts", {_id : ObjectId(id)}, {comments: comment._id}, (error, post) => {
                                if(!error && post) {
                                    callback(200, comment, 'json')
                                } else {
                                    callback(500, { "Error": "Could not get the Post" })
                                }
                            })

                        } else {
                            callback(500, { "Error": "Could not create the comment" })
                        }
                    })
                } else {
                    callback(500, { "Error": "Could not get the specified user" })
                } 
            });
        } else {
            callback(403, {"Error" : "Unauthorised User"})
        }

    } else {
        callback(400, {"Error" : "Missing required field"})
    }
};

// Comment Handler - get
// Required Data - token
// Optional Data - none
handlers._comments.get = (options, callback) => {
    // Get token from the headers
    const token = typeof (options.reqHeaders.token) === 'string' ? options.reqHeaders.token : false;

    if (token) {
        // read the token and get the userId from the sent token
        lib.read("Tokens", { _id : ObjectId(token) }, (error, token) => {
            if(!error && token) {
                // get the user id and use it to get the comments associated to the user
                const userId = token[0].userId.toString()
                lib.read("Comments", {userId : ObjectId(userId)}, (error, comment) => {
                    if(!error && comment) {
                        callback(200, comment, 'json')
                    } else {
                        callback(500, { "Error": "Could not read the given comment" })
                    }
                });
            } else {
                callback(500, { "Error": "Could not read the given token" })
            }
        })
    } else {
        callback(403, {"Error" : "Unauthorized"})
    }
}

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


// Users Handler - Post
// Required data - firstName, lastName, Email, password, passwordMatch
// Optional Data - none
handlers._users.post = (options, callback) => {

    // Validate the Required data and only continue the if it passes validation
    const firstName = typeof (options.body.firstName) === 'string' && options.body.firstName.length > 0 ? options.body.firstName : false;

    const lastName = typeof (options.body.lastName) === 'string' && options.body.lastName.length > 0 ? options.body.lastName : false;

    const email = typeof (options.body.email) === 'string' && options.body.email.length > 0 ? options.body.email : false;

    const password = typeof (options.body.password) === 'string' && options.body.password.length > 0 ? options.body.password : false;

    const passwordMatch = typeof (options.body.passwordMatch) === 'string' && options.body.passwordMatch.length > 0 && options.body.passwordMatch === password ? options.body.passwordMatch : false;

    // Reject any request that is not a Post Method and  check for the required data
    if (options.reqMethod === 'post' && firstName && lastName && email && password && passwordMatch) {

        // Make the email field unique
        const uniqueData = { "email": 1 }
        lib.unique("Users", uniqueData, (error, response) => {
            if (!error && response) {
                // hash the password to be stored 
                const hashedPassword = helpers.hash(password);
                // Create the data object to be stored in the User collection
                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword
                }

                // Store the data in the database
                lib.create("Users", data, (error, user) => {
                    if (!error && user) {
                        callback(200, user, 'json')
                    } else {
                        callback(500, { "Error": "Could not create the specified User" })
                    }
                })
            } else {
                callback(500, { "Error": "Could not create a unique Users field" })
            }
        })
    } else {
        callback(400, { 'Error': 'Missing the required field' });
    }
};

// Users Handler - get
// Required data -  Id...
// Optional Data - none
handlers._users.get = (options, callback) => {

    // Validate required data
    const id = typeof (options.queryString.id) === 'string' && options.queryString.id.length === 24 ? options.queryString.id : false;

    // Reject all other methods but get.
    if (options.reqMethod === "get" && id) {

        // Get token from the headers
        const token = typeof (options.reqHeaders.token) === 'string' ? options.reqHeaders.token : false;

        // Verify that there is a token provided to the specified user

        if (token) {
            handlers._tokens.verifyToken(token, id, (tokenIsValid) => {
                if (tokenIsValid) {
                    // create the data object to retrieve the user by Id.
                    const data = { _id: ObjectId(id) };

                    // Read the User with the specified Id
                    lib.read("Users", data, (error, user) => {
                        if (!error && user) {
                            callback(200, user, 'json')
                        } else {
                            callback(500, { "Error": "Could not retrieve the user" })
                        }
                    });
                } else {
                    callback(403, { "Error": "Unauthorize to access this route" })
                }
            })
        } else {
            callback(403, {"Error" : "Unauthorised User"})
        }

    } else {
        callback(400, { "Error": "Missing required field" })
    }
};

//  Users Handler - Put
// Required data -  Id...
// Optional Data - firstName, lastName.
handlers._users.put = (options, callback) => {

    // Validate the required data
    const id = typeof (options.queryString.id) === 'string' ? options.queryString.id : false;

    const firstName = typeof (options.body.firstName) === 'string' && options.body.firstName.length > 0 ? options.body.firstName : false;

    const lastName = typeof (options.body.lastName) === 'string' && options.body.lastName.length > 0 ? options.body.lastName : false;

    if (options.reqMethod === 'put' && id) {

        // Get token from the headers
        const token = typeof (options.reqHeaders.token) === 'string' ? options.reqHeaders.token : false;

        // verify that the token is available
        if(token) {

            // check if the token is valid for the specified user
            handlers._tokens.verifyToken(token, id, (validToken) => {
                if(validToken) {
                    // Get the data oobject and the Update Object
                    const data = { _id: ObjectId(id) };

                    const updateData = { firstName: firstName, lastName: lastName };

                    // Update the specified field Using the update data
                    lib.update("Users", data, updateData, (error, result) => {
                        if (!error && result) {
                            // Read the new User from the database with the user Id
                            lib.read("Users", data, (error, user) => {
                                if (!error && user) {
                                    callback(200, user, 'json')
                                } else {
                                    callback(500, { "Error": "Could not update the specified User" })
                                }
                            })
                        } else {
                            callback(500, { "Error": "Could not update the specified User" })
                        }
                    })

                } else {
                    callback(403, {"Error" : "unauthorized to access this route"})
                }
            })
            
        } else {
            callback(403, {"Error" : "unauthorized user"});
        }
    } else {
        callback(400, { 'Error': 'Missing the required field' })
    }
};

//  Users Handler - delete
// Required data -  Id
// Optional Data - none.
// @TODO---------------------------------------DELETE ALL POSTS AND TOKEN ASSOCIATED TO A USER---------------------
handlers._users.delete = (options, callback) => {
    // check for the id sent
    const id = typeof (options.queryString.id.trim()) === 'string' ? options.queryString.id.trim() : false;

    if (id && options.reqMethod === "delete") {

        // Get token from the headers
        const token = typeof (options.reqHeaders.token) === 'string' ? options.reqHeaders.token : false;

        // verify that the token is available
        if (token) {

            // check if the token is valid for the specified user
            handlers._tokens.verifyToken(token, id, (validToken) => {
                if (validToken) {
                    // Delete the specified user from the database
                    lib.delete("Users", { _id: ObjectId(id) }, (error) => {
                        if (!error) {
                            // Delete all things associated with the user (Token and Posts) 
                            callback(200);
                        } else {
                            callback(500, { 'Error': 'Could not delete the specified User' })
                        }
                    });
                } else{
                    callback(403, { "Error": "unauthorized to access this route" })
                }
            })
        } else {
            callback(403, { "Error": "unauthorized user" });
        }
        
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