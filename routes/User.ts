import express from 'express'
import { register } from '../controlllers/User';

const userRouter = express.Router();

userRouter.post("/register", register)

export default userRouter;