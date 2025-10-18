import mongoose from 'mongoose'
 
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


export const signIn = async (req,res,next) => {
    try{
        const {email,password}=req.body;
        const signInUser= await User.findOne({email})
   
       
       if(!signInUser){
        const error = new Error('User Not Found');
        error.statusCode=404;
        throw error;
       }

       const isPasswordValid= await bcrypt.compare(password,signInUser.password)

       if(!isPasswordValid){
        const error = new Error('Invalid Password!');
        error.statusCode=401;
        throw error;
          
       }

       const token = jwt.sign({userId:signInUser._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN}) 
       
       res.status(200).json({
        success:true,
        message:"User signed in successfully",
        data:{
            token,
            signInUser,
        }
       })
    }catch(error){
        next(error)
       }

}

export const signOut = async (req,res,next) => {}

