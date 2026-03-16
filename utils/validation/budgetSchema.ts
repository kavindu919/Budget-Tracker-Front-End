import z from "zod";

export const budgetSchema = z.object({
  id: z.string().optional(),
  amount: z.coerce
    .number({ message: "Amount is required" })
    .positive("Amount must be positive"),
  period: z.enum(["daily", "weekly", "monthly", "yearly"]),
  alertLimit: z
    .union([
      z.literal("").transform(() => undefined),
      z.coerce.number().min(0, {
        message: "Alert limit must be 0 or greater",
      }),
    ])
    .optional(),
  categoryId: z.string().min(1, "Category is required"),
});
