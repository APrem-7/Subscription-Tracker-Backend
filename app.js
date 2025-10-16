import express from "express";
import { PORT } from "./env.js";

import userRouter from "./ROUTES/user.routes.js";
import subscriptionRouter from "./ROUTES/subscritions.routes.js";
import authRouter from "./ROUTES/auth.routes.js";
import connectToDatabase from "./database/mongodb.js"

const app = express();

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscriptions',subscriptionRouter)



app.get('/',(req,res)=>{
  res.send('Welcome the the Subscription Tracker API')
})



app.listen(PORT, async () => {
  console.log(`Subscription Tracker API ig on PORT ${PORT} `);

  //connect to the database
 await connectToDatabase();
});

export default app;


