const Jwt=require('jsonwebtoken')
const createError = require('http-errors')
const client=require('./init.redis')

module.exports = {
    // create access token
    signAccessToken: (userId)=>{
        return new Promise((resolve,reject)=>{
            const paylod={}
            const secret=process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn:'100s',
                issuer:"isahnaziru27@gmail.com",
                audience:userId
            }
            Jwt.sign(paylod,secret,options,(err,token)=>{
                if(err){
                    console.error(err.message)
                    return reject(createError.InternalServerError())
                } 
                return resolve(token)
            })
        })
    },
    // verify access token
    verifyAccessToken: (req,res,next)=>{
        const authHeader=req.headers['authorization']
        if(!authHeader)return next(createError.Unauthorized())
        const bearerToken=authHeader.split(' ')
        const token=bearerToken[1]
        Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)return next(createError.Unauthorized(err.name=='TokenExpiredError'?err.message:null))
            req.paylod=decoded
            next()
        })

        
    },

     // create refresh token
     signRefreshToken: (userId)=>{
        return new Promise((resolve,reject)=>{
            const paylod={}
            const secret=process.env.REFRESH_TOKEN_SECRET
            const options={
                expiresIn:'1y',
                issuer:"isahnaziru27@gmail.com",
                audience:userId
            }
            Jwt.sign(paylod,secret,options,async(err,token)=>{
                if(err){
                    console.error(err.message)
                    return reject(createError.InternalServerError())
                } 
                await client.set(userId,token,(err,reply)=>{
                    if(err)return reject(createError.InternalServerError())
                })
                return resolve(token)
            })
        })
    },
    // verify refresh token
    verifyRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,async(err,decoded)=>{
                if(err)return reject(createError.Unauthorized())
                const userId=decoded.aud
                const redisToken=await client.get(userId,(err,_)=>{
                    if(err){
                        console.log(err.message)
                        return reject(createError.InternalServerError())
                    }  
                })
                if(refreshToken==redisToken)return resolve(userId)
                    return reject(createError.Unauthorized())
            })
        })
    }
}