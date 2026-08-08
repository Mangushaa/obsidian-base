
This servers is working together to resolver dns -> ip

- **Root server**  - forward request to related TLD server. There are only 13 root server clusters managed by diffirent www organozations
- **TLD server**  - stores information about realted domain .com, .org, etc. Forwards request to needed Authoritative name server.
- **Authoritative name server** - holds actual DNS records dn -> ip, provide final answer to dns lookup.