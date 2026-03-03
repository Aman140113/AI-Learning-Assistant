import Layout from "@/components/Layout";
import { Zap, Target, Flame, TrendingUp, CheckCircle2, Clock, Lock, AlertTriangle, Brain, Calendar } from "lucide-react";
import { performanceData, skills, weakSkills, learningPathResponse } from "@/data/dummyData";

// ── Helpers ──────────────────────────────────────────────
const pct = (v: number, max: number) => Math.round((v / max) * 100);
const weeksCompleted = performanceData.weeklyProgress.filter(w => w.status === "Completed").length;
const totalWeeks = performanceData.weeklyProgress.length;

// ── SVG Charts ───────────────────────────────────────────

/** Pure-SVG line chart: Actual XP vs Target XP per week */
const XpLineChart = () => {
    const weeks = performanceData.weeklyProgress;
    const W = 520, H = 200, padL = 40, padR = 20, padT = 20, padB = 35;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const maxXp = performanceData.targetXp;

    // Cumulative XP
    let cumActual = 0, cumTarget = 0;
    const actual: number[] = [0];
    const target: number[] = [0];
    weeks.forEach(w => {
        cumActual += w.xpEarned;
        cumTarget += w.xpTarget;
        actual.push(cumActual);
        target.push(cumTarget);
    });

    const toX = (i: number) => padL + (i / weeks.length) * chartW;
    const toY = (v: number) => padT + chartH - (v / maxXp) * chartH;

    const actualPts = actual.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
    const targetPts = target.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

    // Area fill under actual line
    const areaPath = `M${toX(0)},${toY(0)} ${actual.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ")} L${toX(actual.length - 1)},${toY(0)} Z`;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(f => (
                <g key={f}>
                    <line x1={padL} y1={toY(f * maxXp)} x2={W - padR} y2={toY(f * maxXp)} className="stroke-border" strokeWidth="0.5" strokeDasharray="4,4" />
                    <text x={padL - 5} y={toY(f * maxXp) + 4} className="fill-muted-foreground" fontSize="9" textAnchor="end">{Math.round(f * maxXp)}</text>
                </g>
            ))}
            {/* X-axis labels */}
            {weeks.map((_, i) => (
                <text key={i} x={toX(i + 1)} y={H - 5} className="fill-muted-foreground" fontSize="9" textAnchor="middle">W{i + 1}</text>
            ))}
            <text x={toX(0)} y={H - 5} className="fill-muted-foreground" fontSize="9" textAnchor="middle">Start</text>
            {/* Area */}
            <path d={areaPath} className="fill-primary/10" />
            {/* Target line */}
            <polyline points={targetPts} fill="none" className="stroke-muted-foreground/40" strokeWidth="2" strokeDasharray="6,4" />
            {/* Actual line */}
            <polyline points={actualPts} fill="none" className="stroke-primary" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {/* Dots on actual */}
            {actual.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toY(v)} r="4" className="fill-primary stroke-background" strokeWidth="2" />
            ))}
        </svg>
    );
};

/** Pure-SVG radar chart for skills */
const SkillRadar = () => {
    const data = skills;
    const n = data.length;
    const cx = 130, cy = 120, R = 90;
    const angleStep = (2 * Math.PI) / n;
    const offset = -Math.PI / 2;

    const ptAt = (i: number, r: number) => {
        const a = offset + i * angleStep;
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    };

    // Grid rings
    const rings = [0.25, 0.5, 0.75, 1];

    // Data polygon
    const dataPts = data.map((d, i) => {
        const p = ptAt(i, (d.progress / 100) * R);
        return `${p.x},${p.y}`;
    }).join(" ");

    return (
        <svg viewBox="0 0 260 260" className="w-full h-auto max-w-[280px] mx-auto">
            {/* Grid rings */}
            {rings.map(r => (
                <polygon key={r} points={Array.from({ length: n }, (_, i) => { const p = ptAt(i, r * R); return `${p.x},${p.y}`; }).join(" ")} fill="none" className="stroke-border/40" strokeWidth="0.7" />
            ))}
            {/* Spokes */}
            {data.map((_, i) => {
                const p = ptAt(i, R);
                return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} className="stroke-border/30" strokeWidth="0.5" />;
            })}
            {/* Data area */}
            <polygon points={dataPts} className="fill-primary/20 stroke-primary" strokeWidth="2" />
            {/* Data dots + labels */}
            {data.map((d, i) => {
                const dp = ptAt(i, (d.progress / 100) * R);
                const lp = ptAt(i, R + 18);
                return (
                    <g key={i}>
                        <circle cx={dp.x} cy={dp.y} r="3.5" className="fill-primary stroke-background" strokeWidth="1.5" />
                        <text x={lp.x} y={lp.y + 3} className="fill-foreground" fontSize="8.5" textAnchor="middle" fontWeight="600">{d.name}</text>
                        <text x={lp.x} y={lp.y + 14} className="fill-muted-foreground" fontSize="7.5" textAnchor="middle">{d.progress}%</text>
                    </g>
                );
            })}
        </svg>
    );
};

// QuizBarChart removed

// ── Main Component ───────────────────────────────────────
const Performance = () => {
    const weeks = learningPathResponse.learning_path.weeks;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-5xl pb-16 space-y-8">

                {/* ─── Header ─── */}
                <div className="text-center animate-slide-up">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Performance</h1>
                    <p className="text-muted-foreground">Track your learning journey in detail</p>
                </div>

                {/* ─── 1. Overview Stat Cards ─── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    {/* Overall Progress */}
                    <div className="glass-card p-4 flex flex-col items-center gap-1.5">
                        <div className="relative w-12 h-12">
                            <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                                <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted" strokeWidth="3" />
                                <circle cx="18" cy="18" r="15" fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round"
                                    strokeDasharray={`${(weeksCompleted / totalWeeks) * 94.2} 94.2`} />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">{pct(weeksCompleted, totalWeeks)}%</span>
                        </div>
                        <span className="text-[11px] font-semibold text-muted-foreground">Progress</span>
                        <span className="text-[10px] text-muted-foreground">{weeksCompleted}/{totalWeeks} weeks</span>
                    </div>

                    {/* Total XP */}
                    <div className="glass-card p-4 flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{performanceData.totalXp}</span>
                        <span className="text-[10px] text-muted-foreground">/ {performanceData.targetXp} XP</span>
                    </div>

                    {/* Quiz Accuracy */}
                    <div className="glass-card p-4 flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{performanceData.overallAccuracy}%</span>
                        <span className="text-[10px] text-muted-foreground">Quiz Accuracy</span>
                    </div>

                    {/* Current Streak */}
                    <div className="glass-card p-4 flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-orange-400" />
                        </div>
                        <span className="text-lg font-bold text-foreground">{performanceData.currentStreak}</span>
                        <span className="text-[10px] text-muted-foreground">Day Streak 🔥</span>
                    </div>
                </div>

                {/* ─── 2. XP Progress + Skill Radar ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* XP Progress Chart */}
                    <div className="glass-card p-4 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-base font-bold text-foreground mb-1">XP Progress</h2>
                        <p className="text-[10px] text-muted-foreground mb-3">Actual XP earned vs target</p>
                        <div className="w-full flex justify-center">
                            <XpLineChart />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-primary rounded" /> Actual</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-muted-foreground/40 rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 3px, transparent 3px 6px)" }} /> Target</span>
                        </div>
                    </div>

                    {/* Skill Radar */}
                    <div className="glass-card p-4 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-base font-bold text-foreground mb-1">Skill Proficiency</h2>
                        <p className="text-[10px] text-muted-foreground mb-2">Radar view of your current skill levels</p>
                        <div className="w-full flex justify-center overflow-hidden items-center">
                            <SkillRadar />
                        </div>
                    </div>
                </div>

                {/* ─── 3. Weekly Course Completion ─── */}
                <div className="glass-card p-6 animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    <h2 className="text-lg font-bold text-foreground mb-1">Weekly Course Completion</h2>
                    <p className="text-xs text-muted-foreground mb-5">Track whether you're completing each week's course on schedule</p>

                    <div className="space-y-3">
                        {weeks.map((week, i) => {
                            const prog = performanceData.weeklyProgress[i];
                            const isCompleted = prog.status === "Completed";
                            const isCurrent = prog.status === "In Progress";
                            const isLocked = prog.status === "Locked";
                            const xpPct = prog.xpTarget > 0 ? Math.min(100, Math.round((prog.xpEarned / prog.xpTarget) * 100)) : 0;

                            return (
                                <div key={i} className={`rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center gap-2 transition-colors ${isCompleted ? "border-emerald-500/30 bg-emerald-500/5" :
                                    isCurrent ? "border-primary/30 bg-primary/5" :
                                        "border-border/40 bg-muted/10 opacity-60"
                                    }`}>
                                    {/* Status icon */}
                                    <div className="flex items-center gap-2 sm:w-48 shrink-0">
                                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                                        {isCurrent && <Clock className="w-4 h-4 text-primary animate-pulse shrink-0" />}
                                        {isLocked && <Lock className="w-4 h-4 text-muted-foreground shrink-0" />}
                                        <div>
                                            <p className="text-xs font-semibold text-foreground">Week {week.week}</p>
                                            <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{week.course_title}</p>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between text-[9px] mb-1">
                                            <span className="text-muted-foreground">{prog.xpEarned} / {prog.xpTarget} XP</span>
                                            <span className={`font-bold ${isCompleted ? "text-emerald-500" : isCurrent ? "text-primary" : "text-muted-foreground"}`}>{xpPct}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : isCurrent ? "bg-primary" : "bg-muted-foreground/20"}`} style={{ width: `${xpPct}%` }} />
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground sm:w-32 shrink-0 sm:justify-end">
                                        <span>{prog.hoursSpent}h / {prog.hoursEstimated}h</span>
                                        {isCompleted && prog.completedOnTime && <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-500 font-bold">On Time ✓</span>}
                                        {isCompleted && !prog.completedOnTime && <span className="px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-500 font-bold">Late</span>}
                                        {isCurrent && <span className="px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary font-bold">Current</span>}
                                        {isLocked && <span className="px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground font-bold">Locked</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Components relocated above or removed */}

                {/* ─── 7. Study Calendar + AI Insight ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Study Calendar */}
                    <div className="glass-card p-4 animate-slide-up stagger-6" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary" /> Study Activity
                        </h2>
                        <p className="text-[10px] text-muted-foreground mb-3">{performanceData.currentStreak} day streak</p>
                        <div className="grid grid-cols-7 gap-1">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                <div key={i} className="text-[8px] text-muted-foreground text-center font-medium">{d}</div>
                            ))}
                            {performanceData.studyCalendar.map((intensity, i) => (
                                <div key={i} className={`aspect-square rounded-sm transition-colors ${intensity === 0 ? "bg-muted" :
                                    intensity === 1 ? "bg-emerald-500/30" :
                                        intensity === 2 ? "bg-emerald-500/60" :
                                            "bg-emerald-500"
                                    }`} title={`Day ${i + 1}: intensity ${intensity}`} />
                            ))}
                        </div>
                    </div>

                    {/* Needs Improvement */}
                    <div className="glass-card p-4 animate-slide-up stagger-6" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Needs Improvement
                        </h2>
                        <p className="text-[10px] text-muted-foreground mb-3">Focus on these areas to level up faster</p>
                        <div className="space-y-3">
                            {skills
                                .filter(s => weakSkills.includes(s.name) || s.progress < 40)
                                .sort((a, b) => a.progress - b.progress)
                                .map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${skill.progress < 30 ? "bg-red-500/10 text-red-400" :
                                                skill.progress < 60 ? "bg-amber-500/10 text-amber-400" :
                                                    "bg-emerald-500/10 text-emerald-400"
                                                }`}>{skill.progress}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-700 ${skill.progress < 30 ? "bg-red-500" :
                                                skill.progress < 60 ? "bg-amber-500" :
                                                    "bg-emerald-500"
                                                }`} style={{ width: `${skill.progress}%` }} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Performance;
