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
            res.status(200).json( user )
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

export const login = async(req : any , res: any) => {
    try {
        const user = await User.findOne({email : req.body})
        if(!user){
            res.status(404).json("email not valid")
        }
         /* const validpass = await bcrypt.compare(req.body.password, )
        if(!validpass)return res.status(400).json('invalid password') */
        res.status(200).json(user, "logged in ")
        
    } catch (error) {
        res.status(400).json(error)
    }
}