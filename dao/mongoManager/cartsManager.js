import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

export default class CartsManager{

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
            const product = await productsModel.findById(objCart.product)
            if (!product) {
                console.log('No se encontro el producto')
            }
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

    async addProductToCartById(idCart, idProduct, quantity) {
        try {
          const cart = await Cart.findById(idCart);
          if (!cart) throw new Error('Cart not found');
      
          let productIndex = -1;
          cart.products.forEach((product, index) => {
            if (product.id.toString() === idProduct) {
              productIndex = index;
            }
          });
      
          if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
          } else {
            const newProduct = { id: idProduct, quantity };
            cart.products.push(newProduct);
          }
      
          await cart.save();
          return cart.products;
        } catch (error) {
          console.error(error.message);
          return error;
        }
      }
      
}