import { Router } from 'express'
import ProductManager from '../dao/fileManager/index.js'
import socketServer from '../src/app.js'
import ProductsManager from '../dao/mongoManager/productsManager.js'
import { productsModel } from '../dao/models/products.model.js'

const viewRouter = Router()
const productManager = new ProductManager('./archivos/productos.json')
const productsManager = new ProductsManager

viewRouter.get('/', async (req, res) => {
    try {
        // const products = await productManager.getProducts()
        const products = await productsManager.getProducts()
        socketServer.on('connection', (socket) => {
            socket.emit('productos', products)
        })
        res.render('home', { titulo: 'Productos', productos: products })
    } catch (error) {
        res.status(500).json(error)
    }
})

viewRouter.get('/products', async (req, res) => {
    const { limit = 10, page = 1, category } = req.query;
    const skip = (page - 1) * limit;

    try {
        const query = category ? { category } : {};
        const products = await productsModel.find(query)
            .skip(skip)
            .limit(limit)
            .lean();

        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
})

viewRouter.get('/carts/:cartId', async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.cartId).populate('products.product').lean();
        if (!cart) {
            return res.json({ message: 'Carrito no encontrado' });
        }
        res.render('cart', { cart });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error' });
    }
});

viewRouter.get('/realTimeProducts', async (req, res) => {
    try {
        // const products = await productManager.getProducts()
        const products = await productsManager.getProducts()
        socketServer.on('connection', (socket) => {
            socket.emit('productos', products)
        })
        res.render('realTimeProducts', { titulo: 'Productos Socket' })
    } catch (error) {
        res.status(500).json(error)
    }
})

viewRouter.post('/realTimeProducts', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        }
        // await productManager.addProduct(producto)
        await productsManager.addProduct(producto)
        // const products = await productManager.getProducts()
        const products = await productsManager.getProducts()
        socketServer.sockets.emit('productos', products)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default viewRouter