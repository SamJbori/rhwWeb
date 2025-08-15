import z from "zod";

export const ZNTask = z.object({
  title: z.string().min(1).max(255),
  color: z.string().optional(),
  completed: z.boolean().optional(),
});

export type ONTask = z.output<typeof ZNTask>;

export const ZUTask = ZNTask.extend({
  id: z.string().optional(),
});
export type OUTask = z.output<typeof ZUTask>;

export const ZTask = ZNTask.extend({
  id: z.string(),
  createdAt: z.date(),
  completedAt: z.date(),
  updatedAt: z.date(),
});

export type OTask = z.output<typeof ZTask>;
