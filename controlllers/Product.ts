import mongoose from "mongoose";
import Product from "../models/Product";


export const createProduct = async ( req : any, res : any) => {
    try {
        const product = await new Product(req.body)
        const doc = await product.save()
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const deleteProduct = async (req : any,res: any) => {
    try {
        const productid = req.params
        const product = await Product.findByIdAndDelete(productid.id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(400).json(error)
    }
}
export const fetchAllProducts = async (req: any, res: any) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const fetchProductById = async (req : any ,res : any) => {
    try {
        const productId = req.params;
        console.log(productId);
        const product = await Product.findById(productId.id);
        res.status(200).json(product);        
    } catch (error) {
        res.status(400).json(error)
    }
}