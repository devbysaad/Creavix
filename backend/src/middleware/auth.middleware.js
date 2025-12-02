// middleware/auth.middleware.js
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId, has } = req.auth;
        const hasPremiumPlan = await has({ plan: "premium" });

        const user = await clerkClient.users.getUser(userId);

        const freeUsage = user.privateMetadata?.free_usage || 0;
        req.free_usage = freeUsage;
        req.plan = hasPremiumPlan ? "premium" : "free";

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};