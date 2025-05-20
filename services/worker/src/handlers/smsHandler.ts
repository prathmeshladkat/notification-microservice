import { produceNotification } from "../../../utils/dist";
import { Channel, Status } from "../../../database/generated/prisma";
import { prisma } from "../../../database/dist";
import { sendSMS } from "../providers/sms";
import axios from "axios";

interface SMSPayload {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  to: string;
}

export const smsHandler = async (payload: SMSPayload): Promise<Status> => {
  const { to, userId, body, title, notificationId } = payload;

  try {
    const result = await sendSMS({ to, body });

    const status: Status = result.success ? "SUCCESS" : "FAILURE";

    await axios.post("http://localhost:5001/analytics", {
      notificationId,
      userId,
      channel: "SMS",
      status,
      title,
      body,
      timeStamp: new Date().toISOString(),
    });

    //emit to analytics topic
    /*await produceNotification("analytics-topic", {
      notificationId,
      userId,
      channel: "SMS",
      status,
      title,
      body,
      timeStamp: new Date().toISOString(),
    });*/

    //create db entry to each sms
    await prisma.delivery.create({
      data: {
        channel: "SMS",
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
      channel: "SMS",
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
