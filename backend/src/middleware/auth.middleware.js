// middleware/auth.middleware.js
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId } = req.auth; // No need for 'has' anymore

        // Retrieve user data from Clerk
        const user = await clerkClient.users.getUser(userId);

        // Extract free usage count, defaulting to 0
        const freeUsage = user.privateMetadata?.free_usage || 0;
        
        // Attach usage to the request object
        req.free_usage = freeUsage;
        
        // The 'plan' property is no longer strictly necessary for logic, 
        // but keeping it as 'free' ensures any remaining code that checks it 
        // won't error out, although its value is now irrelevant.
        req.plan = "free"; 

        next();
    } catch (error) {
        // Log the error for debugging
        console.error("Auth Middleware Error:", error.message);
        
        // Respond with an authorization failure
        res.status(401).json({ success: false, message: "Authentication failed." });
    }
};