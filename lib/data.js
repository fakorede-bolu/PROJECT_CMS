/*
 *
 *Library for storing and updating data
 *
*/

// Dependecies
const database = require('../mongo/collections/User');
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

const lib = {};

// Inserting into a collection in the database
lib.create = (collection, data, callback) => {
    // connect to the database
    MongoClient.connect(url, function (err, client) {
        // if error callback with 500 nd if there is no error, execute code (in step 1-6)
        if (err) {
            callback("Could not connect to mongo")
        } else {
            //1. Save the exert database we are using as db
            const db = client.db("blog_cms");
            console.log("Connected successfully to server");

            // 2. create Collection
            // db.createCollection(collection, constraints);

            // 3. Read the collection Users
            db.collection(collection).insert(data, (error, data) => {
                // 5. if no error, callback with a 200 and the saved User object and the content-Type
                if (!error && data) {
                    callback(false, data.ops[0]);
                    client.close();
                } else {
                    // 6. if error, callback with a 500
                    callback(error && data)
                    client.close();
                }

            });
           
        }
    })
};

// Unique field entry into a collection
lib.unique = (collection, data, callback) => {
    // connect to the database
    MongoClient.connect(url, function (err, client) {
        // if error callback with 500 nd if there is no error, execute code (in step 1-6)
        if (err) {
            callback("Could not connect to mongo")
        } else {
            //1. Save the exert database we are using as db
            const db = client.db("blog_cms");
            console.log("Connected successfully to server");

            // make the field unique
            db.collection(collection).createIndex(data, { unique: true }, (error, response) => {
                if (!error && response) {
                    callback(false, response)
                    client.close();
                } else {
                    callback('Could not create unique field')
                    client.close();
                }
            });
        };
    })
};

// read from a collection in the database
lib.read = (collection, data, callback) => {
    MongoClient.connect(url, function (err, client) {
        // if error callback with 500 nd if there is no error, execute code (in step 1-6)
        if (err) {
            callback('could not connect to the database')
        } else {
            //1. Save the exert database we are using as db
            const db = client.db("blog_cms");
            console.log("Connected successfully to server");

            // 2. Read the collection Users
            const file = db.collection(collection).find(data);
            

            //4. convert to array and send response with the callback
            file.toArray((err, result) => {
                if (!err && result.length > 0) {
                    callback(false, result)
                    client.close();
                } else {
                    callback(null)
                    client.close();
                }
            });
        }    
    });

};

// update a particular data in a collectiion in the database
lib.update = (collection, data, updateData, callback) => {
    MongoClient.connect(url, (err, client) => {
        // if error callback with 500 nd if there is no error, execute code (in step 1-6)
        if (err) {
            callback('Could not connect to the database')
        } else {
            //1. Save the exert database we are using as db
            const db = client.db("blog_cms");
            console.log("Connected successfully to server");

            // 2. Read the collection Users and update the specified data
            if (updateData.comments) {
                db.collection(collection).updateOne(data, { $addToSet: updateData, $currentDate: { lastModified: true } }, (error, response) => {
                    if (!error && response) {
                        callback(false, response.result);
                        client.close();
                    } else {
                        callback(`Could not update the ${collection}`);
                        client.close();
                    };
                })   
            } else {
                db.collection(collection).updateOne(data, { $set: updateData, $currentDate: { lastModified: true } }, (error, response) => {
                    if (!error && response) {
                        callback(false, response.result);
                        client.close();
                    } else {
                        callback(`Could not update the ${collection}`);
                        client.close();
                    };
                })  
            }
        };
    });
};



lib.delete = (collection, data, callback) => {
    // connect to the database
    MongoClient.connect(url, (err, client) => {
        // if error callback with 500 nd if there is no error, execute code (in step 1-6)
        if (err) {
            callback('Could not connect to the database')
        } else {
            //1. Save the exert database we are using as db
            const db = client.db("blog_cms");
            console.log("Connected successfully to server");

            db.collection(collection).deleteOne(data,
                (error, response) => {
                    if (!error && response.result.ok === 1 && response.result.n > 0) {
                        callback(false);
                        client.close();
                    } else {
                        callback(`Could not from delete this ${collection}`);
                        client.close();
                    };
                }
            )
        };
    });
};

lib.date = () => {
    let now = new Date();

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let days = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
    let day = now.getDate();

    let month = now.getMonth();

    let year = now.getFullYear();

    let time = now.getTime()

    const date = `${days[day - 1]}-${months[month]}-${year}-${time}` 

    return date;
}

module.exports = lib;