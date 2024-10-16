import { Schema,model } from "mongoose";

const biddersSchema=new Schema({
    user:Schema.Types.ObjectId,
    auction:Schema.Types.ObjectId,
    bid:Number,
    paid:{
        type: Boolean,
        default: false 
      }
},{timestamps:true})

const Bidder=model('Bidder',biddersSchema)

export default Bidder