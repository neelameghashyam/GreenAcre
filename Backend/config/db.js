import mongoose from "mongoose";

const configDb=async()=>{
    const dbUrl=process.env.DB_URL
    try{
        const db=await mongoose.connect(dbUrl)
        console.log("connected to db",db.connection.name)
    }catch(err){
        console.log(err)
    }
}

export default configDb