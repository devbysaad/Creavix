import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { genrateArticle, genrateBlotTitle, genrateImage } from "../controllers/ai.controller.js";

const router = express.Router();

router.post('/generate-article', auth, genrateArticle);

router.post('/generate-blog-title', auth, genrateBlotTitle);

router.post('/generate-image', auth, genrateImage);

export default router;