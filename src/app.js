// DEPENDENCIAS E IMPORTACIONES
import express from 'express'
import productsRouter from '../routes/products.router.js'
import cartRouter from '../routes/carts.router.js'
import viewRouter from '../routes/views.router.js'
import { __dirname } from '../utils.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import '../dao/models/dbConfig.js'
import { messagesModel } from '../dao/models/messages.model.js'
import chatRouter from '../routes/chat.router.js'

// APP Y EXPRESS
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
app.use('/chat', chatRouter)

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// HTTPSERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

// SOCKET
const mensajes = []

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id)

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id)
  })

  socket.on('mensaje', info => {
    mensajes.push(info)
    socketServer.emit('chat', mensajes)
    async function addMessage() {
      try {
        const newMessage = await messagesModel.create(info)
        return newMessage
      } catch (error) {
        console.error('Error en addMessage: ',error)
      }
    }
    addMessage()
    console.log(info)
  })
})

export default socketServer