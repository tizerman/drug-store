import { Router } from 'express'
import orderController from '../controllers/orderController.js'

const router = new Router()

router.get('/', orderController.getAll)
router.get('/:id', orderController.findById)
router.post('/', orderController.create)

export default router 