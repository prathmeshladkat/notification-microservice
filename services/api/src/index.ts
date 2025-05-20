import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import notificationRoutes from "./routes/notification";
import { connectRedis } from "../../utils/dist";
import { initKafkaProducer } from "../../utils/dist";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/send-notification", notificationRoutes);

(async () => {
  try {
    await connectRedis(); // Initialize Redis
    await initKafkaProducer(); // Initialize Kafka

    app.listen(PORT, () => {
      console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to initialize dependencies:", err);
    process.exit(1);
  }
})();
