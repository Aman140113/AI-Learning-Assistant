import { useNavigate } from "react-router-dom";
import { Trophy, Zap, Brain, AlertTriangle, MessageSquare, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { resultData } from "@/data/dummyData";

// Read weak skills from quiz API result

// ✅ Derive mastery level from score
const getMasteryLevel = (score: number): "Beginner" | "Intermediate" | "Proficient" => {
  if (score >= 80) return "Proficient";
  if (score >= 50) return "Intermediate";
  return "Beginner";
};

const getMasteryFeedback = (score: number, domain: string): string => {
  const level = getMasteryLevel(score);
  if (level === "Proficient")
    return `Excellent work! You have a strong grasp of ${domain} concepts. Keep pushing to master advanced topics.`;
  if (level === "Intermediate")
    return `Good effort! You understand the core ${domain} concepts but there's room to grow. Focus on your weak areas to level up.`;
  return `Keep going! You're building your foundation in ${domain}. Review the basics and practice regularly to improve.`;
};

const Result = () => {
  const navigate = useNavigate();

  // ✅ Read actual quiz result from sessionStorage
  const raw = sessionStorage.getItem("quizResult");
  const quizResult = raw ? JSON.parse(raw) : null;

  const score = quizResult?.score ?? resultData.score;
  const xpEarned = quizResult?.xpEarned ?? resultData.xpEarned;
  const correctAnswers = quizResult?.correctAnswers ?? 0;
  const totalQuestions = quizResult?.totalQuestions ?? 10;
  const weakSkillsFound: string[] = quizResult?.weakSkills ?? resultData.weakSkillsFound;
  const masteryLevel = getMasteryLevel(score);
  const domain = localStorage.getItem("selectedDomainName") ?? "this domain";
  const aiFeedback = getMasteryFeedback(score, domain);

  const masteryBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Proficient: "badge-proficient",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl pb-16">

        {/* Score Hero */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-8 animate-slide-up"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-count-up">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-heading text-5xl font-bold text-primary-foreground mb-2 animate-count-up stagger-1" style={{ animationFillMode: "forwards" }}>
            {score}%
          </h1>
          <p className="text-primary-foreground/60 text-lg">
            {correctAnswers} / {totalQuestions} correct — Quiz Complete!
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 text-center animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-heading font-bold text-2xl text-foreground">+{xpEarned} XP</p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </div>

          {/* ✅ Middle card: dynamic mastery level */}
          <div className="glass-card p-5 text-center animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-heading font-bold text-lg text-foreground">{masteryLevel}</p>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${masteryBadge[masteryLevel]}`}>
              Mastery Level
            </span>
          </div>

          <div className="glass-card p-5 text-center animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="font-heading font-bold text-2xl text-foreground">{weakSkillsFound.length}</p>
            <p className="text-xs text-muted-foreground">Weak Areas</p>
          </div>
        </div>

        {/* Weak Skills — unchanged as requested */}
        <div className="glass-card p-6 mb-6 animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Weak Skills Found
          </h3>
          <div className="flex flex-wrap gap-2">
            {weakSkillsFound.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-sm font-medium border border-warning/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* AI Feedback — dynamic based on actual score */}
        <div className="glass-card p-6 mb-8 border-l-4 border-l-primary animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <h3 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            AI Feedback
          </h3>
          <p className="text-muted-foreground leading-relaxed">{aiFeedback}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center animate-slide-up stagger-4" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-2/3 group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            Continue Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default Result;