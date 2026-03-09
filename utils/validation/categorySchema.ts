import z from "zod";
export const categorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Category name is required" })
    .trim()
    .min(1, { message: "Category name cannot be empty" })
    .max(50, { message: "Category name must be less than 50 characters" }),
  type: z.enum(["income", "expense"]),
  color: z.string(),
});
