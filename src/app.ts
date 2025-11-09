import express, {
    type Request,
    type Response
} from "express";
import { toNodeHandler } from "better-auth/node";
import { 
    auth,
    getAuthContext
} from "./lib/auth.js"; 
import { verifyAuth } from "./middleware/authenticationMiddleware.js";
import corsOption from "./middleware/corsOption.js"
import credentials from "./middleware/credentials.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler.js";
import authRoute from "./routes/authRoutes.js"
import postRoute from "./routes/postRoutes.js"
import commentRoute from "./routes/commentRoutes.js"
import likedPostRoute from "./routes/likedPostRoutes.js"
import reactionsRoute from "./routes/reactionsRoutes.js"
import publicRoute from "./routes/publicRoutes.js"

const app = express();
const port = process.env.PORT || 8000;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//cors
app.use(cors(corsOption));

//cookie-parser
app.use(cookieParser());

//middleware allows urlencoded data
app.use(express.urlencoded({extended: true, limit: "50mb"}))

//better auth api endpoint
app.all("/api/auth/{*any}", toNodeHandler(auth));
// POST http://localhost:8000/api/auth/sign-up/email
// POST http://localhost:8000/api/auth/sign-in/email
// Post http://localhost:8000/api/auth/sign-out

//public routes
app.use("/v1/api/auth", authRoute)
app.use("/v1/api/public-data", publicRoute)

// Mount express json middleware after Better Auth handler
app.use(verifyAuth)
// or only apply it to routes that don't interact with Better Auth
app.use(express.json({limit: "50mb"}));

//routes
app.use("/v1/api/post", postRoute);
app.use("/v1/api/comment", commentRoute);
app.use("/v1/api/liked-post", likedPostRoute);
app.use("/v1/api/reactions", reactionsRoute);

//error handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});