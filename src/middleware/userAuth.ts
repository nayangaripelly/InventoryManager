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
    const authHeader = req.headers.authorization as string;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }
    const token = authHeader.split(" ")[1]; 
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