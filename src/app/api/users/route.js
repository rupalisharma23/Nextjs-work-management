import {NextResponse} from 'next/server';
import connection from '../../../connection/db';
import {User} from '../../../models/usermodel';
import {genrateSecurePassword} from '../../../helper/authentication';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
connection()

export async function GET(request) {
   try{ 
      const cookieStore = cookies()
      const tokenInfo = cookieStore.get('token');
      const decoded = jwt.verify(tokenInfo.value, process.env.JWT_SECRET);   
      const allUsers = await User.find({}).select('-password');
      // const allUsers = await User.find({_id:{$nin:[decoded._id]}}).select('-password');
      return NextResponse.json(allUsers,{status:200})
   }
   catch(error){
      console.log('error in get of users',error)
     return NextResponse.json({message:'error',status:400})
   }
}

export async function POST(request) {
   try{
      const {name,email,password,address} = await request.json();
      const isUserAlreadyExist = await User.findOne({email});
      if(isUserAlreadyExist){
         return NextResponse.json('email is in use',{status:400})
      }
      const securecPassword = await genrateSecurePassword(password)
      const newUser = await User.create({name,email,password:securecPassword,address})
      return NextResponse.json(newUser,{status:200})
   }
   catch(error){
      console.log('error in post of users',error);
      return NextResponse.json({message:'error',status:400})
   }
   
}