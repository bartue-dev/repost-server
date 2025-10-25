import { Router } from "express";
import {
  getPublicPost,
  getSpecificPublicPost,
} from "../controller/publicDataController.js"
const router = Router();


//get public posts
router.get("/", getPublicPost);
router.get("/:postId", getSpecificPublicPost)

export default router;
