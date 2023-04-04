const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const Schema=mongoose.Schema

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
// hash the password before sending it to the server
UserSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(this.password,salt)
        this.password=hashPassword
        next()
    } catch (err) {
        next(err)
    }
})

UserSchema.methods.isValidPassword=async function(password){
    try {
       return await bcrypt.compare(password,this.password)
    } catch (err) {
        throw err
    }
}
const User=mongoose.model("user",UserSchema)
module.exports=User