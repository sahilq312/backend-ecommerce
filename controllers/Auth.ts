import express, { NextFunction, Request, Response } from 'express'
import User, { USER } from '../models/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
            let secret: string = process.env.JWT_SECRET as string;
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '2d' })
            //send data in response
            res.status(200).cookie('jwt', token, {
                    domain: "http://localhost:5173",
                    httpOnly: true,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
                }).json({ email: user.email, role: user.role })
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
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email is not registered' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create a JWT token
        const secret: string = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '2d' });

        // Set the JWT token as an HttpOnly cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 15*24*60*60*1000
        }).status(200).json({ email: user.email, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res
            .cookie('jwt', null, {
                expires: new Date(Date.now()),
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            })
            .sendStatus(200)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const checkAuth = async(req : any, res : any) => {
    try {
        const userId = req.verified.id;
        const user = await User.findOne({_id : userId})
        res.status(200).json({ email: user?.email })
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
        
    }
}