// routes/ai.routes.js
import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { 
    genrateArticle, 
    genrateBlotTitle, 
    genrateImage, 
    removeImageBackground, 
    removeObjectFromImage, 
    reviewResume 
} from "../controllers/ai.controller.js";
import { uploadImage, uploadText } from "../storage/multer.js";

const router = express.Router();

router.post('/generate-article', auth, genrateArticle);
router.post('/generate-blog-title', auth, genrateBlotTitle);
router.post('/generate-image', auth, genrateImage);
router.post('/remove-background', auth, uploadImage.single('image'), removeImageBackground);
router.post('/remove-object', auth, uploadImage.single('image'), removeObjectFromImage);
router.post('/review-resume', auth, uploadText.single('resume'), reviewResume);

export default router;