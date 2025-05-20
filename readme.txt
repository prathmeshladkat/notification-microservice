# 📬 Notification-Microservice

A production-ready, scalable microservice for sending **multi-channel notifications** (Email, SMS, WhatsApp, Push). Built using **Node.js**, **Kafka**, **Redis**, and **Python**, the system ensures fault-tolerant, decoupled delivery with real-time analytics tracking.

---

## 🚀 Features

- 🔁 Asynchronous, queue-based notification delivery
- 📩 Channel-specific Kafka topics (Email, SMS, WhatsApp)
- 🛠️ Delivery via AWS SES, Twilio, and Infobip
- 📊 Real-time analytics with Celery + Python
- 🧵 Scalable and modular microservice architecture

---

## 🧰 Tech Stack

- **Node.js + Express** – REST API and Kafka producers/consumers
- **Apache Kafka** – Channel-based event queues
- **Redis** – Broker for Celery task queue
- **Celery + Flask** – Python analytics worker
- **PostgreSQL** – Delivery data persistence
- **AWS SES / Twilio / Infobip** – Third-party delivery services

---
## ⚙️ Getting Started

### 1. Start the API Server

```bash
cd services/api
pnpm install
pnpm run dev
### 2. Start the Worker Service

cd services/worker
pnpm install
pnpm run dev

### 3. Start the Analytics Worker (Python)

cd services/analytics
.\venv\Scripts\Activate.ps1   # Activate your Python virtual environment (Windows)
celery -A celery_worker worker --loglevel=info --pool=solo
python analytics_server.py


##Make sure Redis and Kafka are running before starting the services.

📨 API Usage
POST /send-notification
URL: http://localhost:4000/send-notification

Sample Request Body

{
  "userId": "5520",
  "title": "New sale Offer",
  "body": "Check out this is Last testing!",
  "pushToken": "fake-push-token-163",
  "smsTo": "+91XXXXXXXXXX",
  "emailTo": "prathameshladka@gmail.com",
  "whatsapp": "+91XXXXXXXXX"
}

🛠️ Future Improvements
Add retry & dead-letter queue logic for failed notifications

Add request validation and rate-limiting

Deploy with Docker + Docker Compose


worker -> consumer (kafka consumer config)
       -> handler (routing request)
       -> provider (core logic)

npx prisma generate 
npx prisma migrate dev (current v2)

services/api/src ->  controller (producer to kafka, create user to notification DB)
                 -> pnpm build
                 -> pnpm run build

steps to run : redis kafka docker run
               services/api -> pnpm run dev
               services/worker -> pnpm run dev
              services/analytics -> .\venv\Scripts\Activate.ps1c (help you to enter into venv of python project) ->
                                   celery -A celery_worker worker --loglevel=info --pool=solo
              services/analytics ->  python analytics_sever.py



