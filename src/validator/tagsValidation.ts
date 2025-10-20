import { body, param } from "express-validator";

const isEmpty = "must not be empty";

export const validateCreateTags = [
  body("tagName").trim()
    .notEmpty().withMessage(`Tag name ${isEmpty}`),
  param("postId")
    .exists().withMessage("Post id doesn't exist")
    .isUUID().withMessage("Post id must be a valid UUID")
]

export const validateUpdateTags = [
  body("tagName").trim()
    .notEmpty().withMessage(`Tag name ${isEmpty}`),
  param("id")
    .exists().withMessage("Tag id doesn't exist")
    .isUUID().withMessage("Tag id must be a valid UUID")
]

export const validateDeleteTags = [
  param("id")
    .exists().withMessage("Tag id doesn't exist")
    .isUUID().withMessage("Tag id must be a valid UUID")
]