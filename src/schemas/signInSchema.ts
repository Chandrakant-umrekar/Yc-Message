import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(), // email or username
  password: z.string(),
});
