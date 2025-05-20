import { z } from "zod";

export const NotificationSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  title: z.string().min(1, "title is required"),
  body: z.string().min(1, "body is required"),
  emailTo: z.string().email("Invalid email format").optional(),
  smsTo: z
    .string()
    .regex(/^\+\d{10,15}$/, "Invalid phone number format")
    .optional(),
  pushToken: z.string().optional(),
  whatsapp: z
    .string()
    .regex(/^\+\d{10,15}$/, "Invalid phone number format")
    .optional(),
});

export type NotificationInput = z.infer<typeof NotificationSchema>;
