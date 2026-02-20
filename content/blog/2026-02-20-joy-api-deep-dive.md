---
title: "How Joy Reads Your Health Data: A Technical Look at the openLife API"
description: "A deep dive into the openLife Dashboard API — how Joy fetches your health metrics, processes them, and delivers personalized recommendations."
date: 2026-02-20
tags: ["openLife", "Joy", "API", "technical", "health", "agents"]
---

In our [first openLife post](/blog/2026-02-20-openlife-ecosystem/), we introduced the ecosystem and its three core components. Today, we're going under the hood to see how Joy actually reads and uses your health data.

If you're curious about how AI agents can interact with personal health metrics — or if you're building something similar — this one's for you.

## The API-First Philosophy

Before we get into code, it's worth understanding the design philosophy behind openLife. Many health dashboards treat APIs as an afterthought — they build a UI first and bolt on data endpoints later. openLife took the opposite approach:

- **The API came first** — everything you see in the dashboard is available via HTTP
- **Structured data formats** — health metrics are normalized into consistent JSON schemas
- **Agent-friendly** — no HTML parsing or screen scraping required

This matters because it means Joy (or any other agent) can focus on the logic of giving good advice rather than wrestling with data extraction.

## Connecting to the Dashboard

Joy connects to the openLife Dashboard via REST. Here's what the connection looks like in practice:

```python
import requests
from datetime import datetime, timedelta

class OpenLifeClient:
    def __init__(self, api_key: str, base_url: str = "https://api.openlife.local"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        })
    
    def get_health_metrics(self, days: int = 7) -> dict:
        """Fetch health metrics for the specified number of days."""
        endpoint = f"{self.base_url}/v1/metrics"
        params = {
            "range": f"{days}d",
            "metrics": "sleep,activity,heart_rate,recovery"
        }
        response = self.session.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()
```

This client is intentionally simple. Joy initializes it with an API key (you approve this connection), and then it can query your health data on demand.

## Fetching Sleep Data

Let's look at how Joy actually retrieves sleep data to inform its recommendations:

```python
def get_sleep_summary(client: OpenLifeClient) -> dict:
    """Get a summary of recent sleep patterns."""
    metrics = client.get_health_metrics(days=7)
    
    sleep_data = metrics.get("sleep", {})
    
    # Calculate averages
    avg_duration = sum(s["duration_minutes"] for s in sleep_data) / len(sleep_data)
    avg_quality = sum(s["quality_score"] for s in sleep_data) / len(sleep_data)
    
    # Get latest night
    latest = sleep_data[0] if sleep_data else {}
    
    return {
        "avg_duration_hours": round(avg_duration / 60, 1),
        "avg_quality": round(avg_quality, 1),
        "latest": latest,
        "trend": "improving" if latest.get("quality_score", 0) > avg_quality else "declining"
    }
```

Notice how Joy doesn't just fetch raw data — it calculates summaries and trends. This is where the "personalized" part of personalized coaching comes from.

## Writing Insights Back

Joy doesn't just read; it also writes. After analyzing your data, it logs insights back to the dashboard:

```python
def log_insight(client: OpenLifeClient, insight_type: str, message: str, 
                related_metrics: list = None):
    """Log an AI-generated insight to the health record."""
    endpoint = f"{self.base_url}/v1/insights"
    
    payload = {
        "type": insight_type,  # "sleep", "activity", "recovery", "nutrition"
        "message": message,
        "timestamp": datetime.utcnow().isoformat(),
        "source": "joy",
        "related_metrics": related_metrics or []
    }
    
    response = client.session.post(endpoint, json=payload)
    response.raise_for_status()
    return response.json()
```

This creates a persistent record of AI recommendations that you can review later. It's not just ephemeral chat — it's a growing journal of health insights that compounds over time.

## A Real Example

Here's what a typical interaction looks like when Joy analyzes your data:

```python
def generate_recommendation(client: OpenLifeClient) -> str:
    """Generate a personalized health recommendation."""
    sleep = get_sleep_summary(client)
    activity = client.get_health_metrics(days=7).get("activity", {})
    
    # Decision logic based on actual data
    if sleep["avg_quality"] < 6.0:
        return (
            f"Your sleep quality has been trending {sleep['trend']}. "
            f"Last night's score was {sleep['latest'].get('quality_score', 'N/A')}/10. "
            "Consider winding down 30 minutes earlier tonight — "
            "your recovery metrics suggest you're running on accumulated fatigue."
        )
    
    elif activity.get("total_steps", 0) < 5000:
        return (
            f"You're at {activity.get('total_steps', 0)} steps today. "
            "A 15-minute walk could boost your recovery score by 12%. "
            "Want me to set a reminder?"
        )
    
    else:
        return "Your metrics look solid today. Keep it up!"
```

This is fundamentally different from generic advice because it's looking at *your actual numbers* — not a template.

## Security and Consent

A few important notes about how this system stays secure:

1. **API keys are user-controlled** — you approve exactly which agents can access your data
2. **Scoped permissions** — Joy only has access to health metrics, nothing else
3. **Audit logging** — every API call is logged, so you can see exactly what was accessed
4. **No third-party data sharing** — your health data stays within the ecosystem

## What's Next

This is just the beginning. We're exploring:

- **Real-time notifications** — get alerts when metrics spike or drop
- **Predictive insights** — use historical data to forecast recovery needs
- **Multi-agent coordination** — have different agents specialize in different health domains

If you're building something similar or have questions about the API, this gives you the foundation. The key insight isn't the code — it's the philosophy: treat your health data as an API, not a silo.

---

*Next up: Why does any of this matter? We'll explore the bigger picture of agent-native health coaching in our final openLife post.*
