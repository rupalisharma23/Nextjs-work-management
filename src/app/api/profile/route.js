import {NextResponse} from 'next/server';
import connection from '../../../connection/db';
import {User} from '../../../models/usermodel';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

connection();

export async function GET(){
    try{
        const cookie = cookies();
        const tokenInfo = cookie.get('token');
        const decoded = jwt.verify(tokenInfo.value, process.env.JWT_SECRET);
        const userInfo = await User.findOne({_id:decoded._id}).select("-password");
        return NextResponse.json(userInfo,{status:200})

    }
    catch(error){
        console.log('error in get of pofile',error);
        return NextResponse.json(error,{status:400})
    }
} 

export async function PUT(request){
    try{
        const{name,address} = await request.json();
        const cockie = cookies();
        const tokenInfo = cockie.get('token');
        const decoded = jwt.verify(tokenInfo.value,process.env.JWT_SECRET);
        const updatedInfo = await User.findOneAndUpdate({_id:decoded._id},{$set:{name,address}},{new:true})
        return NextResponse.json(updatedInfo,{status:200})

    }
    catch(error){
        console.log('error in put of profile',error);
        return NextResponse.json(error,{status:400})
    }
}