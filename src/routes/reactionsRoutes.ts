import { Router } from "express";
import {
  createReactions,
  getReactionsFromPost
} from "../controller/reactionsController.js"
const router = Router();

router.route("/post/:postId")
  .post(createReactions)
  .get(getReactionsFromPost)

export default router;