const express=require("express")
const connectDb=require("./config/DbConnection")
require("dotenv").config()
const app=express()

const PORT=process.env.PORT || 5000

connectDb();

app.listen(PORT,()=>{
    console.log(`Server listening to port ${PORT}...`)
})