import { body, param } from "express-validator";

const isEmpty = "must not be empty";

export const validateCreateReactions = [
  body("type").trim()
    .notEmpty().withMessage(`Type ${isEmpty}`),
  param("postId").trim()
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id must be a valid UUID")
]

export const validateGetReactionFromPost = [
  param("postId").trim()
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id must be a valid UUID")
]

export const validateDeleteReactions = [
  param("id").trim()
    .exists().withMessage("Reactions id doesn't exist")
    .isUUID().withMessage("Reactions id must be a valid UUID")
]