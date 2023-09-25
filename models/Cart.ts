import { ObjectId } from "mongodb";
import { Schema, Types, model } from "mongoose";

interface ICART {
    userId: Types.ObjectId,
    productId: Types.ObjectId,
    quantity: number
}


const cartSchema = new Schema<ICART>({
    userId: { type: Schema.Types.ObjectId, ref: 'user' , required: true},
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: {type: Number, min:1, required: true}
})


const Cart = model("cart", cartSchema)

export default Cart;