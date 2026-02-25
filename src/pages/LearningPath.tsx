import Layout from "@/components/Layout";
import RoadmapItem from "@/components/RoadmapItem";
import { learningPath, resultData } from "@/data/dummyData";
import { Map, Trophy, Brain, AlertTriangle, ArrowRight } from "lucide-react";
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
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl pb-16">

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

        <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: isAdaptive ? '400ms' : '0ms', animationFillMode: "forwards" }}>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Map className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Your Learning Path
          </h1>
          <p className="text-muted-foreground">
            Personalized roadmap based on your performance
          </p>
        </div>

        <div className="animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
          {learningPath.map((item, index) => (
            <RoadmapItem
              key={item.week}
              {...item}
              isLast={index === learningPath.length - 1}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearningPath;
