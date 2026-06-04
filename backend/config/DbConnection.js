const mongoose=require("mongoose")

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to database: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message || error)
    }
}

module.exports=connectDb