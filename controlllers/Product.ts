import mongoose from "mongoose";
import Product from "../models/Product";
import { Response } from "express";


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
        const product = await Product.findByIdAndDelete({id:productid})
        res.status(200).json("deleted")
    } catch (error) {
        res.status(400).json(error)
    }
}