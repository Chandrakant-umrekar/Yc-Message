import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Message must be at least 2 characters long" })
    .max(400, { message: "Message must be at most 400 characters long" }),
});
