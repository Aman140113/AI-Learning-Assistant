import { useNavigate } from "react-router-dom";
import { Trophy, Zap, Brain, AlertTriangle, MessageSquare, ArrowRight, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import { resultData } from "@/data/dummyData";

const Result = () => {
  const navigate = useNavigate();

  const masteryBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Proficient: "badge-proficient",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Score Hero */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-8 animate-slide-up"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-count-up">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-2 animate-count-up stagger-1" style={{ animationFillMode: "forwards" }}>
            {resultData.score}%
          </h1>
          <p className="text-primary-foreground/60 text-lg">Quiz Complete!</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 text-center animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-heading font-bold text-2xl text-foreground">+{resultData.xpEarned} XP</p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </div>
          <div className="glass-card p-5 text-center animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-heading font-bold text-lg text-foreground">{resultData.masteryLevel}</p>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${masteryBadge[resultData.masteryLevel]}`}>
              Mastery Level
            </span>
          </div>
          <div className="glass-card p-5 text-center animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="font-heading font-bold text-2xl text-foreground">{resultData.weakSkillsFound.length}</p>
            <p className="text-xs text-muted-foreground">Weak Areas</p>
          </div>
        </div>

        {/* Weak Skills */}
        <div className="glass-card p-6 mb-6 animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Weak Skills Found
          </h3>
          <div className="flex flex-wrap gap-2">
            {resultData.weakSkillsFound.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-sm font-medium border border-warning/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* AI Feedback */}
        <div className="glass-card p-6 mb-8 border-l-4 border-l-primary animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <h3 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            AI Feedback
          </h3>
          <p className="text-muted-foreground leading-relaxed">{resultData.aiFeedback}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-semibold transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground"
          >
            Continue Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/learning-path")}
            className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-semibold transition-all hover:scale-105 active:scale-95 border-2 border-primary text-primary bg-primary/5"
          >
            <Map className="w-5 h-5" />
            View Learning Path
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
