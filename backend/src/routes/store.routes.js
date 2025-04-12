import express from 'express'
import storeController from '../controllers/store.controller.js'
import { authMiddleware } from '../middlewares/AuthMiddleware.js'

const router = express.Router()

// Store related routes 


router.get('/getAllstores',authMiddleware, storeController.getAllStore)

router.post('/addStore',authMiddleware,storeController.createStoreWithOwner)

router.put('/rateTheStore/:storeId',authMiddleware,storeController.rateStore)

router.put('/modifyRating/:storeId',authMiddleware,storeController.modifyRating)


export default router