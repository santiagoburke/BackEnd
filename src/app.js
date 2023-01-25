import express from 'express'
import productsRouter from '../routes/products.router.js'
import cartRouter from '../routes/carts.router.js'
import { __dirname } from '../utils.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'../public'))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.get('/',(req,res)=>{
    res.send('Ruta Raiz')
})

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})