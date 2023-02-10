import mongoose from "mongoose";

const URL = 'mongodb+srv://santiburke:santicoder2023@coderclusterdog.7ycsn6b.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(URL, (error)=>{
    if(error){
        console.log('Error al conectar a la base de datos')
    } else {
        console.log('Conectado a la base de datos')
    }
})