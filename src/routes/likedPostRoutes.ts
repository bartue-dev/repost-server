import { Router } from "express";
import {
  saveLikedPost,
  getAllLikedPost,
  undoLikedPost,
  deleteLikedPost
} from "../controller/likedPostController.js";
const router = Router();

router.get("/", getAllLikedPost);

router.route("/post/:postId")
  .post(saveLikedPost)
  .delete(undoLikedPost)

router.delete("/:id", deleteLikedPost);

export default router;