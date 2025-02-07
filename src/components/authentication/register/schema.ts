import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least 8 characters with 1 upper case letter and 1 number.",
    }),
});
