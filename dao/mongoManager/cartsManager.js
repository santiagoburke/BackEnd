import { cartsModel } from "../models/carts.model";

export default class CartManager{

    async getCart(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            console.log('Error al obtener el carrito', error)
            return error
        }
    }

    async addCart(objCart){
        try {
            const newCart = new cartsModel(objCart)
            await newCart.save()
            return newCart
        } catch (error) {
            console.log('Error al agregar el carrito', error)
            return error
        }
    }

    async getCartById(idCart){
        try {
            const carts = await cartsModel.findById(idCart)
            return carts
        } catch (error) {
            console.log('No existe un carrito con ese ID', error)
            return error
        }
    }

    async updateCart(idCart, updates){
        try {
            const carts = await cartsModel.findByIdAndUpdate(idCart, updates, {new:true})
            return carts
        } catch (error) {
            console.log('Error al modificar el carrito', error)
            return error
        }
    }

    async deleteCart(idCart){
        try {
            const carts = await cartsModel.findByIdAndDelete(idCart)
            return carts
        } catch (error) {
            console.log('Error al eliminar el carrito', error)
            return error
        }
    }

}