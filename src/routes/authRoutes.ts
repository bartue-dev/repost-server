import { Router } from "express";
import multer from "multer"
import { signUp, updateUser } from "../controller/authController.js";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.route("/")
  .post(upload.single("profileImg"), signUp)
  .put(upload.single("profileImg"), updateUser)
  

export default router;