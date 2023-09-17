import express, { NextFunction, Request, Response } from 'express'
import User, { USER } from '../models/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"



export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    try {
        //email exist or not
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
            res.status(400).json({ message: "email already exists" })
        }
        if (!exists) {
            // creating new user
            const user = new User({
                name,
                email,
                password: hash
            })
            //saving data in database
            await user.save()
            
            //creating token
            let secret : string = process.env.JWT_SECRET as string;
            const token = jwt.sign({id:user.id}, secret, {expiresIn: '2d'})
            //send data in response
            res
                .cookie("jwt", token ,{
                    httpOnly : true,
                    expires : new Date(Date.now() + 24*60*60*1000)
                })
                .status(200)
                .json(token)
        }
    }
    // if any server error
    catch (error) {
        res.status(400).json(error)
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        //if any email exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json('email is wrong')


        //checking password
        const validpass = await bcrypt.compare(req.body.password, user.password)
        if (!validpass) return res.status(400).json('invalid password')

        //create token
        let secret : string = process.env.JWT_SECRET as string;
        const token = jwt.sign({id:user.id}, secret, {expiresIn: '2d'})
        //send response
        res.cookie("token" , token, {
            httpOnly: true,
            expires : new Date(Date.now()+ 24*60*60*1000)
        })
        .status(200).json("logged in")
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res
            .cookie('jwt', null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            .sendStatus(200)
    } catch (error) {
        res.status(400).json(error)
    }
}