import { model, Schema, Types } from "mongoose";

const paymentSchema = new Schema({
    user_ID: {
        type: Types.ObjectId,
        ref: "Users"
    },
    order_ID: {
        type: Types.ObjectId,
        ref: "Orders"
    },
    verification_token: {
        type: String,
        default: ""
    },
    paymentAmount: {
        type: Number,
        required: [ true, 'paymentAmount is required' ]
    },
    currency: {
        type: String,
        enum: [ "INR", "USD", "AUD", "EURO" ],
        required: [ true, 'currency is required' ]
    }
    // paymentType: {
    //     type: String,
    //     required: [ true, 'paymentType is required' ],
    //     enum: ["Credit Card", "Debit Card", "Wallet", "UPI"]
    // }
}, { timestamps: true } )

export const PaymentDB = model('Payment', paymentSchema)