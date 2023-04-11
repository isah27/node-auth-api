const express=require("express")
const createError=require("http-errors")
const swaggerJSDoc = require("swagger-jsdoc")
require("dotenv").config()
require('./helpers/init_mongodb')
const {verifyAccessToken} = require('./helpers/jwt.helper')
const AuthRoute=require("./routes/auth.route")
const options = require("./swagger")
require('./helpers/init.redis')
const swaggerUi=require('swagger-ui-express')

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const spec=swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(spec,{ explorer: true }))

/**
 * @swagger
 * /test/:
 *   $ref: "#/components/paths/protectedRoute"
 */
app.get("/auth/test", verifyAccessToken,async(req, res, next) =>{
  
    res.json({message:`Hello from auth express api`})
})
/**
* @swagger
 * /test/:id:
 *   $ref: "#/components/paths/protectedRoute"
 */
app.get("/auth/test/:id", verifyAccessToken,async(req, res, next) =>{
  
    res.json({message:`Hello from auth express api ${req.params.id}`,id:req.params.id.toLowerCase()})
})
app.use('/auth', [AuthRoute])
app.use(async ( req, res, next) =>{
    const error=createError.NotFound()
    next(error)
})
app.use((err,req,res,next)=>{
    res.status(err.status||500).json({error:{status:err.status,message:err.message}})
})


const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
