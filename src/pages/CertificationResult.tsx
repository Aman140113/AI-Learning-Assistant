import { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { XCircle, Award, ArrowRight, Shield } from "lucide-react";
import Layout from "@/components/Layout";

const CertificationResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, level, domainId } = location.state || {};

    useEffect(() => {
        if (!result) {
            navigate("/certifications", { replace: true });
        }
    }, [result, navigate]);

    if (!result) return <Navigate to="/certifications" replace />;

    const { passed, score, correctCount, total, licence_id } = result;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col items-center justify-center relative z-10">

                {/* Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 ${passed ? 'bg-success/20' : 'bg-destructive/20'
                        }`}></div>
                </div>

                <div className="relative z-10 text-center animate-slide-up bg-card/40 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-2xl w-full">

                    <div className="flex justify-center mb-6">
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl relative ${passed ? 'bg-gradient-to-br from-success/80 to-success/40' : 'bg-gradient-to-br from-destructive/80 to-destructive/40'
                            }`}>
                            {passed ? (
                                <>
                                    <Award className="w-12 h-12 text-white absolute" />
                                    <div className="absolute inset-0 bg-success/50 animate-ping rounded-3xl" style={{ animationDuration: '3s' }}></div>
                                </>
                            ) : (
                                <XCircle className="w-12 h-12 text-white z-10" />
                            )}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 tracking-tight drop-shadow-md">
                        {passed ? "Certification Passed!" : "Certification Failed"}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                        {passed
                            ? `Congratulations! You've successfully completed the ${level} certification for ${domainId?.toUpperCase() || 'your domain'}.`
                            : `Don't give up! Review your weak areas and try again when you feel ready. Remember, practice makes perfect.`}
                    </p>

                    {/* Score Card */}
                    <div className="bg-background/80 rounded-3xl p-6 mb-8 border border-white/5 inline-block min-w-[280px]">
                        <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Final Score</div>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className={`text-6xl font-black tabular-nums ${passed ? 'text-success' : 'text-destructive'}`}>
                                {score}%
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2 font-medium">
                            {correctCount} out of {total} correct
                        </div>
                    </div>

                    {/* Licence ID Display */}
                    {passed && licence_id && (
                        <div className="mb-10 animate-fade-in delay-500">
                            <p className="text-sm font-medium text-muted-foreground mb-3 text-left max-w-md mx-auto">Your Immutable License ID</p>
                            <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 p-4 rounded-2xl max-w-md mx-auto group hover:border-primary/50 transition-colors cursor-copy relative overflow-hidden"
                                onClick={() => {
                                    navigator.clipboard.writeText(licence_id);
                                    // could add toast here
                                }}
                            >
                                <Shield className="w-6 h-6 text-primary shrink-0" />
                                <code className="text-lg font-mono font-bold text-foreground tracking-wider">{licence_id}</code>
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end px-4">
                                    <span className="text-xs font-bold text-primary uppercase bg-background px-3 py-1 rounded-full shadow-md">Click to Copy</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-muted text-foreground hover:bg-white/10 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                        <button
                            onClick={() => navigate(passed ? "/certifications" : `/certifications/exam/${level}`)}
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95 ${passed
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)]'
                                : 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20'
                                }`}
                        >
                            {passed ? "View Certifications" : "Try Again"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default CertificationResult;
