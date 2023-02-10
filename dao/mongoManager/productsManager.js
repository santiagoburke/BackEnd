import { productsModel } from "../models/products.model.js";

export default class ProductsManager {

    async getProducts() {
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log('Error al obtener los productos', error)
            return error
        }
    }

    async addProduct(objProduct) {
        try {
            const newProduct = await productsModel.create(objProduct)
            return newProduct
        } catch (error) {
            console.log('Error al agregar el producto', error)
            return error
        }
    }

    async getProductById(idProduct){
        try {
            const products = await productsModel.findById(idProduct)
            return products
        } catch (error) {
            console.log('Error al encontrar el producto por ID', error)
            return error
        }
    }

    async updateProduct(idProduct, updates){
        try {
            const products = await productsModel.findByIdAndUpdate(idProduct, updates, {new:true})
            return products
        } catch (error) {
            console.log('Error al actualizar el producto', error)
            return error
        }
    }

    async deleteProduct(idProduct){
        try {
            const products = await productsModel.findByIdAndDelete(idProduct)
            return products
        } catch (error) {
            console.log('Error al eliminar el producto', error)
            return error
        }
    }
}