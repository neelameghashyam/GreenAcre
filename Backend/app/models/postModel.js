import { Schema, model } from 'mongoose' 

const postSchema=new Schema({
    user:Schema.Types.ObjectId,
    type:String,
    propertyType:String,
    file:String,
    mapLocation:String,
    description:String,
    state:String,
    city:String,
    pincode:Number,
    locality:String,
    address:String,
    area:Number,
    unitMeasurement:String,
    ownerShip:String,
    price:Number,
    approved:{
        type: Boolean,
        default: false 
      },
    views:{
      type: Number,
      default: 0
    }
},{timestamps:true})

const Post=model ('Post',postSchema)

export default Post