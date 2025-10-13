import { Router } from "express";
import {
  likedPost,
  getAllLikedPost,
  undoLikedPost,
  deleteLikedPost
} from "../controller/likedPostController.js";
const router = Router();

router.get("/", getAllLikedPost);

router.route("/post/:postId")
  .post(likedPost)
  .delete(undoLikedPost)

router.delete("/:id", deleteLikedPost);

export default router;