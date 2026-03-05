import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { getCertificationQuestions, submitCertification } from "@/services/api";

const CertificationExam = () => {
    const { level } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId") || "";
    const domainId = localStorage.getItem("selectedDomain") || "java"; // Fallback to java if not found

    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (!level || !userId) {
            navigate("/certifications");
            return;
        }

        getCertificationQuestions(domainId)
            .then((data) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [level, userId, domainId, navigate]);

    const handleSelect = (optionIndex: number) => {
        setAnswers((prev) => {
            const existing = prev.find((a) => a.questionId === questions[currentIndex].id);
            if (existing) {
                return prev.map((a) => (a.questionId === questions[currentIndex].id ? { ...a, selectedAnswer: optionIndex } : a));
            }
            return [...prev, { questionId: questions[currentIndex].id, selectedAnswer: optionIndex }];
        });
    };

    const currentAnswer = answers.find((a) => a.questionId === questions[currentIndex]?.id)?.selectedAnswer;

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((p) => p + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setSubmitError("");
            const result = await submitCertification(userId, domainId, level!, answers);
            navigate("/certifications/result", { state: { result, level, domainId } });
        } catch (err: any) {
            setSubmitError(err.message || "Failed to submit certification");
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex-1 flex flex-col items-center justify-center min-h-full">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground text-lg animate-pulse font-medium">
                        Loading {level} certification exam...
                    </p>
                </div>
            </Layout>
        );
    }

    if (error || questions.length === 0) {
        return (
            <Layout>
                <div className="flex-1 flex flex-col items-center justify-center min-h-full px-4">
                    <div className="glass-card max-w-lg w-full p-8 text-center">
                        <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
                        <h2 className="text-2xl font-heading font-bold mb-2">Failed to start exam</h2>
                        <p className="text-muted-foreground mb-6">
                            {error || "No questions found for this certification right now. Please try again later."}
                        </p>
                        <button
                            onClick={() => navigate("/certifications")}
                            className="px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-colors"
                        >
                            Go back to certifications
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <Layout>
            <div className="flex-1 flex py-4 items-start sm:items-center justify-center container mx-auto px-4 relative min-h-full pb-24">
                <div className="w-full max-w-3xl glass-card rounded-3xl p-4 sm:p-6 animate-slide-up shadow-2xl relative z-10 border-border/50">
                    {/* Header + progress */}
                    <div className="mb-4">
                        <ProgressBar
                            value={currentIndex + 1}
                            max={questions.length}
                            showValue={false}
                            size="sm"
                            variant="quiz"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {level} Certification Exam
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                                Question {currentIndex + 1}{" "}
                                <span className="text-muted-foreground/60">/</span> {questions.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 font-heading font-bold text-sm bg-muted/50 px-3 py-1.5 rounded-lg">
                            <HelpCircle className="w-4 h-4 text-primary" />
                            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% complete</span>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="p-4 sm:p-5 mb-4 rounded-2xl bg-foreground/5 border border-border/50 shadow-inner">
                        <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed">
                            {currentQ.question_text}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-2 mb-2">
                        {currentQ.options.map((option: string, i: number) => {
                            const isSelected = currentAnswer === i;

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelect(i)}
                                    className={`w-full text-left rounded-2xl border transition-all flex items-center justify-between group px-4 py-3 sm:px-5 sm:py-4 ${isSelected
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                                        : "bg-background/80 text-foreground border-border/60 hover:border-primary/50 hover:bg-primary/5"
                                        }`}
                                >
                                    <span
                                        className={`text-sm sm:text-base font-medium ${isSelected ? "text-primary-foreground" : "text-foreground/90"
                                            }`}
                                    >
                                        {option}
                                    </span>
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                                            ? "border-primary-foreground bg-primary-foreground text-primary"
                                            : "border-muted-foreground/30 group-hover:border-primary/60"
                                            }`}
                                    >
                                        {isSelected && <CheckCircle className="w-4 h-4" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>


                    {/* Bottom action (aligned with main quiz) */}
                    <div className="flex flex-col items-end pt-4 mt-4 border-t border-border/40 relative">
                        {submitError && (
                            <p className="w-full text-center text-destructive text-sm font-medium bg-destructive/10 py-2 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
                                {submitError}
                            </p>
                        )}
                        {currentIndex < questions.length - 1 ? (
                            <button
                                disabled={currentAnswer === undefined}
                                onClick={handleNext}
                                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 ${currentAnswer !== undefined
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                                    }`}
                            >
                                Next Question
                                <ArrowRight
                                    className={`w-5 h-5 transition-transform ${currentAnswer !== undefined ? "group-hover:translate-x-1" : ""
                                        }`}
                                />
                            </button>
                        ) : (
                            <button
                                disabled={currentAnswer === undefined || submitting}
                                onClick={handleSubmit}
                                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 ${currentAnswer !== undefined && !submitting
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                                    }`}
                            >
                                {submitting ? "Submitting..." : "Submit Exam"}
                                {!submitting && (
                                    <ArrowRight
                                        className={`w-5 h-5 transition-transform ${currentAnswer !== undefined ? "group-hover:translate-x-1" : ""
                                            }`}
                                    />
                                )}
                                {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Soft background glows to match quiz */}
                <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-0" />
                <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-0" />
            </div>
        </Layout>
    );
};

export default CertificationExam;
