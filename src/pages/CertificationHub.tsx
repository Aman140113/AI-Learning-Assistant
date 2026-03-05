import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, Lock, ArrowRight, Award, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { getCertificationStatus } from "@/services/api";

interface CertificationRecord {
    level: "PL-1" | "PL-2";
    licence_id?: string;
    score: number;
    passed: boolean;
}

interface CertStatus {
    pl1_passed: boolean;
    pl2_passed: boolean;
    certifications?: CertificationRecord[];
}

const CertificationHub = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId") || "";
    const [status, setStatus] = useState<CertStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            getCertificationStatus(userId)
                .then((data) => {
                    setStatus(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    const pl1Passed = status?.pl1_passed || false;
    const pl2Passed = status?.pl2_passed || false;
    const pl1LicenceId =
        status?.certifications?.find((c) => c.level === "PL-1" && c.passed && c.licence_id)?.licence_id || null;
    const pl2LicenceId =
        status?.certifications?.find((c) => c.level === "PL-2" && c.passed && c.licence_id)?.licence_id || null;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="text-center mb-12 animate-slide-up">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                        <Award className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Professional Certifications
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Validate your skills and earn immutable licenses to prove your expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* PL-1 Certification Card */}
                    <div className="relative group animate-slide-up stagger-1 h-full">
                        <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl transition-all duration-500 ${pl1Passed ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`}></div>
                        <div className={`relative h-full glass-card p-8 border-2 transition-all flex flex-col ${pl1Passed ? 'border-success/50 bg-success/5' : 'border-primary/20 hover:border-primary/50'}`}>

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                                    <Shield className="w-8 h-8" />
                                </div>
                                {pl1Passed && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold uppercase tracking-wider">
                                        <CheckCircle className="w-4 h-4" /> Passed
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold font-heading mb-2">PL-1 Certification</h2>
                            <p className="text-muted-foreground flex-grow mb-6">
                                Take this certification after your 3rd week of learning. Tests foundational knowledge and basic applications.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Format</span>
                                    <span className="font-semibold text-foreground">15 Questions</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Passing Score</span>
                                    <span className="font-semibold text-foreground">70%</span>
                                </div>

                                {pl1Passed ? (
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-success/10 text-success"
                                            onClick={() => {
                                                if (pl1LicenceId) {
                                                    navigator.clipboard?.writeText(pl1LicenceId).catch(() => { });
                                                }
                                            }}
                                        >
                                            <ShieldCheck className="w-4 h-4" />
                                            View Licence
                                        </button>
                                        {pl1LicenceId && (
                                            <div className="text-xs text-muted-foreground bg-background/60 border border-border/60 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                                                <span className="font-semibold text-foreground/80">Licence ID</span>
                                                <code className="text-[11px] font-mono font-bold break-all">
                                                    {pl1LicenceId}
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => navigate("/certifications/exam/PL-1")}
                                        className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Take Certification
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* PL-2 Certification Card */}
                    <div className="relative group animate-slide-up stagger-2 h-full">
                        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-all duration-500 ${!pl1Passed ? 'opacity-0' : pl2Passed ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`}></div>
                        <div className={`relative h-full glass-card p-8 border-2 transition-all flex flex-col ${!pl1Passed ? 'border-border/50 opacity-75' : pl2Passed ? 'border-success/50 bg-success/5' : 'border-purple-500/20 hover:border-purple-500/50'}`}>

                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${!pl1Passed ? 'bg-muted text-muted-foreground' : 'bg-purple-500/10 text-purple-400'}`}>
                                    {pl2Passed ? <Shield className="w-8 h-8" /> : !pl1Passed ? <Lock className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                                </div>
                                {pl2Passed && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold uppercase tracking-wider">
                                        <CheckCircle className="w-4 h-4" /> Passed
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold font-heading mb-2">PL-2 Certification</h2>
                            <p className="text-muted-foreground flex-grow mb-6">
                                Take this certification after your 5th week of learning. Tests advanced concepts and problem-solving skills.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Format</span>
                                    <span className="font-semibold text-foreground">Advanced Quiz</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Passing Score</span>
                                    <span className="font-semibold text-foreground">70%</span>
                                </div>

                                {pl2Passed ? (
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-success/10 text-success"
                                            onClick={() => {
                                                if (pl2LicenceId) {
                                                    navigator.clipboard?.writeText(pl2LicenceId).catch(() => { });
                                                }
                                            }}
                                        >
                                            <ShieldCheck className="w-4 h-4" />
                                            View Licence
                                        </button>
                                        {pl2LicenceId && (
                                            <div className="text-xs text-muted-foreground bg-background/60 border border-border/60 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                                                <span className="font-semibold text-foreground/80">Licence ID</span>
                                                <code className="text-[11px] font-mono font-bold break-all">
                                                    {pl2LicenceId}
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                ) : !pl1Passed ? (
                                    <div className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-muted text-muted-foreground cursor-not-allowed border border-border/50 text-center text-sm px-2">
                                        <Lock className="w-4 h-4 shrink-0" />
                                        First complete the PL-1 certification
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => navigate("/certifications/exam/PL-2")}
                                        className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-purple-500 text-white hover:bg-purple-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Take Certification <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CertificationHub;
