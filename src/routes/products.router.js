import { Router } from 'express'
import { AddOneProduct, getProductById, updateProdById, deleteProdById, getAllProducts} from '../controllers/products.controller.js'
import { isAdmin } from '../middlewares/auth.middleware.js'

const productRouter = Router()

productRouter.get('/', getAllProducts)

productRouter.get('/:idProduct', getProductById)

productRouter.post('/', isAdmin, AddOneProduct)

productRouter.put('/:idProduct', isAdmin, updateProdById)

productRouter.delete('/:idProduct', isAdmin, deleteProdById)

export default productRouter