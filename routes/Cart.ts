
import express from "express";
import { addToCart, deleteFromCart, fetchUserCart } from "../controllers/Cart";

const cartRouter = express.Router();


cartRouter
.post("/add", addToCart)
.get("/fetchcart", fetchUserCart)
.delete("/:id", deleteFromCart)



export default cartRouter;