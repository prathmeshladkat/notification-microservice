from flask import Flask, request, jsonify
from tasks.process_metrics import process_analytics  
app = Flask(__name__)

@app.route('/analytics', methods=['POST'])
def handle_analytics():
    data = request.get_json()
    process_analytics.delay(data)  # Send to Celery task asynchronously
    return jsonify({"message": "Analytics task submitted"}), 200

if __name__ == '__main__':
    app.run(port=5001)