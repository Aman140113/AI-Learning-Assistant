import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "@/components/QuizCard";
import { getQuizQuestions, getDailyQuizQuestions, submitQuiz, completeDailyTask, getDailyTasks } from "@/services/api";

const TOTAL_QUESTIONS = 10;

interface QuestionData {
  _id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  skill_id?: { name: string; difficulty_level: string };
}

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDaily = searchParams.get("mode") === "daily";
  const isAdaptive = searchParams.get("mode") === "adaptive";
  const selectedDomain = localStorage.getItem("selectedDomain") || "";
  const userId = localStorage.getItem("userId") || "";

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    if (isDaily && userId) {
      // Daily mode — fetch weak-skill questions
      getDailyQuizQuestions(userId)
        .then((data) => {
          if (data && data.length > 0) {
            setQuestions(data);
          } else {
            setQuestions([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setQuestions([]);
          setLoading(false);
        });
    } else if (selectedDomain) {
      getQuizQuestions(selectedDomain)
        .then((data) => {
          if (data && data.length > 0) {
            setQuestions(data);
          } else {
            setQuestions([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setQuestions([]);
          setLoading(false);
        });
    } else {
      setQuestions([]);
      setLoading(false);
    }
  }, [selectedDomain]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];
  const totalQ = Math.min(questions.length, TOTAL_QUESTIONS);
  const difficulty = currentQuestion?.skill_id?.difficulty_level || "Easy";

  const difficultyBadge: Record<string, string> = {
    Easy: "badge-proficient",
    Medium: "badge-intermediate",
    Hard: "badge-beginner",
  };

  const handleFinish = async () => {
    if (submitting) return;
    setSubmitting(true);

    if (userId) {
      try {
        const result = await submitQuiz(userId, selectedDomain, answers);
        sessionStorage.setItem("quizResult", JSON.stringify({
          score: result.attempt.score,
          xpEarned: result.attempt.correctCount * 15,
          totalQuestions: result.attempt.totalQuestions,
          correctAnswers: result.attempt.correctCount,
          weakSkills: result.weakSkills?.map((ws: any) => ws.skill_id?.name) || [],
        }));
      } catch (err) {
        console.error("Failed to submit quiz:", err);
        // Calculate locally as fallback
        const correctCount = answers.filter((a) => {
          const q = questions.find((q) => q._id === a.questionId);
          return q && q.correct_answer === a.selectedAnswer;
        }).length;
        const score = Math.round((correctCount / answers.length) * 100);
        sessionStorage.setItem("quizResult", JSON.stringify({
          score,
          xpEarned: correctCount * 15,
          totalQuestions: answers.length,
          correctAnswers: correctCount,
        }));
      }
    } else {
      // Calculate locally
      const correctCount = answers.filter((a) => {
        const q = questions.find((q) => q._id === a.questionId);
        return q && q.correct_answer === a.selectedAnswer;
      }).length;
      const score = Math.round((correctCount / answers.length) * 100);
      sessionStorage.setItem("quizResult", JSON.stringify({
        score,
        xpEarned: correctCount * 15,
        totalQuestions: answers.length,
        correctAnswers: correctCount,
      }));
    }
    // If daily mode, auto-complete the quiz daily task
    if (isDaily && userId) {
      try {
        const tasksData = await getDailyTasks(userId);
        const quizTask = tasksData.tasks.find((t: any) => t.title.includes("quiz") && !t.completed);
        if (quizTask) {
          await completeDailyTask(quizTask._id);
        }
      } catch (e) {
        console.error("Failed to complete daily task:", e);
      }
    }
    navigate(isAdaptive ? "/learning-path?mode=adaptive" : "/result");
  };

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion) return;

    const newAnswers = [...answers, { questionId: currentQuestion._id, selectedAnswer }];
    setAnswers(newAnswers);

    if (currentIndex + 1 >= totalQ) {
      // Need to submit with the new answers since state update is async
      if (submitting) return;
      setSubmitting(true);

      if (userId) {
        submitQuiz(userId, selectedDomain, newAnswers)
          .then((result) => {
            sessionStorage.setItem("quizResult", JSON.stringify({
              score: result.attempt.score,
              xpEarned: result.attempt.correctCount * 15,
              totalQuestions: result.attempt.totalQuestions,
              correctAnswers: result.attempt.correctCount,
              weakSkills: result.weakSkills?.map((ws: any) => ws.skill_id?.name) || [],
            }));
            navigate(isAdaptive ? "/learning-path?mode=adaptive" : "/result");
          })
          .catch(() => {
            // Fallback calculations locally when API errors out
            const correctCount = newAnswers.filter((a) => {
              const q = questions.find((q) => q._id === a.questionId);
              return q && q.correct_answer === a.selectedAnswer;
            }).length;
            const score = Math.round((correctCount / newAnswers.length) * 100);
            sessionStorage.setItem("quizResult", JSON.stringify({
              score,
              xpEarned: correctCount * 15,
              totalQuestions: newAnswers.length,
              correctAnswers: correctCount,
            }));
            navigate(isAdaptive ? "/learning-path?mode=adaptive" : "/result");
          });
      } else {
        const correctCount = newAnswers.filter((a) => {
          const q = questions.find((q) => q._id === a.questionId);
          return q && q.correct_answer === a.selectedAnswer;
        }).length;
        const score = Math.round((correctCount / newAnswers.length) * 100);
        sessionStorage.setItem("quizResult", JSON.stringify({
          score,
          xpEarned: correctCount * 15,
          totalQuestions: newAnswers.length,
          correctAnswers: correctCount,
        }));
        navigate(isAdaptive ? "/learning-path?mode=adaptive" : "/result");
      }
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  }, [selectedAnswer, currentQuestion, answers, currentIndex, totalQ, submitting, userId, selectedDomain, questions, navigate, isAdaptive]);

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col items-center justify-center min-h-full">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground text-lg animate-pulse font-medium">Loading quiz questions...</p>
        </div>
      </Layout>
    );
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col items-center justify-center min-h-full">
          <p className="text-muted-foreground text-xl font-heading mb-4 text-center">No questions found in the database.</p>
          <p className="text-sm text-muted-foreground/80 max-w-sm text-center mb-8">
            Make sure to run the upload script to populate your MongoDB cluster with the data from your company laptop.
          </p>
          <button
            onClick={() => navigate('/learning-path')}
            className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition-colors"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 flex py-8 items-start sm:items-center justify-center container mx-auto px-4 relative min-h-full">
        <div className="w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 animate-slide-up shadow-2xl relative z-10 border-border/50 mb-16">

          <div className="mb-4">
            <ProgressBar value={currentIndex + 1} max={totalQ} showValue={false} size="sm" variant="quiz" />
          </div>

          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Question {currentIndex + 1} <span className="text-muted-foreground/50 mx-1">•</span> {totalQ}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${difficultyBadge[difficulty] || "badge-proficient"}`}>
                {difficulty}
              </span>
            </div>
            <div className={`flex items-center gap-2 font-heading font-bold text-sm bg-muted/50 px-3 py-1.5 rounded-lg ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
              <Clock className={`w-4 h-4 ${timeLeft < 60 ? "animate-pulse" : ""}`} />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="p-5 sm:p-6 mb-8 rounded-2xl bg-foreground/5 border border-border/50 shadow-inner">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <QuizCard
                key={index}
                option={option}
                index={index}
                selected={selectedAnswer === index}
                onSelect={() => setSelectedAnswer(index)}
              />
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-border/40">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || submitting}
              className={`group flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-semibold transition-all duration-300 ${selectedAnswer !== null && !submitting
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                }`}
            >
              {submitting ? "Submitting..." : currentIndex + 1 < totalQ ? "Next Question" : "Finish Quiz"}
              <ChevronRight className={`w-5 h-5 transition-transform ${selectedAnswer !== null && !submitting ? "group-hover:translate-x-1" : ""}`} />
            </button>
          </div>
        </div>

        {/* Decorative background blurs to make it look premium */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>
      </div>
    </Layout>
  );
};

export default Quiz;