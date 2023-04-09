const AuthSchema=require('./helpers/validation.schema')

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Node authentication api',
            version:'1.0.0',
            description:'this as a full node authentication api built with Express aand documented with swagger.'
        },
        servers:[
            {
                url:'http://localhost:3000',
                description:'Development server'
            }
        ],
        components:{
            schemas:{
                User:{
                    type:'object',
                    required:['email','password'],
                    properties:{
                        email:{
                            type:'string',
                            description:'user email address'
                        },
                        password:{
                            type:'string',
                            description:'user password (must not be less than 4)'
                        }
                    }
                }
            }
        },
        responses:{
            500:{
                description:"Internal server error",
                contents:"application/json"
            },
            400:{
                description:"Bad request",
                contents:"application/json"
            },
            404:{
                description:"Not found",
                contents:"application/json"
            },
            409:{
                description:"This email has been registered",
                contents:"application/json"
            },
            401:{
                description:"Unauthorized",
                contents:"application/json"
            },
            204:{
                description:"No content",
                contents:"application/json"
            },
            200:{
                description:"Successfull",
                contents:"application/json"
            },
            201:{
                description:"Created successfully",
                contents:"application/json"
            },
        }
    },
    apis:['./routes/auth.route.js']
}

module.exports = options