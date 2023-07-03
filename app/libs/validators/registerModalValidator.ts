import { z } from "zod";

export const registerModalValidator = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(32, { message: "Name must be at most 32 characters long" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Name must only contain alphanumeric characters",
      }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 9 character longs" })
      .max(32, { message: "Password must be at most 32 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 9 character longs" })
      .max(32, { message: "Password must be at most 32 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/),
    email: z.string().email({ message: "Invalid email" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type registerModalValidatorType = z.infer<typeof registerModalValidator>;
