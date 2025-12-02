// controllers/ai.controller.js
import OpenAI from "openai";
import sql from '../Database/db.js';
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const genrateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (free_usage >= 1000) {
            return res.status(403).json({
                success: false,
                message: 'Limit reached. Upgrade to continue.'
            });
        }

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: length || 1000,
        });

        const content = response?.choices?.[0]?.message?.content || '';

        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        await clerkClient.users.updateUser(userId, {
            privateMetadata: { free_usage: free_usage + 1 }
        });

        res.json({ success: true, content });

    } catch (error) {
        console.error('Article Generation Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const genrateBlotTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (free_usage >= 1000) {
            return res.status(403).json({
                success: false,
                message: 'Limit reached. Upgrade to continue.'
            });
        }

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 100,
        });

        const content = response?.choices?.[0]?.message?.content || '';

        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
        `;

        await clerkClient.users.updateUser(userId, {
            privateMetadata: { free_usage: free_usage + 1 }
        });

        res.json({ success: true, content });

    } catch (error) {
        console.error('Blog Title Generation Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const genrateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&model=flux&nologo=true&enhance=true`;

        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 120000
        });

        if (!response.data) {
            throw new Error("Failed to download generated image");
        }

        const base64Image = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;

        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: 'creavix/images',
            public_id: `${userId}-${Date.now()}`,
        });

        await sql`
            INSERT INTO creation (user_id, prompt, content, type, publish)
            VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false})
        `;

        res.json({ success: true, content: uploadResult.secure_url });

    } catch (error) {
        console.error('Image Generation Error:', error.message);
        
        let errorMessage = 'Failed to generate image';
        let statusCode = 500;

        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Image generation timed out. Please try a simpler prompt.';
                statusCode = 504;
            } else if (error.response) {
                statusCode = error.response.status;
                errorMessage = `Image generation failed: HTTP ${statusCode}`;
            }
        }

        res.status(statusCode).json({ success: false, message: errorMessage });
    }
};

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: 'creavix/temp',
            public_id: `temp-${userId}-${Date.now()}`
        });

        const transformedUrl = cloudinary.url(uploadResult.public_id, {
            effect: 'background_removal',
            format: 'png'
        });

        const response = await axios.get(transformedUrl, {
            responseType: 'arraybuffer',
            timeout: 60000
        });

        const processedBase64 = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
        
        const finalResult = await cloudinary.uploader.upload(processedBase64, {
            format: 'png',
            folder: 'creavix/bg-removed',
            public_id: `${userId}-${Date.now()}`
        });

        await cloudinary.uploader.destroy(uploadResult.public_id);

        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, 'Background Removal', ${finalResult.secure_url}, 'bg-removal')
        `;

        res.json({ success: true, content: finalResult.secure_url });

    } catch (error) {
        console.error('Background Removal Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeObjectFromImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const plan = req.plan;
        const { object } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: 'creavix/object-removals',
            public_id: `${userId}-${Date.now()}`
        });

        const processedUrl = cloudinary.url(uploadResult.public_id, {
            transformation: [{
                effect: `gen_remove:prompt_${object}`,
            }]
        });

        const response = await axios.get(processedUrl, {
            responseType: 'arraybuffer',
            timeout: 60000
        });

        const processedBase64 = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;

        const finalResult = await cloudinary.uploader.upload(processedBase64, {
            folder: 'creavix/object-removals',
            public_id: `${userId}-final-${Date.now()}`
        });

        await cloudinary.uploader.destroy(uploadResult.public_id);

        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${`Remove ${object}`}, ${finalResult.secure_url}, 'object-removal')
        `;

        res.json({ success: true, content: finalResult.secure_url });

    } catch (error) {
        console.error('Object Removal Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const reviewResume = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { jobDescription } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (free_usage >= 1000) {
            return res.status(403).json({
                success: false,
                message: 'Limit reached. Upgrade to continue.'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required'
            });
        }

        const resumeText = req.file.buffer.toString('utf-8');

        if (!resumeText || resumeText.trim().length < 50) {
            return res.status(400).json({
                success: false,
                message: 'Resume content is too short.'
            });
        }

        const prompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed, actionable feedback.

${jobDescription ? `Target Job Description:\n${jobDescription}\n\n` : ''}Resume Content:\n${resumeText}

Please provide a comprehensive review covering:
1. Overall Impression (strengths and weaknesses)
2. Format and Structure
3. Content Quality (achievements, quantifiable results)
4. Keywords and ATS Optimization
${jobDescription ? '5. Alignment with Target Job' : ''}
6. Specific Improvements (with before/after examples)
7. Final Score (out of 10)

Be constructive, specific, and actionable in your feedback.`;

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = response?.choices?.[0]?.message?.content || '';

        await sql`
            INSERT INTO creation (user_id, prompt, content, type)
            VALUES (${userId}, ${'Resume Review: ' + (jobDescription ? 'with job description' : 'general')}, ${content}, 'resume-review')
        `;

        await clerkClient.users.updateUser(userId, {
            privateMetadata: { free_usage: free_usage + 1 }
        });

        res.json({
            success: true,
            content,
            extractedText: resumeText.substring(0, 200) + '...'
        });

    } catch (error) {
        console.error('Resume Review Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};