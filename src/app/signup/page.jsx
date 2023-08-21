
"use client"

import React,{useState} from 'react';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
  const [userDetails,setUserDetails] = useState({
    name:'',
    email:'',
    password:'',
    address:''
  })

const singUpData = async() =>{
  try{
    const response = await axios.post(`http://localhost:3000/api/users`,{
      name:userDetails.name,
      email:userDetails.email,
      password:userDetails.password,
      address:userDetails.address
    })
    toast.success('user created')
  }catch(error){
    toast.error(error.response.data)
    console.log('error in signUp data',error)
  }finally{
    setUserDetails({
      name:'',
      email:'',
      password:'',
      address:''
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
            <label htmlFor="name" className="capitalize">name</label>
            <input type="text" value={userDetails.name} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,name:e.target.value})}} />
            <label htmlFor="email" className="capitalize">email</label>
            <input type="email" value={userDetails.email} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}} />
            <label htmlFor="password" className="capitalize">password</label>
            <input type="password" value={userDetails.password} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}} />
            <label htmlFor="address" className="capitalize">address</label>
            <input type="text" value={userDetails.address} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,address:e.target.value})}} />
           <button className="capitalize w-[90%] p-2 bg-blue-600 text-white font-semibold rounded-lg mt-[1rem]" onClick={singUpData}>singup</button>
           </div>
        </div>
        </div>
    </div>
  )
}
