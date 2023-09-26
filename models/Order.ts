import { Schema, Types, model } from "mongoose";
import { PRODUCT } from "./Product";

interface ORDER {
    user : Types.ObjectId
    items : [Schema.Types.ObjectId]
    totalAmount : number
    totalItem : number
    status : string
    time : Date
    address : string
    paymentStatus : string
}


const orderSchema = new Schema<ORDER>({
    user : {type: Schema.Types.ObjectId, ref: "user"},
    items : [{type:Schema.Types.ObjectId, ref : 'product'}] ,
    totalAmount : { type: Number},
    status: {type: String, default: 'pending'},
    totalItem : {type: Number}
})

const Order = model("order", orderSchema)

export default Order