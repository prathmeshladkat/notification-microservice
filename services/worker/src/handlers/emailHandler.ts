/*import { prisma } from "../../../database/dist";
import { sendEmail } from "src/providers/email";

export const emailHandler = async (data: {
  userId: string;
  title: string;
  body: string;
  to: string;
  notificationId: string;
}) => {
  try {
    await sendEmail(data.to, data.title, data.body);
  } catch (error: any) {
    console.error("email delivery failed:", error.message);
  }
};*/
