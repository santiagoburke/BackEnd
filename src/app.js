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
import session from 'express-session'
import FileStore from 'session-file-store'
import cookieParser from 'cookie-parser'
import sessionRouter from '../routes/sessions.router.js'
import usersRouter from '../routes/users.router.js'
import mongoStore from 'express-session'
import passport from 'passport'

// APP Y EXPRESS
const app = express()
const PORT = 8080

// FILESTORE
const fileStore = FileStore(session)

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// SESSION
app.use(session({
  store: new mongoStore({
    mongoUrl: 'mongodb+srv://santiburke:santicoder2023@coderclusterdog.7ycsn6b.mongodb.net/ecommerce?retryWrites=true&w=majority'
  }),
  resave: true,
  saveUninitialized: true,
  secret: 'secretKey',
  cookie: {maxAge: 60000}
}))

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// PUBLIC
app.use(express.static(__dirname + '/public'))

// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)
app.use('/chat', chatRouter)
app.use('/sessions', sessionRouter)
app.use('/users', usersRouter)

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