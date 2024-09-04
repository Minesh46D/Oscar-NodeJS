import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'product name is required'],
        trim: true,
        lowercase: true,
        maxLength: [30, 'product name is too long']
    },
    productImage: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'product description is required'],
        trim: true,
        maxLength: [200, 'product description is too long']
    },
    price: {
        type: Number,
        required: [true, 'product price is required'],
        max: 100000
    },
    stock: {
        type: Boolean,
        required: [true, 'stock is required']
    },
    owner: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true } ) 

export const ProductDB = model('Products', productSchema)