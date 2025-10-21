import { Router } from "express";
import {
  getPublicPost,
} from "../controller/publicDataController.js"
const router = Router();


//get public posts
router.get("/", getPublicPost);

export default router;
