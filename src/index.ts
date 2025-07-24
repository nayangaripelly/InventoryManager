import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

app.post("/api/v1/signup",function(req,res)
{

});

app.post("/api/v1/login",function(req,res)
{

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
    mongoose.connect("url");
    app.listen(3000);
}

main();