import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "@/components/QuizCard";
import { quizQuestions } from "@/data/dummyData";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);

  const question = quizQuestions[currentQuestion];

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
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      navigate("/result");
    }
  }, [selectedAnswer, answers, currentQuestion, navigate]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col container mx-auto px-4 py-4 max-w-3xl min-h-0">
        {/* Progress */}
        <div className="mb-3">
          <ProgressBar
            value={currentQuestion + 1}
            max={quizQuestions.length}
            showValue={false}
            size="sm"
            variant="quiz"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyBadge[question.difficulty]}`}>
              {question.difficulty}
            </span>
          </div>
          <div className={`flex items-center gap-2 font-heading font-bold text-sm ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <div className="glass-card p-5 mb-4">
          <h2 className="font-heading font-bold text-lg text-foreground leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options - takes remaining space */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-y-auto mb-4">
          {question.options.map((option, index) => (
            <QuizCard
              key={index}
              option={option}
              index={index}
              selected={selectedAnswer === index}
              onSelect={() => setSelectedAnswer(index)}
            />
          ))}
        </div>

        {/* Submit - always visible at bottom */}
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
            {currentQuestion < quizQuestions.length - 1 ? "Next" : "Finish"}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
