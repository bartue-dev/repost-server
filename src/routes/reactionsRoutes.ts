import { Router } from "express";
import {
  createReactions,
  deleteReactions,
  getReactionsFromPost
} from "../controller/reactionsController.js"
const router = Router();

router.route("/post/:postId")
  .post(createReactions)
  .get(getReactionsFromPost)

router.delete("/:id", deleteReactions)

export default router;