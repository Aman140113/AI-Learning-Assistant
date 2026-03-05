import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Save, User, GraduationCap, Wrench, FolderGit2, Trophy, Activity,
    Plus, Trash2, Shield, Loader2, CheckCircle2, X
} from "lucide-react";
import Layout from "@/components/Layout";
import { getDossierProfile, saveDossierProfile, getCertificationStatus } from "@/services/api";

interface Education {
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
}

interface Project {
    title: string;
    description: string;
    technologies: string;
    link: string;
}

interface Achievement {
    title: string;
    description: string;
    date: string;
}

interface ActivityItem {
    title: string;
    role: string;
    description: string;
}

const emptyEducation: Education = { institution: "", degree: "", field: "", startYear: "", endYear: "" };
const emptyProject: Project = { title: "", description: "", technologies: "", link: "" };
const emptyAchievement: Achievement = { title: "", description: "", date: "" };
const emptyActivity: ActivityItem = { title: "", role: "", description: "" };

const SkillsProfile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName") || "";
    const userEmail = localStorage.getItem("userEmail") || "";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    // Form state
    const [licenceId, setLicenceId] = useState("");
    const [domain, setDomain] = useState("");
    const [phone, setPhone] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [education, setEducation] = useState<Education[]>([{ ...emptyEducation }]);
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [projects, setProjects] = useState<Project[]>([{ ...emptyProject }]);
    const [achievements, setAchievements] = useState<Achievement[]>([{ ...emptyAchievement }]);
    const [activities, setActivities] = useState<ActivityItem[]>([{ ...emptyActivity }]);

    useEffect(() => {
        if (!userId || userId === "demo_user") {
            setLoading(false);
            return;
        }
        Promise.all([
            getDossierProfile(userId).catch(() => null),
            getCertificationStatus(userId).catch(() => null),
        ]).then(([profileData, certData]) => {
            if (profileData?.profile) {
                const p = profileData.profile;
                setLicenceId(p.licence_id || "");
                setDomain(p.domain || localStorage.getItem("selectedDomainName") || "");
                setPhone(p.phone || "");
                setLinkedin(p.linkedin || "");
                setGithub(p.github || "");
                if (p.education?.length > 0) setEducation(p.education);
                if (p.skills?.length > 0) setSkills(p.skills);
                if (p.projects?.length > 0) setProjects(p.projects);
                if (p.achievements?.length > 0) setAchievements(p.achievements);
                if (p.activities?.length > 0) setActivities(p.activities);
            }
            // If no licence_id from profile, try from cert status
            if (!licenceId && certData?.certifications?.length > 0) {
                const pl1 = certData.certifications.find((c: any) => c.level === "PL-1" && c.licence_id);
                if (pl1) setLicenceId(pl1.licence_id);
            }
            setLoading(false);
        });
    }, [userId]);

    const handleSave = async () => {
        if (!userId || userId === "demo_user") return;
        setSaving(true);
        try {
            await saveDossierProfile(userId, {
                phone, linkedin, github,
                education: education.filter(e => e.institution || e.degree),
                skills,
                projects: projects.filter(p => p.title),
                achievements: achievements.filter(a => a.title),
                activities: activities.filter(a => a.title),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    // Skill tag helpers
    const addSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed && !skills.includes(trimmed)) {
            setSkills([...skills, trimmed]);
            setSkillInput("");
        }
    };
    const removeSkill = (s: string) => setSkills(skills.filter(sk => sk !== s));

    const sections = [
        { icon: User, label: "Profile", color: "text-[#00F5D4]" },
        { icon: GraduationCap, label: "Education", color: "text-blue-400" },
        { icon: Wrench, label: "Skills", color: "text-emerald-400" },
        { icon: FolderGit2, label: "Projects", color: "text-amber-400" },
        { icon: Trophy, label: "Achievements", color: "text-red-400" },
        { icon: Activity, label: "Activities", color: "text-indigo-400" },
    ];

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </Layout>
        );
    }

    const inputClass = "w-full bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#00F5D4] focus:border-[#00F5D4] transition-all";
    const readonlyClass = "w-full bg-muted border border-border text-muted-foreground rounded-xl px-4 py-3 text-sm cursor-not-allowed";
    const labelClass = "text-xs text-muted-foreground font-medium mb-1.5 block";

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-4xl pb-16">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Skills & Education Profile</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">Complete your trainee dossier</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#00F5D4] text-black hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,212,0.2)] disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saving ? "Saving..." : saved ? "Saved!" : "Save Profile"}
                    </button>
                </div>

                {/* Section Navigation */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {sections.map((sec, i) => (
                        <button
                            key={sec.label}
                            onClick={() => setActiveSection(i)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeSection === i
                                ? "bg-primary/10 text-foreground border border-primary/20 shadow-lg"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                                }`}
                        >
                            <sec.icon className={`w-4 h-4 ${activeSection === i ? sec.color : ""}`} />
                            {sec.label}
                        </button>
                    ))}
                </div>

                {/* ═══ PROFILE SECTION ═══ */}
                {activeSection === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-2">
                        <div className="glass-card p-6 space-y-5">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <User className="w-5 h-5 text-[#00F5D4]" />
                                Personal Information
                            </h2>

                            {/* Licence ID Banner */}
                            {licenceId && (
                                <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 p-4 rounded-2xl">
                                    <Shield className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">PL-1 Certification Licence ID</p>
                                        <code className="text-base font-mono font-bold text-foreground tracking-wider">{licenceId}</code>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input value={userName} readOnly className={readonlyClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input value={userEmail} readOnly className={readonlyClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Domain</label>
                                    <input value={domain || localStorage.getItem("selectedDomainName") || ""} readOnly className={readonlyClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>LinkedIn Profile</label>
                                    <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>GitHub Profile</label>
                                    <input value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..." className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ EDUCATION SECTION ═══ */}
                {activeSection === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-400" />
                                Education
                            </h2>
                            <button onClick={() => setEducation([...education, { ...emptyEducation }])}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Add Education
                            </button>
                        </div>
                        {education.map((edu, i) => (
                            <div key={i} className="glass-card p-5 space-y-4 relative group">
                                {education.length > 1 && (
                                    <button onClick={() => setEducation(education.filter((_, idx) => idx !== i))}
                                        className="absolute top-4 right-4 p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Institution *</label>
                                        <input value={edu.institution} onChange={e => { const n = [...education]; n[i].institution = e.target.value; setEducation(n); }} placeholder="e.g., IIT Delhi" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Degree</label>
                                        <input value={edu.degree} onChange={e => { const n = [...education]; n[i].degree = e.target.value; setEducation(n); }} placeholder="e.g., B.Tech" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Field of Study</label>
                                        <input value={edu.field} onChange={e => { const n = [...education]; n[i].field = e.target.value; setEducation(n); }} placeholder="e.g., Computer Science" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Start Year</label>
                                        <input value={edu.startYear} onChange={e => { const n = [...education]; n[i].startYear = e.target.value; setEducation(n); }} placeholder="2020" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>End Year</label>
                                        <input value={edu.endYear} onChange={e => { const n = [...education]; n[i].endYear = e.target.value; setEducation(n); }} placeholder="2024" className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ═══ SKILLS SECTION ═══ */}
                {activeSection === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                            <Wrench className="w-5 h-5 text-emerald-400" />
                            Skills
                        </h2>
                        <div className="glass-card p-6">
                            <div className="flex gap-2 mb-4">
                                <input
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                    placeholder="Type a skill and press Enter..."
                                    className={inputClass}
                                />
                                <button onClick={addSkill} className="px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 text-sm font-medium transition-colors shrink-0">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.length === 0 && (
                                    <p className="text-sm text-muted-foreground">No skills added. Type a skill above and press Enter.</p>
                                )}
                                {skills.map(s => (
                                    <span key={s} className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-sm font-medium group hover:border-emerald-500/40 transition-colors">
                                        {s}
                                        <button onClick={() => removeSkill(s)} className="text-emerald-400/50 hover:text-red-400 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ PROJECTS SECTION ═══ */}
                {activeSection === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <FolderGit2 className="w-5 h-5 text-amber-400" />
                                Projects
                            </h2>
                            <button onClick={() => setProjects([...projects, { ...emptyProject }])}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Add Project
                            </button>
                        </div>
                        {projects.map((proj, i) => (
                            <div key={i} className="glass-card p-5 space-y-4 relative group">
                                {projects.length > 1 && (
                                    <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}
                                        className="absolute top-4 right-4 p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Project Title *</label>
                                        <input value={proj.title} onChange={e => { const n = [...projects]; n[i].title = e.target.value; setProjects(n); }} placeholder="e.g., AI Chatbot" className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea value={proj.description} onChange={e => { const n = [...projects]; n[i].description = e.target.value; setProjects(n); }} placeholder="Brief description..." rows={2} className={inputClass + " resize-none"} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Technologies</label>
                                        <input value={proj.technologies} onChange={e => { const n = [...projects]; n[i].technologies = e.target.value; setProjects(n); }} placeholder="React, Node.js, MongoDB" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link</label>
                                        <input value={proj.link} onChange={e => { const n = [...projects]; n[i].link = e.target.value; setProjects(n); }} placeholder="https://github.com/..." className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ═══ ACHIEVEMENTS SECTION ═══ */}
                {activeSection === 4 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-red-400" />
                                Achievements
                            </h2>
                            <button onClick={() => setAchievements([...achievements, { ...emptyAchievement }])}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Add Achievement
                            </button>
                        </div>
                        {achievements.map((ach, i) => (
                            <div key={i} className="glass-card p-5 space-y-4 relative group">
                                {achievements.length > 1 && (
                                    <button onClick={() => setAchievements(achievements.filter((_, idx) => idx !== i))}
                                        className="absolute top-4 right-4 p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Title *</label>
                                        <input value={ach.title} onChange={e => { const n = [...achievements]; n[i].title = e.target.value; setAchievements(n); }} placeholder="e.g., Hackathon Winner" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Date</label>
                                        <input value={ach.date} onChange={e => { const n = [...achievements]; n[i].date = e.target.value; setAchievements(n); }} placeholder="March 2026" className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea value={ach.description} onChange={e => { const n = [...achievements]; n[i].description = e.target.value; setAchievements(n); }} placeholder="Brief description..." rows={2} className={inputClass + " resize-none"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ═══ ACTIVITIES SECTION ═══ */}
                {activeSection === 5 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Activity className="w-5 h-5 text-indigo-400" />
                                Activities
                            </h2>
                            <button onClick={() => setActivities([...activities, { ...emptyActivity }])}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Add Activity
                            </button>
                        </div>
                        {activities.map((act, i) => (
                            <div key={i} className="glass-card p-5 space-y-4 relative group">
                                {activities.length > 1 && (
                                    <button onClick={() => setActivities(activities.filter((_, idx) => idx !== i))}
                                        className="absolute top-4 right-4 p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Activity Title *</label>
                                        <input value={act.title} onChange={e => { const n = [...activities]; n[i].title = e.target.value; setActivities(n); }} placeholder="e.g., Coding Club" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Your Role</label>
                                        <input value={act.role} onChange={e => { const n = [...activities]; n[i].role = e.target.value; setActivities(n); }} placeholder="e.g., Lead, Member" className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Description</label>
                                        <textarea value={act.description} onChange={e => { const n = [...activities]; n[i].description = e.target.value; setActivities(n); }} placeholder="Brief description..." rows={2} className={inputClass + " resize-none"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Save Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border p-4 z-50">
                    <div className="container mx-auto max-w-4xl flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            {saved ? (
                                <span className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Profile saved successfully</span>
                            ) : (
                                "Fill all sections and save your profile"
                            )}
                        </p>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[#00F5D4] text-black hover:bg-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SkillsProfile;
