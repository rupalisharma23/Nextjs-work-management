import {NextResponse} from 'next/server';
import connection from '../../../../connection/db';
import {User} from '../../../../models/usermodel';

connection()

export async function GET(request,{params}){
    try{

        const {userId} = params;
        const findUserById = await User.findOne({_id:userId}).select('-password');
        return  NextResponse.json(findUserById,{status:200})

    }
    catch(error){
        console.log('error in get of userId',error)
        return NextResponse.json({message:'error',status:400})
    }
}

export async function PUT(request,{params}){
   try{
    const {userId} = params;
    const{name,address} = await request.json();
    const updatedUser = await User.findOneAndUpdate({_id:userId},{name,address},{new:true});
    return NextResponse.json(updatedUser,{status:200})
   }
   catch(error){
    console.log('error in put of userId',error)
    return NextResponse.json({message:'error',status:400})
   }
}

export async function DELETE(request,{params}){
    try{
        const {userId} = params;
        const deletedUser = await User.findOneAndDelete({_id:userId},{new:true});
        return NextResponse.json(deletedUser,{status:200})
    }
    catch(error){
        console.log('error in delete of userId',error)
        return NextResponse.json({message:'error',status:400})
    }
}