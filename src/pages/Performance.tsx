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

/** Mini bar chart for quiz scores */
const QuizBarChart = () => {
    const quizzes = performanceData.quizHistory;
    const W = 520, H = 160, padL = 35, padR = 10, padT = 15, padB = 35;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const barW = chartW / quizzes.length * 0.5;
    const gap = chartW / quizzes.length;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* Horizontal grid */}
            {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                    <line x1={padL} y1={padT + chartH - (v / 100) * chartH} x2={W - padR} y2={padT + chartH - (v / 100) * chartH} className="stroke-border" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x={padL - 5} y={padT + chartH - (v / 100) * chartH + 3} className="fill-muted-foreground" fontSize="8" textAnchor="end">{v}%</text>
                </g>
            ))}
            {/* Bars */}
            {quizzes.map((q, i) => {
                const barH = (q.score / 100) * chartH;
                const x = padL + i * gap + (gap - barW) / 2;
                const y = padT + chartH - barH;
                const color = q.score >= 70 ? "fill-emerald-500" : q.score >= 50 ? "fill-amber-500" : "fill-red-500";
                return (
                    <g key={q.id}>
                        <rect x={x} y={y} width={barW} height={barH} rx={4} className={`${color} opacity-80`} />
                        <text x={x + barW / 2} y={y - 5} className="fill-foreground" fontSize="9" textAnchor="middle" fontWeight="600">{q.score}%</text>
                        <text x={x + barW / 2} y={H - 15} className="fill-muted-foreground" fontSize="7.5" textAnchor="middle">{q.date.slice(5)}</text>
                        <text x={x + barW / 2} y={H - 5} className="fill-muted-foreground" fontSize="7" textAnchor="middle">{q.difficulty}</text>
                    </g>
                );
            })}
            {/* Trend line */}
            {quizzes.length > 1 && (
                <polyline
                    points={quizzes.map((q, i) => {
                        const x = padL + i * gap + gap / 2;
                        const y = padT + chartH - (q.score / 100) * chartH;
                        return `${x},${y}`;
                    }).join(" ")}
                    fill="none" className="stroke-primary" strokeWidth="1.5" strokeDasharray="4,3" strokeLinecap="round"
                />
            )}
        </svg>
    );
};

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
                    <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Performance</h1>
                    <p className="text-muted-foreground">Track your learning journey in detail</p>
                </div>

                {/* ─── 1. Overview Stat Cards ─── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    {/* Overall Progress */}
                    <div className="glass-card p-5 flex flex-col items-center gap-2">
                        <div className="relative w-16 h-16">
                            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                                <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted" strokeWidth="3" />
                                <circle cx="18" cy="18" r="15" fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round"
                                    strokeDasharray={`${(weeksCompleted / totalWeeks) * 94.2} 94.2`} />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{pct(weeksCompleted, totalWeeks)}%</span>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">Overall Progress</span>
                        <span className="text-[10px] text-muted-foreground">{weeksCompleted}/{totalWeeks} weeks</span>
                    </div>

                    {/* Total XP */}
                    <div className="glass-card p-5 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-amber-400" />
                        </div>
                        <span className="text-xl font-bold text-foreground">{performanceData.totalXp}</span>
                        <span className="text-xs text-muted-foreground">/ {performanceData.targetXp} XP</span>
                    </div>

                    {/* Quiz Accuracy */}
                    <div className="glass-card p-5 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-xl font-bold text-foreground">{performanceData.overallAccuracy}%</span>
                        <span className="text-xs text-muted-foreground">Quiz Accuracy</span>
                    </div>

                    {/* Current Streak */}
                    <div className="glass-card p-5 flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-400" />
                        </div>
                        <span className="text-xl font-bold text-foreground">{performanceData.currentStreak}</span>
                        <span className="text-xs text-muted-foreground">Day Streak 🔥</span>
                    </div>
                </div>

                {/* ─── 2. XP Progress Chart ─── */}
                <div className="glass-card p-6 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    <h2 className="text-lg font-bold text-foreground mb-1">XP Progress</h2>
                    <p className="text-xs text-muted-foreground mb-4">Actual XP earned (solid) vs target (dashed) — cumulative by week</p>
                    <XpLineChart />
                    <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary rounded" /> Actual</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-muted-foreground/40 rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 4px, transparent 4px 8px)" }} /> Target</span>
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
                                <div key={i} className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-colors ${isCompleted ? "border-emerald-500/30 bg-emerald-500/5" :
                                        isCurrent ? "border-primary/30 bg-primary/5" :
                                            "border-border/40 bg-muted/10 opacity-60"
                                    }`}>
                                    {/* Status icon */}
                                    <div className="flex items-center gap-3 sm:w-56 shrink-0">
                                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                                        {isCurrent && <Clock className="w-5 h-5 text-primary animate-pulse shrink-0" />}
                                        {isLocked && <Lock className="w-5 h-5 text-muted-foreground shrink-0" />}
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">Week {week.week}</p>
                                            <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">{week.course_title}</p>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-muted-foreground">{prog.xpEarned} / {prog.xpTarget} XP</span>
                                            <span className={`font-bold ${isCompleted ? "text-emerald-500" : isCurrent ? "text-primary" : "text-muted-foreground"}`}>{xpPct}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : isCurrent ? "bg-primary" : "bg-muted-foreground/20"}`} style={{ width: `${xpPct}%` }} />
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground sm:w-40 shrink-0 sm:justify-end">
                                        <span>{prog.hoursSpent}h / {prog.hoursEstimated}h</span>
                                        {isCompleted && prog.completedOnTime && <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">On Time ✓</span>}
                                        {isCompleted && !prog.completedOnTime && <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">Late</span>}
                                        {isCurrent && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">Current</span>}
                                        {isLocked && <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-bold">Locked</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── 4. Skill Radar + 5. Areas to Improve ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Skill Radar */}
                    <div className="glass-card p-6 animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-lg font-bold text-foreground mb-1">Skill Proficiency</h2>
                        <p className="text-xs text-muted-foreground mb-3">Radar view of your current skill levels</p>
                        <SkillRadar />
                    </div>

                    {/* Areas to Improve */}
                    <div className="glass-card p-6 animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" /> Needs Improvement
                        </h2>
                        <p className="text-xs text-muted-foreground mb-4">Focus on these areas to level up faster</p>
                        <div className="space-y-4">
                            {skills
                                .filter(s => weakSkills.includes(s.name) || s.progress < 40)
                                .sort((a, b) => a.progress - b.progress)
                                .map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${skill.progress < 30 ? "bg-red-500/10 text-red-400" :
                                                    skill.progress < 60 ? "bg-amber-500/10 text-amber-400" :
                                                        "bg-emerald-500/10 text-emerald-400"
                                                }`}>{skill.progress}%</span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-700 ${skill.progress < 30 ? "bg-red-500" :
                                                    skill.progress < 60 ? "bg-amber-500" :
                                                        "bg-emerald-500"
                                                }`} style={{ width: `${skill.progress}%` }} />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            {skill.progress < 30 ? "Critical — prioritize practice exercises" :
                                                skill.progress < 60 ? "Needs more practice — revisit course material" :
                                                    "Good progress — keep reinforcing"}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* ─── 6. Quiz Performance ─── */}
                <div className="glass-card p-6 animate-slide-up stagger-5" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    <h2 className="text-lg font-bold text-foreground mb-1">Quiz Performance</h2>
                    <p className="text-xs text-muted-foreground mb-4">Recent quiz scores with trend line</p>
                    <QuizBarChart />
                </div>

                {/* ─── 7. Study Calendar + AI Insight ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Study Calendar */}
                    <div className="glass-card p-6 animate-slide-up stagger-6" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" /> Study Activity
                        </h2>
                        <p className="text-xs text-muted-foreground mb-4">Last 28 days — {performanceData.currentStreak} day streak (best: {performanceData.longestStreak})</p>
                        <div className="grid grid-cols-7 gap-1.5">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                <div key={i} className="text-[9px] text-muted-foreground text-center font-medium">{d}</div>
                            ))}
                            {performanceData.studyCalendar.map((intensity, i) => (
                                <div key={i} className={`aspect-square rounded-sm transition-colors ${intensity === 0 ? "bg-muted" :
                                        intensity === 1 ? "bg-emerald-500/30" :
                                            intensity === 2 ? "bg-emerald-500/60" :
                                                "bg-emerald-500"
                                    }`} title={`Day ${i + 1}: intensity ${intensity}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-[9px] text-muted-foreground justify-end">
                            <span>Less</span>
                            {[0, 1, 2, 3].map(l => (
                                <div key={l} className={`w-3 h-3 rounded-sm ${l === 0 ? "bg-muted" : l === 1 ? "bg-emerald-500/30" : l === 2 ? "bg-emerald-500/60" : "bg-emerald-500"
                                    }`} />
                            ))}
                            <span>More</span>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div className="glass-card p-6 animate-slide-up stagger-6" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <h2 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-400" /> AI Insights
                        </h2>
                        <p className="text-xs text-muted-foreground mb-4">Personalized recommendations based on your progress</p>
                        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-4">
                            <p className="text-sm text-foreground leading-relaxed">{performanceData.aiInsight}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-muted/30 p-3 text-center">
                                <p className="text-xl font-bold text-foreground">{performanceData.totalHoursStudied}h</p>
                                <p className="text-[10px] text-muted-foreground">Total Study Time</p>
                            </div>
                            <div className="rounded-lg bg-muted/30 p-3 text-center">
                                <p className="text-xl font-bold text-foreground">{performanceData.longestStreak}</p>
                                <p className="text-[10px] text-muted-foreground">Best Streak</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Performance;
