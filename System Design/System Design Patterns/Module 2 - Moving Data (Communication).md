
# The Seven Patterns

| The situation                                                | The pattern                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| The caller needs the answer before it can continue           | [Request-Response](https://www.designgurus.io/course-play/system-design-patterns/doc/requestresponse)                   |
| The work can happen later, and nobody waits for it           | [Message Queue](https://www.designgurus.io/course-play/system-design-patterns/doc/message-queue)                        |
| Something happened, and several services need to know        | [Publish-Subscribe](https://www.designgurus.io/course-play/system-design-patterns/doc/publishsubscribe)                 |
| Put the details inside the event, so nobody has to call back | [Event-Driven Architecture](https://www.designgurus.io/course-play/system-design-patterns/doc/eventdriven-architecture) |
| Another company's system needs to be notified                | [Webhooks](https://www.designgurus.io/course-play/system-design-patterns/doc/webhooks)                                  |
| A continuous stream of updates in one direction              | [Server-Sent Events](https://www.designgurus.io/course-play/system-design-patterns/doc/serversent-events)               |
| Both sides send messages continuously                        | [Bidirectional Streaming](https://www.designgurus.io/course-play/system-design-patterns/doc/bidirectional-streaming)    |

# Request-Response

One practical detail has a large effect on performance: opening a new connection is expensive. Each connection begins with TCP and TLS handshakes, which are setup messages that establish and secure the link. These handshakes require one to three network round trips, or around 100 ms across regions.

**Connection pooling**, also called keep-alive, keeps connections open so later calls can reuse them. Every production HTTP client supports this behavior, but you should confirm that it is enabled.

## When Not to Use It

**Long-running work.** Work that takes more than a few seconds should not keep a caller waiting. Accept the job, return a "job started" response immediately, and deliver the result through a queue, status endpoint, or [webhook](https://www.designgurus.io/course-play/system-design-patterns/doc/webhooks).

**Notifying many services about one event.** Calling five services separately because each one needs the same order update creates unnecessary coupling. The [Publish-Subscribe](https://www.designgurus.io/course-play/system-design-patterns/doc/publishsubscribe) lesson begins with this problem and publishes the event instead.

**Chains that have grown too deep.** With six synchronous calls in sequence, availability has already fallen and latency has already increased. Shorten the chain, run independent calls in parallel, cache results, or move suitable work to a queue.


## Summary

|   |   |
|---|---|
|**Problem**|Every arrow between services needs a default, and both mistakes are common: going async where someone is waiting, and adding synchronous calls in sequence until latency and fragility compound.|
|**Mechanism**|The caller waits for the answer: a result or an error, now. Pool and reuse connections, run independent calls in parallel, and wrap every call with timeout, retry, and circuit breaker.|
|**Costs**|Both sides must be up at the same moment, availability multiplies per call, latency adds when sequential, and every waiting caller holds a thread.|
|**Skip it when**|Nobody is waiting, the work takes too long for a held connection, many services care about the same event, or the chain has grown too deep.|
|**30-second answer**|The right default whenever the next step depends on the answer: a synchronous, traced, protected call, with independent calls in parallel, and everything nobody waits on moved to queues and events.|

# Message Queue

> **A message queue is a durable list of tasks between the producer and the consumer. Durable means the list is saved to disk, so a crash does not lose it. The producer adds a task and moves on immediately. The consumer works through tasks at its own pace. The queue keeps every task safe until a consumer confirms it is done.**

![[Pasted image 20261027020500.png]]

Four mechanics provide this behavior, and each one answers a failure question.

**1. The queue saves the message before confirming.** A broker is the software that manages the queue. It writes each message to disk before confirming receipt to the producer. After that confirmation, a worker crash, deployment, or hour of downtime does not lose the work because the message remains stored.

**2. Workers confirm after finishing, not before.** A worker receives a message, completes the job, and then sends an acknowledgment called an ack. If the worker crashes during processing, the broker waits for a configured visibility timeout. When no ack arrives, it gives the message to another worker.

This behavior has an important consequence. A worker might complete the job and then crash before sending its ack. The broker cannot distinguish that case from a crash during processing, so it delivers the message again and the job runs twice. This is **at-least-once delivery**: each message arrives one or more times, but never zero times. Preventing lost work therefore creates occasional duplicate work.

Every consumer consequently needs [idempotency](https://www.designgurus.io/course-play/system-design-patterns/doc/idempotency). Idempotent processing produces the same result whether a job runs once or twice. A later lesson covers this property fully, but the module rule is enough for now: duplicate delivery is normal and must be planned for.

**3. Many workers share one queue.** Each message is assigned to exactly one worker. If the system needs greater throughput, meaning more completed messages per second, add workers. This arrangement is called competing consumers and does not require custom coordination code.

**4. Queue depth is the clearest signal of health.** Depth counts the waiting tasks, or arrivals minus completions accumulated over time. Rising depth during a short spike shows that buffering is working. Depth that rises for a week indicates a capacity problem, as the self-check explains.

Together, these mechanics separate three concerns that the synchronous design combined:

1. **Rate:** producers can burst to 5,000 per second while workers steadily process 400.
2. **Time:** workers can be down, deploying, or not built yet. The work waits.
3. **Failure:** a worker crash becomes a redelivery, not lost data. The producer never notices.

## Trade-offs

- Spikes become backlog instead of errors, limited by disk instead of by your slowest service.
- A worker being down becomes a growing task list, not an outage. Deploys stop being risky.
- Producers and workers scale separately. Queue depth is a ready-made signal for [auto-scaling](https://www.designgurus.io/course-play/system-design-patterns/doc/autoscaling).
- Redelivery gives you retry behavior without writing retry code. The broker does it.

**You pay:**

**Latency, on purpose.** Processing now completes seconds or minutes later, so work that a user actively waits for does not belong on a queue.

**Duplicates.** At-least-once delivery requires idempotent workers rather than treating idempotency as an optional improvement.

**Ordering is lost.** With twenty workers processing concurrently, messages may finish in a different order from their arrival. Key-based ordering can preserve sequence for one customer, but it reduces some throughput. The self-check demonstrates the failure caused by ignoring this constraint.

**A gap between "accepted" and "done."** An order can be confirmed before fulfillment begins, so the product team must define what users see during this period.

**More parts to operate.** The system now includes a broker, monitoring for depth and message age, and storage for repeated failures. The [dead letter queue](https://www.designgurus.io/course-play/system-design-patterns/doc/dead-letter-queue) lesson covers that storage. Debugging also crosses several systems instead of following one stack trace.


## Message Queue vs. Publish-Subscribe

Both patterns use a broker and asynchronous delivery, which makes them easy to confuse. However, they answer different questions.

|                         | Message Queue                 | [Publish-Subscribe](https://www.designgurus.io/course-play/system-design-patterns/doc/publishsubscribe) |
| ----------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| A message is            | A **job**: work to do once    | A **fact**: something that happened                                                                     |
| Delivered to            | Exactly one of the workers    | Every subscriber, separately                                                                            |
| Adding a consumer       | More workers for the same job | Another use of the same fact                                                                            |
| The question it answers | "Who does this task?"         | "Who cares that this happened?"                                                                         |

## Real-World Examples

- **AWS SQS** is the pattern in its purest form: visibility timeouts, dead-letter support, near-unlimited depth, pennies per million messages.
- **RabbitMQ** is the classic self-hosted broker. It adds rich routing options on top of the same ack-and-redeliver core.
- **Kafka** is technically a replicated log rather than a queue. A replicated log is an append-only record copied across several machines. Its consumer groups behave like a queue. Its ability to replay old messages supports [event-driven architecture](https://www.designgurus.io/course-play/system-design-patterns/doc/eventdriven-architecture) and the [stream processing](https://www.designgurus.io/course-play/system-design-patterns/doc/stream-processing) patterns later in the course.
- **Celery, Sidekiq, BullMQ**: the same pattern packaged as an application library. This is where most engineers first meet it.

**For AI engineers:** GPU workloads suit queues because they are expensive, bursty, and usually not urgent. Queues commonly supply embedding pipelines, batch inference, fine-tuning jobs, and evaluation runs. Queue depth, or preferably the age of the oldest message, provides the standard signal for [GPU auto-scaling](https://www.designgurus.io/course-play/system-design-patterns/doc/gpu-autoscaling). A RAG ingestion pipeline uses the same pattern, with a [dead letter queue](https://www.designgurus.io/course-play/system-design-patterns/doc/dead-letter-queue) collecting failures. Anthropic and OpenAI batch APIs package this trade-off as a product, charging less when the work can finish later.

# Publish-Subscribe

 The producer publishes a fact to a named channel, called a topic, exactly once. It does not know who is listening. The broker then delivers a separate copy to every subscription. Each subscriber processes its copy at its own pace, with its own failure handling.

## Trade-offs

**You gain:**

- The producer's cost and risk stay constant no matter how many consumers exist.
- Teams ship on their own schedules. This organizational decoupling is the biggest benefit in practice.
- Failures are isolated per subscription. With history retention, new consumers can start with the full past.

**You pay:**

**Your event format is a public API now.** A renamed field can break unknown consumers. Deploy-time coupling is replaced by contract discipline through schema registries, additive-only changes, and deprecation windows. A deprecation window is a defined period during which the old version continues to work.

**Duplicates, multiplied.** Each subscription independently provides at-least-once delivery, meaning it may deliver an event more than once but never zero times. Five subscribers create five separate places that require [idempotency](https://www.designgurus.io/course-play/system-design-patterns/doc/idempotency). Idempotent processing produces the same result whether an event is handled once or twice.

**Invisible coupling.** Teams may lose track of which services consume a topic. The dependency still exists, although it is no longer visible in producer code, so mature organizations maintain a subscriber catalog.

**No "all done" signal.** Each subscription knows only its own progress, so pub/sub cannot confirm that every required action for order X has finished. Workflows that require this answer need explicit coordination.

This limitation affects user-visible completion because publishing one event cannot prove that an order is ready. When inventory, payment, and shipping must finish before success, a coordinator tracks those steps, while pub/sub handles independent reactions after each one.

**Slow consumers can lose data.** Brokers retain history for a limited retention window. When a subscriber falls farther behind than that window, it permanently loses events rather than merely processing them late. Monitor the age of every subscription backlog.

Set that alert well before retention expires so the team has time to recover, add capacity, or rebuild the subscription from another authoritative copy before the broker permanently deletes history that the consumer has not processed.

## Choreography vs. Orchestration

Pub/sub supports **choreography**, in which services react independently to events and their combined behavior forms the overall process. **Orchestration** uses one coordinator to execute a workflow step by step. These approaches suit different dependencies.

|                               | Choreography (pub/sub)                            | Orchestration (a coordinator)                                               |
| ----------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------- |
| Who is in control             | Nobody central; behavior emerges                  | The coordinator, explicitly                                                 |
| Adding a step                 | New subscription, no coordination                 | Update the coordinator's workflow                                           |
| "Is order X fully processed?" | No single place knows                             | The coordinator knows, by design                                            |
| Failure handling              | Each consumer handles its own                     | The coordinator retries, undoes, escalates                                  |
| Best for                      | Independent reactions: analytics, email, indexing | Sequences where each step depends on the last: inventory, payment, shipping |

## Real-World Examples

- **AWS SNS feeding SQS queues** is this pattern built from managed services. SNS is the topic, and each team's SQS queue is its subscription. Broadcast first, then each team gets its own task list.
- **Kafka** treats each consumer group as an independent subscription over a stored log. That is why it dominates this space: broadcast, replay, and per-team queue behavior in one system.
- **Google Cloud Pub/Sub** is the same model, fully managed. Subscriptions are objects you create and manage directly.
- **Redis Pub/Sub** is the cautionary example. It is fire-and-forget: if a subscriber is offline, the message is gone permanently. "Pub/sub" without durable subscriptions is a much weaker promise with the same name. Always check which one you are being offered.


# Event-Driven Architecture

In an event-driven architecture, services talk to each other through events. One decision decides whether it works: how much data each event carries. Carry enough, and a consumer can finish its job on its own. Carry too little, and it has to call you back for the rest, which is the storm described above.

![[Pasted image 20261028234759.png]]


## Trade-offs

**You gain:**

- Independence: consumers read locally, stay up when the producer is down, and never overload anyone with callbacks.
- Producer load that does not depend on how many consumers exist or how much data they need.
- Views that can be rebuilt from history, which makes recovery and onboarding the same operation: replay.

**You pay:**

**Copies everywhere.** Six services may store order data in six different shapes. Storage is inexpensive, but every team must remember that these copies are disposable and the owner's store remains authoritative.

**Eventual consistency, always.** Every view has some delay, so the product must handle cases such as a support dashboard showing data that is 40 seconds old.

**Personal data spreads.** Including a customer's email in a full-state event copies it into every subscriber and the retained topic. A deletion request must then clean N+1 locations, as the self-check demonstrates.

This privacy cost should influence the schema before publication by limiting it to widely needed facts, classifying sensitive fields, and recording every subscribing owner. Encryption protects stored data but does not remove the need to delete or restrict unnecessary copies, so a convenient event field can become a long-term compliance obligation.

**The schema matters even more.** Larger events expose more public fields. Schema registries, additive-only changes, and a consumer catalog become mandatory rather than optional.

**Harder debugging.** Each service has its own timestamped answer for order X. Correlation IDs, which identify the same request across events and logs, and [distributed tracing](https://www.designgurus.io/course-play/system-design-patterns/doc/distributed-tracing) become essential.

Operators also need replay procedures that are safe to repeat. Rebuilding one view should not resend emails, charge payments, or trigger other external effects. Separate state-building consumers from side-effecting consumers, and test replay against production-sized history before relying on it during recovery.

##  When Not to Use It

**Inside one service.** Functions inside a monolith already share consistency and transactions. Event-driven architecture addresses boundaries between services and teams, so applying it without those boundaries adds unnecessary complexity.

**When the read must be exactly current.** Selling the last inventory unit or approving a withdrawal requires the latest value. Route these reads synchronously to the owning service and use local views for data that can tolerate a delay.

**Request-response, rebuilt from events.** Full-state events do not improve a workflow that remains a synchronous dependency. The warning from the pub/sub lesson still applies.

**Before the team is ready.** Without schema enforcement, tracing, and backlog alerts, event-driven systems are difficult to operate. A smaller number of services using direct calls can be the safer design until those capabilities exist.

Another misuse is introducing events to avoid assigning data ownership. If six services keep views but none owns the fact, their copies can diverge without any authoritative answer. Every fact needs one owning service, while events distribute that service's data.

Ownership also determines how corrections work: a consumer should not repair an order field locally and publish a competing truth. It sends a command to the owning service, which validates the change and publishes a new fact that makes every view converge through the same ordered path.

## Notification Events vs. Full-State Events

The two practical levels have different strengths:

|                                   | Notification (Level 1)                        | State transfer (Level 2)                                |
| --------------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| The event contains                | Just an ID: "go look it up"                   | The facts themselves                                    |
| When a consumer needs data        | Calls the producer                            | Reads its own local view                                |
| Producer's read load              | Grows with consumer demand                    | Zero                                                    |
| Copies of data / privacy exposure | Minimal                                       | Every subscriber, plus retained history                 |
| Freshness                         | The lookup is always current                  | Views lag slightly behind                               |
| Best when                         | Few consumers need details; data is sensitive | Many consumers need the same data; independence matters |

## Real-World Examples

- **LinkedIn** built Kafka for exactly this: activity events as one large stream that every team reads to maintain its own view. The "central nervous system" nickname for Kafka started there.
- **Uber**: a trip is a stream of events long before it is a database row. Pricing, ETA prediction, fraud, and driver payments each consume it independently.
- **Bank ledgers** are an early form of the pattern: transactions are immutable facts, and your balance is a view computed from them. Event-driven design predates software.
- **Netflix** runs viewing events through the same kind of central stream into recommendations, artwork personalization, and capacity planning.

# Webhooks

Unlike earlier examples, the other side of this connection belongs to another company. A webhook applies pub/sub across that boundary, where the sender controls its timeout, retry schedule, and endpoint-disable policy. Your system must operate correctly under those fixed rules.

> **A webhook is an event delivered as an HTTP POST from another organization. The receiving rule: check it is authentic, save it, respond "received" within milliseconds, and do the actual work later, behind your own queue.**


![[Pasted image 20261029003630.png]]

Apply five rules in the order that each request encounters them.

1. **Verify before you believe.** The webhook URL is public, so anyone can send `{"type": "payment.succeeded"}` to it. Providers attach an HMAC, which is a hash computed with a secret key shared only by both companies. Recompute that HMAC and compare it before accepting the event. Also check the provider's timestamp to prevent replay of an old, valid message. Without these checks, an attacker can mark unpaid orders as paid.
2. **Save it and acknowledge. Nothing else.** Store the raw event, place it on your [message queue](https://www.designgurus.io/course-play/system-design-patterns/doc/message-queue), and return 200 in about 15 ms. **200 means "safely received," never "fully processed."** Inventory, warehouse notification, and receipts run later behind your queue, using your retry and failure policies. The provider's 5-second deadline no longer affects business processing.
3. **Deduplicate on the event ID.** Providers document at-least-once delivery because they resend whenever success is uncertain. Use each unique event ID as an [idempotency](https://www.designgurus.io/course-play/system-design-patterns/doc/idempotency) key so repeated processing has only one effect. This rule prevents duplicate shipments.
4. **Do not trust the order, or the payload's freshness.** A "refund updated" event may arrive before its related "charge succeeded" event. For state-dependent decisions, treat the webhook as notice of a change and fetch current state from the provider's API. That API is the source of truth, or the authoritative copy, while a retried payload may be hours old. Stripe recommends this approach.
5. **Reconcile, because silence is not success.** Events may never arrive because an endpoint was disabled, an outage exceeded the retry window, or a network path failed silently. Periodically request everything changed after a stored marker, often called a watermark. The webhook tells you quickly. The sweep tells you about everything, including the events that never arrived.

## Trade-offs

**You gain:**

- Near-real-time updates from other companies, without constant polling.
- The provider's retry machinery working for you, now that your handler responds quickly.
- One consistent entry point for external events, feeding queue-and-worker machinery you already know how to run.

**You pay:**

**You inherit their rules.** Each provider defines its own at-least-once delivery, ordering, retry schedule, disable policy, and payload versioning. Every integration therefore has a separate contract to understand.

**A public endpoint to defend.** Signature validation, timestamp windows, and secret rotation become part of your security boundary. Anyone with a leaked signing secret can forge "payment succeeded" events.

**Debugging across a boundary.** Determining whether the sender failed to send or your service dropped an event requires the provider's dashboard, your raw-event records, and comparable timestamps. Saving the raw request makes this investigation possible.

Use one correlation record for every event ID across receipt, queue processing, business effects, and reconciliation, allowing an operator to determine whether an event arrived more than once and whether downstream work succeeded. Without this record, each team sees only one part of the transaction.

**The polling loop never goes away.** Reconciliation provides completeness, while webhooks provide timely notification. Production systems operate both mechanisms permanently.

Store the reconciliation bookmark only after recovered events enter durable processing and record the covered time range for complete later audits. Advancing it earlier can create another silent gap if the job stops between reading the provider's response and saving its events. Replaying an earlier bookmark is safe when event IDs provide reliable deduplication across both webhook and polling paths, even after a partial reconciliation failure.

Monitor reconciliation lag as well.

## Webhooks vs. Polling

| Webhooks (push)                | Webhooks (push)          | Polling (pull)                    |
| ------------------------------ | ------------------------ | --------------------------------- |
| Freshness                      | Seconds                  | However often you poll            |
| Cost when nothing is happening | Nearly zero              | Constant "anything new?" requests |
| Completeness                   | Best effort: gaps happen | Guaranteed, eventually            |
| Who controls delivery          | The sender               | You                               |
| Worst failure looks like       | A quiet day              | Stale data (visible, at least)    |

## Real-World Examples

- **Stripe** is the reference implementation of everything above. It has signed payloads with timestamp checks, event IDs for dedupe, retries spread over days, and endpoint auto-disable. Its official advice is to fetch current state instead of trusting payload freshness.
- **GitHub** signs deliveries with `X-Hub-Signature-256` and gives you a delivery log with a redeliver button: the sender-side obligations, done well.
- **Slack** requires a 200 within **3 seconds** on event deliveries. Nobody's business logic fits in 3 seconds, and that is the point: the contract forces accept-first, work-later.
- **Twilio, Shopify, PayPal**: every integration-heavy platform converges on the same contract terms, because the failure modes converge.

# Server-Sent Events

> **SSE is one HTTP response that never ends. The client connects once, and the server keeps the connection open, pushing a small text message down it whenever there is news.**

![[Pasted image 20261029235447.png]]

Four properties make SSE suitable for one-way updates.

**It is just HTTP.** An SSE stream is an ordinary HTTP response that remains open and uses the `text/event-stream` content type. It needs no protocol upgrade or specialized handshake. Existing load balancers, TLS, authentication middleware, and proxies can process it, which explains most of its operational simplicity.

**Reconnection is built into the browser.** Deployments, tunnels, and closed laptops regularly interrupt connections. The browser's `EventSource` API reconnects automatically and includes a `Last-Event-ID` header identifying the last message received. The server retains a short **replay buffer** of recent events and resends any missing IDs.

A reconnect may deliver the same message twice. Event IDs therefore act as deduplication keys, and the client ignores IDs it already processed. This [idempotency](https://www.designgurus.io/course-play/system-design-patterns/doc/idempotency) requirement makes repeated delivery have the same effect as one delivery.

**Held-open connections change the server math.** 200,000 connections cannot each occupy a thread. **Async I/O**, used by systems such as Node, Go, and Nginx, lets one event-loop thread monitor thousands of idle connections and react only when data arrives. An SSE server can therefore hold tens of thousands of connections per machine with only a few tens of kilobytes of memory for each one.

Infrastructure between the server and browser can still change the behavior. Some load balancers, reverse proxies, and corporate networks **buffer** responses by collecting output before forwarding a batch. That is harmless for a normal response but turns live events into 30-second batches.

Disable buffering for stream routes, increase idle timeouts, and send a small heartbeat comment about every 15 seconds. Heartbeats keep intermediate equipment from closing an apparently idle connection. Use HTTP/2 at the edge so many streams can share one connection and avoid the older browser limit of 6 connections per domain.

Authentication must also outlive a normal request. Validate the session when opening the stream and close it when credentials expire or access is revoked. Because one connection may remain open for hours, do not assume the initial authorization remains valid forever. Reconnecting then performs the normal authentication check again.

## Trade-offs

**You gain:**

- Push over plain HTTP: your existing middleware, proxies, and tools work unchanged.
- A browser-native client with reconnect-and-resume you did not have to write.
- Costs proportional to events, not to audience size or polling frequency.

**You pay:**

**One direction only.** SSE is insufficient once the client must stream typing, cursor positions, voice, or similar data back to the server. The [Bidirectional Streaming](https://www.designgurus.io/course-play/system-design-patterns/doc/bidirectional-streaming) lesson covers that requirement.

**Long-lived connection operations.** Capacity planning must count connections instead of requests. Deployments should drain a server by stopping new connections and allowing existing ones to move. Heartbeats, proxy buffering, and idle timeouts also require explicit configuration.

Load balancing should prefer the machine with the fewest active connections rather than the fewest recent requests. Two servers may process similar request rates while one holds far more streams and consumes much more memory. Track active connections, memory per connection, disconnect rate, reconnect rate, and replay-buffer misses as first-class service metrics.

Test those limits with idle connections and simultaneous broadcasts because they stress different server resources.

**A resume window, not a history.** A replay buffer covers short disconnections rather than providing yesterday's data. If a client reconnects after its event ID has expired, it must detect the gap and fetch current state through the ordinary API. **The stream is a delivery mechanism, never the storage.**

Define the gap response explicitly in the protocol. The server can return a named reset event or close the stream with a status that tells the client to refetch. The client should replace local state from that response before opening a new stream, preventing old and new versions from being combined incorrectly.

**Text only.** Text and JSON work well, but binary audio and video require a media protocol.


## When Not to Use It

1. **The client talks too.** Chat typing indicators, collaborative editing, and multiplayer games create continuous two-way traffic, which belongs to [Bidirectional Streaming](https://www.designgurus.io/course-play/system-design-patterns/doc/bidirectional-streaming).
2. **Updates are rare and viewers are many.** A daily price change does not justify one million idle connections. Relaxed polling with [caching](https://www.designgurus.io/course-play/system-design-patterns/doc/cacheaside) is simpler when updates are infrequent relative to acceptable delay.
3. **Binary, latency-critical media.** Voice and video need WebRTC, which is designed for media rather than text frames.
4. **Between your own backend services.** SSE is valuable across browsers, proxies, and the public internet. Backend services can use [pub/sub](https://www.designgurus.io/course-play/system-design-patterns/doc/publishsubscribe) or gRPC streams, which provide typed server-to-server communication.

## Four Levels of Push

|                                   | Polling                         | Long polling            | SSE                              | WebSocket                  |
| --------------------------------- | ------------------------------- | ----------------------- | -------------------------------- | -------------------------- |
| Staleness                         | Half the interval               | ~Zero                   | ~Zero                            | ~Zero                      |
| Cost when idle                    | Constant requests               | One held request each   | One held connection each         | Held connection + protocol |
| Direction                         | Pull                            | Pull that imitates push | Server to client                 | Both ways                  |
| Works with existing proxies/infra | Perfectly                       | Timeout problems        | Yes, it is plain HTTP            | Needs special handling     |
| Reconnect handling                | None needed                     | You write it            | Built into the browser           | You write it               |
| Best for                          | Rare changes, relaxed deadlines | Legacy constraints      | Feeds, tickers, progress, tokens | Conversations              |

## Real-World Examples

- **Every LLM chat app you have used streams over SSE.** Anthropic's and OpenAI's APIs deliver tokens as SSE events. That is why words appear one at a time on screen. The fit is exact: strictly one-way, text-native, and plain HTTP that every proxy and SDK already understands.
- **Live dashboards and tickers:** log tails, stock and sports feeds, live news pages.
- **Build and deploy logs:** watching CI output stream into your browser is almost always SSE.
- **Notification feeds:** many apps hold one SSE stream per session and push all in-app events over it. The [module capstone](https://www.designgurus.io/course-play/system-design-patterns/doc/minicapstone-designing-a-notification-system) builds that design in full.