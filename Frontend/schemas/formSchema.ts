// schemas/formSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  file: z.any().refine(file => file instanceof File, { message: "Invalid file" }),
  prompt: z.string().min(5, { message: "Prompt must be at least 5 characters." })
});
