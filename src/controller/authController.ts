import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator";
import { supabase } from "../supabase.js";
import { decode } from "base64-arraybuffer";
import { auth, getAuthContext } from "../lib/auth.js";
import { authMethods } from "../models/authQueries.js";
import { 
  validateSignUp,
  validateUpdateUser
} from "../validator/authValidator.js";
import type { RequestHandler } from "express";
import { CustomErr } from "../middleware/customErr.js";

//sign up
export const signUp: RequestHandler[] = [
  ...validateSignUp,
  asyncHandler(async (req, res, next) => {
    const {name, email, password, } = req.body;
    const profileImg = req.file;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "Failed",
        message: "validation error",
        error: errors.array()
      });
      return;
    } 

    //create filePath for the image in the storage
    const filePath = `${name}/${profileImg?.originalname}`;
    const fileBase64 = decode(profileImg!.buffer.toString("base64"));

    //upload image into supabase storage
    const {data, error} = await supabase
      .storage
      .from("profile-image")
      .upload(filePath, fileBase64, {
        contentType: profileImg!.mimetype
      });

    //supabase error
    if (error) {
      res.status(400).json({
        status: "Failed",
        message: "Supabase error",
        error: error
      })
      return
    }

    //retrieve the image in the supabase storage
    const {data: image} = supabase
      .storage
      .from("profile-image")
      .getPublicUrl(filePath)

    const imageUrl = image.publicUrl;

    const user = await auth.api.signUpEmail({
      body: {
        name: name,
        email: email,
        password: password,
        image: imageUrl
      }
    });

    res.status(200).json({
      success: true,
      user
    })
})]

//update user data
export const updateUser: RequestHandler[] = [
  ...validateUpdateUser,
  asyncHandler(async (req, res, next) => {
    const {name, email} = req.body;
    const profileImg = req.file;
    const session = await getAuthContext(req.headers);
    const currentUser = session?.user;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "Failed",
        message: "validation error",
        error: errors.array()
      });
      return;
    }
      
    //create filePath for the image in the storage
    const imgUrl = currentUser?.image?.split("/public/profile-image/")[1];

    const filePathToRemove = imgUrl?.replace(/%20/g, " ");

    console.log("CURRENT PROFILE IMG:",imgUrl);
    console.log("FILE PATH:",filePathToRemove);

    if (filePathToRemove) {
      //delete img in supabase
      const {data: removeData, error: removeErr} = await supabase
        .storage
        .from("profile-image")
        .remove([filePathToRemove])
      
      //supabase error
      if (removeErr) {
        res.status(400).json({
          status: "Failed",
          message: "Supabase error",
          error: removeErr
        })
        return
      }
    }

    //filePath to add
    const filePath = `${name}/${profileImg?.originalname}`
    const fileBase64 = decode(profileImg!?.buffer.toString("base64"))

    //add new img in supabase and database
    const {data, error: addErr} = await supabase
      .storage
      .from("profile-image")
      .upload(filePath, fileBase64, {
        contentType: profileImg!.mimetype
      });

    //supabase error
    if (addErr){
      res.status(400).json({
        status: "Failed",
        message: "Supabase error",
        error: addErr
      })
      return
    }

    //retrieve the image in the supabase storage
    const {data: image} = supabase
      .storage
      .from("profile-image")
      .getPublicUrl(filePath)

    const imageUrl = image.publicUrl;

    //update user data in database
    const user = await authMethods.updateUserData(
      currentUser?.id!,
      name,
      email,
      imageUrl
    );

    res.status(200).json({
      success: true,
      user
    })
})]