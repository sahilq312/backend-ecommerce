import express from "express";
import { createProduct, deleteProduct, fetchAllProducts, fetchProductById } from "../controlllers/Product";

const productRouter = express.Router()

productRouter
    .post("/create", createProduct)
    .delete("/:id", deleteProduct)
    .get("/", fetchAllProducts)
    .get("/:id", fetchProductById)



export default productRouter;