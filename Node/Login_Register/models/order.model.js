import { model, Schema, Types } from "mongoose";


const orderSchema = new Schema({
    customer_ID:{
        type: Types.ObjectId,
        ref: "Users",
        required: [ true, 'customer_ID is required' ]
    },
    cart_ID: {
        type: Types.ObjectId,
        ref: "Carts"
    },
    orderAddress: {
        type: String,
        required: [ true, 'orderAdress is required' ]
    },
    orderTotal: {
        type: Number,
        required: [ true, 'ordeTotal is required' ],
    },
    orderStatus: {
        type: String,
        default: "PENDING",
        enum: [ "PENDING", "CANCELLED", "DELIVERED" ]
    },
    orderPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } )

export const OrderDB = model( 'Orders', orderSchema )