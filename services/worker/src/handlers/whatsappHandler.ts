import { produceNotification } from "../../../utils/dist";
import { Channel, Status } from "../../../database/generated/prisma";
import { prisma } from "../../../database/dist";
import { sendWhatsApp } from "../providers/whatsapp";
import axios from "axios";

interface WhatsappPayload {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  to: string;
}

export const whatsappHandler = async (
  payload: WhatsappPayload
): Promise<Status> => {
  const { to, userId, body, title, notificationId } = payload;

  try {
    const result = await sendWhatsApp({
      to,
      templateParams: [title, body],
    });

    const status: Status = result.success ? "SUCCESS" : "FAILURE";

    //sending task to celery task queue
    await axios.post("http://localhost:5001/analytics", {
      notificationId,
      userId,
      channel: "WHATSAPP",
      status,
      title,
      body,
      timeStamp: new Date().toISOString(),
    });

    /*await produceNotification("analytics-topic", {
      notificationId,
      userId,
      channel: "WHATSAPP",
      status,
      timestamp: new Date().toISOString(),
    });*/

    //CREATE DB ENTRY
    await prisma.delivery.create({
      data: {
        channel: "WHATSAPP",
        status,
        errorMessage: result.error || undefined,
        notificationId,
      },
    });

    return status;
  } catch (error: any) {
    const fallbackMessage = error.message || "unknown error";

    await axios.post("http://localhost:5001/analytics", {
      notificationId,
      userId,
      channel: "WHATSAPP",
      status: "FAILURE",
      title,
      body,
      timeStamp: new Date().toISOString(),
    });

    /*await produceNotification("analytics-topic", {
      notificationId,
      userId,
      channel: "SMS",
      status: "FAILURE",
      title,
      body,
      timeStamp: new Date().toISOString(),
    });*/

    await prisma.delivery.create({
      data: {
        channel: "SMS",
        status: "FAILURE",
        errorMessage: fallbackMessage,
        notificationId,
      },
    });

    return "FAILURE";
  }
};
