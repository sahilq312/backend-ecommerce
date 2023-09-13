import express from 'express'
import { register } from '../controlllers/User';

const userRouter = express.Router();

userRouter.get("/", register)

export default userRouter;