import { Router } from 'express'
import CartManager from '../dao/fileManager/cart.js'

const cartRouter = Router()
const cartManager = new CartManager('./archivos/carts.json')


cartRouter.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json({ carts });
});

cartRouter.get('/:idCart', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.idCart);
    res.json({ cart });
    
});

cartRouter.post('/', async (req, res) => {
    const products = await req.body;
    const newCart = await cartManager.addCart(products);
    res.json({ message: "Carrito creado", newCart });
})

cartRouter.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    const newProduct = await cartManager.addProductToCartById(idCart, idProduct, quantity);
    res.json({ message: "Producto agregado", newProduct });
});

export default cartRouter