import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import homeRouter from './routes/home.route.js';
import aiRouter from './routes/ai.routes.js';
import connectCloudinary from './storage/cloudinary.storage.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())
connectCloudinary();
app.get('/', homeRouter)
app.use(requireAuth())

app.use('/api/ai', aiRouter);


export default app;  
