import { NextResponse } from 'next/server';
import connection from '../../../connection/db';
import { Task } from '../../../models/taskmodel';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

connection();

export async function POST(request){
    try{
        const {title,content,status} = await request.json();
        if(!title){
            return NextResponse.json({message:'title is requires'},{status:400})
        }
        if(!content){
            return NextResponse.json({message:'content is required'},{status:400})
        }
        if(!status){
            return NextResponse.json({message:'status is required'},{status:400})
        }
        const cookieStore = cookies()
        const tokenInfo = cookieStore.get('token');
        const decoded = jwt.verify(tokenInfo.value, process.env.JWT_SECRET);
        const newTask = await Task.create({author:decoded._id,title,content,status})
        return NextResponse.json({newTask},{status:201})
    }catch(error){
        console.log('error in post of tasks',error);
        return NextResponse.json({error},{status:400})
    }
}

export async function GET(request){
    try{
        const cookieStore = cookies()
        const tokenInfo = cookieStore.get('token');
        const decoded = jwt.verify(tokenInfo.value, process.env.JWT_SECRET);
        // for task of specific users
        // const allTasks = await Task.find({author:decoded._id}).sort({updatedAt:-1})

        // for task of all users
        const allTasks = await Task.find({}).sort({updatedAt:-1})

        return NextResponse.json(allTasks)
    }
    catch(error){
        console.log('error in get of tasks',error);
        return NextResponse.json({error},{status:400})
    }

}