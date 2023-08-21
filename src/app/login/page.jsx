"use client"

import React,{useState} from 'react';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter()
    const [userDetails,setUserDetails] = useState({
        email:'',
        password:''
      })
    
    const loginData = async() =>{
      try{
        const response = await axios.post(`http://localhost:3000/api/login`,{
          email:userDetails.email,
          password:userDetails.password
        })
        toast.success('logged in successfully')
        router.push('/addTask')
      }catch(error){
        toast.error(error.response.data.message)
        console.log('error in login data',error)
      }finally{
        setUserDetails({
          email:'',
          password:''
        })
      }
    }
  return (
    <div>
       <Toaster />
        <div className='flex justify-center h-[90vh]'> 
        <div className="flex items-center justify-center w-[100%] h-[100%] gap-8">
        <img src="/singup.svg" alt="sing up" className="h-[40%]"/>
           <div className="flex flex-col gap-2 w-[45%] ">
            <label htmlFor="email" className="capitalize">email</label>
            <input type="email" value={userDetails.email} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}} />
            <label htmlFor="password" className="capitalize">password</label>
            <input type="password" value={userDetails.password} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}} />
           <button className="capitalize w-[90%] p-2 bg-blue-600 text-white font-semibold rounded-lg mt-[1rem]" onClick={loginData}>login</button>
           </div>
        </div>
        </div>
    </div>
  )
}
