import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ body: { title: 'GET all subscriptions' } }));      

export default subscriptionRouter;

