import os
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://neondb_owner:npg_Rsy5Pa1SFVWZ@ep-bold-shape-a4wwi0gj-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(DATABASE_URL)

def upsert_metric(channel: str, status: str, date_str: str):
    with engine.begin() as conn:
        conn.execute(
            text("""INSERT INTO "DeliveryMetricsSummary" (channel, status, date, count)
                VALUES (:channel, :status, :date, 1)
                ON CONFLICT (date, channel, status)
                DO UPDATE SET count = "DeliveryMetricsSummary".count + 1
            """),
            {"channel": channel, "status": status, "date": date_str}
        )