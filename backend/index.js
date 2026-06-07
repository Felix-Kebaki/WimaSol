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

app.use("/api/customer",require("./router/CustomerRouter"))
app.use("/api/ticket",require("./router/TicketRouter"))
app.use("/api/employee",require("./router/EmployeeRouter"))

app.listen(PORT,()=>{
    console.log(`Server listening to port ${PORT}...`)
})