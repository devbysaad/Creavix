import OpenAI from "openai";
import sql from '../Database/db.js';
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import FormData from 'form-data'; // <-- Add this import

// Initialize OpenAI client with Gemini API key and base URL
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

/**
 * Controller to generate an article using OpenAI's Gemini model.
 * Saves the generated content to the database, and manages free usage count.
 */
export const genrateArticle = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Free users limitations check
        if (plan !== 'premium' && free_usage >= 1000) {
            return res.json({
                success: false,
                message: 'Limit reached. Upgrade to continue.'
            });
        }

        // Request article generation from OpenAI's Gemini
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0,
            max_tokens: length,
        });

        // Extract generated article content
        const content = response?.choices?.[0]?.message?.content || '';

        // Store creation in the database
        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        // Update free usage count for non-premium users
        if (plan !== "premium") {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({
            success: true,
            content
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Controller to generate a blog title using OpenAI's Gemini model.
 * Saves the result to the database and updates usage quotas.
 */
export const genrateBlotTitle = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Free users limitations check
        if (plan !== 'premium' && free_usage >= 1000) {
            return res.json({
                success: false,
                message: 'Limit reached. Upgrade to continue.'
            });
        }

        // Request blog title generation
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0,
            max_tokens: 100,
        });

        // Extract generated blog title
        const content = response?.choices?.[0]?.message?.content || '';

        // Store creation in the database
        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
        `;

        // Update free usage count for non-premium users
        if (plan !== "premium") {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        res.json({
            success: true,
            content
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

/**
 * Controller to generate an AI image using ClipDrop API and uploads to Cloudinary.
 * Only available for premium users.
 */
export const genrateImage = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { prompt, publish } = req.body;
        const plan = req.plan;

        // Only premium users can generate images
        if (plan !== 'premium') {
            return res.json({
                success: false,
                message: 'This Feature is only available for premuim Subscriptions'
            });
        }

        // Prepare form data for ClipDrop image generation API
        const form = new FormData();
        form.append('prompt', prompt);

        // Call ClipDrop API to generate image
        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            form,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API_KEY,
                    ...form.getHeaders(), // Ensure proper form headers
                },
                responseType: 'arraybuffer'
            }
        );

        // Convert image buffer to Base64 and upload to Cloudinary
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
       
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: 'creavix/images',
            public_id: `${userId}-${Date.now()}`,
        });

        // Save image info to database (using uploadResult.secure_url as content)
        await sql`
            INSERT INTO creation (user_id, prompt, content, type, publish)
            VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false})
        `;

        res.json({
            success: true,
            content: uploadResult.secure_url
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};