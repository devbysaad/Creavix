// ... existing imports

const app = express();

await connectCloudinary();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// 💡 NEW: Middleware to handle OPTIONS requests and prevent Clerk's redirect
app.use((req, res, next) => {
    // If it's a preflight request, respond with 200 OK immediately.
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    // For all other requests, continue to the next middleware (Clerk)
    next();
});

app.use(clerkMiddleware()); // Now this only runs for non-OPTIONS requests

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

export default app;