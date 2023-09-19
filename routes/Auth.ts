import express from 'express'
import { login, logout, register } from '../controllers/Auth'

const authRouter = express.Router();

authRouter
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout)

export default authRouter;