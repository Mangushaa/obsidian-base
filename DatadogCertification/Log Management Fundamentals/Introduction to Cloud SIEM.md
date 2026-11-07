Many security teams use a Security Information and Event Management (SIEM) tool to centralize, normalize, and analyze that data, correlating activity across sources to detect threats, investigate incidents, and meet compliance requirements. Datadog Cloud SIEM is a cloud-native SIEM built on Datadog’s Log Management platform, capable of analyzing logs in real time at any volume. Cloud SIEM also uses Datadog’s deep observability data to help analysts understand the context for detected threats and prioritize the most critical alerts, without switching between tools.


# Key log sources

Cloud SIEM is most effective when it has visibility across your entire environment. Key log source categories include:

- **Cloud audit logs** (AWS CloudTrail, GCP Audit Logs, Azure Activity Logs): record API calls and administrative actions, forming the foundation for cloud security monitoring.
- **Identity and authentication logs** (Okta, Auth0, Azure AD): track authentication events, MFA challenges, and account activity, critical for detecting account compromise and impossible travel scenarios.
- **Network flow logs** (AWS VPC Flow Logs, Azure NSG Flow Logs, GCP VPC Flow Logs): capture connection metadata useful for detecting lateral movement and data exfiltration.
- **SaaS and collaboration logs** (Microsoft 365, Google Workspace, Slack, GitHub): track user activity across collaboration and developer platforms.
- **Endpoint and third-party security logs** (CrowdStrike, SentinelOne, Amazon GuardDuty): forward alerts and findings from specialized security tools.

# Content Packs

Content Packs bundle security content for specific log sources—detection rules, dashboards, investigation tools, and SOAR workflow blueprints—all in one package. Installing a Content Pack provides immediate security coverage for that log source: detection rules start generating signals and dashboards populate with your data. Cloud SIEM includes Content Packs for over 90 platforms across cloud audit, identity, collaboration, network, endpoint, developer tools, and web security categories. The Content Packs Explorer lists available packs and guides you through configuration.

# Normalization with OCSF

Every log source uses its own format and field names. AWS CloudTrail stores usernames in userIdentity.userName, Okta uses actor.alternateId, and Azure AD uses userPrincipalName. Source IPs, action names, and resource identifiers all differ too. Without normalization, you’d need a separate detection rule for every source—and investigation queries would require memorizing source-specific field names.

Cloud SIEM addresses this by adopting the [Open Cybersecurity Schema Framework (OCSF)](https://schema.ocsf.io/), an open-source, vendor-neutral schema designed to standardize how security event data is structured. Datadog processing pipelines remap source-specific fields to standardized OCSF attributes at ingestion time. For example, all username fields—regardless of source—map to a consistent OCSF attribute like actor.user.name. OCSF also classifies events into event classes such as API Activity, Account Change, and Authentication, making it easier to correlate related events from different sources. For sources with out-of-the-box integration pipelines (like CloudTrail, Okta, and Azure AD), normalization happens automatically. For other sources, the OCSF processor provides guided field remapping.

This normalization enables key benefits for security teams, including the following:

- **Write-once detection** - a single detection rule written against OCSF attributes works across CloudTrail, Okta, Azure AD, and any future source mapped to OCSF, with no duplication needed.
- **Simplified investigation** - the same query syntax works regardless of where the data came from, so analysts don’t need to remember source-specific field names.
- **Faster onboarding** - when you add a new log source and map it to OCSF, existing detection rules and investigation queries immediately apply to it.

These benefits compound as you add more sources - the more sources you normalize, the more value each detection rule provides.


# Log retention

Cloud SIEM is integrated with Datadog Log Management, giving you flexible storage options:

- **Standard indexing**: for logs that need to be queried frequently with the most compute.
- **Flex Logs**: provides long-term retention up to 15 months while keeping logs searchable.
- **Log Archives**: for logs that are infrequently queried and need long-term storage.

Cloud SIEM analyzes logs in real time at ingestion—you detect threats immediately, regardless of which storage tier you choose. Security signals are retained for 15 months.

# Cloud SIEM with other Datadog Security products

Cloud SIEM is one of several products in the Datadog Security portfolio, each addressing a different layer of the security stack. Cloud SIEM analyzes logs in real time to detect threats across your environment, and is the focus of this course. Other products in the portfolio include:

- **Cloud Security** covers the security posture of your cloud infrastructure: Misconfigurations continuously audits resource configurations against compliance frameworks like CIS and PCI DSS, Identity Risks detects IAM-based risks like excessive permissions and unused credentials, and Vulnerabilities scans containers and hosts for known vulnerabilities.
- **Workload Protection** monitors file, network, and process activity on hosts and containers to detect runtime threats.
- **App and API Protection** detects and blocks application-level attacks like SSRF and SQL injection, and provides API discovery and posture management.
- **Code Security** identifies vulnerabilities in first-party code and open-source dependencies across the development lifecycle.

# Detect Threats

Detection rules are the core of Cloud SIEM. They define the logic that Cloud SIEM applies to incoming logs in real time, and when logs match a rule’s conditions, Cloud SIEM generates a security signal—an actionable finding that your team can investigate and resolve.

# Detection rules and rule components

Cloud SIEM supports three detection rule types.

- **Real-time rules** continuously monitor incoming logs as they arrive, generating security signals immediately when conditions are met.
- **Scheduled rules** run at predefined intervals, useful for detecting slow-moving threats like DNS tunneling or low-and-slow brute force attempts.
- **Historical jobs** are one-time queries against historical data, useful for backtesting new rules.

Cloud SIEM includes hundreds of out-of-the-box (OOTB) detection rules covering common attack techniques and misconfigurations. Datadog’s Security Research team develops and maintains these rules based on threat intelligence and real-world attacker behaviors, and new rules are automatically imported into your account as they’re released. The **[Rules List](https://app.datadoghq.com/security/rules?query=type%3A%28log_detection%20OR%20signal_correlation%29&product=siem)** is where you view, filter, and manage detection rules. Filter by `source` to see rule coverage for a specific log source.

Every detection rule shares the same core components:

- **Detection method** - defines how Cloud SIEM evaluates logs (covered in detail below)
- **Search queries** - specify the log criteria to match
- **Conditions** - determine when to generate a signal and at what severity
- **Playbook** - contains the rule name, investigation message, and tags (including MITRE ATT&CK mappings)
- **Suppressions** - define conditions under which matching logs shouldn’t generate a signal

# Detection methods

Cloud SIEM uses the following detection methods to define how rules evaluate incoming logs:

- **Threshold** detects when events exceed a count within a time window, such as more than 10 failed login attempts in 5 minutes
- **New Value** detects when an attribute takes on a value never seen before for that entity, such as a user authenticating from a new country
- **Anomaly** applies a dynamic threshold derived from an entity’s historical baseline, such as a user who normally makes 50 API calls per hour suddenly making 500
- **Content Anomaly** detects when the _content_ of a log event is unusual compared to its historical baseline, rather than just the frequency
- **Impossible Travel** detects when access events occur from two locations farther apart than a human could physically travel in the elapsed time
- **Third Party** surfaces alerts from external tools (like Amazon GuardDuty) that are forwarded to Datadog as Cloud SIEM signals
- **Signal Correlation** combines multiple existing signals to produce a new, higher-fidelity signal, reducing noise from individual low-severity alerts
- **Sequence** detects an ordered series of events with time constraints, modeling multi-stage attacks such as role assumption followed by privilege escalation followed by data access

# MITRE ATT&CK framework

The **[MITRE ATT&CK framework](https://attack.mitre.org/)** is a knowledge base of adversary tactics and techniques based on real-world observations. Tactics represent the adversary’s high-level goal—the “why”—such as Initial Access, Persistence, Privilege Escalation, or Exfiltration. Techniques represent the specific methods used to achieve that goal—the “how.” Cloud SIEM uses MITRE ATT&CK to organize detection coverage: OOTB rules are pre-tagged with `tactic` and `technique` tags, and signals display these mappings to give analysts immediate context about what stage of an attack the activity represents.

The Cloud SIEM MITRE ATT&CK Map displays your detection rules as a heatmap organized by tactics and techniques. Darker cells indicate denser rule coverage for that technique. The map answers a critical question: “If an attacker uses technique X, do I have a rule that would catch it?” Use it to identify coverage gaps and prioritize which custom rules to build. This concept connects directly to the continuous improvement practices you’ll learn about in Lesson 04.

![The Cloud SIEM MITRE ATT&CK Map showing detection coverage as a heatmap across tactics and techniques.](https://learning-assets.datadoghq.com/intro-to-cloud-siem/lms/assets/02-detect-and-monitor/mitre-attack-map.png)

The Cloud SIEM MITRE ATT&CK Map showing detection coverage as a heatmap across tactics and techniques.


# Triage and Investigate

## Security signals and the Signals Explorer


The **[Signals Explorer](https://app.datadoghq.com/security)** is where you view, search, filter, and correlate security signals. You can filter signals by severity, source, rule, tags, time window, or any attribute in the signal data. Each signal has a severity level—Critical, High, Medium, Low, or Info—and a triage status: **Open** (new), **Under Review** (investigation in progress), or **Archived** (resolved). Signals can be assigned to a Datadog user for ownership, and they’re retained for 15 months.

## Cloud SIEM Investigator

The **[Investigator](https://docs.datadoghq.com/security/cloud_siem/triage_and_investigate/investigator/)** provides a visual, graph-based interface for tracing entity relationships and attack paths. Starting from a signal, you can see how identities, services, and resources are connected—making it easier to understand the full scope of an incident. The Investigator answers questions like: What actions did this identity take? What services did they interact with? What happened after a role was assumed? Were those actions successful?

## Risk Insights

**[Risk Insights](https://docs.datadoghq.com/security/cloud_siem/entities_and_risk_scoring/)** consolidates security data into unified risk profiles for individual entities—IAM users, service accounts, S3 buckets, EC2 instances, Okta users, GitHub repositories, and more. Risk scores are calculated from the severity and frequency of signals associated with each entity over the past 14 days. When Cloud Security is also enabled, misconfigurations and identity risks contribute to the score too. Risk Insights helps you answer the question: “Which entities in my environment are the riskiest right now?”—so you can prioritize investigation effort where it matters most.

## Bits AI for automated triage

**[Bits AI Security Analyst](https://www.datadoghq.com/blog/bits-ai-security-analyst/)** is Datadog’s AI-powered security analyst that automates initial triage of Cloud SIEM signals. For each signal it investigates, Bits AI analyzes the triggering logs and surrounding context, summarizes key evidence, explains its reasoning about whether the activity appears benign or suspicious, and recommends next steps when the signal warrants action. Bits AI uses the MITRE ATT&CK framework as a foundation for its investigations and can pivot between indicators of compromise, query historical signals and log data, and pull in relevant context from across the Datadog platform.

## Threat intelligence

Cloud SIEM enriches logs with **[threat intelligence](https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/threat_intelligence/)** in real time. When incoming logs contain IP addresses or domains that match known indicators of compromise (IOCs), Cloud SIEM appends a `threat_intel` attribute to the log with metadata about the threat—such as the threat category (for example: malware, cryptomining, tor, residential proxy, or scanner).