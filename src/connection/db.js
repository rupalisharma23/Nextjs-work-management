import mongoose from "mongoose";

const connectionToDb = async () =>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb`,conn.connection.host)

    }catch(error){
        console.log('error in connection',error)
    }
}

export default connectionToDb