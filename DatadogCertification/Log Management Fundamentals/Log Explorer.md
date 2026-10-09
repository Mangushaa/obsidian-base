
[Log Explorer](https://docs.datadoghq.com/logs/explorer/) is your home base for querying and analyzing your indexed and ingested logs.

In the main Log Explorer view (shown below), you can query and analyze indexed logs. Indexed logs can be used in monitors, dashboards, and notebooks.

![[Pasted image 20261004015314.png]]

In the Live Tail tab, you can query near real-time ingested logs. Ingested logs can be used for Watchdog (automated) Insights, Error Tracking, generating metrics, and Cloud SIEM detection rules.

![[Pasted image 20261004015340.png]]


# Querying and Analytics

To filter your logs using the search field, you can follow these basic syntax rules:

![[Pasted image 20261004021157.png]]
![[Pasted image 20261004023912.png]]
Separate each search term in a query with a space.

![[Pasted image 20261004021316.png]]

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:
![[Pasted image 20261004021345.png]]

In the example below, the search query is `service:(webstore OR mobile-store) -status:info`. The logs will be filtered to only logs with either the `service:webstore` tag OR the `service:mobile-store` tag and a status value that is not `info`.

#  Facets and Measures

Your logs contain thousands of unique attributes that change over time. You can create [facets and measures](https://docs.datadoghq.com/logs/explorer/facets/) from tags and attributes in your indexed logs. Facets/measures appear in the facet list on the left side of Log Explorer

You can add a facet or measure for a tag or attribute from the log details. When you click a tag or attribute in the log details, a menu will appear. If the value is a string, you’ll only have the option to create a facet. If the value is a number, you’ll have the option to create a facet or measure, as shown in the example below.


![[Pasted image 20261004021703.png]]

# Fields Aggregations

In Log Explorer, you’ll find three options for “Group into” [aggregations](https://docs.datadoghq.com/logs/explorer/analytics/):

- Fields - Logs matching your search query are aggregated into groups to displayed in visualizations as counts and/or statistics.
- Patterns - Logs that have similar formats are listed in groups.
- Transactions - Logs are grouped according to instances of a sequence of events, such as a user session or a request processed across multiple microservices. For example, all the log events related to a user session will be grouped together and each grouping will be listed as a transaction.

There are six different visualizations in Log Explorer.

[Timeseries](https://docs.datadoghq.com/logs/explorer/visualize/#timeseries) - Graph of the counts of logs or statistics for a single measure over a selected time frame based on the search query. You can optionally split by up to three available facets.

![Example Timeries graph of service:webstore @http.method:POST grouped by Status.](https://learning-assets.datadoghq.com/log-explorer/lms/assets/timeseries_example.png)

Example Timeries graph of service:webstore @http.method:POST grouped by Status.

[Top List](https://docs.datadoghq.com/logs/explorer/visualize/#top-list) - List of the top values of counts or statistics based on a search query over the selected time frame.

![Example Top List graph of service:webstore @http.method:POST grouped by Status.](https://learning-assets.datadoghq.com/log-explorer/lms/assets/toplist_example.png)

[Table](https://docs.datadoghq.com/logs/explorer/visualize/#nested-tables) - List of the counts or statistics based on a search query over the selected time frame.

![Example Table graph of service:webstore @http.method:POST grouped by Status.](https://learning-assets.datadoghq.com/log-explorer/lms/assets/table_example.png)

[Tree Map](https://docs.datadoghq.com/logs/explorer/visualize/#tree-map) - Organize and display data in nested rectangles to show percentage as a whole.

![Example Tree Map graph of service:webstore @http.method:POST grouped by Status.](https://learning-assets.datadoghq.com/log-explorer/lms/assets/treemap_example.png)

[Pie Chart](https://docs.datadoghq.com/logs/explorer/visualize/#pie-chart) - Organize and graph data as a percentage of a whole.

![Example Pie Chart graph of service:webstore @http.method:POST grouped by Status.](https://learning-assets.datadoghq.com/log-explorer/lms/assets/piechart_example.png)

#  Export Options and Saved Views