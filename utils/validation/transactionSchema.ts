import z from "zod";

export const transactionSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1).max(100),
  amount: z.coerce
    .number({ message: "Amount is required" })
    .positive("Amount must be positive"),
  categoryId: z
    .string({ message: "Category is required" })
    .trim()
    .min(1, { message: "Category is required" }),
  type: z.enum(["income", "expense"]),
  date: z.string({ message: "Date is required" }).min(1),
  note: z.string().optional(),
});

export const updateTransactionSchema = transactionSchema.extend({
  id: z.string().uuid("Invalid transaction ID"),
});
