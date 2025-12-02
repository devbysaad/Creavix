import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import aiRouter from './routes/ai.routes.js';
import connectCloudinary from './storage/cloudinary.storage.js';
import userRouter from './routes/user.routes.js';   

const app = express();

await connectCloudinary();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware()) // ✅ Only use clerkMiddleware globally

// ❌ REMOVE THIS LINE - Don't use requireAuth globally!
// app.use(requireAuth()) 

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

export default app;