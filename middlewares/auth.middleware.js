import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import {JWT_SECRET} from '../config/env.js'

/**
 * Authorization middleware to protect routes
 * Verifies JWT token and attaches authenticated user to req.user
 */
const authorize = async (req,res,next)=>{
    try{
        let token;

        // Extract token from Authorization header (format: "Bearer <token>")
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; // Split by space to get the token
        }

        // Reject request if no token is provided
        if(!token){
            return res.status(401).json({message:'Unauthorized!'});
        }

        // Verify token and decode the payload (contains userId)
        const decoded = jwt.verify(token,JWT_SECRET);

        // Find user in database using the userId from token
        const user = await User.findById(decoded.userId);

        // Reject if user no longer exists (e.g., deleted account)
        if(!user){
             return res.status(401).json({message:'Unauthorized!'});
        }

        // Attach user object to request for use in route handlers
        req.user = user;

        // Pass control to next middleware/route handler
        next();

    } catch(error){
        // Handle token verification errors (expired, invalid, malformed)
        res.status(401).json({message:'Unauthorized!',error:error.message})
    }
}

export default authorize;