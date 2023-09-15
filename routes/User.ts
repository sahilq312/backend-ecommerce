import express from 'express'
import { login, register } from '../controlllers/User';

const userRouter = express.Router();

userRouter
    .post("/register", register)
    .post("/login", login)

export default userRouter;