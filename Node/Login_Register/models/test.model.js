import { model, Schema } from "mongoose";
const condition = ["yes", "maybe"]



const testSchema = new Schema({
    dependentField: {
        type: String,
        required: true,
        enum: [ "yes", "no", "maybe" ]
    },
    testCondition: {
        type: String,
        required: [ function(){ return this.dependentField.includes( "no" ) }, "testCondition is required" ]
    }
})

export const testDB = model( 'test', testSchema )