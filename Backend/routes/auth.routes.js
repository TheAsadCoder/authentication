import express from 'express';
import { getUserData } from '../controllers/userauth.controller.js';
import { userAuth } from '../middlewares/userAuth.js';
const authRouter = express.Router();

authRouter.get('/data', userAuth, getUserData);

export default authRouter;