import express from 'express'
import { checkAuth, login, logout, register } from '../controllers/Auth'
import isAuth from '../middlewares/verify';

const authRouter = express.Router();

authRouter
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout)
    .post("/check", isAuth, checkAuth)

export default authRouter;