import express, { NextFunction } from 'express'
import User, { USER } from '../models/User';
import bcrypt from "bcrypt";



export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    try {
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
            res.status(400).json({ message: "email already exists" })
        }
        if (!exists) {

            const user = new User({
                name,
                email,
                password : hash
            })
            await user.save()
            res.status(200).json( {user} )
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

export const login = async(req : any , res: any) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user)return res.status(400).json('email is wrong')
        const validpass = await bcrypt.compare(req.body.password, user.password)
        if(!validpass)return res.status(400).json('invalid password')
        res.status(200).json("logged in")
      } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
      }
    }
export const logout = async(req : any ,res : any ) => {
    try {
        res
            .cookie('jwt', null, {
            expires : new Date(Date.now()),
            httpOnly : true
        })
        .sendStatus(200)
    } catch (error) {
        res.status(400).json(error)
    }
}