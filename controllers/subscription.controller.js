import Subscription from "../models/subsriptions.model.js"

export const createSubscription = async (req,res,next)=>{
    
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id,
        });

        res.status(201).json({succes:true,data:subscription})
    
    }catch(error){

        next(error)
    }


}

export const getUserSubscriptions = async (req,res,next)=>{
    
    try{
      //check is the user is the same as the one in the token  
      if(String(req.user._id) !== String(req.params.id)){
        const Error = new Error('This is not Your Account please try again!')
        error.status = 401
        throw new error
      }

      const subscription = await Subscription.find({user:req.params.id})

      res.status(200).json({success:true,data:subscription})
    }catch(error){

        next(error)
    }


}