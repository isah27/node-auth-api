const express=require("express")
const createError=require("http-errors")
require("dotenv").config()
require('./helpers/init_mongodb')
const {verifyAccessToken} = require('./helpers/jwt.helper')
const AuthRoute=require("./routes/auth.route")
require('./helpers/init.redis')

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", verifyAccessToken,async(req, res, next) =>{
    res.json({message:"Hello from auth express api"})
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
