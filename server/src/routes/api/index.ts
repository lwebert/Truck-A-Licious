import { Router } from 'express';
import { userRouter } from './user-routes.js';
import {foodtruckRouter } from './foodtruck-routes.js'

const router = Router();

router.use('/users', userRouter);
router.use('/foodtrucks', foodtruckRouter);

export default router;
