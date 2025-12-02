// routes/user.routes.js
import express from 'express';
import { getUserCreation, getPublicCreations, toggleLikeCreation } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/user-creations', auth, getUserCreation);
userRouter.get('/public-creations', getPublicCreations);
userRouter.post('/toggle-like', auth, toggleLikeCreation);

export default userRouter;