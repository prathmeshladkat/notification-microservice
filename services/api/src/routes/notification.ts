import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { NotificationSchema } from "prathmesh-utils";
import { sendNotification } from "../controllers/notificationController";

const router = Router();

// Final route: POST /send-notification
router.post("/", validateRequest(NotificationSchema), sendNotification);

export default router;
