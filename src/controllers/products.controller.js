import { getProducts, addOne, getProdById, getProdByIdAndUpdate, getProdByIdAndDelete } from "../services/product.services.js";
import {productsModel} from '../dao/models/products.model.js';

export async function getAllProducts(req,res){
    try {
        const {limit=10, page=1, category} = req.query //default 10 y 1
        const getProds = await getProducts()
        const productsInfo = await productsModel.paginate({category}, {limit, page})
        if(!limit || !page || !category){
            res.json(getProds)
        }else{
            if(productsInfo.hasPrevPage === false){
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: null})
            }else{
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }else{
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: null})
            }else{
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getProductById(req, res) {
    try {
        const product = await getProdById(req.params.idProduct);
    if(product){
        res.json({ product });
    }else{
        res.send('Producto no encontrado')
    }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function AddOneProduct(req,res){
    try {
        const product = req.body
        // console.log(product)
        const addNewProduct = await addOne(product)
        console.log(addNewProduct)
        res.json({ message: 'Producto agregado con exito', addNewProduct })
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function updateProdById(req, res) {
    const id = req.params.idProduct
    const obj = req.body
    try {
        const updateProd = await getProdByIdAndUpdate(id, obj)
        const updatedProd = await getProdById(id)
        if(updateProd){
            res.json({ message: 'Producto actualizado con exito', updatedProd })
        }else{
            res.json({message:"producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function deleteProdById(req, res) {
    const id = req.params.idProduct
    try {
        const deleteProd = await getProdByIdAndDelete(id)
        if(deleteProd){
            res.json({ message: 'Producto borrado con exito', deleteProd })
        }else{
            res.json({message:"producto no encontrado"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}