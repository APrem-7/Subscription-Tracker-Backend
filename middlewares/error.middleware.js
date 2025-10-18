//create a subscription --> middleware(check for renewal date) --> middleware (check for errors)...how many ever middlewares we ewant we can have --> next --> controller(the thing which handles the actual logic/code of the subscriptions model)


const errorMiddleware = (err,req,res,next) => {
  try{
    let error = {...err};

    error.message=err.message;

    console.error(err);

    //mongoose bad objectId
     if(err.name === 'CastError'){
        const message = 'Resource Not Found';
        error = new Error(message);
        error.StatusCode=404;
     }

     //mongoose duplicate key
     if(err.code === 11000){
        const message="Duplicate Field value entered";
        error = new Error(message);
        error.statusCode=400;
     }

     //mogoose validation error
     if(err.name === 'ValidationError'){
        const message=Object.values(err.errors).map(val=>val.message);
        error = new Error(message);
        error.statusCode = 400;
     } 

     res.status(error.statusCode || 500).json({success:false,error:error.message || 'Server Error!'})

 }catch(error){

        next(error);
     }
}

export default errorMiddleware;