import {Response} from "express"
import User from "../models/User";
export const fetchUser = async(req : any, res :Response )=> {
    try {
        const user = req.verified.id;
        const doc =await User.findById(user);
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json(error)
    }
}