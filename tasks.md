# Project Prompt for Cursor

## Project Title:
AI Copilot for Robot User Support


## Prompt usage:
- Split the web app development process into small steps.
- At each step
    1. plan first
    2. present 3 possible plans with trade-offs,
    3. recommend one,
    4. implement only what the step asks for.
- Always test out the code you wrote
- Follow the Guardrails at the end.



## Tech Stack:
- Backend: Python 3.10
- Frontend: TypeScript 5.3 (React)


## Step 1: Core Architecture Setup

### Objective:
Set up a basic monorepo and wiring so that the frontend can communicate with the backend.

### Tasks:
1. Create a monorepo with two folders: `/backend` (Python) and `/frontend` (React + TypeScript).
2. Initialize `requirements.txt` in `/backend` and `package.json` in `/frontend`.
3. Add a shared `.env` file at the root for API keys and endpoints (with placeholder values). Load it only in developmen
4. Create a simple health check endpoint in the backend and a simple page in the frontend that calls it.
5. Add local unit tests for both backend and frontend.

### Deliverable:
The local development environment runs successfully.
The frontend loads a page and calls the backend health endpoint with no errors.


## Step 2: Backend – AI Service Integration

### Objective:
Implement the API layer that powers chat and document retrieval.

### Tasks:

1. Add a POST /chat endpoint that accepts user messages.
2. Integrate the Azure AI Foundry OpenAI-compatible API.
3. Add a POST /upload endpoint that accepts robot manuals (PDFs).
4. Use an OCR or document parser to extract text, chunk it, embed it, and upsert into a vector index with metadata.
5. Write unit tests for the chat route, retrieval logic, upload flow, and translation adapter stubs.

### Deliverable:
The REST API can accept chat messages and return context-aware answers using uploaded manual content when available.


## Step 3: Frontend – Chat Interface
### Objective:
Build a clean, responsive chat UI that interacts with the backend

### Tasks:
1. Create a chat view with user and assistant message bubbles connected to POST /chat.
2. Show a “thinking” indicator and support message streaming.
3. Add an upload window connected to POST /upload that shows progress for parsing and indexing.parse and index steps.
4. Add a feedback system (thumbs up/down) for assistant messages. Send feedback to the backend for database storage.

### Deliverable:
A functional chat interface that supports messaging, manual upload, and feedback submission.

## Step 4: Deployment
### Objective:
Deploy the app

### Tasks:
1. Containerize both backend and frontend using Docker. Provide a simple docker-compose file for local development.
2. Build, test, and publish container images.
3. Add basic monitoring, logging, and error tracking.

### Deliverable:
A deployed, functional version of the app that is accessible via URL

## Guardrails for Cursor:
- Do not create extra code files or folders unless I ask for them.
- Edit only the files I mention.
- Do not generate .md or other documentation files unless I ask.
- Do not change configuration files like package.json or requirements.txt unless the step explicitly asks.
- Do not create extra example files.
Keep variable names consistent with the existing code.
- Do not start over. Only change what exists.
- Always plan before coding. Present 3 plans with clear trade-offs, then state your recommendation.