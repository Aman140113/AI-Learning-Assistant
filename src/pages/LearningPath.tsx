import Layout from "@/components/Layout";
import RoadmapItem from "@/components/RoadmapItem";
import { learningPathResponse, resultData } from "@/data/dummyData";
import {
  Map,
  Trophy,
  Brain,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock,
  Star,
  ExternalLink,
  Target,
  Sparkles,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

// Derives mastery level from score
const getMasteryLevel = (score: number): "Beginner" | "Intermediate" | "Proficient" => {
  if (score >= 80) return "Proficient";
  if (score >= 50) return "Intermediate";
  return "Beginner";
};

const LearningPath = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isAdaptive = searchParams.get("mode") === "adaptive";

  const raw = sessionStorage.getItem("quizResult");
  const quizResult = raw ? JSON.parse(raw) : null;
  const score = quizResult?.score ?? resultData.score;
  const correctAnswers = quizResult?.correctAnswers ?? 0;
  const totalQuestions = quizResult?.totalQuestions ?? 10;
  const weakSkillsFound: string[] = quizResult?.weakSkills ?? resultData.weakSkillsFound;
  const masteryLevel = getMasteryLevel(score);

  const masteryBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Proficient: "badge-proficient",
  };

  const { topic, mastery, recommended_action, next_difficulty, recommendations, learning_path } =
    learningPathResponse;

  const actionLabel =
    recommended_action === "advance"
      ? `Advance to ${next_difficulty}`
      : recommended_action === "reinforce"
        ? "Reinforce current skills"
        : recommended_action;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl pb-16">

        {/* ─── Adaptive Quiz Profile (unchanged) ─── */}
        {isAdaptive && quizResult && (
          <div className="mb-12 animate-slide-up border-b border-border pb-12">
            <div className="text-center mb-8">
              <h2 className="font-heading text-4xl font-bold text-foreground mb-3">
                Your Adaptive Profile
              </h2>
              <p className="text-muted-foreground text-lg">
                Based on your quick assessment, we have tailored your Learning Path below.
              </p>
            </div>

            {/* Score Header */}
            <div
              className="rounded-2xl p-8 text-center mb-8 relative border-2 border-primary/20"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-4xl font-bold text-primary-foreground mb-1">
                {score}%
              </h3>
              <p className="text-primary-foreground/60">
                {correctAnswers} / {totalQuestions} correct
              </p>
            </div>

            {/* Mastery & Weaknesses Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-6 text-center">
                <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-heading font-bold text-lg text-foreground mb-1">{masteryLevel}</p>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${masteryBadge[masteryLevel]}`}>
                  Mastery Level
                </span>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2 justify-center">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  Areas to Review
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {weakSkillsFound.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-semibold border border-warning/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-semibold transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Learner Status Header ─── */}
        <div
          className="animate-slide-up mb-10"
          style={{ animationDelay: isAdaptive ? "400ms" : "0ms", animationFillMode: "forwards" }}
        >
          <div className="glass-card p-6 border-b-4 border-b-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Map className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">
                    Your Learning Path
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Personalized roadmap for <span className="font-semibold text-foreground">{topic}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
                <span className="badge-proficient text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {mastery}
                </span>
                <span className="flex items-center gap-1 text-xs text-primary font-semibold px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <Target className="w-3.5 h-3.5" />
                  {actionLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Recommended Courses ─── */}
        <div
          className="animate-slide-up mb-10"
          style={{ animationDelay: isAdaptive ? "500ms" : "100ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2 mb-4 pl-1">
            <BookOpen className="w-5 h-5 text-primary" />
            Recommended Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendations.map((course) => (
              <a
                key={course.course_id}
                href={course.course_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 border border-border/50 hover:border-primary/30 transition-all hover:scale-[1.02] group cursor-pointer block"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
                    {course.course_title}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {course.skills_covered.split(", ").map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.estimated_duration_hours}h
                  </span>
                  <span className="flex items-center gap-1 text-accent font-semibold">
                    <Star className="w-3 h-3" />
                    {course.xp_reward} XP
                  </span>
                  <span className="badge-intermediate text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ml-auto">
                    {course.difficulty}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ─── Weekly Roadmap ─── */}
        <div
          className="animate-slide-up mb-10"
          style={{ animationDelay: isAdaptive ? "600ms" : "200ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center gap-2 mb-4 pl-1">
            <Rocket className="w-5 h-5 text-primary" />
            Weekly Plan
          </h2>
          {learning_path.weeks.map((item, index) => (
            <RoadmapItem
              key={item.week}
              {...item}
              isLast={index === learning_path.weeks.length - 1}
            />
          ))}
        </div>

        {/* ─── Summary Footer ─── */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: isAdaptive ? "700ms" : "300ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <div
            className="rounded-2xl p-6 border-2 border-primary/20 relative overflow-hidden"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-lg text-primary-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                What You'll Achieve
              </h2>
              <p className="text-primary-foreground/80 text-sm mb-4">
                {learning_path.skill_progression_summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {learning_path.key_competencies_gained.map((comp) => (
                  <span
                    key={comp}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {comp}
                  </span>
                ))}
              </div>

              <p className="text-primary-foreground/70 text-sm italic">
                "{learning_path.final_motivation}"
              </p>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default LearningPath;
