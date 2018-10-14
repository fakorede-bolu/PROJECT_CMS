

const database = {};

database.User = {
    validator: {
        $and: [{
            name: {
                $type: "string",
                $exist: true

            },
            email: {
                $type: "string",
                $exist: true
            },
            password: {
                $type: "string",
                $exist: true
            }
        }],
            

    }
}

database.Post = {
    validator: {
        
        title: {
            $type: "string",
            $exist: true

        },
        status: {
            $type: "string",
            $exist: true
        },
        allowComments: {
            $type: "boolean",
            $exist: true
        },
        body: {
            $type: "string",
            $exist: true
        }


    }
}




module.exports = database;



