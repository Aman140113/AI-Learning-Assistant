import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "@/components/QuizCard";
import { allQuizQuestions } from "@/data/dummyData";

const TOTAL_QUESTIONS = 10;

// ✅ Moved fully outside component — no stale closure risk
const getNextDifficulty = (answerHistory: { correct: boolean }[]): "Easy" | "Medium" | "Hard" => {
  const last3 = answerHistory.slice(-3);
  const correctCount = last3.filter((a) => a.correct).length;
  console.log("Last 3 answers:", last3, "Correct count:", correctCount); // debug
  if (correctCount === 3) return "Hard";
  if (correctCount === 2) return "Medium";
  return "Easy";
};

// ✅ Pure function, no hook needed
const getQuestionsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard", domain: string) =>
  allQuizQuestions.filter((q) => q.difficulty === difficulty && q.domain === domain);

const Quiz = () => {
  const navigate = useNavigate();
  const selectedDomain = localStorage.getItem("selectedDomain") || "java";

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerHistory, setAnswerHistory] = useState<{ correct: boolean }[]>([]);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [questionCount, setQuestionCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const easyQs = getQuestionsByDifficulty("Easy", localStorage.getItem("selectedDomain") || "java");
    return easyQs[Math.floor(Math.random() * easyQs.length)];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const difficultyBadge = {
    Easy: "badge-proficient",
    Medium: "badge-intermediate",
    Hard: "badge-beginner",
  };

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newHistory = [...answerHistory, { correct: isCorrect }];
    const newUsedIds = new Set(usedIds).add(currentQuestion.id);

    console.log(`Q${questionCount} answered. Correct: ${isCorrect}. History length: ${newHistory.length}`);

    setAnswerHistory(newHistory);
    setUsedIds(newUsedIds);

    if (questionCount >= TOTAL_QUESTIONS) {
      navigate("/result");
      return;
    }

    // ✅ First 3 questions always Easy, adaptive from Q4 onward
    let nextDifficulty: "Easy" | "Medium" | "Hard" = "Easy";
    if (newHistory.length >= 3) {
      nextDifficulty = getNextDifficulty(newHistory);
    }

    console.log("Next difficulty:", nextDifficulty);

    // ✅ Now passing domain as argument — no stale closure
    const pool = getQuestionsByDifficulty(nextDifficulty, selectedDomain).filter(
      (q) => !newUsedIds.has(q.id)
    );

    const fallbackPool =
      pool.length > 0
        ? pool
        : allQuizQuestions.filter((q) => q.domain === selectedDomain && !newUsedIds.has(q.id));

    if (fallbackPool.length === 0) {
      navigate("/result");
      return;
    }

    const next = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
    setCurrentQuestion(next);
    setQuestionCount((prev) => prev + 1);
    setSelectedAnswer(null);
  }, [selectedAnswer, answerHistory, currentQuestion, usedIds, questionCount, navigate, selectedDomain]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col container mx-auto px-4 py-4 max-w-3xl min-h-0">
        <div className="mb-3">
          <ProgressBar value={questionCount} max={TOTAL_QUESTIONS} showValue={false} size="sm" variant="quiz" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground">
              Question {questionCount} of {TOTAL_QUESTIONS}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyBadge[currentQuestion.difficulty]}`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          <div className={`flex items-center gap-2 font-heading font-bold text-sm ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="glass-card p-5 mb-4">
          <h2 className="font-heading font-bold text-lg text-foreground leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-y-auto mb-4">
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

        <div className="flex justify-end py-2">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-heading font-semibold transition-all duration-200 ${
              selectedAnswer !== null
                ? "bg-primary text-primary-foreground hover:scale-105 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {questionCount < TOTAL_QUESTIONS ? "Next" : "Finish"}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;