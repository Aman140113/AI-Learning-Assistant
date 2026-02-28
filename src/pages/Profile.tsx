import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar, Trophy, Zap, Flame, X, Plus, AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { getUserProgress, updateAvatar, deleteAccount } from "@/services/api";
import { userData as fallbackUserData } from "@/data/dummyData";

const avatars = [
    "boy_6247196.png", "boy_6453081.png", "boy_706836.png",
    "beard_5184768.png", "clown_1589797.png", "dracula_1224011.png",
    "man_4323002.png", "man_945230.png", "merchant_1090567.png",
    "pirate_1999508.png", "rockabilly_9600935.png", "woman_706803.png", "woman_706806.png"
];

const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName") || fallbackUserData.name;
    const userEmail = localStorage.getItem("userEmail") || "user@skillspark.ai";
    const [userAvatar, setUserAvatar] = useState(localStorage.getItem("userAvatar") || null);

    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [stats, setStats] = useState({ xp: 0, level: "Beginner", streak: 0, domain: "None" });

    useEffect(() => {
        if (userId) {
            getUserProgress(userId).then((data) => {
                setStats({
                    xp: data.xp || 0,
                    level: data.level || "Beginner",
                    streak: data.streak || 0,
                    domain: data.selectedDomain || "None",
                });
            }).catch(() => { });
        }
    }, [userId]);

    const handleAvatarChange = async (av: string) => {
        setUserAvatar(av);
        localStorage.setItem("userAvatar", av);
        setShowAvatarModal(false);
        if (userId && userId !== "demo_user") {
            try { await updateAvatar(userId, av); } catch { }
        }
    };

    const handleDeleteAccount = async () => {
        if (!userId || userId === "demo_user") return;
        setDeleting(true);
        try {
            await deleteAccount(userId);
            localStorage.clear();
            navigate("/");
        } catch {
            setDeleting(false);
        }
    };

    return (
        <Layout>
            {/* Avatar Selection Modal */}
            {showAvatarModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowAvatarModal(false)}>
                    <div className="bg-card border border-border rounded-3xl p-6 w-[90%] max-w-sm shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-foreground">Choose Avatar</h3>
                            <button onClick={() => setShowAvatarModal(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {avatars.map((av) => (
                                <div key={av} onClick={() => handleAvatarChange(av)}
                                    className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 border-2 p-2 ${userAvatar === av ? 'border-[#00F5D4] bg-[#00F5D4]/10 scale-105 shadow-[0_0_15px_rgba(0,245,212,0.3)]' : 'border-border bg-muted hover:border-primary/30 hover:bg-muted/80'}`}>
                                    <img src={`/src/assets/avatars/${av}`} alt="avatar" className="w-full h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
                    <div className="bg-card border border-red-500/30 rounded-3xl p-6 w-[90%] max-w-sm shadow-2xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Delete Account?</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-6">
                            This action is <span className="text-red-400 font-semibold">permanent</span>. All your data — quizzes, progress, learning paths, and daily tasks — will be deleted forever.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 rounded-2xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleDeleteAccount} disabled={deleting}
                                className="flex-1 py-3 rounded-2xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8 max-w-2xl pb-16">

                {/* Back button */}
                <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {/* Profile Header */}
                <div className="glass-card p-8 text-center animate-slide-up mb-6">
                    {/* Avatar */}
                    <div className="relative mx-auto w-24 h-24 mb-4 cursor-pointer group" onClick={() => setShowAvatarModal(true)}>
                        <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
                            {userAvatar ? (
                                <img src={`/src/assets/avatars/${userAvatar}`} alt="Avatar" className="w-20 h-20 object-contain" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary">{userName.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus className="w-6 h-6 text-[#00F5D4]" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-foreground mb-1">{userName}</h1>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {userEmail}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    {[
                        { icon: Zap, label: "Total XP", value: stats.xp, color: "text-[#00F5D4]", bg: "bg-[#00F5D4]/10" },
                        { icon: Trophy, label: "Level", value: stats.level, color: "text-amber-400", bg: "bg-amber-400/10" },
                        { icon: Flame, label: "Streak", value: `${stats.streak} days`, color: "text-orange-400", bg: "bg-orange-400/10" },
                        { icon: Calendar, label: "Domain", value: stats.domain.length > 12 ? stats.domain.slice(0, 12) + "…" : stats.domain, color: "text-blue-400", bg: "bg-blue-400/10" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-4 text-center">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mb-0.5">{stat.label}</p>
                            <p className="text-sm font-bold text-foreground truncate">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Account Info */}
                <div className="glass-card p-6 mb-6 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    <h2 className="text-lg font-bold text-foreground mb-4">Account Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Full Name</span>
                            <span className="text-sm font-semibold text-foreground">{userName}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Email</span>
                            <span className="text-sm font-semibold text-foreground">{userEmail}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Selected Domain</span>
                            <span className="text-sm font-semibold text-foreground">{stats.domain}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground">Profile Avatar</span>
                            <button onClick={() => setShowAvatarModal(true)} className="text-sm font-semibold text-[#00F5D4] hover:text-white transition-colors cursor-pointer">
                                Change Avatar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl border-2 border-red-500/20 bg-red-500/5 p-6 animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Permanently Delete Account
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button onClick={() => setShowDeleteModal(true)}
                        className="px-6 py-3 rounded-2xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                </div>

            </div>
        </Layout>
    );
};

export default Profile;
