import mongoose from "mongoose";
const schema = mongoose.Schema;
const objectId = schema.Types.ObjectId;

const userSchema = new schema({
    username : {type:String, unique:true, require:true},
    password : {type:String, require:true}
});

const productSchema = new schema({
    name: {type:String, require:true, unique:true},
    type: String,
    sku : String,
    image_url : String,
    description: String,
    quantity : Number,
    price : Number,
    userId : {type: objectId, ref:"users"}
});

export const userModel = mongoose.model("users",userSchema);
export const productModel = mongoose.model("products",productSchema);
