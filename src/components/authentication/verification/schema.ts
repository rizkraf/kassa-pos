import { z } from "zod";

export const verificationSchema = z.object({
  verification_code: z.string().length(6),
});
