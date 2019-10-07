import { Router } from 'express';
import { createUser, auth } from '../controller/users';

const userRouter = new Router()

userRouter.post('/createUser', createUser)
userRouter.post('/auth', auth)

export default userRouter;