import express from 'express'
import { login, logout, register } from '../controllers/User'

const userRouter = express.Router();

userRouter
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout)

export default userRouter;