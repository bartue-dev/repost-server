import express, {
    type Request,
    type Response
} from "express";
import { toNodeHandler } from "better-auth/node";
import { 
    auth,
    getAuthContext
} from "./lib/auth.js"; 
import { verfiAuth } from "./middleware/authenticationMiddleware.js";
import corsOption from "./middleware/corsOption.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler.js";
import postRoute from "./routes/postRoutes.js"

const app = express();
const port = process.env.PORT || 8000;

app.all("/api/auth/{*any}", toNodeHandler(auth));
// POST http://localhost:8000/api/auth/sign-up/email
// POST http://localhost:8000/api/auth/sign-in/email
// Post http://localhost:8000/api/auth/sign-out

//cors
app.use(cors(corsOption));

//cookie-parser
app.use(cookieParser());

//middleware allows urlencoded data
app.use(express.urlencoded({extended: true}))

// Mount express json middleware after Better Auth handler
app.use(verfiAuth)
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

//routes
app.get("/api/me", async (req: Request, res: Response) => {
    const user = await getAuthContext(req.headers);

    console.log(user)
    res.status(200).json({
        user: user?.user
    })
})

app.use("/v1/api/post", postRoute)

//error handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});