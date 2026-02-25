const API_BASE = "/api";

// ── Auth ──
export async function signup(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
    }
    return res.json();
}

export async function login(email: string, password: string) {
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
    const res = await fetch(`${API_BASE}/progress/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch progress");
    return res.json();
}

// ── Daily Tasks ──
export async function getDailyTasks(userId: string) {
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
