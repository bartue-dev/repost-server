import { body } from "express-validator";

const notEmpty = "must not be empty";
const passwordLength = "must be atleast 8 characters or more";
const passwordContains = "must contains number, symbold and letters";

export const validateSignUp = [
  body("name").trim()
    .notEmpty().withMessage(`Name ${notEmpty}`),
  body("email").trim()
    .notEmpty().withMessage(`Name ${notEmpty}`)
    .isEmail().withMessage(`Invalid email`),
  body("password").trim()
    .notEmpty().withMessage(`Name ${notEmpty}`)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/).withMessage(`Password ${passwordLength} and ${passwordContains}`),
  body("profileImg")
    .custom((value, {req}) => {
    const imgTypes = /\/(gif|jpe?g|tiff?|png|webp|bmp|jpg)$/i;
    if (imgTypes.test(req.file.mimetype)) {
    return true;
    } else {
      throw new Error();
    }
  }).withMessage("Invalid image type")
]

export const validateUpdateUser = [
  body("name").trim()
    .notEmpty().withMessage(`Name ${notEmpty}`),
  body("email").trim()
    .notEmpty().withMessage(`Name ${notEmpty}`)
    .isEmail().withMessage(`Invalid email`),
  body("profileImg")
    .custom((value, {req}) => {
    const imgTypes = /\/(gif|jpe?g|tiff?|png|webp|bmp|jpg)$/i;
    if (imgTypes.test(req.file.mimetype)) {
    return true;
    } else {
      throw new Error();
    }
  }).withMessage("Invalid image type")
]
