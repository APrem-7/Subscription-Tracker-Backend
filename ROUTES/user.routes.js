import { Router } from 'express';
import { getUser,getUsers} from '../controllers/user.controller.js'

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',getUser);

userRouter.post('/', (req, res) => res.send({ body: { title: 'CREATE new user' } }));

userRouter.put('/:id', (req, res) => res.send({ body: { title: 'UPDATE user' } }));

userRouter.delete('/:id', (req, res) => res.send({ body: { title: 'DELETE user' } }));

export default userRouter;