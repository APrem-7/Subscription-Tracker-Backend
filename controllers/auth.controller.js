import mongoose from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {JWT_SECRET,JWT_EXPIRES_IN} from '../env.js'

export const signUp = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name,email,password}=req.body;
         if (!name || !email || !password) {
                const err = new Error('name, email and password are required');
                err.statusCode = 400;
                throw err;
            }
        const existingUser= await User.findOne({email})

        if(existingUser){
            const error=new Error('User aldready exists');
            error.statusCOde = 409;
            throw error;
        }
        //hashing the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword= await bcrypt.hash(password,salt);
     
     const newUsers = await User.create([{name,email,password:hashedPassword}],{session}); // this session is there os that if something goeas wring and you had to abort the user will not be created

     const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN}) 
 
     await session.commitTransaction(); //ifeverything up till here goes succesflully tyhen copmmit
     
     session.endSession();

     res.status(201).json({
        success:true, 
        message:'User Created!',
        data:{token,user:newUsers[0]} 
    });

     await session.commitTransaction();       
    } catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }


}


export const signIn = async (req,res,next) => {}

export const signOut = async (req,res,next) => {}

