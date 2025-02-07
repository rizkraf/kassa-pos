import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { type auth } from "@/server/auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    organizationClient(),
  ],
});
