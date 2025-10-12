import { param } from "express-validator";

export const validateSaveLikedPost = [
  param("postId")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id is not a valid UUID")
]

export const validateUndoLikedPost = [
  param("id")
  .exists().withMessage("Liked id doesn't exist")
  .isUUID().withMessage("Liked id is not a valid UUID"),
]