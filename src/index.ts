import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtsecret = process.env.JWT_SECRET as string;
const mongourl = process.env.MONGO_URL as string;

import { userModel,productModel } from "./db";
import {userAuth} from "./middleware/userAuth";
import { Request } from "express";
const app = express();

app.use(express.json());

app.post("/register",async function(req,res)
{
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,5);

    try {
        await userModel.create({
            username,
            password:hash
        });

        res.status(201).json({
            msg: "successfully signed up !!"
        })
    }catch(e)
    {
        res.status(500).json({
            msg : "something went wrong try again"
        })
    }
});

app.post("/login",async function(req,res)
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

interface customReq extends Request {
    id? : string
};

app.use(userAuth);

app.post("/products",async function(req:customReq,res)
{
    const {name, type,sku, image_url,description,quantity,price} = req.body;
    try{
        const product = await productModel.create({
            name,
            type,
            sku,
            image_url,
            description,
            quantity,
            price,
            userId : req.id
        })
        res.status(201).json({
            msg:`successfully added product ${product.name}, ${product._id}`
        })
    }catch(e)
    {
        res.status(409).json({
            msg:"user already exists with that username or something went wrong try again"
        })
    }
});

app.put("/products/:id/quantity",async function(req:customReq,res)
{
    const id = req.params.id;
    const quantity = req.body.quantity;

    try{
        await productModel.updateOne({
            _id:id,
            userId:req.id
        },{
            quantity
        },{
            runValidators:true
        })
        res.status(200).json({
            msg:"successfully updated this product"
        })
    }catch(e)
    {
        res.status(500).json({
            msg:"something went wrong!! try again"
        })
    }
});

app.get("/products",async function(req:customReq,res)
{
    try{
        const products = await productModel.find({
            userId:req.id
        })
        if(products.length == 0)
        {
            res.status(204).json({
                msg:"you don't have any products in your inventory",
            })
            return;
        }
        res.status(200).json({
            products,
            msg: "these are all your products"
        })
    }catch(e)
    {
        res.status(500).json({
            msg:"something went wrong, try again"
        })
    }
});

async function main()
{
    await mongoose.connect(mongourl);
    app.listen(3000);
}

main();