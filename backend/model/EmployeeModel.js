const mongoose=require("mongoose")

const employeeSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    employeeNo:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        match: [/^(\+254|0)[17]\d{8}$/, "Please enter a valid phone number"]
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","employee"]
    },
    assignedAreas:[{
        date:Date,
        hours:String
    }]
},{timestamps:true})

module.exports=mongoose.model("Employee",employeeSchema)