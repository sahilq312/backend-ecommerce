import mongoose, { Schema, model } from "mongoose";

export interface PRODUCT {
    title : string,
    description : string,
    price : number,
    discountPercentage : number,
    rating : number,
    stock : number,
    brand : string,
    category : string,
    thumbnail : string,
    images: string[]
}

const productSchema = new Schema <PRODUCT>({
    title: {type: String , required : true},
    description : {type: String , required: true},
    price : {type: Number, required: true},
    discountPercentage: {type: Number},
    rating: {type: Number},
    stock : {type: Number, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true}
})

const Product = model("product", productSchema)
export default Product;