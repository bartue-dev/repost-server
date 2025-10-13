import type { NextFunction, Request, Response } from "express";
import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
};


export default credentials;

/* 

- for the Client || browser it need to set the -
- Access-Control-Allow-Credentials: true
- to ensure that the header is set to trusted origin

*/