import { Router } from 'express'
import CartManager from '../dao/fileManager/cart.js'
import { cartsModel } from '../dao/models/carts.model.js'
import CartsManager from '../dao/mongoManager/cartsManager.js'

const cartRouter = Router()
const cartManager = new CartManager('./archivos/carts.json')
const cartsManager = new CartsManager


cartRouter.get('/', async (req, res) => {
    // const carts = await cartManager.getCarts();
    const carts = await cartsManager.getCart()
    res.json({ carts });
});

cartRouter.get('/:idCart', async (req, res) => {
    // const cart = await cartManager.getCartById(req.params.idCart);
    try {
        const cart = await cartsModel.findById(req.params.idCart).populate('products.id')
        res.json({ cart }); 
    } catch (error) {
        console.log('Error al obtener el carrito', error)
    }
});

cartRouter.post('/', async (req, res) => {
    const products = await req.body;
    // const newCart = await cartManager.addCart(products);
    const newCart = await cartsManager.addCart(products)
    res.json({ message: "Carrito creado", newCart });
})

cartRouter.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    // const newProduct = await cartManager.addProductToCartById(idCart, idProduct, quantity);
    const newProduct = await cartsManager.addProductToCartById(idCart, idProduct, quantity)
    res.json({ message: "Producto agregado", newProduct });
});

cartRouter.put('/:idCart', async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const updates = req.body;
        const updatedCart = await cartsManager.updateCart(idCart, updates);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error });
    }
})

cartRouter.put('/:idCart/products/:idProduct', async (req, res) => {
    const { idCart, idProduct } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartsManager.getCartById(idCart);
        const productIndex = cart.products.findIndex(p => p.id === idProduct);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        await cartsModel.updateOne(
            { _id: idCart, 'products.id': idProduct },
            { $set: { 'products.$.quantity': quantity } }
        );

        const updatedCart = await cartsManager.getCartById(idCart);
        res.json(updatedCart);
    } catch (error) {
        console.log('Error al modificar el carrito', error);
        res.status(500).json({ error: 'Error al modificar el carrito' });
    }
});

cartRouter.delete('/:idCart/product/:idProduct', async (req, res) => {
    try {
        const { idCart, idProduct } = req.params;
        await cartsManager.removeProductFromCartById(idCart, idProduct);
        res.json({ status: 'success', message: `El producto ${idProduct} se removio del carrito ${idCart}` });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
})

cartRouter.delete('/:idCart', async (req, res) => {
    const idCart = req.params.idCart;
    const products = await cartsManager.deleteCart(idCart);
    res.json(products);
});

export default cartRouter