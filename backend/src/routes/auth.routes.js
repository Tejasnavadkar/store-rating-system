import express from 'express'
import authController from '../controllers/auth.controller.js'

const router = express.Router()

// user login and signup routes 

router.post('/signup',authController.registerUser)

router.post('/login',authController.loginUser)

// logout api

export default router