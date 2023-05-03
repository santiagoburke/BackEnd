import { Router } from 'express'
import {getAllCarts, addCart, getCartByID, addProdsToCart, updateProductsQuantity,deleteProdsFromCart, emptyCartById, purchaseCart} from '../controllers/carts.controller.js';
import { isUser } from '../middlewares/auth.middleware.js'

const cartRouter = Router()

cartRouter.get('/', getAllCarts);

cartRouter.get('/:cartId', getCartByID);

cartRouter.post('/', addCart)

cartRouter.post('/:cartId/purchase', purchaseCart)

cartRouter.put('/:cartId', isUser, addProdsToCart)

cartRouter.put('/:cartId/products/:prodId', updateProductsQuantity)

cartRouter.delete('/:cartId/product/:prodId', deleteProdsFromCart);

cartRouter.delete('/:cartId', emptyCartById)

export default cartRouter