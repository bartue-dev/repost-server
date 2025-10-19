import { Router } from "express";
import {getPublicPost} from "../controller/publicDataController.js"
const router = Router();

router.get("/", getPublicPost);

export default router;
