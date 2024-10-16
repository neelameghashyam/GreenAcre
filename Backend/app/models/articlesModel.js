import { Schema,model } from "mongoose";

const articleSchema = new Schema({
    user:Schema.Types.ObjectId,
    file:String,
    title:String,
    body:String,
    category:String
},{timestamps:true})

const Article=model('Article',articleSchema)

export default Article