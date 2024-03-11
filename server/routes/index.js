import { Router } from 'express'
import productRouter from './productRouter.js'
import orderRouter from './orderRouter.js'

const router = new Router()

router.use('/product', productRouter)
router.use('/order', orderRouter)

export default router