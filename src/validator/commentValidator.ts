import { body, param } from "express-validator";

const isEmptyMsg = "must not be empty";

export const validateCreateComment = [
  body("comment").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("postId")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id must be a valid UUID") 
]

export const validateCreateChildComment = [
  body("comment").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("id")
    .exists().withMessage("Comment id doesn't exist")
    .isUUID().withMessage("Comment id must be a valid UUID")
]

export const validateGetAllComments = [
  param("postId")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id must be a valid UUID")
]

export const validateGetChildComments = [
  param("id")
    .exists().withMessage("Comment id doesn't exist")
    .isUUID().withMessage("Comment id is not a valid UUID")
]

export const validateUpdateComment = [
  body("comment").trim()
    .notEmpty().withMessage(`Content ${isEmptyMsg}`),
  param("id")
  .exists().withMessage("Comment id doesn't exist")
  .isUUID().withMessage("Comment id must be a valid UUID")
]

export const validateDeleteComment = [
  param("id")
  .exists().withMessage("Comment id doesn't exist")
  .isUUID().withMessage("Comment id must be a valid UUID")
]

export const validateGetComment = [
  param("id")
  .exists().withMessage("Comment id doesn't exist")
  .isUUID().withMessage("Comment id must be a valid UUID")
]