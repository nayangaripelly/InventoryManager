import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET as string;
const mongourl = process.env.MONGO_URL as string;

import { userModel,productModel } from "./db";
const app = express();

app.use(express.json());

app.post("/api/v1/signup",async function(req,res)
{
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,5);

    try {
        await userModel.create({
            username,
            password:hash
        });

        res.status(200).json({
            msg: "successfully signed up !!"
        })
    }catch(e)
    {
        res.status(500).json({
            msg : "something went wrong try again"
        })
    }
});

app.post("/api/v1/login",async function(req,res)
{
    const {username,password} = req.body;
    try {
        const user = await userModel.findOne({username});
        const hash = user?.password as string;
        if(!user)
        {
            res.status(404).json({
                msg:"user Not found, signup first"
            });
            return;
        }
        const match = await bcrypt.compare(password, hash);
        if(!match)
        {
            res.status(401).json({
                msg:"incorrect credentials"
            })
            return;
        }
        const token = jwt.sign({
            id:user._id
        },jwtsecret);

        res.status(200).json({
            msg:"successfully logged in",
            token
        })
    }catch(e)
    {
        res.status(500).json({
            msg : " something went wrong try again"
        })
    }
});

app.post("/api/v1/products",function(req,res)
{

});

app.put("/api/v1/products/:id/quantity",function(req,res)
{

});

app.get("/api/v1/products",function(req,res)
{

});

async function main()
{
    await mongoose.connect(mongourl);
    app.listen(3000);
}

main();