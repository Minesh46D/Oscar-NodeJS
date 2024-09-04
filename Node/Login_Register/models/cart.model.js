import { model, Schema, Types } from "mongoose";

const cartItemSchema = new Schema({
    product_ID: {
        type: Types.ObjectId,
        ref: "Product",
        required: [ true, 'product_ID is required' ]
    },
    quantity: {
        type: Number,
        required: [ true, 'quantity is required' ]
    }
})

const cartSchema = new Schema({
    user_ID: {
        type: Types.ObjectId,
        ref: "Users"
    },
    cartItems: {
        type: [ cartItemSchema ]
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    cartPrice: {
        type: Types.Decimal128,
        required: [ true, 'cartPrice is required' ]
    }
}, { timestamps: true } )

export const CartDB = model( 'Carts', cartSchema )