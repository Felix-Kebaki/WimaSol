const express=require("express")
const Protect = require("../middleware/authMiddleware")
const upload=require("../utils/cloudinary/storage")
const {createTicket}=require("../controller/TicketController")
const router=express.Router()

router.post("/createTicket",Protect, upload.array("files",10),createTicket)

module.exports=router