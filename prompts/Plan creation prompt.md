
Role & Objective:
Act as a Senior Software Engineer. Your task is to analyze the Jira ticket {JIRA_TICKET_URL} and generate a comprehensive, step-by-step implementation plan.

1. Analysis & Clarification:

Thoroughly analyze the requirements in the provided Jira ticket.

Explicitly list any edge cases, missing requirements, or uncertain points. Stop and escalate these points to me for clarification before proceeding with the final plan generation.

2. Architectural Breakdown:
Structure the implementation plan strictly by architectural layers. Ensure the responsibilities for each layer are clearly defined:

Listener / Controller Layer: API endpoints, event listeners, or entry points.

Business Logic Layer (Service): Core processing, validations, and domain logic.

Database / Repository Layer: Data persistence, queries, and migrations.

Testing Layer: Unit and Integration test strategies.

3. Execution & Delegation Workflow:
Highlight the following Test-Driven, parallelized workflow in the plan. The plan must enforce this exact order of operations:

Step 1: Skeleton & Signatures: First, implement only the method signatures/interfaces across all layers (no internal logic yet).

Step 2: Integration Tests: Create the integration tests based on the defined method signatures.

Step 3: Human Verification (Escalation Point): Pause execution and escalate to me. Do not proceed until I have reviewed and verified the integration tests.

Step 4: Parallel Implementation: Once tests are approved, delegate the implementation of each layer (Listener, Service, DB) to separate AI agents to decrease latency. Each agent is responsible for writing the actual logic and the corresponding Unit Tests for their assigned layer.

Step 5: Final Validation: Once all agents complete their work, run and verify the entire logic against the integration tests created in Step 2.

4. Output Definition:

Generate the final structured implementation plan as a markdown file.

Save the file to the following path: /plan/CCM-3856_implementation_plan.md