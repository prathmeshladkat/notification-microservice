import { Request, Response } from "express";
import { NotificationSchema } from "../../../utils/dist";
import { redisClient } from "../../../utils/dist";
import { produceNotification } from "../../../utils/dist";
//import { prisma } from "@shared/database";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../../database";

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const parsed = NotificationSchema.parse(req.body);
    console.log(parsed);
    const { userId, title, body, emailTo, smsTo, pushToken, whatsapp } = parsed;

    const notificationId = uuidv4();

    // Save push token to Redis
    if (pushToken) {
      await redisClient.set(`user:${userId}:token`, pushToken);
      console.log("successfull");
    }

    //save NotificationRequest in DB

    await prisma.notificationRequest.create({
      data: {
        id: notificationId,
        userId,
        title,
        body,
        emailTo,
        smsTo,
        pushToken,
        whatsapp,
      },
    });
    console.log("ok");

    // Create payload
    const basePayload = { notificationId, userId, title, body };

    if (emailTo) {
      await produceNotification("email-topic", { ...basePayload, to: emailTo });
      console.log("done1");
    }
    if (smsTo) {
      await produceNotification("sms-topic", { ...basePayload, to: smsTo });
      console.log("done2");
    }
    if (pushToken) {
      await produceNotification("push-topic", {
        ...basePayload,
        token: pushToken,
      });
      console.log("done3");
    }
    if (whatsapp) {
      await produceNotification("whatsapp-topic", {
        ...basePayload,
        to: whatsapp,
      });
      console.log("done4");
    }

    res.status(200).json({ message: "Notifications queued successfully." });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
