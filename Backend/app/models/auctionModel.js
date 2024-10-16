import { Schema,model } from "mongoose";

const auctionSchema=new Schema({
    user:Schema.Types.ObjectId,
    title:String,
    description:String,
    file:String,
    category:String,
    startDate:Date,
    endDate:Date,
    startBid:Number,
    finalBid:Number,
    bidderName:String,
    approved:{
        type: Boolean,
        default: false 
      }

},{timestamps:true})

const Auction=model('Auction',auctionSchema)

export default Auction