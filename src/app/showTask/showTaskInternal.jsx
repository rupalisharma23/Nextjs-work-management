"use client"
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Select from "react-select";


export default function ShowTaskInternal(props) {
  const [allTasks,setAllTasks] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [optionListUsers,setOptionListUsers] = useState([])

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  const router = useRouter()

  const allTasksPresent = async () =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/tasks`)
      setAllTasks(response.data)
    }catch(error){
      console.log('error in allTasksPresent')
    }
  }

  const deleteTask = async(id) =>{
    try{
      const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`)
      setAllTasks(allTasks.filter((i)=>{ return i._id!==id}))
    }catch(error){
      console.log('error in deleteTask',error);
    }
  } 

  const allUsers = async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/users`)
      let temp = [];
      response.data.forEach((i)=>{
        temp.push({value:i._id,label:i.name})
      })
      setOptionListUsers(temp)
    }catch(error){
      console.log('error in allUsers')
    }
  }

  useEffect(()=>{
   allTasksPresent()
   allUsers()
  },[])

  return (
    <div>
      <div className="px-4 mt-4 w-[40%]">
      <Select
          options={optionListUsers}
          placeholder="select users"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
          className="border-2 border-blue-600 outline-none rounded-lg"
        /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 py-4 px-4 gap-4" >
      {allTasks.filter((item)=>{return selectedOptions?.length>0 ? selectedOptions?.some(criteria => criteria.value === item.author): item}).map((task)=>{
        return(
          <div className={`p-8 flex justify-between rounded-lg shadow-lg border-2 border-solid border-blue-600  cursor-pointer mt-4 ${task.status=='completed'? 'bg-green-500':'bg-white' }`}>
          <div className="flex  w-[80%] flex-col gap-2">           
          <div className="font-extrabold text-xl" >{task.title}</div> 
          <div className="font-semibold w-[100%] truncate text-ellipsis" >{task.content}</div> 
          <div className="font-regular" >status: <span className="font-bold">{task.status}</span></div> 
          <div className="font-regular" >{moment(task.createdAt).format('DD/MM/YY h:mm a')}</div> 
          </div>
          <div className="flex gap-4 pl-4">
              <DeleteIcon onClick={()=>{deleteTask(task._id)}} style={{color:'red'} }/>
              <EditIcon onClick={()=>{router.push(`/updateTask/${task._id}`)}}/>
          </div>
      </div>
        )
      })}
    </div>
    </div>
  )
}
