import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ body: { title: 'GET all users' } }));

userRouter.get('/:id', (req, res) => res.send({ body: { title: 'GET user details' } }));

userRouter.post('/', (req, res) => res.send({ body: { title: 'CREATE new user' } }));

userRouter.put('/:id', (req, res) => res.send({ body: { title: 'UPDATE user' } }));

userRouter.delete('/:id', (req, res) => res.send({ body: { title: 'DELETE user' } }));

export default userRouter;