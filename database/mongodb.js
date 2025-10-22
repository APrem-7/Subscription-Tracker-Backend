import mongoose from "mongoose";
import {NODE_ENV,DB_URI} from '../config/env.js'
 
if(!DB_URI){
    throw new Error('pkease define the MONGO_DB env cvariablle iosnide teh .env.development/local');
}


const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`conected to the in ${NODE_ENV} mode to the  database`)
    } catch(error){
        console.error('Errorr connecting to the database:',error);
        process.exit(1)
    }

}

export default connectToDatabase