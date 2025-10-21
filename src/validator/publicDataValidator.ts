import { query} from "express-validator";

const isEmptyMsg = "must not be empty"

export const validateSearchPostsByTags = [
  query("tags").optional()
    .isString().withMessage("Search tags must be a string")
]