
# Using Variables for Dynamic Messaging

The following types of variables can be used in notifications:

- **Conditional variables** use if-else logic to display different messages depending on the state of the monitor.
- **Attribute and tag variables** are specific to the resources you are monitoring. They can be used to write descriptive notification messages.
- **Template variables** provide live information about the monitor, such as the value that triggered an alert. They also expose metadata about the monitor, such as the alert threshold.

You can customize your monitor notification message by using tag variables. However, you can only do that if (1) the metric tag follows the `key:value` syntax and (2) the query is grouped by that tag.

# Summary

To wrap up this course, take a moment to review what you’ve accomplished. You’ve learned how to craft descriptive, actionable notification messages using variables to tailor alerts for different scenarios. By now, you should have a solid understanding of how to:

- Identify the components of effective notifications and explain their importance in alert monitors.
- Write descriptive notification messages using conditional, tag, and template variables.
- Discover the available variables and determine which ones to use for specific notification scenarios.
- Create dynamic links and notification handles to improve the clarity and relevance of alerts.
- Evaluate the effectiveness of drafted notification messages through testing, ensuring they provide actionable insights for the intended audience.

While this course has given you a solid start, there’s always more to explore. Experiment with different types of monitors and the variables they offer. Understanding the nuances of each monitor type will make you even more proficient in creating alerts that fit your specific needs.

## Additional resources

Here are some helpful resources to further your learning.

Topics covered in this course:

- [Conditional variables](https://docs.datadoghq.com/monitors/notify/variables/#conditional-variables)
- [Attribute and tag variables](https://docs.datadoghq.com/monitors/notify/variables/#attribute-and-tag-variables)
- [Template variables](https://docs.datadoghq.com/monitors/notify/variables/#template-variables)
- [Dynamic handles](https://docs.datadoghq.com/monitors/notify/variables/#dynamic-handles)
- [Dynamic links](https://docs.datadoghq.com/monitors/notify/variables/#dynamic-links)

Topics mentioned but not covered in this course:

- [Workflows](https://docs.datadoghq.com/monitors/notify/#workflows)
- [Automatic case creation](https://docs.datadoghq.com/service_management/case_management/create_case/#automatic-case-creation)
- [Datadog Teams](https://docs.datadoghq.com/account_management/teams/)
- [Integrations](https://docs.datadoghq.com/monitors/notify/#integrations)