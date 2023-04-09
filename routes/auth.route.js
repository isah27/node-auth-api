const express=require("express")
const router=express.Router()
const {register,login,refreshToken,logout}=require('../controllers/auth.controller')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Api endpoint to manage user authentication
 */



/**
 * @swagger
 *   /register: 
 *     post: 
 *       summary: register user to the system
 *       tags: [Users]
 *       responses:
 *         "201":
 *           $ref:'#/components/responses/201'
 *         "409":
 *             $ref:'#/components/responses/409'
 * 
 */
router.post("/register",register)

router.post("/login",login)

router.post("/refresh-token",refreshToken)

router.delete("/logout",logout)


module.exports=router