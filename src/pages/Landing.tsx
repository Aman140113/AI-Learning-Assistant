import { useNavigate } from "react-router-dom";
import {
    Brain,
    Target,
    GitBranch,
    Trophy,
    BarChart3,
    ChevronRight,
    Github,
    Zap,
    Video
} from "lucide-react";
import TeamSection from "../components/TeamSection";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-slate-200 font-sans selection:bg-[#00F5D4] selection:text-black overflow-x-hidden">
            {/* Background visual effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00F5D4]/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[150px]" />
            </div>

            {/* Navbar */}
            <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0A0A0A]/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5D4] to-blue-500 flex items-center justify-center p-[1px]">
                            <div className="w-full h-full bg-[#121212] rounded-xl flex items-center justify-center overflow-hidden">
                                <img src="/src/assets/koshishLogo.png" alt="Logo" className="w-full h-full object-cover scale-150" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            </div>
                        </div>
                        <div>
                            <span className="block font-bold text-xl tracking-tight text-white leading-tight">SkillSpark <span className="text-[#00F5D4]">AI</span></span>
                            <span className="block text-[10px] uppercase tracking-widest text-[#00F5D4]/70 font-semibold">By Team Koshish</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => navigate('/login')}
                            className="group px-6 py-2.5 rounded-full text-sm font-semibold bg-[#121212] border border-[#00F5D4]/30 text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,245,212,0.1)] hover:shadow-[0_0_30px_rgba(0,245,212,0.4)] flex items-center gap-2"
                        >
                            Login
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10">

                {/* SECTION 1: HERO SECTION */}
                <section className="relative pt-24 pb-10 px-6 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121212] border border-white/5 mb-8 shadow-xl">
                        <span className="flex h-2 w-2 rounded-full bg-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.8)]"></span>
                        <span className="text-sm font-medium text-slate-300">Team Koshish (Innovate by Trying)</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
                        Empowering Learning Through <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] to-blue-500">
                            Adaptive Intelligence
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        SkillSpark AI personalizes your learning journey using AI-driven adaptive quizzes,
                        skill tracking, and intelligent learning paths.
                    </p>

                    <button
                        onClick={() => navigate('/login')}
                        className="group px-8 py-4 rounded-full text-base font-bold bg-[#00F5D4] text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,245,212,0.3)] hover:shadow-[0_0_50px_rgba(0,245,212,0.5)] flex items-center gap-2"
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </section>

                {/* SECTION 2: ABOUT THE PLATFORM */}
                <section className="py-24 px-6 border-t border-white/5 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold tracking-wider uppercase text-sm">
                                    <Brain className="w-5 h-5" />
                                    <span>About SkillSpark AI</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                    Intelligent learning, <br />tailored for <span className="text-white border-b-2 border-[#00F5D4]">you.</span>
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    SkillSpark AI is an intelligent adaptive learning platform that personalizes education based on each learner's performance. It tracks skill mastery, identifies weak areas, and dynamically generates learning paths and recommendations using AI.
                                </p>
                            </div>
                            <div className="flex-1 relative w-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00F5D4]/20 to-blue-500/20 rounded-2xl blur-xl transform rotate-3 scale-105"></div>
                                <div className="relative bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-8 bg-white/5 rounded-md w-1/3"></div>
                                        <div className="h-32 bg-white/5 rounded-md w-full relative overflow-hidden">
                                            <div className="absolute left-0 bottom-0 w-[75%] h-[2px] bg-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.5)]"></div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="h-24 bg-white/5 rounded-md w-1/2"></div>
                                            <div className="h-24 bg-white/5 rounded-md w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: FEATURES SECTION */}
                <section className="py-24 px-6 relative bg-gradient-to-b from-[#0A0A0A] to-[#121212]/50 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-white">Key Features</h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Experience the next generation of online learning powered by artificial intelligence.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Feature 1 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)]">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <Zap className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Adaptive Quiz System</h3>
                                <p className="text-slate-400">Quiz difficulty dynamically adjusts based on user performance, ensuring optimal challenge and engagement.</p>
                            </div>

                            {/* Feature 2 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)]">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <Target className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Skill Mastery Tracking</h3>
                                <p className="text-slate-400">Track your overall progress and precise mastery levels for every single topic and subtopic you explore.</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)]">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <GitBranch className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">AI Learning Path</h3>
                                <p className="text-slate-400">Receive a customized roadmap that is intelligently generated to target and eliminate your weak areas.</p>
                            </div>

                            {/* Feature 4 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)]">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <Trophy className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">XP & Gamification</h3>
                                <p className="text-slate-400">Stay motivated! Earn experience points, complete streaks, and level up your skills to reach the top.</p>
                            </div>

                            {/* Feature 5 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)]">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
                                <p className="text-slate-400">View rich, actionable insights into your strengths and weaknesses to learn smarter, not harder.</p>
                            </div>

                            {/* Feature 6 */}
                            <div className="group bg-[#121212] border border-white/5 hover:border-[#00F5D4]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,245,212,0.2)] md:col-span-2 lg:col-span-1">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00F5D4]/10 to-blue-500/10 flex items-center justify-center mb-6 border border-[#00F5D4]/20 group-hover:scale-110 transition-transform">
                                    <Video className="w-6 h-6 text-[#00F5D4]" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">AI Mock Interview Platform</h3>
                                <p className="text-slate-400">Practice your soft skills and technical knowledge with a real-time AI mock interviewer.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: PLATFORM PREVIEW */}
                <section className="py-24 px-6 border-t border-white/5 bg-[#0A0A0A]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Platform Preview</h2>
                            <p className="text-slate-400 text-lg">A glimpse into the sleek and modern user interface of SkillSpark.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: "Learning Dashboard", gradient: "from-blue-500/20 to-purple-500/20", img: "/src/assets/dashboard.png" },
                                { name: "Leaderboard", gradient: "from-[#00F5D4]/20 to-emerald-500/20", img: "/src/assets/leaderboard.png" },
                                { name: "AI Learning Path Map", gradient: "from-orange-500/20 to-pink-500/20", img: "/src/assets/learningPath.png" },
                                { name: "AI Mock Interview Platform", gradient: "from-indigo-500/20 to-cyan-500/20", img: "/src/assets/interview.png" },
                            ].map((item, i) => (
                                <div key={i} className="group relative aspect-video bg-[#121212] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-500 z-10 pointer-events-none`}></div>

                                    {/* Glassmorphism Mockup UI elements overlay */}
                                    <div className="absolute inset-4 rounded-xl border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-md flex flex-col p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] z-0">
                                        <div className="flex gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                        </div>
                                        <div className="flex flex-1 gap-4">
                                            <div className="w-1/4 h-full bg-white/5 rounded-lg border border-white/5"></div>
                                            <div className="w-3/4 flex flex-col gap-4">
                                                <div className="h-1/3 bg-white/5 rounded-lg border border-white/5"></div>
                                                <div className="h-2/3 bg-white/5 rounded-lg border border-white/5"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-20" onError={(e) => { e.currentTarget.style.display = 'none'; }} />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm z-30">
                                        <span className="px-6 py-2 rounded-full bg-[#00F5D4] text-black font-bold text-sm tracking-wide shadow-lg">
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 5: TEAM SECTION */}
                <TeamSection />

                {/* SECTION 6: CALL TO ACTION */}
                <section className="py-32 px-6 relative border-t border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[#00F5D4]/5"></div>
                    <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                            Start Your Personalized <br /> Learning Journey Today
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Join SkillSpark AI and let adaptive intelligence supercharge your growth. It's time to learn effectively.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-2 group px-10 py-5 rounded-full text-lg font-bold bg-[#00F5D4] text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,245,212,0.3)] hover:shadow-[0_0_50px_rgba(0,245,212,0.6)]"
                        >
                            Get Started Now
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </section>
            </main>

            {/* SECTION 7: FOOTER */}
            <footer className="border-t border-white/10 bg-[#0A0A0A] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F5D4] to-blue-500 flex items-center justify-center p-[1px]">
                            <div className="w-full h-full bg-[#121212] rounded-lg overflow-hidden flex items-center justify-center">
                                <img src="/src/assets/koshishLogo.png" alt="Logo" className="w-full h-full object-cover scale-150" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            </div>
                        </div>
                        <span className="font-bold text-lg text-white">Team <span className="text-[#00F5D4]">Koshish</span> Innovate by trying</span>
                    </div>

                    <div className="text-slate-500 text-sm font-medium flex-col items-center flex md:items-start">
                        <span>Project: SkillSpark AI</span>
                        <span>A Hackathon Project</span>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded-full bg-[#121212] border border-white/10 text-slate-400 hover:text-white hover:border-[#00F5D4] hover:shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
