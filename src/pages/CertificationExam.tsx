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
            const result = await submitCertification(userId, domainId, level!, answers);
            navigate("/certifications/result", { state: { result, level, domainId } });
        } catch (err: any) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Loading {level} certification exam...</p>
                </div>
            </Layout>
        );
    }

    if (error || questions.length === 0) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-lg mx-auto">
                    <AlertCircle className="w-16 h-16 text-destructive mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Failed to Start Exam</h2>
                    <p className="text-muted-foreground mb-6">{error || "No questions found for this domain."}</p>
                    <button onClick={() => navigate("/certifications")} className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20">
                        Go Back
                    </button>
                </div>
            </Layout>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-3xl pb-24">

                {/* Header */}
                <div className="glass-card p-6 mb-6 sticky top-20 z-10 border-b-2 border-primary/20 animate-fade-in">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest mb-1">{level} Certification Exam</p>
                            <h1 className="text-2xl font-bold font-heading text-foreground">Question {currentIndex + 1} of {questions.length}</h1>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                                {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                            </span>
                        </div>
                    </div>
                    <ProgressBar value={currentIndex + 1} max={questions.length} variant="quiz" showValue={false} />
                </div>

                {/* Question Area */}
                <div className="glass-card p-8 min-h-[400px] flex flex-col border border-border/50 animate-slide-up relative bg-card/40 backdrop-blur-xl shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none flex items-start justify-end p-6">
                        <HelpCircle className="w-10 h-10 text-primary/20" />
                    </div>

                    <h2 className="text-xl md:text-2xl font-medium text-foreground mb-8 pr-12 leading-relaxed">
                        {currentQ.question_text}
                    </h2>

                    <div className="flex-grow flex flex-col gap-4">
                        {currentQ.options.map((option: string, i: number) => {
                            const isSelected = currentAnswer === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${isSelected
                                        ? 'border-primary bg-primary/10 shadow-[0_4px_20px_rgba(var(--primary),0.15)] scale-[1.01]'
                                        : 'border-white/5 bg-background hover:border-primary/50 hover:bg-primary/5'
                                        }`}
                                >
                                    <span className={`text-base font-medium ${isSelected ? 'text-primary' : 'text-foreground/90'}`}>
                                        {option}
                                    </span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary/50'
                                        }`}>
                                        {isSelected && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="fixed bottom-0 left-0 right-0 lg:left-64 p-4 glass-card border-t border-white/10 z-20 flex justify-center animate-fade-in delay-300">
                    <div className="max-w-3xl w-full flex justify-between items-center px-4">
                        <div className="text-sm font-medium text-muted-foreground hidden sm:block">
                            Select an answer to proceed
                        </div>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                disabled={currentAnswer === undefined}
                                onClick={handleNext}
                                className="px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg ml-auto"
                            >
                                Next Question <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                disabled={currentAnswer === undefined || submitting}
                                onClick={handleSubmit}
                                className="px-8 py-3.5 bg-[image:var(--gradient-success)] text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_hsl(var(--success)/0.3)] ml-auto"
                            >
                                {submitting ? (
                                    <>Submitting... <Loader2 className="w-5 h-5 animate-spin" /></>
                                ) : (
                                    <>Submit Exam <CheckCircle className="w-5 h-5" /></>
                                )}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default CertificationExam;
