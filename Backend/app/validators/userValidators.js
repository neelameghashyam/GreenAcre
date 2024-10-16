import User from "../models/userModel.js";

export const userRegisterSchema = {
    name:{
        exists: {
            errorMessage: "name field is required"
        },
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: "mobile number must be exactly 10 digits long"
        }
    },
    phone:{
        exists: {
            errorMessage: "mobile number field is required"
        },
        notEmpty: {
            errorMessage: "mobile number cannot be empty"
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "mobile number must be exactly 10 digits long"
        }
    }
    ,
    email: {
        exists: {
            errorMessage: "email field is required"
        },
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isEmail: {
            errorMessage: "email should be in valid format"
        },
        trim: true,
        normalizeEmail: true,
        custom:{
            options:async function(value){
                try{
                    const user = await User.findOne({email:value})
                    if(user){
                        throw new Error("email is already taken")
                    }

                }catch(err){
                    throw new Error(err.message)
                }
                return true
            }
        }
    },
    password: {
        exists: {
            errorMessage: "password field is required"
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8"
        },
        trim: true
    }
};


export const userLoginSchema={
    email: {
        exists: {
            errorMessage: "email field is required"
        },
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isEmail: {
            errorMessage: "email should be in valid format"
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        exists: {
            errorMessage: "password field is required"
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8"
        },
        trim: true
    }
}

export const userResetPassSchema={
    password: {
        exists: {
            errorMessage: "password field is required"
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8"
        },
        trim: true
    },
    newPassword: {
        exists: {
            errorMessage: "password field is required"
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8"
        },
        trim: true
    }
}

export const userForgotPassword={
    email: {
        exists: {
            errorMessage: "email field is required"
        },
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isEmail: {
            errorMessage: "email should be in valid format"
        },
        trim: true,
        normalizeEmail: true
    }
}


export const userResetForgetPassSchema={
    newPassword: {
        exists: {
            errorMessage: "password field is required"
        },
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: "password must contain one number, lowercase, uppercase, symbol, and the minimum length should be 8"
        },
        trim: true
    }
}
