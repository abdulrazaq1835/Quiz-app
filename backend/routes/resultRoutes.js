import express from 'express'
import authMiddleWare from '../middlewares/auth.js'
import{createResult,listResult} from '../controllers/resultControllers.js'

const resultRouter =  express.Router()

resultRouter.post('/',authMiddleWare,createResult)
resultRouter.get('/',authMiddleWare,listResult)

export default resultRouter