module.exports={
  definition:{
    openapi:'3.0.3',

    info:{
        title:"Authentication api",
        description:"Authentication api that takes in user email and password. Built with node express js and documented with swagger",
        contact:{
            name:"api support",
            email:"isahnaziru27@gmail.com"
        },
        version:"1.0.0"

    },
    servers:[
        {
            url:"http://localhost:3000/auth/",
            description:"Development server"
        }
    ],
    components:{
        schemas:{
            User:{
                type:'object',
                properties:{
                   
                    email:{
                        type:"string"
                    },
                    password:{
                        type:"string"
                    }
                },
                required:['email', 'password']
            },
        },
        responses:{
            201:{
                description:"Signed up successfully",
                content:{
                    'application/json':{
                        schema:{
                            type:'object',
                            properties:{
                                accessToken:{
                                    type:'string'
                                },
                                refreshToken:{
                                    type:'string'
                                }
                            }
                        }
                    }
                }
            },
            500:{
                description:"Internal server error",
                // content:{
                //     'application/json':{
                //         schema:{
                //             "$ref": "#/components/schemas/generalError"
                //         }
                //     }
                // }
            },
            409:{
                description:"User already exists"
            },
            422:{
                description:"Invalid details"
            }
        },
        securitySchemes:{
            bearerAuth:{
                type:'http',
                scheme:'bearer',
                name:'Authorization',
                in:'header',
                bearerFormat:'JWT'
            }
        },    
        paths:{
            register:{
                post:{
                    summary:"Create a user",
                    tags:["User"],
                    requestBody:{
                        required:true,
                        content:{
                            'application/json':{
                                schema:{
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            "$ref": "#/components/responses/201"
                        },
                        409:{
                            '$ref':'#/components/responses/409'
                        },
                        422:{
                            '$ref':'#/components/responses/422'
                        },
                        500:{
                            '$ref':'#/components/responses/500'
                        }
                    }
                }
            },
            login:{
                post:{
                    summary:"login a user",
                    tags:["User"],
                    requestBody:{
                        required:true,
                        content:{
                            'application/json':{
                                schema:{
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    responses:{
                        200:{
                            description: "Authenticated"
                        },
                        401:{
                            description:"Unathorized"
                        },
                        404:{
                            description:'Email not found'
                        },
                        401:{
                            description:'Wrong login details'
                        },
                        400:{
                            '$ref':'#/components/responses/422'
                        },
                        500:{
                            '$ref':'#/components/responses/500'
                        }
                    }
                }
            },
            refreshToken:{
                post:{
                    summary:"generate a new access and refresh token",
                    tags:["User"],
                    requestBody:{
                        required:true,
                        content:{
                            'application/json':{
                                schema:{
                                    type:'object',
                                    properties:{
                                        refreshToken: {
                                            type:'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        200:{
                            description: "new access and refresh token generated"
                        }, 
                        401:{
                            description:"Unathorized"
                        },                       
                        400:{
                            description:"Bad request"
                        },
                        500:{
                            '$ref':'#/components/responses/500'
                        }
                    }
                }
            },
            logout:{
                delete:{
                    summary:"logout user",
                    tags:["User"],
                    requestBody:{
                        required:true,
                        content:{
                            'application/json':{
                                schema:{
                                    type:'object',
                                    properties:{
                                        refreshToken: {
                                            type:'string'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        204:{
                            description: "user have been logout successfully"
                        },                        
                        400:{
                            description:"Bad request"
                        },
                        401:{
                            description:"Unathorized"
                        },
                        500:{
                            '$ref':'#/components/responses/500'
                        }
                    }
                }
            },
            protectedRoute:{
                get:{
                    summary:"test protected route",
                    tags:["Protected Route"],
                    security:[{
                       
                        bearerAuth:[]
                    }], 
                  
                    parameters: [
                        {
                          "name": "id",
                          "in": "path",
                          "description": "id",
                          "required": false,
                          "schema": {
                            "type": "string"
                          }
                        }
                      ],
                    responses:{
                        200:{
                            description: "Successfully tested"
                        },                        
                        
                        401:{
                            description:"Unathorized"
                        },
                        500:{
                            '$ref':'#/components/responses/500'
                        }
                    }
                }
            }

        }

    }
  },
    apis:['./routes/auth.route.js','./index.js']
}

