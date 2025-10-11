import type { NextFunction, Request, Response } from "express";
import {type PrismaErr } from "./prismaErrHandler.js";
import handlePrismaError from "./prismaErrHandler.js";
import dotenv from "dotenv"

dotenv.config();

type ApiError = PrismaErr & {
  statusCode?: number,
  message?: string,
  isOperation?: boolean,
  stack?: string,
  status?: number | string,
  name?: string

}

//development err
const devErr = (res: Response, err: ApiError) => {
  res.status(err.statusCode || 500).json({
    status: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err
  });
}

//production err
const prodErr = (res: Response, err: ApiError) => {
  if (err.isOperation === true) {
    res.status(err.statusCode || 500).json({
      status: err.statusCode,
      message: err.message,
      error: err
    });
  } else {
    res.status(500).json({
      status: 500,
      message: err.message,
      error: err
    });
  }
}

// prisma request err
const prismaRequestErr = (err: PrismaErr) => {

 return handlePrismaError(err)
}

// error handler middleware
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500; //server err status code
  err.status = err.status || "err"; // client err status code

  
  if (process.env.NODE_ENV === "development"){
    if (err.name === "PrismaClientKnownRequestError") err = prismaRequestErr(err);
    
    devErr(res, err)
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "PrismaClientKnownRequestError") err = prismaRequestErr(err);

    prodErr(res, err)
  }
};

export default errorHandler


/* 
  ***two types of error***
  OPERATIONAL ERROR: An error that can be predict
  PROGRAMMING ERROR: An error that made by programmers


  Handles production and development errors
  this way is more secure and to pass a appropiate errors during development or production

*/
