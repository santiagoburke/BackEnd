import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const infoCarts = await fs.promises.readFile(this.path, 'utf-8');
                if(infoCarts.length>0){
                    let carts = JSON.parse(infoCarts);
                    if(Array.isArray(carts)){
                        if (limit === 'max') {
                            return carts;
                        } else {
                            return carts.slice(0, limit);
                        }
                    }else{
                        throw new Error("Error en el formato del archivo")
                    }
                }else{
                    return []
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log(`Error al obtener el carrito: ${error}`);
            console.log(error)
            return error;
        }
        
    }

    async addCart(products) {
        try {
            const cart = {
                id: await this.#generarId(),
                products: [products]
            }
            const read = await this.getCarts();
            read.push(cart);
            console.log(read)
            await fs.promises.writeFile(this.path, JSON.stringify(read, null, 2))
        } catch (error) {
            console.log('Error al agregar un carrito');
            console.log(error)
            return error
        }
    }

    async getCartById(idCart) {
        try {
            const read = await this.getCarts();
            const cart = read.find((c) => c.id === parseInt(idCart));
            if (cart) {
                console.log(cart)
                return cart;
            } else {
                return 'No se encuentra un carrito con ese ID'
            }
        } catch (error) {
            console.log('Carrito no encontrado')
            return error
        }
    }

    async updateCart(idCart, update) {
        const read = await this.getCarts();
        let foundCart = await this.getCartById(idCart)
        if (foundCart) {
            foundCart = { ...foundCart, ...update };
            read = read.map(cart => {
                if (cart.id == foundCart.id) {
                    cart = foundCart
                }
                return cart
            })
            read = JSON.stringify(read, null, 2)
            await fs.promises.writeFile(this.path, read)
            console.log(JSON.parse(read))
            return read
        } else {
            console.log('Error al modificar el carrito');
            return error
        }
    }

    async deleteCart(idCart) {
        try {
            let read = await this.getCarts()
            let cart = await this.getCartById(idCart)
            if (cart) {
                const filtrado = read.filter(c => c.id != idCart)
                await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
                return filtrado
            }
        } catch (error) {
            console.log('Error al eliminar el carrito')
            return error
        }
    }

    async addProductToCartById(idCart, idProduct, quantity) {
        const read = await this.getCarts();
        const cart = read.find((c) => c.id === parseInt(idCart));
        if (cart === undefined) return console.log("Carrito no encontrado")
        else {
            const index = read.indexOf(cart);
            if (read[index].products.find((p) => p.id === parseInt(idProduct))) {
                const indexProd = read[index].products.indexOf(read[index].products.find((p) => p.id === parseInt(idProduct)));
                read[index].products[indexProd].quantity += quantity;
                await fs.promises.writeFile(this.path, JSON.stringify(read, null, 2));
                return read[index].products[indexProd];
            } else {
                const id = parseInt(idProduct);
                const product = {
                    id: id,
                    quantity: quantity
                }
                read[index].products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(read, null, 2));
                return product;
            }
        }

    }

    async #generarId() {
        const read = await this.getCarts()
        let id =
            read.length === 0
                ? 1
                : read[read.length - 1].id + 1
        return id
    }

}

export default CartManager