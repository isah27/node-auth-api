const express=require("express")
const router=express.Router()
const {register,login,refreshToken,logout}=require('../controllers/auth.controller')

/**
* @swagger
 * tags:
 *   name: User
 *   description: Authentication API endpoints
 */

/**
 * @swagger
 * /register:
 *   $ref: "#/components/paths/register"
 */
router.post("/register",register)

/**
 * @swagger
 * /login:
 *   $ref: "#/components/paths/login"
 */
router.post("/login",login)

/**
 * @swagger
 * /refresh-token:
 *   $ref: "#/components/paths/refreshToken"
 */
router.post("/refresh-token",refreshToken)

/**
 * @swagger
 * /logout:
 *   $ref: "#/components/paths/logout"
 */
router.delete("/logout",logout)


module.exports=router