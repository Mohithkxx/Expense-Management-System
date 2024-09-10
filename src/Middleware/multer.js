import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({storage}).single("profilephoto");

const Resumeupload = multer({storage}).single("resume");

export { upload, Resumeupload };