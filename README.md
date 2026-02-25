# SkillSpark AI – Adaptive Learning Platform

SkillSpark AI is a gamified, adaptive learning platform designed to assess your current knowledge, create personalized learning paths, and keep you engaged with daily tasks, interviews, and leaderboards.

This project features a **React + Vite** frontend and an **Express.js + MongoDB** backend.

---

## 🚀 Getting Started on a New PC

Follow these steps exactly to clone the repository and get both the frontend and backend running on a different computer.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/skillspark-ai.git
cd skillspark-ai
```

*(Note: Replace `your-username/skillspark-ai` with your actual GitHub repository URL once uploaded).*

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

Create a file named `.env` in `skillspark-ai/server/` and paste the following private keys inside it:

```env
MONGODB_URI=mongodb+srv://amanmansuri_db_user:%40m%40N14012003@cluster1.xb3xaun.mongodb.net/ai_learning_assistant?retryWrites=true&w=majority
PORT=5000
```
*(This MongoDB connection string connects directly to your cloud MongoDB cluster).*

#### Start the Backend Server

Once the `.env` file is saved and dependencies are installed, start the server:

```bash
node index.js
```

You should see:
`✅ MongoDB Connected: cluster1-[...].mongodb.net`
`Server running on port 5000`

---

### 3. Frontend Setup (React + Vite)

The frontend contains all the beautiful visual interfaces, dashboards, and quizzes.

Open a **new, separate terminal window** (leave the backend running) and navigate to the main project folder (the root directory, *not* the server directory).

```bash
# If you are still in the server folder, go back one directory:
cd ..

# Install frontend dependencies
npm install

# Start the frontend dev server
npm run dev
```

#### Open in Browser
After running the command, you will see a local URL like:
`http://localhost:5173`

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

## ✨ Core Features
- **Adaptive Onboarding:** Take a dynamic quiz right at sign-up to assess your skill levels (Beginner, Intermediate, Proficient).
- **Personalized Learning Path:** A roadmap view generated dynamically based on your quiz results.
- **Daily Tasks Timeline:** A gorgeous timeline view of your past, present, and future daily activities.
- **Mock Interviews:** Voice and Video powered mock interview screens.
- **Cohort Leaderboard:** Compare your progress (XP & Level) against your classroom peers on a stylized podium!
