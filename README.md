# SkillSpark AI – Adaptive Learning Platform

SkillSpark AI is a gamified, adaptive learning platform designed to assess your current knowledge, create personalized learning paths, and keep you engaged with daily tasks, interviews, and leaderboards.

This project features a **React + Vite** frontend, an **Express.js + MongoDB** backend, and a **FastAPI + Groq LLM** AI chatbot.

---

## 🚀 Getting Started on a New PC

Follow these steps exactly to clone the repository and get the frontend, backend, and chatbot running on a different computer.

### 1. Clone the Repository

```bash
git clone https://github.com/Aman140113/AI-Learning-Assistant.git
cd AI-Learning-Assistant
```

---

### 2. Backend Setup (Express.js + MongoDB)

The backend handles all the adaptive learning path generations, quizzes, and user progress.

Open a terminal and navigate to the `server` folder:

```bash
cd server
npm install
```

#### 🔑 Environment Variables (.env)

You MUST create a `.env` file inside the `server` folder for the database connection to work.

Create a file named `.env` in `AI-Learning-Assistant/server/` and paste the following private keys inside it:

```env
```
*(This MongoDB connection string connects directly to your cloud MongoDB cluster).*

#### Start the Backend Server

Once the `.env` file is saved and dependencies are installed, start the server:

```bash
node index.js
```

You should see:
`✅ MongoDB Connected: cluster1-[...].mongodb.net`
`Server running on port 5001`

---

### 3. AI Chatbot Setup (FastAPI + Groq)

The chatbot provides domain-aware AI responses to help users learn. It uses the **Groq API** with the Llama 3.3 model.

Open a **new terminal** and navigate to the `chatbot` folder:

```bash
cd chatbot
```

#### Create a Python Virtual Environment (first time only)

```bash
python -m venv venv
```

#### Activate the Virtual Environment

```bash
# Windows
.\venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### 🔑 Environment Variables (.env)

Create a `.env` file inside the `chatbot` folder with your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

You can get a free API key from [console.groq.com](https://console.groq.com/).

#### Start the Chatbot Server

```bash
uvicorn main:app --port 8000
```

You should see:
`INFO: Uvicorn running on http://0.0.0.0:8000`

The chatbot supports the following domains:
- **Java Development** – Core Java, OOP, Collections, Multithreading, Spring Boot
- **QA Testing** – Manual Testing, Selenium, TestNG, API Testing, Agile Testing
- **DevOps** – CI/CD, Docker, Kubernetes, Jenkins, Cloud Pipelines
- **GenAI** – LLMs, Transformers, RAG, Embeddings, Prompt Engineering

---

### 4. Frontend Setup (React + Vite)

The frontend contains all the beautiful visual interfaces, dashboards, and quizzes.

Open a **new, separate terminal window** (leave the backend and chatbot running) and navigate to the main project folder (the root directory).

```bash
# If you are in a subfolder, go back to the root:
cd ..

# Install frontend dependencies
npm install

# Start the frontend dev server
npm run dev
```

#### Open in Browser
After running the command, you will see a local URL like:
`http://localhost:8080`

Ctrl+Click (or Cmd+Click) that link to open the application in your browser.

---

## 🛠 Tech Stack

**Frontend:**
* React 18
* Vite
* TypeScript
* Tailwind CSS + Lucide React Icons

**Backend:**
* Node.js
* Express.js
* Mongoose (MongoDB ORM)

**AI Chatbot:**
* Python 3
* FastAPI + Uvicorn
* Groq SDK (Llama 3.3 70B)
* Pydantic

## ✨ Core Features
- **AI Chatbot:** A domain-aware AI assistant that answers questions scoped to your selected learning domain, powered by Groq's Llama 3.3 model.
- **Adaptive Onboarding:** Take a dynamic quiz right at sign-up to assess your skill levels (Beginner, Intermediate, Proficient).
- **Personalized Learning Path:** A roadmap view generated dynamically based on your quiz results.
- **Daily Tasks Timeline:** A gorgeous timeline view of your past, present, and future daily activities.
- **Mock Interviews:** Voice and Video powered mock interview screens.
- **Cohort Leaderboard:** Compare your progress (XP & Level) against your classroom peers on a stylized podium!
