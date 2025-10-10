import express, {type Request, type Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth, getAuthContext } from "./lib/auth.js";  // Use .ts for ts-node
import { verfiAuth } from "./middleware/authenticationMiddleware.js";

const app = express();
const port = 8000;

app.all("/api/auth/{*any}", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
app.use(verfiAuth)
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

//routes
app.get("/api/me", async (req: Request, res: Response) => {
    const user = await getAuthContext(req.headers);

    console.log("USER:", user)
    res.status(200).json({
        user: user
    })
})

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});