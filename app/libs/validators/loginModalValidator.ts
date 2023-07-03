import { z } from "zod";

export const loginModalValidator = z.object({
  password: z
    .string()
    .min(4, { message: "Password must be at least 9 character longs" })
    .max(32, { message: "Password must be at most 32 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/),
  email: z.string().email({ message: "Invalid email" }),
});

export type loginModalValidatorType = z.infer<typeof loginModalValidator>;
