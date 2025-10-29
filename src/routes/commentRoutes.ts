import { Router } from "express";
import {
  createComment,
  createChildComment,
  getComments,
  getChildComments,
  updateComment,
  deleteComment,
  getComment
} from "../controller/commentController.js"
const router = Router();

router.route("/post/:postId")
  .post(createComment)
  .get(getComments)

router.route("/:id")
  .get(getComment)
  .get(getChildComments)
  .put(updateComment)
  .delete(deleteComment)

router.route("/:id/post/:postId/")
  .post(createChildComment)

export default router;

