// users related routes like update password

import express from 'express'
import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/AuthMiddleware.js'
const router = express.Router()

router.get('/getUser',authMiddleware,userController.getUser)
router.get('/getAllUsers',authMiddleware,userController.getAllUsers)
router.post('/forgot-password',userController.forgotPassword)

export default router