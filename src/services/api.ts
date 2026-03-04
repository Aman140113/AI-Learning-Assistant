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

// ── Admin ──
function adminHeaders() {
    const token = localStorage.getItem("adminToken");
    return {
        "Content-Type": "application/json",
        "x-admin-token": token || "",
    };
}

export async function adminLogin(email: string, password: string) {
    const token = `${email}:${password}`;
    const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
        },
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Admin login failed");
    }
    localStorage.setItem("adminToken", token);
    return res.json();
}

export async function getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, { headers: adminHeaders() });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
}

export async function getAdminUsers() {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: adminHeaders() });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function deleteAdminUser(userId: string) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: adminHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
}

export async function getAdminDomains() {
    const res = await fetch(`${API_BASE}/admin/domains`, { headers: adminHeaders() });
    if (!res.ok) throw new Error("Failed to fetch domains");
    return res.json();
}

export async function createAdminDomain(data: { name: string; description?: string; icon?: string }) {
    const res = await fetch(`${API_BASE}/admin/domains`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create domain");
    return res.json();
}

export async function updateAdminDomain(id: string, data: { name: string; description?: string; icon?: string }) {
    const res = await fetch(`${API_BASE}/admin/domains/${id}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update domain");
    return res.json();
}

export async function deleteAdminDomain(id: string) {
    const res = await fetch(`${API_BASE}/admin/domains/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete domain");
    return res.json();
}

export async function getAdminSkills(domainId?: string) {
    const url = domainId
        ? `${API_BASE}/admin/skills?domainId=${domainId}`
        : `${API_BASE}/admin/skills`;
    const res = await fetch(url, { headers: adminHeaders() });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
}

export async function createAdminSkill(data: { domain_id: string; name: string; description?: string; difficulty_level?: string }) {
    const res = await fetch(`${API_BASE}/admin/skills`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create skill");
    return res.json();
}

export async function updateAdminSkill(id: string, data: { name: string; description?: string; difficulty_level?: string }) {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update skill");
    return res.json();
}

export async function deleteAdminSkill(id: string) {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete skill");
    return res.json();
}

export async function getAdminQuestions(filters?: { skillId?: string; domainId?: string; difficulty?: string }) {
    let url = `${API_BASE}/admin/questions`;
    const params = new URLSearchParams();
    if (filters?.skillId) params.set("skillId", filters.skillId);
    if (filters?.domainId) params.set("domainId", filters.domainId);
    if (filters?.difficulty) params.set("difficulty", filters.difficulty);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url, { headers: adminHeaders() });
    if (!res.ok) throw new Error("Failed to fetch questions");
    return res.json();
}

export async function createAdminQuestion(data: {
    skill_id: string;
    question_text: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
}) {
    const res = await fetch(`${API_BASE}/admin/questions`, {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create question");
    return res.json();
}

export async function updateAdminQuestion(id: string, data: {
    question_text: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
}) {
    const res = await fetch(`${API_BASE}/admin/questions/${id}`, {
        method: "PUT",
        headers: adminHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update question");
    return res.json();
}

export async function deleteAdminQuestion(id: string) {
    const res = await fetch(`${API_BASE}/admin/questions/${id}`, {
        method: "DELETE",
        headers: adminHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete question");
    return res.json();
}

export async function getAdminUserLearningPath(userId: string) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/learning-path`, {
        headers: adminHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch learning path");
    return res.json();
}

// ── Certification ──
export async function getCertificationStatus(userId: string) {
    const res = await fetch(`${API_BASE}/certification/status/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch certification status");
    return res.json();
}

export async function getCertificationQuestions(domainId: string) {
    const res = await fetch(`${API_BASE}/certification/questions?domainId=${domainId}`);
    if (!res.ok) throw new Error("Failed to fetch certification questions");
    return res.json();
}

export async function submitCertification(userId: string, domainId: string, level: string, answers: { questionId: string; selectedAnswer: number }[]) {
    const res = await fetch(`${API_BASE}/certification/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, domainId, level, answers }),
    });
    if (!res.ok) throw new Error("Failed to submit certification");
    return res.json();
}

