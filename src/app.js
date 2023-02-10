<<<<<<< HEAD
<<<<<<< Updated upstream
const express = require('express')
const ProductManager = require('../index')
=======
=======
>>>>>>> origin/master
// DEPENDENCIAS E IMPORTACIONES
import express from 'express'
import productsRouter from '../routes/products.router.js'
import cartRouter from '../routes/carts.router.js'
import viewRouter from '../routes/views.router.js'
import { __dirname } from '../utils.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
<<<<<<< HEAD
import '../dao/models/dbConfig.js'

// APP Y EXPRESS
const app = express()
>>>>>>> Stashed changes
const PORT = 8080
=======

// APP Y EXPRESS
>>>>>>> origin/master
const app = express()
const PORT = 8080

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// PUBLIC
app.use(express.static(__dirname + '/public'))

// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)

// HANDLEBARS
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// HTTPSERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

// SOCKET
const socketServer = new Server(httpServer)
socketServer.on('connection', (socket)=>{
  console.log('Cliente conectado', socket.id )
  socket.emit('saludo', 'Conexion realizada con exito')
  socket.on('disconnect', ()=>{
    console.log('Cliente desconectado', socket.id)
  })
})

export default socketServer