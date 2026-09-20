---
tags: [project, data-engineering, airflow, python, java-to-python]
status: In Progress
---

# 🚀 Project Roadmap: Automated Weather Tracker (Airflow ETL)

The goal of this project is to learn Apache Airflow and Python by building a classic ETL (Extract, Transform, Load) pipeline without focusing on complex algorithms.

## 🏗️ Stage 1: Infrastructure Deployment (Local)
Instead of installing everything directly on your machine, use Docker (the industry standard for Airflow).

- [ ] Download the official `docker-compose.yaml` from the Apache Airflow website.
- [ ] Add an additional container with **PostgreSQL** to your `docker-compose` file. This will serve as your target Data Warehouse.
- [ ] Run `docker-compose up -d` and successfully log in to the Airflow Web UI (usually `localhost:8080`).

> [!info] What you will learn
> How Airflow is structured into separate components under the hood: Webserver, Scheduler, Worker, and Metadata DB.

## 📥 Stage 2: Extract (Data Collection)
Write your first task that hits a free API (like Open-Meteo, no API keys needed) and fetches raw data.

- [ ] Create a Python file in your `dags/` folder.
- [ ] Write a function decorated with `@task` to make a GET request using the `requests` library.
- [ ] Return the JSON response as a Python `dict`.

> [!note] Mental Shift: Java -> Python
> In Java, you would create DTO classes to deserialize JSON using Jackson. In Python, you work directly with a dynamic dictionary: `data = response.json()`, accessing nested fields like `data["current_weather"]["temperature"]`.

## ⚙️ Stage 3: Transform (Data Processing)
Raw API data usually contains a lot of unnecessary noise. Filter and clean it.

- [ ] Create a second `@task` function that accepts the dictionary from the Extract step.
- [ ] Extract only: temperature, wind speed, timestamp, and city name.
- [ ] (Optional) Convert the temperature from Fahrenheit to Celsius using basic math.
- [ ] Format the timestamp using the built-in `datetime` module.
- [ ] Return a new, flat dictionary containing only the required fields.

## 💾 Stage 4: Load (Database Storage)
Insert the cleaned data into your PostgreSQL database.

- [ ] Go to the Airflow Web UI -> Admin -> Connections and add a new Postgres connection (e.g., `postgres_default`).
- [ ] Import `PostgresHook` in your DAG file.
- [ ] Write a `@task` that executes a basic `INSERT INTO weather_stats ...` SQL query.

> [!abstract] Mental Shift: Java -> Python
> You will use Context Managers (`with postgres_hook.get_conn() as conn:`) to handle database connections instead of relying on `try-catch-finally` blocks as you would in Java.

## 🪄 Stage 5: Orchestration & Complexity (Airflow Magic)
Leverage Airflow's true power by adding specific orchestration features.

- [ ] **Scheduling:** Configure the `@dag(schedule_interval="0 * * * *")` parameter to run the pipeline automatically every hour.
- [ ] **Retries:** Add `retries=3` and `retry_delay=timedelta(minutes=1)` to your Extract task. Watch Airflow auto-retry if the API times out.
- [ ] **Branching:** Implement the `BranchPythonOperator`. Route the pipeline dynamically: if the temperature drops below zero, trigger a task that sends a Telegram alert; otherwise, take the standard branch to save the data.