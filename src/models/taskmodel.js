import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
    author:{
      type:mongoose.ObjectId,
      ref:'users'
    },
    title:{
        type:String,
        require:[true,'required!!']
    },
    content:{
        type:String,
        require:[true,'required!!']
    },
    status:{
        type:String,
        enum:['pending','completed','in progress','blocked'],
        default:'in progress'
    },
    image:[]
},{timestamps:true})

mongoose.models = {}

export const Task = mongoose.model.tasksDbs || mongoose.model('tasksDbs',taskSchema)