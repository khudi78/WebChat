# import pandas as pd
# import re
# import io
# import matplotlib
# matplotlib.use('Agg')  # ✅ Use a non-GUI backend (Agg = Anti-Grain Geometry)
# import matplotlib.pyplot as plt
# from flask import Response
# from datetime import datetime
# import seaborn as sns
# import calendar
# from io import BytesIO


# def chat_to_dataframe(file_path: str):
#     """
#     Converts a WhatsApp chat text file into a pandas DataFrame.
#     """
#     print("start loading saved artifacts")

#     pattern = r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.*?):\s(.*)'
#     call_pattern = r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.*?):'

#     data = []
#     with open(file_path, "r", encoding="utf-8") as f:
#         for line in f:
#             line = line.strip()
#             match = re.match(pattern, line)
#             call_match = re.match(call_pattern, line)

#             if match:
#                 date, time, sender, message = match.groups()
#                 data.append([date, time, sender, message])
#             elif call_match:
#                 date, time, sender = call_match.groups()
#                 message = "Called"
#                 data.append([date, time, sender, message])
#             elif data:
#                 data[-1][3] += " " + line

#     df = pd.DataFrame(data, columns=["date", "time", "sender", "message"])
#     df['DateTime'] = pd.to_datetime(
#         df['date'] + " " + df['time'],
#         format="%d/%m/%Y %I:%M %p",
#         errors='coerce',
#         dayfirst=True
#     )
#     print("✅ DataFrame created successfully.")
#     print(df.head())
#     return df


# def chat_statistics(df):

#     # --- Overall counts ---
#     total_media_shared = (df['message'] == "<Media omitted>").sum()
#     total_calls_done = (df['message'] == "Called").sum()
#     total_msgs = df.shape[0]
#     total_text_messages = total_msgs - total_media_shared - total_calls_done

#     # --- Per user counts ---
#     msg_per_user = df['sender'].value_counts()
#     media_per_user = df[df['message'] == "<Media omitted>"]['sender'].value_counts()
#     calls_per_user = df[df['message'] == "Called"]['sender'].value_counts()

#     text_msg_per_user = {}

#     for sender in msg_per_user.keys():
#         media = media_per_user.get(sender, 0)
#         calls = calls_per_user.get(sender, 0)
#         text_msg_per_user[sender] = msg_per_user[sender] - media - calls

#     # --- Construct result dict ---
#     stats = {
#         "overall": {
#             "total_messages": int(total_msgs),
#             "total_text_messages": int(total_text_messages),
#             "total_media_shared": int(total_media_shared),
#             "total_calls_done": int(total_calls_done),
#         },
#         "per_user": {}
#     }

#     for sender in msg_per_user.keys():
#         stats["per_user"][sender] = {
#             "messages": int(msg_per_user[sender]),
#             "text_messages": int(text_msg_per_user.get(sender, 0)),
#             "media_shared": int(media_per_user.get(sender, 0)),
#             "calls_done": int(calls_per_user.get(sender, 0))
#         }

#     return stats


# def active_hours(df, sender_name=None):
#     """Plot chat frequency per hour."""
#     if df is None or df.empty:
#         return Response("No data available.", status=400)

#     if sender_name:
#         df = df[df['sender'] == sender_name]

#     if df.empty:
#         return Response(f"No data for sender '{sender_name}'.", status=404)

#     hour_data = df['DateTime'].dt.hour.dropna()

#     plt.figure(figsize=(10, 5))
#     plt.hist(hour_data, bins=24, rwidth=0.85)
#     plt.xlabel('Hour')
#     plt.ylabel('Frequency')
#     plt.title(f"Active Frequency per Hour{' - ' + sender_name if sender_name else ' (Overall)'}")
#     plt.xticks(range(0, 24))

#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     plt.close()
#     return Response(buf.getvalue(), mimetype='image/png')


# def active_weekdays(df, sender_name=None):
#     """Plot chat frequency by weekday (overall or per sender)."""
#     if df is None or df.empty:
#         return Response("No data available.", status=400)

#     if sender_name:
#         df = df[df['sender'] == sender_name]

#     if df.empty:
#         return Response(f"No data for sender '{sender_name}'.", status=404)

#     # Ensure we get weekday names
#     df["Weekday"] = df["DateTime"].dt.day_name()

#     # Count weekday frequencies
#     weekday_counts = df["Weekday"].value_counts()

#     # Define all 7 weekdays in order
#     order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

#     # Ensure all weekdays appear — even with 0
#     y_sorted = [weekday_counts.get(day, 0) for day in order]

#     plt.figure(figsize=(10, 5))
#     plt.barh(order, y_sorted, color="skyblue")
#     plt.xlabel("Frequency")
#     plt.ylabel("Weekday")
#     plt.title(f"Active Frequency per Weekday{' - ' + sender_name if sender_name else ' (Overall)'}")

#     buf = io.BytesIO()
#     plt.savefig(buf, format="png")
#     buf.seek(0)
#     plt.close()
#     return Response(buf.getvalue(), mimetype="image/png")



# def busy_day_pie(df, sender_name=None):
#     """Generate a pie chart showing chat activity distribution per weekday (overall or per sender)."""
#     if df is None or df.empty:
#         return Response("No data available.", status=400)

#     if sender_name:
#         df = df[df['sender'] == sender_name]

#     if df.empty:
#         return Response(f"No data for sender '{sender_name}'.", status=404)

#     # Define all weekdays in order
#     all_weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

#     # Count weekday frequencies and include missing days with 0
#     weekday_counts = df['DateTime'].dt.day_name().value_counts()
#     weekday_counts = weekday_counts.reindex(all_weekdays, fill_value=0)

#     if weekday_counts.sum() == 0:
#         return Response("No valid DateTime entries available.", status=400)

#     x_sorted = weekday_counts.index.tolist()
#     y_sorted = weekday_counts.values.tolist()
    
    
#     plt.figure(figsize=(7, 7))
#     plt.pie(
#         y_sorted,
#         labels=x_sorted,
#         autopct=lambda p: f'{p:.1f}%' if p > 0 else '',
#         startangle=90,
#         shadow=True,
#     )
#     plt.axis('equal')
#     plt.title(f"Most Busy Day{' - ' + sender_name if sender_name else ' (Overall)'}")

#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     plt.close()

#     return Response(buf.getvalue(), mimetype='image/png')


# def active_month_plot(df, sender=None):
#     """
#     Generates a line plot showing active frequency per month
#     for overall chat or a specific user.

#     Args:
#         df: pandas DataFrame containing 'DateTime' and 'sender' columns.
#         sender: optional sender name/number (if None, overall is shown).

#     Returns:
#         Flask Response (image/png)
#     """
#     # Filter data for current year
#     year = datetime.now().year
#     if sender:
#         df_filtered = df[(df['DateTime'].dt.year == year) & (df['sender'] == sender)]
#         title = f"Active Months in {year} for {sender}"
#     else:
#         df_filtered = df[df['DateTime'].dt.year == year]
#         title = f"Overall Active Months in {year}"

#     # Get monthly frequency counts
#     month_value = df_filtered['DateTime'].dt.month.value_counts().sort_index()

#     # Prepare X (months) and Y (counts)
#     x = list(month_value.index)
#     y = list(month_value.values)

#     # Plot
#     plt.figure(figsize=(10, 5))
#     plt.plot(x, y, marker='o', linestyle='-', linewidth=2)
#     plt.xlabel('Month')
#     plt.ylabel('Frequency')
#     plt.title(title)
#     plt.xticks(range(1, 13))
#     plt.grid(True, linestyle='--', alpha=0.5)

#     # Convert plot to PNG
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     plt.close()

#     return Response(buf.getvalue(), mimetype='image/png')


# def active_month_pie(df, sender=None):
#     year = datetime.now().year

#     # Filter data based on sender
#     if sender:
#         df_filtered = df[(df['DateTime'].dt.year == year) & (df['sender'] == sender)]
#         title = f"Monthly Activity Distribution ({year}) for {sender}"
#     else:
#         df_filtered = df[df['DateTime'].dt.year == year]
#         title = f"Overall Monthly Activity Distribution ({year})"

#     # Define all months in numeric order
#     all_months = range(1, 13)
#     month_names = [datetime(2000, m, 1).strftime('%B') for m in all_months]

#     # Count messages per month, reindex to include all months
#     month_counts = df_filtered['DateTime'].dt.month.value_counts().sort_index()
#     month_counts = month_counts.reindex(all_months, fill_value=0)

#     if month_counts.sum() == 0:
#         # No data found for user
#         plt.figure(figsize=(6, 4))
#         plt.text(0.5, 0.5, 'No activity data found!', ha='center', va='center', fontsize=14)
#         plt.axis('off')
#     else:
#         # Prepare data
#         labels = month_names
#         sizes = month_counts.values

#         # Plot pie
#         plt.figure(figsize=(8, 8))
#         plt.pie(
#             sizes,
#             labels=labels,
#             autopct=lambda p: f'{p:.1f}%' if p > 0 else '',
#             startangle=90,
#             shadow=True
#         )
#         plt.axis('equal')  # Equal aspect ratio ensures the pie is circular
#         plt.title(title)

#     # Convert to PNG
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png', bbox_inches='tight')
#     buf.seek(0)
#     plt.close()

#     return Response(buf.getvalue(), mimetype='image/png')



# def activity_heatmap(df, sender=None):

#     # Filter for the sender if provided
#     if sender:
#         df_filtered = df[df['sender'] == sender]
#         title = f"Activity Heatmap for {sender}"
#     else:
#         df_filtered = df
#         title = "Overall Activity Heatmap"

#     if df_filtered.empty:
#         plt.figure(figsize=(6, 4))
#         plt.text(0.5, 0.5, 'No data available', ha='center', va='center', fontsize=14)
#         plt.axis('off')
#     else:
#         # Extract weekday and hour
#         df_filtered['Week_Day_Name'] = df_filtered['DateTime'].dt.day_name()
#         df_filtered['Activated hour'] = df_filtered['DateTime'].dt.hour

#         week_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
#         df_filtered['Week_Day_Name'] = pd.Categorical(df_filtered['Week_Day_Name'], categories=week_order, ordered=True)

#         # Create pivot table (weekday × hour)
#         heatmap_data = df_filtered.pivot_table(
#             index='Week_Day_Name',
#             columns='Activated hour',
#             aggfunc='size',
#             fill_value=0
#         )
#         heatmap_data = heatmap_data.reindex(columns=range(24), fill_value=0)

#         # Plot heatmap
#         plt.figure(figsize=(12, 6))
#         sns.heatmap(heatmap_data, linewidths=0.4, cmap="YlGnBu")
#         plt.title(title)
#         plt.xlabel("Hour of Day")
#         plt.ylabel("Weekday")

#     # Save to buffer
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png', bbox_inches='tight')
#     buf.seek(0)
#     plt.close()

#     return Response(buf.getvalue(), mimetype='image/png')


# def month_activation_plot(df, month=None, sender=None):
#     plt.figure(figsize=(10, 5))

#     # Default to current month if not provided
#     from datetime import datetime
#     if month is None:
#         month_num = datetime.now().month
#     else:
#         month_num = int(month)

#     # Get month name for title
#     month_name = calendar.month_name[month_num]

#     # Filter data based on month and sender (if provided)
#     if sender:
#         month_data = df[
#             (df['DateTime'].dt.month == month_num) &
#             (df['sender'] == sender)
#         ]['DateTime'].dt.day.value_counts().sort_index()
#         title = f"Monthly Activation Rate for {sender} ({month_name})"
#     else:
#         month_data = df[
#             (df['DateTime'].dt.month == month_num)
#         ]['DateTime'].dt.day.value_counts().sort_index()
#         title = f"Overall Monthly Activation Rate ({month_name})"

#     # Extract x (days) and y (frequency)
#     x = month_data.index.tolist()
#     y = month_data.values.tolist()

#     # Plot line chart
#     plt.plot(x, y, marker='o', linestyle='-', color='b')
#     plt.xlabel('Days of Month')
#     plt.ylabel('Frequency')
#     plt.title(title)
#     plt.xticks(range(1, 32))
#     plt.grid(True)

#     # Save to buffer for returning as image (Flask-compatible)
#     buf = BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     plt.close()

#     return Response(buf.getvalue(), mimetype='image/png')



import pandas as pd
import re
import io
import matplotlib
matplotlib.use('Agg')  # Non-GUI backend (thread-safe rendering)
import matplotlib.pyplot as plt
from flask import Response
from datetime import datetime
import seaborn as sns
import calendar
from io import BytesIO
from threading import Lock

# Global plotting lock (for extra safety in some environments)
plot_lock = Lock()


def chat_to_dataframe(file_path: str):
    """Convert WhatsApp chat text file to DataFrame (thread-safe since local)."""
    pattern = r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.*?):\s(.*)'
    call_pattern = r'^(\d{1,2}/\d{1,2}/\d{2,4}),\s(\d{1,2}:\d{2}\s[ap]m)\s-\s(.*?):'

    data = []
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            match = re.match(pattern, line)
            call_match = re.match(call_pattern, line)

            if match:
                date, time, sender, message = match.groups()
                data.append([date, time, sender, message])
            elif call_match:
                date, time, sender = call_match.groups()
                message = "Called"
                data.append([date, time, sender, message])
            elif data:
                data[-1][3] += " " + line

    df = pd.DataFrame(data, columns=["date", "time", "sender", "message"])
    df['DateTime'] = pd.to_datetime(
        df['date'] + " " + df['time'],
        format="%d/%m/%Y %I:%M %p",
        errors='coerce',
        dayfirst=True
    )
    return df


def chat_statistics(df):
    """Compute per-user and overall chat statistics."""
    df_local = df.copy()

    total_media_shared = (df_local['message'] == "<Media omitted>").sum()
    total_calls_done = (df_local['message'] == "Called").sum()
    total_msgs = df_local.shape[0]
    total_text_messages = total_msgs - total_media_shared - total_calls_done

    msg_per_user = df_local['sender'].value_counts()
    media_per_user = df_local[df_local['message'] == "<Media omitted>"]['sender'].value_counts()
    calls_per_user = df_local[df_local['message'] == "Called"]['sender'].value_counts()

    text_msg_per_user = {}
    for sender in msg_per_user.keys():
        media = media_per_user.get(sender, 0)
        calls = calls_per_user.get(sender, 0)
        text_msg_per_user[sender] = msg_per_user[sender] - media - calls

    stats = {
        "overall": {
            "total_messages": int(total_msgs),
            "total_text_messages": int(total_text_messages),
            "total_media_shared": int(total_media_shared),
            "total_calls_done": int(total_calls_done),
        },
        "per_user": {}
    }

    for sender in msg_per_user.keys():
        stats["per_user"][sender] = {
            "messages": int(msg_per_user[sender]),
            "text_messages": int(text_msg_per_user.get(sender, 0)),
            "media_shared": int(media_per_user.get(sender, 0)),
            "calls_done": int(calls_per_user.get(sender, 0))
        }

    return stats


# 🧠 Thread-safe plotting decorator
def thread_safe_plot(func):
    def wrapper(*args, **kwargs):
        with plot_lock:
            fig = plt.figure()
            result = func(*args, **kwargs)
            plt.close(fig)
            return result
    return wrapper


@thread_safe_plot
def active_hours(df, sender_name=None):
    df_local = df.copy()
    if sender_name:
        df_local = df_local[df_local['sender'] == sender_name]

    hour_data = df_local['DateTime'].dt.hour.dropna()

    plt.figure(figsize=(10, 5))
    plt.hist(hour_data, bins=24, rwidth=0.85)
    plt.xlabel('Hour')
    plt.ylabel('Frequency')
    plt.title(f"Active Frequency per Hour{' - ' + sender_name if sender_name else ' (Overall)'}")
    plt.xticks(range(0, 24))

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return Response(buf.getvalue(), mimetype='image/png')


@thread_safe_plot
def active_weekdays(df, sender_name=None):
    df_local = df.copy()
    if sender_name:
        df_local = df_local[df_local['sender'] == sender_name]

    df_local["Weekday"] = df_local["DateTime"].dt.day_name()
    weekday_counts = df_local["Weekday"].value_counts()
    order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    y_sorted = [weekday_counts.get(day, 0) for day in order]

    plt.figure(figsize=(10, 5))
    plt.barh(order, y_sorted, color="skyblue")
    plt.xlabel("Frequency")
    plt.ylabel("Weekday")
    plt.title(f"Active Frequency per Weekday{' - ' + sender_name if sender_name else ' (Overall)'}")

    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return Response(buf.getvalue(), mimetype="image/png")


@thread_safe_plot
def busy_day_pie(df, sender_name=None):
    df_local = df.copy()
    if sender_name:
        df_local = df_local[df_local['sender'] == sender_name]

    all_weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    weekday_counts = df_local['DateTime'].dt.day_name().value_counts()
    weekday_counts = weekday_counts.reindex(all_weekdays, fill_value=0)

    x_sorted = weekday_counts.index.tolist()
    y_sorted = weekday_counts.values.tolist()

    plt.figure(figsize=(7, 7))
    plt.pie(y_sorted, labels=x_sorted, autopct=lambda p: f'{p:.1f}%' if p > 0 else '', startangle=90, shadow=True)
    plt.axis('equal')
    plt.title(f"Most Busy Day{' - ' + sender_name if sender_name else ' (Overall)'}")

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return Response(buf.getvalue(), mimetype='image/png')


@thread_safe_plot
def activity_heatmap(df, sender=None):
    df_local = df.copy()
    if sender:
        df_local = df_local[df_local['sender'] == sender]

    if df_local.empty:
        plt.text(0.5, 0.5, 'No data available', ha='center', va='center')
        plt.axis('off')
    else:
        df_local['Week_Day_Name'] = pd.Categorical(
            df_local['DateTime'].dt.day_name(),
            categories=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            ordered=True
        )
        df_local['Activated hour'] = df_local['DateTime'].dt.hour

        heatmap_data = df_local.pivot_table(index='Week_Day_Name', columns='Activated hour', aggfunc='size', fill_value=0)
        heatmap_data = heatmap_data.reindex(columns=range(24), fill_value=0)

        sns.heatmap(heatmap_data, linewidths=0.4, cmap="YlGnBu")
        plt.title(f"Activity Heatmap{' - ' + sender if sender else ' (Overall)'}")
        plt.xlabel("Hour of Day")
        plt.ylabel("Weekday")

    buf = BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    return Response(buf.getvalue(), mimetype='image/png')


def active_month_plot(df, sender=None):
    """Thread-safe: Line plot of monthly activity (overall or per sender)."""
    year = datetime.now().year
    df_filtered = (
        df[(df['DateTime'].dt.year == year) & (df['sender'] == sender)]
        if sender else df[df['DateTime'].dt.year == year]
    )
    title = f"Active Months in {year}{' for ' + sender if sender else ''}"

    month_value = df_filtered['DateTime'].dt.month.value_counts().sort_index()
    x, y = list(month_value.index), list(month_value.values)

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(x, y, marker='o', linestyle='-', linewidth=2)
    ax.set_xlabel('Month')
    ax.set_ylabel('Frequency')
    ax.set_title(title)
    ax.set_xticks(range(1, 13))
    ax.grid(True, linestyle='--', alpha=0.5)

    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return Response(buf.getvalue(), mimetype='image/png')


def active_month_pie(df, sender=None):
    """Thread-safe: Pie chart showing monthly message distribution."""
    year = datetime.now().year
    df_filtered = (
        df[(df['DateTime'].dt.year == year) & (df['sender'] == sender)]
        if sender else df[df['DateTime'].dt.year == year]
    )
    title = f"Monthly Activity Distribution ({year}){' for ' + sender if sender else ''}"

    all_months = range(1, 13)
    month_names = [datetime(2000, m, 1).strftime('%B') for m in all_months]
    month_counts = df_filtered['DateTime'].dt.month.value_counts().sort_index().reindex(all_months, fill_value=0)

    fig, ax = plt.subplots(figsize=(8, 8))
    if month_counts.sum() == 0:
        ax.text(0.5, 0.5, 'No activity data found!', ha='center', va='center', fontsize=14)
        ax.axis('off')
    else:
        ax.pie(
            month_counts.values,
            labels=month_names,
            autopct=lambda p: f'{p:.1f}%' if p > 0 else '',
            startangle=90,
            shadow=True
        )
        ax.axis('equal')
        ax.set_title(title)

    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return Response(buf.getvalue(), mimetype='image/png')


def month_activation_plot(df, month=None, sender=None):
    """Thread-safe: Line chart of daily activity within a month."""
    month_num = int(month) if month else datetime.now().month
    month_name = calendar.month_name[month_num]

    df_filtered = (
        df[(df['DateTime'].dt.month == month_num) & (df['sender'] == sender)]
        if sender else df[df['DateTime'].dt.month == month_num]
    )
    title = f"Monthly Activation Rate ({month_name}){' for ' + sender if sender else ''}"

    month_data = df_filtered['DateTime'].dt.day.value_counts().sort_index()
    x, y = month_data.index.tolist(), month_data.values.tolist()

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(x, y, marker='o', linestyle='-', color='b')
    ax.set_xlabel('Days of Month')
    ax.set_ylabel('Frequency')
    ax.set_title(title)
    ax.set_xticks(range(1, 32))
    ax.grid(True, linestyle='--', alpha=0.5)

    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return Response(buf.getvalue(), mimetype='image/png')


