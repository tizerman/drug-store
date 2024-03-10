import { Router } from "express";
import productController from "../controllers/productController.js";

const router = new Router()

router.get('/', productController.getAll)
router.get('/:id', productController.findById)

export default router