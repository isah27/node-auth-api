const mongoose=require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_STRING,{dbName:process.env.DB_NAME})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err.message))

dbConnection=mongoose.connection
dbConnection.on('connected',()=>console.log('mongoose connected to db'))

dbConnection.on('error',(err)=>console.log(err.message))

dbConnection.on('disconnected',()=>console.log("mongoose is disconnected"))

process.on("SIGINT",async()=>{
    await dbConnection.close()
    process.exit(0)
 })