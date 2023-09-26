import Order from "../models/Order";
import Product from "../models/Product";


export const createOrder = async(req : any, res : any)=> {
    const userId = req.verified.id;
    try {
        const order = await new Order({...req.body, user: userId})
        const doc = await order.save()
        res.status(200).json(doc)
    } catch (error) {
        res.json(500).json(error)
    }
}