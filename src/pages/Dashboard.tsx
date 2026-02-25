import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Star, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import SkillCard from "@/components/SkillCard";
import CalendarCard from "@/components/CalendarCard";
import { getUserProgress, getDailyTasks as fetchDailyTasks } from "@/services/api";
import { userData as fallbackUserData, skills as fallbackSkills, weakSkills as fallbackWeakSkills } from "@/data/dummyData";

interface ProgressData {
  xp: number;
  maxXp: number;
  level: "Beginner" | "Intermediate" | "Proficient";
  streak: number;
  selectedDomain: string;
  skills: { name: string; progress: number; status: "Beginner" | "Intermediate" | "Proficient" }[];
  weakSkills: string[];
}

interface CompletedDate {
  _id: string;
  completedCount: number;
  totalXp: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || fallbackUserData.name;

  const [data, setData] = useState<ProgressData | null>(null);
  const [completedDates, setCompletedDates] = useState<CompletedDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      Promise.all([
        getUserProgress(userId).catch(() => null),
        fetchDailyTasks(userId).catch(() => null),
      ]).then(([progressData, tasksData]) => {
        if (progressData) setData(progressData);
        if (tasksData?.completedDates) setCompletedDates(tasksData.completedDates);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const xp = data?.xp ?? fallbackUserData.xp;
  const maxXp = data?.maxXp ?? fallbackUserData.maxXp;
  const level = data?.level ?? fallbackUserData.level;
  const streak = data?.streak ?? fallbackUserData.streak;
  const selectedDomain = data?.selectedDomain ?? localStorage.getItem("selectedDomainName") ?? fallbackUserData.selectedDomain;
  const skills = data?.skills ?? fallbackSkills;
  const weakSkills = data?.weakSkills ?? fallbackWeakSkills;

  const levelBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Proficient: "badge-proficient",
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground text-lg animate-pulse">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (2/3 Width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* User Stats Card */}
            <div className="glass-card p-6 border-b-4 border-b-primary/20 animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-xl text-primary">
                      {userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h1 className="font-heading font-bold text-xl text-foreground">
                      Welcome back, {userName}!
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${levelBadge[level]}`}>
                        {level}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-accent font-semibold px-2 py-0.5 bg-accent/10 rounded-full">
                        <Flame className="w-3.5 h-3.5" />
                        {streak} {streak === 1 ? "Day" : "Days"} Streak
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-warning/10 text-warning px-3 py-1.5 rounded-lg border border-warning/20 font-semibold self-start sm:self-center">
                  <Star className="w-3.5 h-3.5" />
                  <span>{selectedDomain}</span>
                </div>
              </div>
              <div className="mt-6">
                <ProgressBar value={xp} max={maxXp} label="Experience Points" variant="xp" size="lg" />
              </div>
            </div>

            {/* Skill Mastery */}
            <div className="animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Skill Mastery
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div
              className="rounded-2xl p-6 border-2 border-primary/20 animate-slide-up stagger-2 relative overflow-hidden group mt-2"
              style={{ background: "var(--gradient-primary)", opacity: 0, animationFillMode: "forwards" }}
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest mb-1">
                    Recommended Next Step
                  </p>
                  <h3 className="font-heading font-bold text-xl text-primary-foreground mb-1">
                    Start Adaptive Quiz
                  </h3>
                  <p className="text-primary-foreground/80 text-sm max-w-sm">
                    Dynamic questions based on your current level.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/quiz")}
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background text-primary font-heading font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shrink-0"
                >
                  Start Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (1/3 Width) */}
          <div className="flex flex-col gap-6 lg:col-span-1">

            {/* Calendar */}
            <div className="animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <CalendarCard completedDates={completedDates} />
            </div>

            {/* Needs Improvement */}
            <div className="animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <h2 className="font-heading font-bold text-lg text-foreground mb-3 flex items-center gap-2 pl-1">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Needs Improvement
              </h2>
              <div className="glass-card p-5 h-full border border-warning/10">
                {weakSkills.length > 0 ? (
                  <ul className="space-y-3">
                    {weakSkills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-sm font-medium text-foreground bg-foreground/5 p-2 rounded-lg border border-border/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-warning shrink-0 shadow-[0_0_8px_hsl(var(--warning)/0.6)]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center text-center justify-center py-6 px-4 h-full">
                    <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">All caught up!</p>
                    <p className="text-xs text-muted-foreground mt-1">Take a quiz for new insights.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
