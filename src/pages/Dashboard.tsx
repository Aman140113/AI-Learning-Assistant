import { useNavigate } from "react-router-dom";
import { Flame, Star, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SkillCard from "@/components/SkillCard";
import { userData, skills, weakSkills } from "@/data/dummyData";

const Dashboard = () => {
  const navigate = useNavigate();

  const levelBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Proficient: "badge-proficient",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Top section - User stats */}
        <div className="glass-card p-6 md:p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="font-heading font-bold text-2xl text-primary">
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  {userData.name}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelBadge[userData.level]}`}>
                    {userData.level}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-accent font-semibold">
                    <Flame className="w-4 h-4" />
                    {userData.streak} day streak
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-5 h-5 text-warning" />
              <span className="font-heading font-bold text-foreground">{userData.selectedDomain}</span>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar value={userData.xp} max={userData.maxXp} label="Experience Points" variant="xp" size="lg" />
          </div>
        </div>

        {/* Middle section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skill Mastery */}
          <div className="lg:col-span-2 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Skill Mastery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Weak Skills */}
          <div className="animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <h2 className="font-heading font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Needs Improvement
            </h2>
            <div className="glass-card p-5">
              <ul className="space-y-3">
                {weakSkills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-sm font-medium text-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-warning shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section - Recommended action */}
        <div
          className="rounded-2xl p-6 md:p-8 border-2 border-primary/20 animate-slide-up stagger-3"
          style={{ background: "var(--gradient-primary)", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider mb-1">
                Recommended Next Step
              </p>
              <h3 className="font-heading font-bold text-2xl text-primary-foreground">
                Start Adaptive Quiz
              </h3>
              <p className="text-primary-foreground/70 mt-1">
                Test your knowledge and discover your strengths
              </p>
            </div>
            <button
              onClick={() => navigate("/quiz")}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-foreground text-primary font-heading font-semibold transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
