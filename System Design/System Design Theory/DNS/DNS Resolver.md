
Client not do dns lookup itselft, it calls DNS Resolver to do it insted. 

DSN Resolver is for example google DNS 8.8.8.8, or Cloudware DNS 1.1.1.1. They additionally caches dns records to decrease latency.

- Stub resolver - basically just a entry point for real dns installed in laptop, phone etc.
- Recursive resolver - stores dns records, and if record is not in cache, performs lookup itself, without  client, after cache records, and return to client.
- Cache only resolver - similar to recursive one, but not perform dns lookup itselft but with client behalf.
- Forwarder - 