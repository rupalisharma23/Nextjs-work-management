import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        require:[true,'name is required!!']
    },
    email:{
        type:String,
        unique:true,
        require:[true,'email is required!!']
    },
    password:{
        type:String,
        require:[true,'password is required!!']
    },
    address:{
        type:String,
        require:[true,'password is required']
    }
})

mongoose.models = {}

export const User = mongoose.model.usersDbs || mongoose.model('usersDbs',userSchema)

// note: dont use same name for folder and collection