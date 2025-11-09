import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { fromNodeHeaders } from "better-auth/node";
import type { Request } from "express";
import { prisma } from "../models/helper.js";
import allowedOrigins from "../config/allowedOrigins.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
      emailAndPassword: { 
      enabled: true, 
    }, 
    user: {
      changeEmail: { enabled: true }
    },
    trustedOrigins: allowedOrigins
});

export const getAuthContext = async (headers: Request["headers"]) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(headers),
    });
    return session;
}