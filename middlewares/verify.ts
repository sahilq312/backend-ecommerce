import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import * as dotenv from "dotenv"
import { USER } from "../models/User";

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  
  let secret: string = process.env.JWT_SECRET as string;
  try {
    const cookie = await req.cookies
  const token = cookie.jwt;

  if (!token) {
    throw new Error();
  }
  //const verified = jwt.verify(token, secret);
  //(req as CustomRequest).token = verified;
  const verified = jwt.verify(token, secret);
  (req as any).verified = verified;
  next();
  } catch (error) {
    res.status(401).send(error)
  }
}
export default isAuth;