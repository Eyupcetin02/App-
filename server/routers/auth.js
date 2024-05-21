const express = require("express")
const router = express.Router()
const {register , login, getToken, getUser} = require("../controllers/auth.js")

router.post("/register" , register)
router.post("/login" , login)
router.get("/getToken" , getToken)
router.get("/getuser" , getUser)




module.exports = router