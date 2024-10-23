import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthClient } from "better-auth/react"
import { admin, twoFactor } from "better-auth/plugins"
import { organizationClient } from "better-auth/client/plugins"
import prisma from "./db";
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", 
  }),
  emailAndPassword: {  
    enabled: true
  },
  socialProviders: { 
    github: { 
    clientId: process.env.GITHUB_CLIENT_ID!, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
    } 
  }, 
  plugins: [
    twoFactor({  
      issuer: "Clevery"
    }),
    organizationClient(),
    admin() 
  ],
  baseURL:process.env.BETTER_AUTH_URL
});

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL
})

export const { signIn, signUp, useSession } = createAuthClient()