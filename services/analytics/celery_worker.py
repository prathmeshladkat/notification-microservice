from celery import Celery

app = Celery("analytics", broker="redis://localhost:6379/0")


app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
)

import tasks.process_metrics