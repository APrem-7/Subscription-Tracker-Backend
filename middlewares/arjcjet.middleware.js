import aj from '../config/arcjet.js'

const arjectMiddleware =   async (req,res,next)=>{
    try{
        const decision = await aj.protect(req);
    }
    catch(error){
        console.log(`ArcJect MiddleWare error:${error}`);
    }
}