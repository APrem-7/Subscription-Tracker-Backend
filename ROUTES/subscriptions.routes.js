
import { Router } from 'express';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));


subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id/cancel', authorize, (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRouter.get('/upcoming-renewals', authorize, (req, res) => res.send({ title: 'GET upcoming renewals' }));

subscriptionRouter.put('/:id', authorize, (req, res) => res.send({ title: 'UPDATE subscription' }));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);


subscriptionRouter.delete('/:id', authorize, (req, res) => res.send({ title: 'DELETE subscription' }));


export default subscriptionRouter;
