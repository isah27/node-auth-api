const createError=require('http-errors')
const User=require('../models/User.model')
const {authSchema}=require('../helpers/validation.schema')
const {signAccessToken,signRefreshToken,verifyRefreshToken}=require('../helpers/jwt.helper')
const client=require('../helpers/init.redis')

module.exports={
    register:async (req,res,next) =>{
        try {
            const result=await authSchema.validateAsync(req.body)
            const doesExist=await User.findOne({email:result.email})
            if(doesExist) throw createError.Conflict(`${result.email} is already registered`)
            const user=await new User(result).save()
            const accessToken=await signAccessToken(user.id)
            const refreshToken=await signRefreshToken(user.id)
            res.status(201).json({accessToken,refreshToken})
        } catch (err) {
            if(err.isJoi==true)err.status=422
            next(err)
        }
    },

    login:async (req,res,next) =>{
        try {
            const result=await authSchema.validateAsync(req.body)
            const user=await User.findOne({email:result.email})
            if(!user) throw createError.NotFound(`Could not find user with email ${result.email}`)
            const isValidPassword=await user.isValidPassword(result.password)
            if(!isValidPassword) throw createError.Unauthorized("Wrong login details")
            const accessToken=await signAccessToken(user.id)
            const refreshToken=await signRefreshToken(user.id)
            res.json({accessToken,refreshToken})
        } catch (err) {
        if(err.isJoi==true)return next(createError.BadRequest("Invalid username or password"))
        next(err)
        }
    },

    refreshToken:async (req,res,next) =>{
        try {
            const refToken=req.body.refreshToken
            if(!refToken) throw createError.BadRequest()
            const userId=await verifyRefreshToken(refToken)
            const accessToken=await signAccessToken(userId)
            const refreshToken=await signRefreshToken(userId)
            res.json({accessToken,refreshToken})
        } catch (err) {
            next(err)
        }
    },
    
    logout:async (req,res,next) =>{
        try {
            const {refreshToken}=req.body
            if(!refreshToken) throw createError.BadRequest()
            const userId=await verifyRefreshToken(refreshToken)
            await client.del(userId,(err,_)=>{
               if(err){
                console.log(err.message)
                throw createError.InternalServerError()
               } 
            })
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }
}