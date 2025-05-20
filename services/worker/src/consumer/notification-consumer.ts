import { Kafka } from "kafkajs";
import { produceNotification } from "prathmesh-utils";
import { emailHandler } from "../handlers/emailHandler2";
import { smsHandler } from "../handlers/smsHandler";
import { pushHandler } from "../handlers/pushTokenHandler";
import { whatsappHandler } from "../handlers/whatsappHandler";
import { prisma } from "../../../database/dist";

const kafka = new Kafka({
  clientId: "notification-worker",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

export const initNotificationConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "email-topic", fromBeginning: false });
  await consumer.subscribe({ topic: "sms-topic", fromBeginning: false });
  await consumer.subscribe({ topic: "push-topic", fromBeginning: false });
  await consumer.subscribe({ topic: "whatsapp-topic", fromBeginning: false });

  console.log("✅ Subscribed to email, sms, push, and whatsapp topics");

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) {
        console.warn("⚠️ Empty message received. Skipping...");
        return;
      }

      let payload;
      try {
        payload = JSON.parse(message.value.toString());
      } catch (err) {
        console.error("❌ Invalid JSON in message:", err);
        return;
      }

      try {
        if (topic === "email-topic") {
          console.log("📩 Handling email message");
          await emailHandler(payload);
        } else if (topic === "sms-topic") {
          console.log("📱 Handling SMS message");
          await smsHandler(payload);
        } /*else if (topic === "push-topic") {
          console.log("🔔 Handling push message");
          await pushHandler(payload);
        }*/ else if (topic === "whatsapp-topic") {
          console.log("💬 Handling WhatsApp message");
          await whatsappHandler(payload);
        } else {
          console.warn(`⚠️ Unknown topic: ${topic}`);
        }
      } catch (err) {
        console.error(`❌ Error handling message for topic ${topic}:`, err);
      }
    },
  });
};
