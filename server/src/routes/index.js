import { Router } from 'express';
import  albumRouter  from './albums';
import  userRouter from './users'

const router = new Router()

router.use('/albums', albumRouter);
router.use('/users', userRouter);

export default router;