import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/User';
import mongoose from 'mongoose';
import bodyParser = require('body-parser');
import productRouter from './routes/Product';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 8000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});
app.use("/user", userRouter);
app.use("/product", productRouter)
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
