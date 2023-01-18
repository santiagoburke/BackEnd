const express = require('express')
const ProductManager = require('../index')
const PORT = 8080
const app = express()

const productManager = new ProductManager('../archivos/productos.json')

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    const { limit } = req.query
    if (limit) {
        res.json(products.slice(0, limit))
    } else {
        res.json(products)
    }
})

app.get('/products/:pid', async (req,res) => {
    const products = await productManager.getProducts()
    const { pid } = req.params
    const productId = products.find(p => p.id === parseInt(pid))
    if(pid) {
        res.json(productId)
    } else {
        res.send('No existe ningun producto con ese ID')
    }
})

app.listen(PORT, () => {
    console.log(`Escuchando al puerto: ${PORT}`)
})
