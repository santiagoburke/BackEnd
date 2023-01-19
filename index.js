import fs from 'fs'

class ProductManager {
    constructor() {
        this.products = []
        this.path = './archivos/productos.json'
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, 'utf-8');
                const productosParse = JSON.parse(productos);
                return productosParse
                // console.log(productosParse);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProducts(producto) {
        const product = {title, description, price, thumbnail, code, stock}
        try {
            if(!title || !description || !price || !code || !stock){
                console.log('Debe ingresar todos los campos')
            } else {
                const newProduct = {
                    id: this.#generarId(),
                    title, 
                    description, 
                    price,
                    thumbnail,
                    code,
                    stock,
                }
                this.products.push(newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find(p=>p.id === id)
            if (product) {
                return product
            } else {
                return ('Producto no encontrado')
            }
        } catch (error) {
            return error
        }
    }
        
    async updateProduct(id, update) {
        let saveProduct = await fs.promises.readFile(this.path, 'utf-8')
        let productParse = JSON.parse(saveProduct)
        let product = await this.getProductById(id)
        if(product) {
            product = {...product, ...update}
            productParse = productParse.map(p => {
                if(p.id === product.id) {
                    return product
                } else {
                    return p
                }
            })
            productParse = JSON.stringify(productParse, null, 2)
            await fs.promises.writeFile(this.path, productParse)
            console.log(JSON.parse(productParse))
            return productParse
        } else {
            return console.log('Error al modificar el producto')
        }
    }

    async deleteProduct(id) {
        try {
            let saveProduct = await fs.promises.readFile(this.path, 'utf-8')
            let productParse = JSON.parse(saveProduct)
            let selectProduct = await this.getProductById(id)
            if(selectProduct) {
                const productFilter = productParse.filter(p => p.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2))
                return productFilter
            }
        } catch (error) {
            console.log(error)
        }
    }

    #generarId() {
        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        return id
    }

}

const productManager = new ProductManager;

async function exec(){
    //productManager.addProducts('Dog Black', 'Remera Negra', 200, '...', 'DB', 20)
    //productManager.addProducts('Dog White', 'Remera Blanca', 200, '...', 'DW', 20)
    //productManager.addProducts('Dog Blue', 'Remera Azul', 230, '...', 'DB', 10)
    //productManager.addProducts('Dog Yellow', 'Remera Amarilla', 150, '...', 'DY', 35)
    //productManager.addProducts('Dog Be Natural', 'Remera Be Natural', 170, '...', 'DBN', 15)
    //productManager.addProducts('Dog Humans', 'Remera Humans', 150, '...', 'DH', 10)
    //productManager.addProducts('Dog Loyality', 'Remera Loyality', 300, '...', 'DL', 3)
    //productManager.addProducts('Dog Perspective', 'Remera Perspective', 200, '...', 'DP', 150)
    //productManager.addProducts('Dog Rose', 'Remera Rose', 180, '...', 'DR', 15)
    //productManager.addProducts('Dog Smile', 'Remera Smile', 200, '...', 'DS', 45)
    //const productos = await productManager.getProducts()
    //console.log(productos)
    //const productosId = await productManager.getProductById(4)
    //console.log(productosId)
    //const productUpdate = await productManager.updateProduct(4, ({title: 'Titulo Modificado'}))
    //console.log(productUpdate)
    //const productDelete = await productManager.deleteProduct(1)
    //console.log(productDelete)
}

exec()

export default ProductManager