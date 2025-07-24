import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtsecret = process.env.JWT_SECRET as string;
import { Request, Response, NextFunction } from "express";

interface customReq extends Request {
    id? : string
}

export function userAuth(req : customReq, res:Response, next:NextFunction)
{
    const token = req.headers.token as string;
    try{
        const user = jwt.verify(token,jwtsecret) as jwt.JwtPayload & { id: string };
        req.id = user.id;
        next();
    }catch(e)
    {
        res.status(403).json({
            msg:"invalid token login once again..."
        })
    }
}