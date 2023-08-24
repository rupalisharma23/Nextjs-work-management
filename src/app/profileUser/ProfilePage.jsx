"use client"

import axios from 'axios';
import React,{useState,useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '../ContextApiUser';

export default function ProfilePage(props) {
  const [userDetails,setUserDetails] = useState({name:'',email:'',address:''});
  const [user,setUser] = useUser()
  const router = useRouter()

  useEffect(()=>{
   userInfo()
  },[])

  const userInfo = async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/profile`)
      setUserDetails({...userDetails,name:response.data.name,email:response.data.email,address:response.data.address})

    }catch(error){
      console.log('error in userInfo')
    }

  }

  const updateUserInfo = async() =>{
    try{
      const response = await axios.put(`http://localhost:3000/api/profile`,{name:userDetails.name,address:userDetails.address})
      toast.success('user info updated')
    }catch(error){
      console.log('error in updateUserInfo',error)
    }
  }

  const logout = async() =>{
    try{
      const response = await axios.post(`http://localhost:3000/api/logout`) 
      setUser(false)
      localStorage.clear()
      router.push('/login')
    }catch(error){
      console.log('error in logout',error)
    }
  }

  return (
    <div>
    <Toaster />
     <div className='flex justify-center h-[90vh]'> 
     <div className="flex items-center justify-center w-[100%] h-[100%] gap-8">
     <img src="/singup.svg" alt="sing up" className="h-[40%]"/>
        <div className="flex flex-col gap-2 w-[45%] ">
        <div className="font-bold text-[23px]">email:{userDetails.email}</div>
         <label htmlFor="name" className="capitalize">name</label>
         <input type="text" value={userDetails.name} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,name:e.target.value})}} />
         <label htmlFor="address" className="capitalize">address</label>
         <input type="text" value={userDetails.address} required className="border-solid border-2 border-blue-600 rounded-lg w-[90%] h-[2rem] p-1" onChange={(e)=>{setUserDetails({...userDetails,address:e.target.value})}} />
        <button className="capitalize w-[90%] p-2 bg-blue-600 text-white font-semibold rounded-lg mt-[1rem]" onClick={()=>{updateUserInfo()}} >update</button>
        <button className="capitalize w-[90%] p-2 bg-blue-600 text-white font-semibold rounded-lg mt-[1rem]" onClick={()=>{logout()}} >Logout</button>
        </div>
     </div>
     </div>
 </div>
  )
}
