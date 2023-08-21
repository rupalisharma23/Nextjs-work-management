"use client"
import React,{useState,useEffect} from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';

export default function TaskPage(props) {
  const router = useParams()
    const [task,setTask] = useState({
      title:'',
      content:'',
      status:'in progress'
    })
    const [images,setImages] = useState([])
  
    const addTasks = async() =>{
      try{
  
        const response = await axios.post(`http://localhost:3000/api/tasks`,{
          title:task.title,
          content:task.content,
          status:task.status
        })
  
      }catch(error){
        console.log(error);
      }finally{
        setTask({
          title:'',
          content:'',
          status:'in progress'
        })
      }
    }

    const updateTask = async () =>{
      try{
        const {taskId} = router
        const response = await axios.put(`http://localhost:3000/api/tasks/${taskId}`,{
          title:task.title,
          content:task.content,
          status:task.status
        })
        toast.success('updated successfully')
      }catch(error){
        console.log(error);
      }
    }

    const getTask = async() =>{
      try{

        const {taskId} = router
        const respose = await axios.get(`http://localhost:3000/api/tasks/${taskId}`)
        setTask({...task,title:respose.data.title,content:respose.data.content,status:respose.data.status})
      }
      catch(error){
        console.log('error in getTask',error)
      }

    }

    const handleImageChange = (e) =>{
      const newImages = [...images, ...Array.from(e.target.files)];
    setImages(newImages);
    }

    const deletePhoto = (index) =>{
      const deletedPhotos = [...images];
      deletedPhotos.splice(index, 1);
      setImages(deletedPhotos);
    }

    console.log(images)

    useEffect(()=>{
      props.flag && getTask()
    },[])
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
     props.flag? updateTask(): addTasks(); // Call your addTasks function to perform the POST request
    };
  return (
    <div>
      <Toaster />
    <img src="/addTasks.svg" className="w-[400px] h-[400px] mx-auto" alt="" />
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-0">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
           { props.flag ? 'Update Task' : 'Add Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
                value={task.title}
                onChange={(e)=>{setTask({...task,title:e.target.value})}}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                content
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
                value={task.content}
                onChange={(e)=>{setTask({...task,content:e.target.value})}}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                status
              </label>
              <select
                id="category"
                value={task.status}
                onChange={(e)=>{setTask({...task,status:e.target.value})}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option disabled>Select category</option>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
                <option selected value="in progress">in progress</option>
                <option value="blocked">blocked</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label onChange={handleImageChange} htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><ImageIcon style={{cursor:'pointer'}} /></label>
              <input onChange={handleImageChange} multiple type="file" name="media" id="images" accept="image/*" hidden/>
              <div className="flex gap-4">
              {images.map((image,index)=>{
              return (
                  <div className="relative"><img src={URL.createObjectURL(image)} alt="" className="h-[100px] w-[100px] border-2 border-blue-600 " /><div className="absolute top-[-12px] right-[-8px]"><CloseIcon style={{height:'20px',width:'20px', cursor:'pointer'}} onClick={()=>{deletePhoto(index)}} /></div></div> 
                   )
                  })}
                  </div>
            </div>
          </div>
          <div className="sm:col-span-2 flex items-center justify-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              {props.flag? 'Update' : 'Add'}
            </button>
            <button
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800"
              onClick={()=>{setTask({title:'',content:'',status:'in progress'})}}
            >
              clear
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
  )
}