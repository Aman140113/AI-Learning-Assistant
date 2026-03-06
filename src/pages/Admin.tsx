import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Shield, Users, BookOpen, HelpCircle, BarChart3, LogOut,
    Trash2, Plus, Pencil, X, ChevronDown, Search, AlertTriangle,
    TrendingUp, UserCheck, Brain, Hash, Layers, Route, Filter,
    FileText, Download, Award
} from "lucide-react";
import {
    getAdminStats, getAdminUsers, deleteAdminUser,
    getAdminDomains, createAdminDomain, updateAdminDomain, deleteAdminDomain,
    getAdminSkills, createAdminSkill, updateAdminSkill, deleteAdminSkill,
    getAdminQuestions, createAdminQuestion, updateAdminQuestion, deleteAdminQuestion,
    getAdminUserLearningPath,
    searchDossierUsers, downloadDossierPdf,
} from "@/services/api";
import { ThemeToggle } from "@/components/theme-toggle";

// ═══════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════
interface StatsData {
    totalUsers: number;
    totalAttempts: number;
    totalQuestions: number;
    totalDomains: number;
    totalSkills: number;
    recentSignups: number;
    domainDistribution: { _id: string; name: string; count: number }[];
    avgScores: { _id: string; name: string; avgScore: number; totalAttempts: number }[];
}

interface UserData {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    created_at: string;
    domain: string;
    latestScore: number | null;
    level: string;
    attemptCount: number;
}

interface DomainData {
    _id: string;
    name: string;
    description: string;
    icon: string;
    skillCount: number;
    questionCount: number;
}

interface SkillData {
    _id: string;
    name: string;
    description: string;
    difficulty_level: string;
    domain_id: { _id: string; name: string };
    questionCount: number;
}

interface QuestionData {
    _id: string;
    question_text: string;
    options: string[];
    correct_answer: number;
    explanation: string;
    skill_id: { _id: string; name: string; difficulty_level: string; domain_id: { _id: string; name: string } };
}

type Tab = "overview" | "users" | "content" | "questions" | "skillportal";

// ═══════════════════════════════════════
//  MODAL COMPONENT
// ═══════════════════════════════════════
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-background border border-border rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════
//  CONFIRM DIALOG
// ═══════════════════════════════════════
function ConfirmDialog({ open, onClose, onConfirm, message }: { open: boolean; onClose: () => void; onConfirm: () => void; message: string }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-background border border-border rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Confirm Delete</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 text-sm font-medium transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30 text-sm font-medium transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════
//  MAIN ADMIN PAGE
// ═══════════════════════════════════════
const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "users", label: "Users", icon: Users },
        { id: "content", label: "Domains & Skills", icon: BookOpen },
        { id: "questions", label: "Questions", icon: HelpCircle },
        { id: "skillportal", label: "Skill Portal", icon: FileText },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
                <div className="flex items-center gap-3 p-6 border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm">SkillSpark<span className="text-purple-500">AI</span></h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Admin Panel</p>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 shadow-inner"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <tab.icon className="w-4.5 h-4.5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-border flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Theme</span>
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {activeTab === "overview" && <OverviewTab />}
                    {activeTab === "users" && <UsersTab />}
                    {activeTab === "content" && <ContentTab />}
                    {activeTab === "questions" && <QuestionsTab />}
                    {activeTab === "skillportal" && <SkillPortalTab />}
                </div>
            </main>
        </div>
    );
};

// ═══════════════════════════════════════
//  TAB 1: OVERVIEW
// ═══════════════════════════════════════
function OverviewTab() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminStats().then(setStats).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingState />;
    if (!stats) return <ErrorState message="Failed to load stats" />;

    const statCards = [
        { label: "Total Users", value: stats.totalUsers, icon: Users, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
        { label: "Quiz Attempts", value: stats.totalAttempts, icon: TrendingUp, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
        { label: "Questions", value: stats.totalQuestions, icon: HelpCircle, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
        { label: "New This Week", value: stats.recentSignups, icon: UserCheck, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
    ];

    const maxDistribution = Math.max(...(stats.domainDistribution.map(d => d.count)), 1);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-1 text-foreground">Dashboard Overview</h2>
                <p className="text-muted-foreground text-sm">Platform analytics at a glance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-card border border-border rounded-2xl p-5 hover:border-border/80 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{card.label}</span>
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.shadow}`}>
                                <card.icon className="w-4.5 h-4.5 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Domain Distribution */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-bold text-sm text-foreground mb-5 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-500" />
                        Domain Distribution
                    </h3>
                    {stats.domainDistribution.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No user domain selections yet</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.domainDistribution.map((d) => (
                                <div key={d._id}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-foreground font-medium">{d.name}</span>
                                        <span className="text-sm text-muted-foreground font-semibold">{d.count} users</span>
                                    </div>
                                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700"
                                            style={{ width: `${(d.count / maxDistribution) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Average Scores */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="font-bold text-sm text-foreground mb-5 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Average Quiz Scores
                    </h3>
                    {stats.avgScores.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No quiz attempts yet</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.avgScores.map((s) => (
                                <div key={s._id}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-foreground font-medium">{s.name}</span>
                                        <span className={`text-sm font-bold ${s.avgScore >= 70 ? "text-emerald-500" : s.avgScore >= 40 ? "text-amber-500" : "text-red-500"}`}>
                                            {s.avgScore}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${s.avgScore >= 70 ? "bg-gradient-to-r from-emerald-500 to-teal-500" :
                                                s.avgScore >= 40 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                                                    "bg-gradient-to-r from-red-500 to-rose-500"
                                                }`}
                                            style={{ width: `${s.avgScore}%` }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-1">{s.totalAttempts} attempts</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoCard label="Domains" value={stats.totalDomains} icon={BookOpen} />
                <InfoCard label="Skills" value={stats.totalSkills} icon={Brain} />
                <InfoCard label="Questions" value={stats.totalQuestions} icon={Hash} />
                <InfoCard label="Total Attempts" value={stats.totalAttempts} icon={TrendingUp} />
            </div>
        </div>
    );
}

function InfoCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════
//  TAB 2: USERS
// ═══════════════════════════════════════
interface LearningPathStep {
    _id: string;
    week: number;
    name: string;
    description: string;
    difficulty: string;
    questionCount: number;
}

function UsersTab() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<UserData | null>(null);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [learningPath, setLearningPath] = useState<{ domain: string; path: LearningPathStep[] } | null>(null);
    const [pathLoading, setPathLoading] = useState(false);

    const load = () => {
        setLoading(true);
        getAdminUsers().then(setUsers).catch(console.error).finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteAdminUser(deleteTarget._id);
            setDeleteTarget(null);
            load();
        } catch (e) { console.error(e); }
    };

    const toggleLearningPath = async (userId: string) => {
        if (expandedUser === userId) {
            setExpandedUser(null);
            setLearningPath(null);
            return;
        }
        setExpandedUser(userId);
        setPathLoading(true);
        try {
            const data = await getAdminUserLearningPath(userId);
            setLearningPath(data);
        } catch (e) {
            console.error(e);
            setLearningPath({ domain: "Error", path: [] });
        } finally {
            setPathLoading(false);
        }
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <LoadingState />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1 text-foreground">User Management</h2>
                    <p className="text-muted-foreground text-sm">{users.length} registered users</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">User</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Domain</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Level</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Score</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Attempts</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Joined</th>
                                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user) => (
                                <>
                                    <tr key={user._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                                                    {user.avatar ? (
                                                        <img src={`/src/assets/avatars/${user.avatar}`} alt="" className="w-7 h-7 object-contain" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{user.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-lg">{user.domain}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${user.level === "Advanced" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                                                user.level === "Intermediate" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                                                    user.level === "Beginner" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :
                                                        "bg-muted text-muted-foreground"
                                                }`}>
                                                {user.level}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-foreground font-medium">
                                            {user.latestScore !== null ? `${user.latestScore}%` : "—"}
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-muted-foreground">{user.attemptCount}</td>
                                        <td className="px-5 py-3.5 text-xs text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex gap-1 justify-end">
                                                <button
                                                    onClick={() => toggleLearningPath(user._id)}
                                                    className={`p-2 rounded-lg transition-colors ${expandedUser === user._id
                                                        ? "bg-purple-500/15 text-purple-600 dark:text-purple-400"
                                                        : "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-500/10"
                                                        }`}
                                                    title="View learning path"
                                                >
                                                    <Route className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteTarget(user)}
                                                    className="p-2 rounded-lg text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                    title="Delete user"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Learning Path Expandable Row */}
                                    {expandedUser === user._id && (
                                        <tr key={`${user._id}-path`}>
                                            <td colSpan={7} className="px-5 py-0">
                                                <div className="bg-background border border-border rounded-xl p-5 my-2 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Route className="w-4 h-4 text-purple-500" />
                                                        <h4 className="text-sm font-bold text-foreground">Learning Path</h4>
                                                        {learningPath && (
                                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                                                                {learningPath.domain}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {pathLoading ? (
                                                        <div className="flex items-center justify-center py-6">
                                                            <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                                        </div>
                                                    ) : learningPath && learningPath.path.length > 0 ? (
                                                        <div className="relative">
                                                            {/* Timeline bar */}
                                                            <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-500/40 via-indigo-500/30 to-white/5" />
                                                            <div className="space-y-3">
                                                                {learningPath.path.map((step) => (
                                                                    <div key={step._id} className="flex items-start gap-4 relative">
                                                                        {/* Dot */}
                                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-[10px] font-bold border-2 ${step.difficulty === "Easy" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400" :
                                                                            step.difficulty === "Medium" ? "bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400" :
                                                                                "bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-400"
                                                                            }`}>
                                                                            W{step.week}
                                                                        </div>
                                                                        {/* Content */}
                                                                        <div className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 hover:border-border/80 transition-colors">
                                                                            <div className="flex items-center justify-between gap-2">
                                                                                <p className="text-sm font-medium text-foreground">{step.name}</p>
                                                                                <div className="flex items-center gap-2 shrink-0">
                                                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${step.difficulty === "Easy" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                                                                                        step.difficulty === "Medium" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                                                                                            "bg-red-500/15 text-red-600 dark:text-red-400"
                                                                                        }`}>
                                                                                        {step.difficulty}
                                                                                    </span>
                                                                                    <span className="text-[10px] text-muted-foreground">
                                                                                        {step.questionCount} Q
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            {step.description && (
                                                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{step.description}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-muted-foreground text-center py-4">
                                                            No learning path available — domain not selected
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-muted-foreground text-sm">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete "${deleteTarget?.name}"? This will remove all their data permanently.`}
            />
        </div>
    );
}

// ═══════════════════════════════════════
//  TAB 3: DOMAINS & SKILLS
// ═══════════════════════════════════════
function ContentTab() {
    const [domains, setDomains] = useState<DomainData[]>([]);
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

    // Modals
    const [domainModal, setDomainModal] = useState(false);
    const [skillModal, setSkillModal] = useState(false);
    const [editDomain, setEditDomain] = useState<DomainData | null>(null);
    const [editSkill, setEditSkill] = useState<SkillData | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ type: "domain" | "skill"; item: any } | null>(null);

    // Form state
    const [domainForm, setDomainForm] = useState({ name: "", description: "", icon: "" });
    const [skillForm, setSkillForm] = useState({ name: "", description: "", difficulty_level: "Easy", domain_id: "" });

    const loadDomains = () => getAdminDomains().then(setDomains).catch(console.error);
    const loadSkills = (domainId?: string) => getAdminSkills(domainId || undefined).then(setSkills).catch(console.error);

    useEffect(() => {
        Promise.all([loadDomains(), loadSkills()]).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedDomain) loadSkills(selectedDomain);
        else loadSkills();
    }, [selectedDomain]);

    // Domain CRUD
    const openDomainModal = (domain?: DomainData) => {
        if (domain) {
            setEditDomain(domain);
            setDomainForm({ name: domain.name, description: domain.description || "", icon: domain.icon || "" });
        } else {
            setEditDomain(null);
            setDomainForm({ name: "", description: "", icon: "" });
        }
        setDomainModal(true);
    };

    const saveDomain = async () => {
        try {
            if (editDomain) {
                await updateAdminDomain(editDomain._id, domainForm);
            } else {
                await createAdminDomain(domainForm);
            }
            setDomainModal(false);
            await loadDomains();
            await loadSkills(selectedDomain || undefined);
        } catch (e) { console.error(e); }
    };

    // Skill CRUD
    const openSkillModal = (skill?: SkillData) => {
        if (skill) {
            setEditSkill(skill);
            setSkillForm({
                name: skill.name,
                description: skill.description || "",
                difficulty_level: skill.difficulty_level || "Easy",
                domain_id: skill.domain_id._id,
            });
        } else {
            setEditSkill(null);
            setSkillForm({ name: "", description: "", difficulty_level: "Easy", domain_id: selectedDomain || (domains[0]?._id || "") });
        }
        setSkillModal(true);
    };

    const saveSkill = async () => {
        try {
            if (editSkill) {
                await updateAdminSkill(editSkill._id, skillForm);
            } else {
                await createAdminSkill(skillForm);
            }
            setSkillModal(false);
            await loadSkills(selectedDomain || undefined);
            await loadDomains();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            if (deleteTarget.type === "domain") {
                await deleteAdminDomain(deleteTarget.item._id);
                setSelectedDomain(null);
            } else {
                await deleteAdminSkill(deleteTarget.item._id);
            }
            setDeleteTarget(null);
            await loadDomains();
            await loadSkills(selectedDomain || undefined);
        } catch (e) { console.error(e); }
    };

    if (loading) return <LoadingState />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1 text-foreground">Domains & Skills</h2>
                    <p className="text-muted-foreground text-sm">Manage learning content structure</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => openDomainModal()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-500/30 transition-colors">
                        <Plus className="w-4 h-4" /> Add Domain
                    </button>
                    <button onClick={() => openSkillModal()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-sm font-medium hover:bg-indigo-500/30 transition-colors">
                        <Plus className="w-4 h-4" /> Add Skill
                    </button>
                </div>
            </div>

            {/* Domain Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {domains.map((d) => (
                    <div
                        key={d._id}
                        onClick={() => setSelectedDomain(selectedDomain === d._id ? null : d._id)}
                        className={`bg-card border rounded-2xl p-5 cursor-pointer transition-all duration-200 ${selectedDomain === d._id
                            ? "border-purple-500/40 bg-purple-500/5 shadow-lg shadow-purple-500/5"
                            : "border-border hover:border-border/80"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-sm text-foreground">{d.name}</h3>
                            <div className="flex gap-1">
                                <button onClick={(e) => { e.stopPropagation(); openDomainModal(d); }} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteTarget({ type: "domain", item: d }); }} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{d.description}</p>
                        <div className="flex gap-3 text-[11px]">
                            <span className="text-muted-foreground"><span className="text-foreground font-bold">{d.skillCount}</span> skills</span>
                            <span className="text-muted-foreground"><span className="text-foreground font-bold">{d.questionCount}</span> questions</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-sm text-foreground">
                        {selectedDomain ? `Skills — ${domains.find(d => d._id === selectedDomain)?.name}` : "All Skills"}
                    </h3>
                    {selectedDomain && (
                        <button onClick={() => setSelectedDomain(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Show all
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Skill Name</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Domain</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Difficulty</th>
                                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Questions</th>
                                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((s) => (
                                <tr key={s._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-muted-foreground">{s.domain_id?.name}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${s.difficulty_level === "Hard" ? "bg-red-500/15 text-red-600 dark:text-red-400" :
                                            s.difficulty_level === "Medium" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                                                "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                            }`}>
                                            {s.difficulty_level}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{s.questionCount}</td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex gap-1 justify-end">
                                            <button onClick={() => openSkillModal(s)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => setDeleteTarget({ type: "skill", item: s })} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/60 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {skills.length === 0 && (
                                <tr><td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">No skills found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Domain Modal */}
            <Modal open={domainModal} onClose={() => setDomainModal(false)} title={editDomain ? "Edit Domain" : "New Domain"}>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Name *</label>
                        <input value={domainForm.name} onChange={(e) => setDomainForm({ ...domainForm, name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="e.g., Python Development" />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Description</label>
                        <textarea value={domainForm.description} onChange={(e) => setDomainForm({ ...domainForm, description: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" rows={3} placeholder="Brief description..." />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Icon</label>
                        <input value={domainForm.icon} onChange={(e) => setDomainForm({ ...domainForm, icon: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="e.g., Coffee, Bug, Server" />
                    </div>
                    <button onClick={saveDomain} disabled={!domainForm.name} className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-medium text-sm hover:bg-purple-400 disabled:opacity-40 transition-colors">
                        {editDomain ? "Update Domain" : "Create Domain"}
                    </button>
                </div>
            </Modal>

            {/* Skill Modal */}
            <Modal open={skillModal} onClose={() => setSkillModal(false)} title={editSkill ? "Edit Skill" : "New Skill"}>
                <div className="space-y-4">
                    {!editSkill && (
                        <div>
                            <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Domain *</label>
                            <select value={skillForm.domain_id} onChange={(e) => setSkillForm({ ...skillForm, domain_id: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none">
                                <option value="">Select domain...</option>
                                {domains.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Skill Name *</label>
                        <input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" placeholder="e.g., Data Structures" />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Description</label>
                        <textarea value={skillForm.description} onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" rows={2} placeholder="Brief description..." />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Difficulty</label>
                        <select value={skillForm.difficulty_level} onChange={(e) => setSkillForm({ ...skillForm, difficulty_level: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <button onClick={saveSkill} disabled={!skillForm.name || (!editSkill && !skillForm.domain_id)} className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-400 disabled:opacity-40 transition-colors">
                        {editSkill ? "Update Skill" : "Create Skill"}
                    </button>
                </div>
            </Modal>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                message={
                    deleteTarget?.type === "domain"
                        ? `Delete "${deleteTarget.item.name}"? This will also delete all skills and questions in this domain.`
                        : `Delete "${deleteTarget?.item.name}"? This will also delete all questions for this skill.`
                }
            />
        </div>
    );
}

// ═══════════════════════════════════════
//  TAB 4: QUESTIONS
// ═══════════════════════════════════════
function QuestionsTab() {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [domains, setDomains] = useState<DomainData[]>([]);
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterDomain, setFilterDomain] = useState("");
    const [filterSkill, setFilterSkill] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");

    // Modal
    const [questionModal, setQuestionModal] = useState(false);
    const [editQuestion, setEditQuestion] = useState<QuestionData | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<QuestionData | null>(null);
    const [qForm, setQForm] = useState({
        skill_id: "",
        question_text: "",
        options: ["", "", "", ""],
        correct_answer: 0,
        explanation: "",
    });

    const buildFilters = () => {
        const filters: { domainId?: string; skillId?: string; difficulty?: string } = {};
        if (filterSkill) filters.skillId = filterSkill;
        else if (filterDomain) filters.domainId = filterDomain;
        if (filterDifficulty) filters.difficulty = filterDifficulty;
        return Object.keys(filters).length > 0 ? filters : undefined;
    };

    const loadQuestions = (filters?: { domainId?: string; skillId?: string; difficulty?: string }) => {
        getAdminQuestions(filters).then(setQuestions).catch(console.error);
    };

    useEffect(() => {
        Promise.all([
            getAdminDomains().then(setDomains),
            getAdminSkills().then(setSkills),
            loadQuestions(),
        ]).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadQuestions(buildFilters());
    }, [filterDomain, filterSkill, filterDifficulty]);

    const openQuestionModal = (q?: QuestionData) => {
        if (q) {
            setEditQuestion(q);
            setQForm({
                skill_id: q.skill_id._id,
                question_text: q.question_text,
                options: [...q.options],
                correct_answer: q.correct_answer,
                explanation: q.explanation || "",
            });
        } else {
            setEditQuestion(null);
            setQForm({
                skill_id: filterSkill || "",
                question_text: "",
                options: ["", "", "", ""],
                correct_answer: 0,
                explanation: "",
            });
        }
        setQuestionModal(true);
    };

    const saveQuestion = async () => {
        try {
            if (editQuestion) {
                await updateAdminQuestion(editQuestion._id, {
                    question_text: qForm.question_text,
                    options: qForm.options,
                    correct_answer: qForm.correct_answer,
                    explanation: qForm.explanation,
                });
            } else {
                await createAdminQuestion(qForm);
            }
            setQuestionModal(false);
            loadQuestions(buildFilters());
        } catch (e) { console.error(e); }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteAdminQuestion(deleteTarget._id);
            setDeleteTarget(null);
            loadQuestions(buildFilters());
        } catch (e) { console.error(e); }
    };

    const filteredSkills = filterDomain
        ? skills.filter(s => s.domain_id?._id === filterDomain)
        : skills;

    const clearAllFilters = () => {
        setFilterDomain("");
        setFilterSkill("");
        setFilterDifficulty("");
    };

    const hasActiveFilters = filterDomain || filterSkill || filterDifficulty;

    if (loading) return <LoadingState />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1 text-foreground">Question Bank</h2>
                    <p className="text-muted-foreground text-sm">{questions.length} questions</p>
                </div>
                <button onClick={() => openQuestionModal()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-500/30 transition-colors">
                    <Plus className="w-4 h-4" /> Add Question
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Filter className="w-3.5 h-3.5" />
                    Filters:
                </div>
                <div className="relative">
                    <select
                        value={filterDomain}
                        onChange={(e) => { setFilterDomain(e.target.value); setFilterSkill(""); }}
                        className="bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none pr-10 min-w-[180px]"
                    >
                        <option value="">All Domains</option>
                        {domains.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                    <select
                        value={filterSkill}
                        onChange={(e) => setFilterSkill(e.target.value)}
                        className="bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none pr-10 min-w-[180px]"
                    >
                        <option value="">All Skills</option>
                        {filteredSkills.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                    <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                    <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        className={`bg-background border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none pr-10 min-w-[160px] ${filterDifficulty ? "border-purple-500/30" : "border-border"
                            }`}
                    >
                        <option value="">All Difficulty</option>
                        <option value="Easy">🟢 Easy</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Hard">🔴 Hard</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                        <X className="w-3 h-3" /> Clear filters
                    </button>
                )}
            </div>

            {/* Question Cards */}
            <div className="space-y-3">
                {questions.map((q, idx) => (
                    <div key={q._id} className="bg-card border border-border rounded-2xl p-5 hover:border-border/80 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="text-xs text-muted-foreground font-mono">#{idx + 1}</span>
                                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md uppercase">
                                        {q.skill_id?.domain_id?.name}
                                    </span>
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                                        {q.skill_id?.name}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${q.skill_id?.difficulty_level === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                        q.skill_id?.difficulty_level === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                                            q.skill_id?.difficulty_level === "Hard" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                                                "bg-muted text-muted-foreground"
                                        }`}>
                                        {q.skill_id?.difficulty_level || "N/A"}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-foreground mb-3">{q.question_text}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${i === q.correct_answer
                                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium"
                                                : "bg-muted/50 border border-border text-muted-foreground"
                                                }`}
                                        >
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === q.correct_answer ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                                                }`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button onClick={() => openQuestionModal(q)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setDeleteTarget(q)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500/60 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {questions.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground text-sm">No questions found</div>
                )}
            </div>

            {/* Question Modal */}
            <Modal open={questionModal} onClose={() => setQuestionModal(false)} title={editQuestion ? "Edit Question" : "New Question"}>
                <div className="space-y-4">
                    {!editQuestion && (
                        <div>
                            <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Skill *</label>
                            <select value={qForm.skill_id} onChange={(e) => setQForm({ ...qForm, skill_id: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none">
                                <option value="">Select skill...</option>
                                {skills.map((s) => <option key={s._id} value={s._id}>{s.domain_id?.name} → {s.name} ({s.difficulty_level})</option>)}
                            </select>
                            <p className="text-[11px] text-muted-foreground mt-1">Difficulty level is inherited from the selected skill</p>
                        </div>
                    )}
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Question *</label>
                        <textarea value={qForm.question_text} onChange={(e) => setQForm({ ...qForm, question_text: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" rows={2} placeholder="Enter question text..." />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Options *</label>
                        <div className="space-y-2">
                            {qForm.options.map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setQForm({ ...qForm, correct_answer: i })}
                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${qForm.correct_answer === i ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            }`}
                                    >
                                        {String.fromCharCode(65 + i)}
                                    </button>
                                    <input
                                        value={opt}
                                        onChange={(e) => {
                                            const newOpts = [...qForm.options];
                                            newOpts[i] = e.target.value;
                                            setQForm({ ...qForm, options: newOpts });
                                        }}
                                        className="flex-1 bg-background border border-border text-foreground rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1.5">Click a letter to mark the correct answer</p>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Explanation (optional)</label>
                        <textarea value={qForm.explanation} onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })} className="w-full bg-background border border-border text-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" rows={2} placeholder="Why is this the correct answer?" />
                    </div>
                    <button
                        onClick={saveQuestion}
                        disabled={!qForm.question_text || (!editQuestion && !qForm.skill_id) || qForm.options.some(o => !o)}
                        className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-medium text-sm hover:bg-purple-400 disabled:opacity-40 transition-colors"
                    >
                        {editQuestion ? "Update Question" : "Create Question"}
                    </button>
                </div>
            </Modal>

            <ConfirmDialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                message={`Delete this question? This action cannot be undone.`}
            />
        </div>
    );
}

// ═══════════════════════════════════════
//  TAB 5: SKILL PORTAL (Dossier)
// ═══════════════════════════════════════
interface DossierUser {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    domain: string;
    skills: string[];
    certifications: { level: string; licence_id: string; score: number; issued_at: string }[];
    hasProfile: boolean;
    profileCompletedAt: string | null;
}

function SkillPortalTab() {
    const [users, setUsers] = useState<DossierUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDomain, setFilterDomain] = useState("");
    const [filterSkill, setFilterSkill] = useState("");
    const [filterCert, setFilterCert] = useState("");
    const [domains, setDomains] = useState<DomainData[]>([]);
    const [downloading, setDownloading] = useState<string | null>(null);

    const search = () => {
        setLoading(true);
        searchDossierUsers({
            q: searchQuery || undefined,
            domain: filterDomain || undefined,
            skill: filterSkill || undefined,
            certification: filterCert || undefined,
        })
            .then(setUsers)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        search();
        getAdminDomains().then(setDomains).catch(console.error);
    }, []);

    useEffect(() => {
        const debounce = setTimeout(() => search(), 400);
        return () => clearTimeout(debounce);
    }, [searchQuery, filterDomain, filterSkill, filterCert]);

    const handleDownloadPdf = async (userId: string, userName: string) => {
        setDownloading(userId);
        try {
            const blob = await downloadDossierPdf(userId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Dossier_${userName.replace(/\s+/g, "_")}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
        } finally {
            setDownloading(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2 text-foreground">
                    <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    Skill Portal
                </h2>
                <p className="text-muted-foreground text-sm">Search trainees by domain, skills, or certifications and download their dossier</p>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                        value={filterDomain}
                        onChange={e => setFilterDomain(e.target.value)}
                        className="w-full bg-background border border-border text-foreground rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
                    >
                        <option value="">All Domains</option>
                        {domains.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <div>
                    <input
                        type="text"
                        value={filterSkill}
                        onChange={e => setFilterSkill(e.target.value)}
                        placeholder="Filter by skill..."
                        className="w-full bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                </div>
                <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                        value={filterCert}
                        onChange={e => setFilterCert(e.target.value)}
                        className="w-full bg-background border border-border text-foreground rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
                    >
                        <option value="">All Certifications</option>
                        <option value="any">Any Certification</option>
                        <option value="PL-1">PL-1 Only</option>
                        <option value="PL-2">PL-2 Only</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <LoadingState />
            ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                        <h3 className="font-bold text-sm text-foreground">{users.length} Trainee{users.length !== 1 ? "s" : ""} Found</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Trainee</th>
                                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Domain</th>
                                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Skills</th>
                                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Certifications</th>
                                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Profile</th>
                                    <th className="text-right px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Dossier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 overflow-hidden">
                                                    {user.avatar ? (
                                                        <img src={`/src/assets/avatars/${user.avatar}`} alt="" className="w-7 h-7 object-contain" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{user.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">{user.domain}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {user.skills.length > 0 ? (
                                                    <>
                                                        {user.skills.slice(0, 3).map(s => (
                                                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{s}</span>
                                                        ))}
                                                        {user.skills.length > 3 && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">+{user.skills.length - 3}</span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {user.certifications.length > 0 ? (
                                                    user.certifications.map((c, i) => (
                                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                                                            {c.level} ({c.score}%)
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">None</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {user.hasProfile ? (
                                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">Complete</span>
                                            ) : (
                                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">Incomplete</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <button
                                                onClick={() => handleDownloadPdf(user._id, user.name)}
                                                disabled={downloading === user._id}
                                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 hover:bg-purple-500/25 transition-colors ml-auto disabled:opacity-50"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                {downloading === user._id ? "Downloading..." : "Download PDF"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">No trainees found matching your filters</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════
function LoadingState() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <p className="text-muted-foreground text-sm">{message}</p>
            </div>
        </div>
    );
}

export default Admin;
