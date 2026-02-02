
const mongoose=require('mongoose')
const connectDb=async()=>{

    try{
        await mongoose.connect(process.env.Mongodb_URL)
        .then(()=>console.log('Mongodb connected')
        )
        .catch((err)=>console.log('Mongodb not connected',err)
        )
    }catch(err){
        console.log('connection failed',err.message)
        
    }
}

module.exports=connectDb;