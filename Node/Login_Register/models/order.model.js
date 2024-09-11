import { model, Schema, Types } from "mongoose";

const orderItemSchema = new Schema({
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

const orderSchema = new Schema({
    customer_ID:{
        type: Types.ObjectId,
        ref: "Users",
        required: [ true, 'customer_ID is required' ]
    },
    orderItems: {
        type: [ orderItemSchema ]
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
        default: "DISPATCHED",
        enum: [ "DISPATCHED", "CANCELLED", "DELIVERED" ]
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        required: [ function(){ return this.orderStatus === "DELIVERED" }, "deliveryDate is required" ]
    }
} )

export const OrderDB = model( 'Orders', orderSchema )