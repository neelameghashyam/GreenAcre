import { Schema, model } from 'mongoose' 

const userSchema = new Schema({
    name:String,
    phone:Number,
    email: String,
    password: String,
    role:{type:String,
        default:"user"
    },
    otpSendMail:Number,
    otpExpiresAt:Number
}, { timestamps: true })

const User = model('User', userSchema)

export default User 