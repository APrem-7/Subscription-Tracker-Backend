import { Router } from 'express';
import  {createSubscription} from '../controllers/subscription.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router();

subscriptionRouter.get('/',authorize,createSubscription);      

export default subscriptionRouter;

