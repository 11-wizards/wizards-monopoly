import { z } from 'zod';

export const newCommentSchema = z.object({
  comment: z.string().min(1).max(100),
});

export type NewCommentSchema = z.infer<typeof newCommentSchema>;
