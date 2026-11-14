
# Log Monitors

In Datadog, you can create a variety of [Monitors](https://docs.datadoghq.com/monitors/) to alert you about different types of changes in your infrastructure and applications.

Datadog specifically provides [Log Monitors](https://docs.datadoghq.com/monitors/types/log/) so that you can use log queries to create alerts for log activity. You can track the following and more for any subset of **indexed logs**:

- the count of logs
- the count or statistics of an attribute’s values
- anomalous behavior of logs or attributes in logs

# Error Tracking

Error Tracking for Logs simplifies debugging for you by grouping logs with similar errors into a single Error Tracking issue. An issue is an aggregation of error data that provides insights such as

- How many users have been impacted
- When the error first occurred
- Which commit probably caused the error

Error Tracking enables you to do the following:

- Track, triage, and debug fatal errors
- More easily identify important errors and reduce noise
- Follow issues over time to know when they first started, if they are still ongoing, and how often they occur
- Set [Error Tracking Monitors](https://docs.datadoghq.com/monitors/types/error_tracking/) to track error-related activities, such as high error volume or new issues
- Open cases in [Case Management](https://docs.datadoghq.com/service_management/case_management/) or incidents in [Incident Management](https://docs.datadoghq.com/service_management/incident_management/) to help you start investigating and remediating issues

# Watchdog Insights

[Watchdog](https://docs.datadoghq.com/watchdog/) is Datadog’s AI engine that provides you with automated alerts, insights, and root cause analyses. Watchdog continuously monitors data ingested for APM, Continuous Profiler, Log Management, and infrastructure. Watchdog then calls attention to the signals that matter most, helping you to detect, troubleshoot, and resolve issues. All Watchdog features come built-in and do not require setup.

There are two types of Watchdog Insights specific to Log Management:

- Log Anomaly Detection - Ingested logs are analyzed at the intake level where Watchdog performs aggregations on detected patterns as well as `environment`, `service`, `source` and `status` tags. These aggregated logs are scanned for anomalous behaviors, such as the appearance or increase of logs with a warning or error status, and surfaced as insights matching the search context.
- Error Outliers - Error outliers display fields such as faceted tags or attributes containing characteristics of errors that match the current query. Statistically overrepresented `key:value` pairs among errors provide hints into the root cause of problems.

# Generate Metrics

As mentioned earlier, you may not index all of your ingested logs. For example, for a subset of logs, you may decide to use an index with an exclusion filter to keep only a certain percentage of logs and exclude the rest. In cases like this, you may want to keep track of the total count of logs that were ingested for the subset. You may also want to create a metric for the unique counts or distribution of an attribute’s values in these log. To do so, you can create these metrics using [Generate Metrics](https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics/).

With log-based metrics, you can generate a count metric of logs that match a query or a [distribution metric](https://docs.datadoghq.com/metrics/distributions/#overview) of a numeric value contained in the logs, such as request duration, at 10s granularity. You can use these metrics in metric-based monitors, dashboard widgets, and notebook widgets to alert on or visualize trends and anomalies over all of your log data for 15 months. For example, after creating a custom metric for a subset of logs, you can create an [Anomaly Monitor](https://docs.datadoghq.com/monitors/types/anomaly/) to detect anomalous behavior, strong trends, and recurring patterns for the logs based on historical data.

# Dashboard Reporting

[Dashboards](https://docs.datadoghq.com/dashboards/) are the place to bring together related data and assets (such as monitor summaries, error tracking issues, service level objectives (SLOs), etc.) to display for yourself and your team for investigations and reporting. In the example shown, different types of log data are visualized in different ways to provide insight into an app’s performance based on log data. These visualizations are part of a larger dashboard that provides a comprehensive view of the app’s performance.
![[Pasted image 20261023010157.png]]

Each visualization tile is called a widget. In the following lab, you’ll work with three types of widgets, described below.


# Summary

A signifcant aspect of observability with logs is being able to monitor and investigate your logs to maintain the health, performance, and security of your infrastructure and applications.

Datadog provides many features for you to use to achieve these goals.

- Log Monitors - Monitors in which you can directly query and alert on logs
- Error Tracking for Logs - Issues that aggregate details about error logs
- Watchdog Insights for Logs - Insights about anomalies and outliers in logs detected by Datadog automatically
- Generate Metrics - Metrics that you can create for log data
- Dashboard Reporting - Widgets in which you can query logs directly, as well as widgets that you can display related data and assets (such as monitor summaries, error tracking issues, etc.) alongside log data.

An additional product that wasn’t covered in this course is Cloud SIEM (Security and Incident and Event Management), which uses logs to detect threats and attacks in your infrastructure and applications. The course [Detect and Investigate Threats with Cloud SIEM](https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats) covers basics about how to use this product.

To learn more about Dashboards, you can take the [Introduction to Dashboards](https://learn.datadoghq.com/courses/intro-dashboards) course.

To learn more about Incident Management, you can take the Introduction to [Incident Management](https://learn.datadoghq.com/courses/intro-to-incident-management) course.