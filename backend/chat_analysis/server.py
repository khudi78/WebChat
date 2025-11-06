from flask import Flask, request, jsonify
from util import (chat_to_dataframe, active_hours, active_weekdays, busy_day_pie, active_month_plot, active_month_pie,
                  activity_heatmap, month_activation_plot)
import tempfile
import os
import sys
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
df = None  # Global chat dataframe


@app.route("/upload-chat", methods=["POST"])
def upload_chat():
    global df
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save file temporarily
    temp_path = os.path.join(tempfile.gettempdir(), file.filename)
    file.save(temp_path)

    try:
        df = chat_to_dataframe(temp_path)
        print("Dataframe in server after upload:")
        print(df.head())
        print(f"✅ DataFrame has {len(df)} rows.")
        sys.stdout.flush()
        print(f"{len(df)} rows.")
        return jsonify({"message": "Chat uploaded successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/active-hours", methods=["GET"])
def overall_hours():
    global df
    return active_hours(df)

@app.route("/active-hours/<sender>", methods=["GET"])
def user_hours(sender):
    sender = sender.replace("%20", " ")
    return active_hours(df, sender_name=sender)

@app.route("/active-weekdays", methods=["GET"])
def overall_weekdays():
    return active_weekdays(df)

@app.route("/active-weekdays/<sender>", methods=["GET"])
def user_weekdays(sender):
    sender = sender.replace("%20", " ")
    return active_weekdays(df, sender_name=sender)

@app.route("/busy-day")
def overall_busy_day():
    return busy_day_pie(df)

@app.route("/busy-day/<sender>")
def user_busy_day(sender):
    sender = sender.replace("%20", " ")
    return busy_day_pie(df, sender_name=sender)


@app.route("/active-month")
def overall_active_month():
    return active_month_plot(df)


@app.route("/active-month/<sender>")
def user_active_month(sender):
    sender = sender.replace("%20", " ")
    return active_month_plot(df, sender=sender)

@app.route("/active-month-pie")
def overall_active_month_pie():
    return active_month_pie(df)


@app.route("/active-month-pie/<sender>")
def user_active_month_pie(sender):
    sender = sender.replace("%20", " ")
    return active_month_pie(df, sender=sender)


@app.route("/plot-heatmap")
def overall_heatmap_plot():
    return activity_heatmap(df)


@app.route("/plot-heatmap/<sender>")
def user_heatmap_plot(sender):
    sender = sender.replace("%20", " ")
    return activity_heatmap(df, sender=sender)

@app.route("/plot-monthly-activation")
def overall_monthly_activation():
    month = request.args.get('month')   # e.g. ?month=5
    return month_activation_plot(df, month=month)


@app.route("/plot-monthly-activation/<sender>")
def user_monthly_activation(sender):
    month = request.args.get('month')    # e.g. ?month=5
    sender = sender.replace("%20", " ")
    return month_activation_plot(df, month=month, sender=sender)

@app.route('/chat-stats', methods=['GET'])
def chat_stats():
    from util import chat_statistics
    if df is None:
        return jsonify({"error": "No chat data loaded"}), 400

    stats = chat_statistics(df)
    return jsonify(stats)

if __name__ == "__main__":
    app.run(debug=True)
