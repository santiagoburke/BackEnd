import { Router } from 'express'
<<<<<<< HEAD
<<<<<<< HEAD
import ProductManager from '../dao/fileManager/index.js'
=======
import ProductManager from '../src/index.js'
>>>>>>> origin/master
=======
import ProductManager from '../src/index.js'
>>>>>>> bdf7b183d0f63642f5511d0c4a64cb736bebcdf5
import socketServer from '../src/app.js'

const viewRouter = Router()
const productManager = new ProductManager('./archivos/productos.json')

viewRouter.get('/', async (req, res)=>{
    try {
        const products = await productManager.getProducts()
        socketServer.on('connection', (socket)=>{
            socket.emit('productos', products)
        })
        res.render('home', {titulo:'Productos', productos: products})
    } catch (error) {
        res.status(500).json(error)
    }
})

viewRouter.get('/realTimeProducts', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        socketServer.on('connection', (socket)=>{
            socket.emit('productos', products)
        })
        res.render('realTimeProducts', {titulo: 'Productos Socket'})
    } catch (error) {
        res.status(500).json(error)
    }
})

viewRouter.post('/realTimeProducts', async (req,res)=>{
    try {
        const { title, description, price, thumbnail, code, stock, category} = req.body
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        }
        await productManager.addProduct(producto)
        const products = await productManager.getProducts()
        socketServer.sockets.emit('productos', products)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default viewRouter