const API_BASE = "/api";

import { skills as fallbackSkills } from "../data/dummyData";

// ── Auth ──
export async function signup(name: string, email: string, password: string, avatar: string | null = null) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
    }
    return res.json();
}

export async function login(email: string, password: string) {
    if (email === "demo@koshish.com" && password === "demo123") {
        return {
            message: "Demo Login successful",
            user: { id: "demo_user", name: "Alex Koshish", email: "demo@koshish.com", avatar: "man_4323002.png" }
        };
    }

    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
    }
    return res.json();
}

// ── Domains ──
export async function getDomains() {
    const res = await fetch(`${API_BASE}/domains`);
    if (!res.ok) throw new Error("Failed to fetch domains");
    return res.json();
}

export async function selectDomain(userId: string, domainId: string) {
    const res = await fetch(`${API_BASE}/domains/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, domainId }),
    });
    if (!res.ok) throw new Error("Failed to select domain");
    return res.json();
}

// ── Quiz ──
export async function getQuizQuestions(domainId: string) {
    const res = await fetch(`${API_BASE}/quiz/questions?domainId=${domainId}`);
    if (!res.ok) throw new Error("Failed to fetch questions");
    return res.json();
}

export async function submitQuiz(
    userId: string,
    domainId: string,
    answers: { questionId: string; selectedAnswer: number }[]
) {
    const res = await fetch(`${API_BASE}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, domainId, answers }),
    });
    if (!res.ok) throw new Error("Failed to submit quiz");
    return res.json();
}

// ── Progress ──
export async function getUserProgress(userId: string) {
    if (userId === "demo_user") {
        return {
            xp: 750,
            maxXp: 1000,
            level: "Proficient",
            streak: 15,
            selectedDomain: "GenAI & Prompt Engineering",
            skills: fallbackSkills,
            weakSkills: ["Hallucinations Control", "Context Limits"],
            recentAttempts: []
        };
    }

    const res = await fetch(`${API_BASE}/progress/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch progress");
    return res.json();
}

// ── Daily Tasks ──
export async function getDailyTasks(userId: string) {
    if (userId === "demo_user") {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);

        return {
            completedDates: [
                { _id: twoDaysAgo.toISOString().split("T")[0], completedCount: 3, totalXp: 50 },
                { _id: yesterday.toISOString().split("T")[0], completedCount: 2, totalXp: 40 },
                { _id: today.toISOString().split("T")[0], completedCount: 4, totalXp: 80 },
            ]
        };
    }

    const res = await fetch(`${API_BASE}/daily-tasks/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch daily tasks");
    return res.json();
}

export async function completeDailyTask(taskId: string) {
    const res = await fetch(`${API_BASE}/daily-tasks/${taskId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to complete task");
    return res.json();
}

export async function getDailyQuizQuestions(userId: string) {
    const res = await fetch(`${API_BASE}/quiz/daily?userId=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch daily quiz questions");
    return res.json();
}

// ── Profile ──
export async function updateAvatar(userId: string, avatar: string) {
    const res = await fetch(`${API_BASE}/auth/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar }),
    });
    if (!res.ok) throw new Error("Failed to update avatar");
    return res.json();
}

export async function deleteAccount(userId: string) {
    const res = await fetch(`${API_BASE}/auth/user/${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete account");
    return res.json();
}
