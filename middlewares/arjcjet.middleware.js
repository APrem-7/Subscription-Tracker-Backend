import aj from '../config/arcjet.js'

const arcjetMiddleware =   async (req,res,next)=>{
    try{
        const decision = await aj.protect(req,{requested:1}); //this requested :1 means that each request will deduct 1 token 

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({error:'Rate Limit Exceeded!'})
            }
        

        if(decision.reason.isBot()){
                return res.status(403).json({error:'Bot Detected'})
            }
        
    }

    next();
    }
    catch(error){
        console.log(`ArcJect MiddleWare error:${error}`);
        next(error);
    }
}

export default arcjetMiddleware;