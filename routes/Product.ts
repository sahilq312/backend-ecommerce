import express from "express";
import { createProduct } from "../controlllers/Product";

const productRouter = express.Router()

productRouter
    .get("/create", createProduct)



export default productRouter;