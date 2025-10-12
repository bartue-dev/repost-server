import { Router } from "express";
import {
  saveLikedPost,
  getAllLikedPost,
  undoLikedPost
} from "../controller/likedPostController.js";
const router = Router();

router.get("/", getAllLikedPost);

router.post("/post/:postId", saveLikedPost);

router.delete("/:id", undoLikedPost);

export default router;