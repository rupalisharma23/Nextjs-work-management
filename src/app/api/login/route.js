import { NextResponse } from 'next/server';
import connection from '../../../connection/db';
import { User } from '../../../models/usermodel';
import { comparePassword } from '../../../helper/authentication';
import jsonwebtoken from 'jsonwebtoken';
import { cookies } from 'next/headers'

connection();

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return NextResponse.json({ message: 'user does not exist' }, { status: 400 });
    }
    const isPasswordCorrect = await comparePassword(password, isUserExist.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'incorrect password' }, { status: 400 });
    }

    const jwtSecret =  isUserExist._id+isUserExist.password;
    const token = await jsonwebtoken.sign({ _id: isUserExist._id, email:isUserExist.email },  process.env.JWT_SECRET);
    const response = cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
    })
     
    // return NextResponse.json({ user: isUserExist, token }, { status: 201 });
    return response
  } catch (error) {
    console.log('error in post of login', error);
    return NextResponse.json({ message: 'error' }, { status: 400 });
  }
}
