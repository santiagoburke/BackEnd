import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        require: true
    },
}, {
    timestamps: true
})

export const cartsModel = mongoose.model('Carts', cartsSchema)