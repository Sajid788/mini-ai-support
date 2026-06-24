# Mini AI Support Agent with Smart Routing

## Overview

Mini AI Support Agent is a backend-driven support system designed to intelligently answer customer support queries using a hybrid routing strategy.

Instead of sending every request directly to an LLM, the system optimizes performance and cost using three routing layers:

1. **Rules Engine** — Handles common FAQ queries instantly
2. **Semantic Cache** — Reuses previous responses for similar queries
3. **LLM Layer** — Generates responses only when necessary

This architecture reduces latency, avoids redundant AI calls, and lowers infrastructure cost.

---

# Project Objective

The main goal of this project is to build a lightweight AI-powered support agent that:

* Responds quickly to support questions
* Reduces unnecessary LLM usage
* Improves scalability
* Tracks request statistics
* Demonstrates modular backend architecture

---

# Key Features

## Smart Query Routing

Every incoming query follows a decision pipeline:

### Rule-Based Matching

Checks predefined FAQ patterns such as:

* refund policy
* login issue
* password reset
* subscription problem

If a rule matches, response is returned immediately.

Benefits:

* Zero AI cost
* Fast response (< 5ms)

---

## Semantic Caching

The system generates embeddings for each query and stores them in MongoDB.

When a new query arrives:

* Convert query into embedding vector
* Compare with previous embeddings
* Calculate cosine similarity
* If similarity exceeds threshold → return cached response

Benefits:

* Avoid repeated LLM calls
* Faster repeated query resolution
* Reduced operational cost

Example:

Query 1:
`How to get refund?`

Query 2:
`Can I request refund?`

Since both are semantically similar, cache may return the same response.

---

## LLM Fallback

If:

* no rule matches
* no cache hit occurs

Then the request goes to LLM.

LLM generates contextual support response.

Benefits:

* Handles unknown queries
* Improves flexibility
* Simulates real AI support system

---

## Stats Tracking

System tracks:

* Total Requests
* Rule Hits
* Cache Hits
* LLM Calls
* Total Cost

This helps analyze routing efficiency.

Example stats response:

```json
{
  "totalRequests": 25,
  "ruleHits": 10,
  "cacheHits": 8,
  "llmCalls": 7,
  "totalCost": 0.0021
}
```

---

# Impact of This Project

This architecture provides several real-world benefits.

## Reduced Cost

Traditional chat systems send every query to LLM.

That causes:

* higher API cost
* higher latency

This project reduces cost by using rule-based and cached responses first.

---

## Improved Performance

Rules and cache respond much faster than external AI calls.



## Better Scalability

As traffic grows:

* repeated queries hit cache
* fewer external AI requests
* backend handles larger load efficiently

Example:

500 users asking similar refund questions will mostly hit cache.

---

## Production-Oriented Architecture

Project demonstrates:

* modular services
* clean architecture
* separation of concerns
* scalable design patterns

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Cache

* Redis

## AI Layer

* LLM Provider / Mock LLM
* Local Embeddings

## DevOps

* Docker
* Docker Compose

---

# Folder Structure

```text
backend/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controller/
│   ├── chat.controller.js
│   └── stats.controller.js
│
├── models/
│   ├── cache.model.js
│   └── stats.model.js
│
├── routes/
│   ├── chat.routes.js
│   └── stats.routes.js
│
├── services/
│   ├── router.service.js
│   ├── rules.service.js
│   ├── cache.service.js
│   ├── embedding.service.js
│   ├── llm.service.js
│   ├── stats.service.js
│   └── cost.service.js
│
├── utils/
│   ├── cosineSimilarity.js
│   └── logger.js
│
├── .env
├── index.js
├── package.json
└── Dockerfile

frontend/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json

docker-compose.yml
README.md
```

---

# Architecture Flow

```text
User Query
   |
   v
Rules Engine
   |
   |---- Match Found ----> Return Rule Response
   |
   v
Semantic Cache
   |
   |---- Cache Hit -----> Return Cached Response
   |
   v
LLM Service
   |
   v
Generate AI Response
   |
   v
Save Cache + Update Stats
```

---

# API Endpoints

## Health Check

### GET /

Response:

```json
{
  "message": "Mini AI Support Agent API is running"
}
```

---

## Chat Endpoint

### POST /api/chat

Request:

```json
{
  "query": "refund policy"
}
```

Response:

```json
{
  "source": "RULE",
  "answer": "Refund available within 7 days"
}
```

---

## Stats Endpoint

### GET /api/stats

Response:

```json
{
  "totalRequests": 0,
  "ruleHits": 0,
  "cacheHits": 0,
  "llmCalls": 0,
  "totalCost": 0
}
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <repo-url>
```

---

## Backend Setup

```bash
cd backend
npm install
```

---

## Environment Variables

Create `.env`

```env
PORT=8080
MONGO_URI=your_mongo_uri
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=your_api_key
GROQ_MODEL=your_model
SIMILARITY_THRESHOLD=0.85
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Using Docker

```bash
docker-compose up --build
```

---


---

# Conclusion

Mini AI Support Agent demonstrates how modern AI systems can be optimized using smart routing strategies instead of blindly sending every request to expensive LLM services.

The project combines traditional software engineering techniques with AI-powered workflows to build scalable, cost-efficient support infrastructure.
