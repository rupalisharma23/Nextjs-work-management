import { NextResponse } from 'next/server';
import connection from '../../../../connection/db';
import { Task } from '../../../../models/taskmodel';

connection();

export async function GET(request,{params}){
    try{

        const {taskId} = params;
        const singleTask = await Task.findOne({_id:taskId});
        return NextResponse.json(singleTask)

    }catch(error){
        console.log('error in get function of taskId')
    }
}

export async function PUT(request,{params}){
    try{
        const {title,content,status} = await request.json();
        const {taskId} = params;
        const singleUpdatedTask = await Task.findOneAndUpdate({_id:taskId},{$set:{title,content,status}},{new:true})
        return NextResponse.json({newTask:singleUpdatedTask},{status:201})
    }catch(error){
        console.log('error in put of taskId',error);
        return NextResponse.json(error)
    }
}

export async function DELETE(request,{params}){
    try{
        const {taskId} = params;
        const deletedTask = await Task.findOneAndDelete({_id:taskId},{new:true})
        return NextResponse.json({message:'task has been deleted successfully'},{status:200})

    }
    catch(error){
        console.log('error in delete of taskId',error);
        return NextResponse.json({error})
    }
}