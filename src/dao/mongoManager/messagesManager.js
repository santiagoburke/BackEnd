import { messagesModel } from "../models/messages.model.js";

export default class MessagesManager{

    async getMessages(){
        try {
            const messages = await messagesModel.find({})
            return messages
        } catch (error) {
            console.log('Error al encontrar los mensajes', error)
            return error
        }
    }

    async addMessages(objMessage){
        try {
            const newMessage = new messagesModel(objMessage)
            const saveMessage = await newMessage.save()
            return saveMessage
        } catch (error) {
            console.log('Error al agregar un mensaje', error)
            return error
        }
    }

    async getMessageById(idMessage){
        try {
            const messages = await messagesModel.findById(idMessage)
            if (!messages) {
                return 'No se encontro un mensaje con ese ID'
            }
            return messages
        } catch (error) {
            console.log('Error al encontrar el mensaje con ese ID', error)
            return error
        }
    }

    async updateMessage(idMessage, updates){
        try {
            const messages = await messagesModel.findByIdAndUpdate(idMessage, updates, {new:true})
            if (!messages) {
                return 'No se encontro un mensaje con ese ID'
            }
            return messages
        } catch (error) {
            console.log('Error al actualizar el mensaje', error)
            return error
        }
    }

    async deleteMessage(idMessage){
        try {
            const messages = await messagesModel.findByIdAndDelete(idMessage)
            return messages
        } catch (error) {
            console.log('Error al eliminar el mensaje', error)
            return error
        }
    }

}