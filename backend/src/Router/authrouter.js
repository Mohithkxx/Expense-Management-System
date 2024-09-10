import express from 'express';
const router = express.Router();
import userprofile from '../Controllers/userControl.js';
import { upload, Resumeupload } from '../Middleware/multer.js';
import Authorization from '../Middleware/isAuthorized.js';

// Create User Profile Controller router;
router.post("/api/register",upload, userprofile.register);
router.post("/api/login", userprofile.login);
router.post("/api/update",Authorization, Resumeupload, userprofile.updateprofile);


export default router;