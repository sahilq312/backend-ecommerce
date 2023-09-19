import express from 'express'
import { login, logout, register } from '../controllers/Auth'

const userRouter = express.Router();

userRouter
    .get("/")

export default userRouter;