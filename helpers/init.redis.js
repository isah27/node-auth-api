const redis=require('redis')

const client=redis.createClient()
 client.connect()
// check it's connect to server
client.on('connect',()=>console.log('Connected to redis'))
// check if it's ready to be used
client.on('ready',()=>console.log('Rredis is ready to be used'))
// check if there's error
client.on('error',(error)=>console.log(error))
// check if it has ended(disconnected)
client.on('end',(err)=>console.log("redis is disconnected"))

process.on('SIGINT',async()=>{
    await client.disconnect()
    process.exit(0)
})

module.exports = client