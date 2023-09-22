import express, { Express, Request, Response , Application } from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/User';
//import authRouter from "./routes/Auth";
import mongoose from 'mongoose';
import bodyParser = require('body-parser');
import productRouter from './routes/Product';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { verify } from 'jsonwebtoken';
import myMiddleware from './middlewares/verify';
import isAuth from './middlewares/verify';
import authRouter from './routes/Auth';

//For env File 
dotenv.config();

const app: Application = express();
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

app.use("/auth", authRouter)
app.use("/user",isAuth, userRouter);
app.use("/product" ,productRouter)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
