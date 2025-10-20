import asyncHandler from "express-async-handler"
import { CustomErr } from "../middleware/customErr.js";
import { getAuthContext } from "../lib/auth.js";
import { tagsMethods } from "../models/tagQueries.js";
import { validationResult } from "express-validator";
import type { RequestHandler } from "express";
import { 
  validateCreateTags, 
  validateDeleteTags, 
  validateUpdateTags 
} from "../validator/tagsValidation.js";

//create tags
export const createTags: RequestHandler[] = [
  ...validateCreateTags,
  asyncHandler(async (req, res, next) => {
    const { tagName } = req.body;
    const { postId } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr("Unauthorized", 401);
      next(err);
      return;
    }

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: "validation error",
        error: errors.array()
      });
      return
    }

    const tags = await tagsMethods.createTags(tagName, postId!, user?.id);

    if (!tags) {
      const err = new CustomErr("Error on creating tags", 400);
      next(err);
      return
    }

    res.status(200).json({
      success: true,
      data: {
        tags
      }
    })

})]

//update tags
export const updateTags: RequestHandler[] = [
  ...validateUpdateTags, 
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { tagName } = req.body;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr("Unauthorized", 401);
      next(err);
      return;
    }

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: "validation error",
        errors: errors.array()
      });
      return
    }

    const tags = await tagsMethods.updateTags(tagName, id!, user?.id);

    if (!tags) {
      const err = new CustomErr("Error on updating tags", 400);
      next(err);
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        tags
      }
    })
})];

//delete tags
export const deleteTags: RequestHandler[] = [
  ...validateDeleteTags,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const session = await getAuthContext(req.headers);
    const user = session?.user;

    if (!user?.id) {
      const err = new CustomErr("Unauthorized", 401)
      next(err);
      return;
    }

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: "validation error",
        errors: errors.array()
      })
      return;
    }

    const tags = await tagsMethods.deleteTags(id!, user?.id);

    if (!tags) {
      const err = new CustomErr("Error on deleting tags", 400)
      next(err);
      return;
    }
})]