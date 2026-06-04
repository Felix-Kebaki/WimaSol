const express=require("express")
const Protect=require("../middleware/authMiddleware")
const router=express.Router()
const {createUser,loginUser,getMe,logoutUser}=require("../controller/UserController")

router.post("/createUser",createUser)
router.post("/loginUser",loginUser)
router.post("/logout",Protect,logoutUser)
router.get("/me",Protect,getMe)

module.exports=router