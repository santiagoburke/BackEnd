import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Products',
                default:[],
            },
            quantity: {
                type: Number,
            }
        }
    ]
})

cartsSchema.pre('find', function(next){
    this.populate('products.product')
    next()
})

export const cartsModel = mongoose.model('Carts', cartsSchema)