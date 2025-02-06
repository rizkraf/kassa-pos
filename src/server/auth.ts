import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log({ email, otp, type });
      },
    }),
  ],
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      }
    }
  }
});
