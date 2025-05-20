import { produceNotification } from "../../../utils/dist";
import { prisma } from "../../../database/dist";
import { Channel, Status } from "../../../database/generated/prisma";
import { sendEmail } from "../providers/email/index";
import axios from "axios";

interface EmailPayload {
  notificationId: string;
  userId: String;
  title: string;
  body: string;
  to: string;
}

export const emailHandler = async (payload: EmailPayload): Promise<Status> => {
  const { to, title, body, userId, notificationId } = payload;

  const result = await sendEmail({ to, subject: title, body });

  const status: Status = result.success ? "SUCCESS" : "FAILURE";

  //send o celery via HTTP
  await axios.post("http://localhost:5001/analytics", {
    notificationId,
    userId,
    channel: "EMAIL",
    status,
    title,
    body,
    timeStamp: new Date().toISOString(),
  });

  //emit to kafka analytics topic
  /*await produceNotification("analytics-topic", {
    notificationId,
    userId,
    Channel: "EMAIL",
    status,
    title,
    body,
    timeStamp: new Date().toISOString(),
  });*/

  //create entry in db for each email
  await prisma.delivery.create({
    data: {
      channel: "EMAIL",
      status,
      errorMessage: result.error || undefined,
      notificationId,
    },
  });

  return status;
};
