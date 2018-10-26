

const database = {};

database.User = {
    validator: {
        $and: [{
            firstName: {
                $type: "string",
                $exists: true

            },
            lastName: {
                $type: "string",
                $exists: true

            },
            email: {
                $type: "string",
                $exists: true
            },
            password: {
                $type: "string",
                $exists: true
            }
        }]
    }
}

database.Post = {
    validator: {
        
        title: {
            $type: "string",
            $exists: true

        },
        status: {
            $type: "string",
            $exists: true
        },
        allowComments: {
            $type: "boolean",
            $exists: true
        },
        body: {
            $type: "string",
            $exists: true
        }


    }
}

database.Categories = {
    validator: {

        title: {
            $type: "string",
            $exists: true
        }
    }
};


module.exports = database;



