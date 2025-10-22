import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from 'cookie-parser'

import userRouter from "./ROUTES/user.routes.js";
import subscriptionRouter from "./ROUTES/subscriptions.routes.js";
import authRouter from "./ROUTES/auth.routes.js";
import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js"



const app = express();

app.use(express.json());
/* Without this:
req.body would be undefined.
With this:
req.body becomes { username: "AP7", password: "coolstudent123" } */

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

//this is the custom middle ware that we created
app.use(errorMiddleware);



app.get('/',(req,res)=>{
  res.send('Welcome the the Subscription Tracker API')
});



app.listen(PORT, async () => {
  console.log(`Subscription Tracker API ig on PORT ${PORT} `);

  //connect to the database
 await connectToDatabase();
});

export default app;


