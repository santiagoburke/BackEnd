import { Router } from "express";
import { cartManager } from "../cart.js";
const cartRouter = Router();

cartRouter.post('/', cartManager.saveCart);                                   
cartRouter.delete('/:id', cartManager.deleteCart);                                
cartRouter.get('/:id/productos', cartManager.getProducts);                           
cartRouter.post('/:id/productos', cartManager.saveProductByID);                         
cartRouter.delete('/:id/productos/:id_producto', cartManager.deleteCartProductByID);      

export default cartRouter;