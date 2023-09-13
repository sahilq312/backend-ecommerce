import express from 'express'
import User from '../models/User';

export const register = async (req: any, res: any) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
            res.status(400).json({ message: "email already exists" })
        }
        if (!exists) {
            const user = new User({
                name,
                email,
                password
            })
            await user.save()
            res.status(200).json({ user })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}