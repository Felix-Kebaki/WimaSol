const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      match: [/^(\+254|0)[17]\d{8}$/, "Please enter a valid phone number"]
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

module.exports=mongoose.model("Customer",customerSchema);
