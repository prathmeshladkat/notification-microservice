require("dotenv").config();
import { initKafkaProducer } from "../../utils/dist";
import { initNotificationConsumer } from "./consumer/notification-consumer";

const start = async () => {
  try {
    console.log("🚀 Starting Notification Worker...");

    await initKafkaProducer();
    await initNotificationConsumer();

    console.log("✅ Email Kafka Consumer is running...");
  } catch (err) {
    console.error("❌ Failed to start the worker:", err);
    process.exit(1);
  }
};

start();
