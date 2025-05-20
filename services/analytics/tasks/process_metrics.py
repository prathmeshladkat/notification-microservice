from celery_worker import app
from db.client import upsert_metric
from datetime import datetime

@app.task
def process_analytics(data: dict):
    print("📦 Received data in Celery Task:", data)
    channel = data["channel"]
    status = data["status"]
    timestamp = data["timeStamp"]

    date_str = timestamp.split("T")[0]

    upsert_metric(channel, status, date_str)

    print(f"[Analytics] Processed: {channel} - {status} - {date_str}")