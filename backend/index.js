const express=require("express")
const connectDb=require("./config/DbConnection")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app=express()

const PORT=process.env.PORT || 5000

connectDb();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",require("./router/UserRouter"))

app.listen(PORT,()=>{
    console.log(`Server listening to port ${PORT}...`)
})