import { Router } from 'express'
import { ProductManager } from '../index'
const productRouter = Router()

const productManager = new ProductManager('../archivos/productos.json')

productRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    const { limit } = req.query
    if (limit) {
        res.json(products.slice(0, limit))
    } else {
        res.json(products)
    }
})

productRouter.get('/:pid', async (req, res) => {
    const products = await productManager.getProducts()
    const { pid } = req.params
    const productId = products.find(p => p.id === parseInt(pid))
    if (pid) {
        res.json(productId)
    } else {
        res.send('No existe ningun producto con ese ID')
    }
})

productRouter.post('/', async (req, res) => {
    const product = req.body
    const products = await productManager.addProducts(product)
    res.status(200).json({message: 'Usuario creado', products})
})

productRouter.put('/', async(req,res)=>{
    const {id} = req.params
    const product = req.body
    const products = await productManager.updateProduct(parseInt(id), product)
    res.status(200).json({message: 'Usuario modificado', products})
})

productRouter.delete('/', async(req,res)=>{
    const {id} = req.params
    const products = await productManager.deleteProduct(parseInt(id))
    res.status(200).json({message: 'Usuario eliminado', products})
})

export default productRouter