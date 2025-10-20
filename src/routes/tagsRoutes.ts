import {Router} from "express";
import {
  createTags,
  deleteTags,
  updateTags
} from "../controller/tagsController.js";
const router = Router();

router.post("/post/:postId", createTags);
router.put("/:id", updateTags);
router.delete("/:id", deleteTags)

export default router;
