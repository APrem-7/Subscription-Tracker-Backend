import { Router } from 'express';
import { getUser,getUsers} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/', (req, res) => res.send({ body: { title: 'CREATE new user' } }));

userRouter.put('/:id', (req, res) => res.send({ body: { title: 'UPDATE user' } }));

userRouter.delete('/:id', (req, res) => res.send({ body: { title: 'DELETE user' } }));

export default userRouter;