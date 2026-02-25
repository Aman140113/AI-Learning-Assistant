import Layout from "@/components/Layout";
import { Trophy, Medal, Star, ArrowUp, ArrowDown, Minus } from "lucide-react";

// Static dummy data for the classroom leaderboard
const leaderboardData = [
    { id: 1, rank: 1, name: "Aman Mansuri", xp: 1540, level: "Proficient", avatar: "A", trend: "up", isCurrentUser: false },
    { id: 2, rank: 2, name: "OM Thakur", xp: 1250, level: "Intermediate", avatar: "B", trend: "up", isCurrentUser: false },
    { id: 3, rank: 3, name: "Rohit Kumbhakar", xp: 950, level: "Beginner", avatar: "C", trend: "same", isCurrentUser: true },
    { id: 4, rank: 4, name: "Shree Shetty", xp: 820, level: "Beginner", avatar: "D", trend: "down", isCurrentUser: false },
    { id: 5, rank: 5, name: "Vivek Aggrawal", xp: 600, level: "Beginner", avatar: "E", trend: "up", isCurrentUser: false },
    { id: 6, rank: 6, name: "Bhagyashree Patil", xp: 450, level: "Beginner", avatar: "F", trend: "down", isCurrentUser: false },
    { id: 7, rank: 7, name: "Akash Singh", xp: 320, level: "Beginner", avatar: "G", trend: "same", isCurrentUser: false },
];

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]" />;
    return <span className="font-heading font-bold text-muted-foreground w-6 text-center">{rank}</span>;
};

const getTrendIcon = (trend: string) => {
    if (trend === "up") return <ArrowUp className="w-4 h-4 text-success" />;
    if (trend === "down") return <ArrowDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const Leaderboard = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-4xl pb-16">
                {/* Header Section */}
                <div className="text-center mb-10 animate-slide-up">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
                        Cohort Leaderboard
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        See how you stack up against your peers!
                    </p>
                </div>

                {/* Top 3 Podium (Optional extra flair for top 3) */}
                <div className="grid grid-cols-3 gap-4 mb-10 items-end animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    {/* Rank 2 */}
                    <div className="glass-card p-4 flex flex-col items-center border-[1px] border-gray-300/30 bg-gradient-to-t from-gray-500/10 to-transparent pb-6 relative translate-y-4">
                        <div className="absolute -top-6 w-12 h-12 rounded-full border-4 border-background bg-gray-300 flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg">B</div>
                        <Medal className="w-6 h-6 text-gray-300 mt-4 mb-1" />
                        <p className="font-semibold text-foreground text-sm truncate w-full text-center">{leaderboardData[1].name}</p>
                        <p className="text-xs font-bold text-primary mt-1">{leaderboardData[1].xp} XP</p>
                    </div>

                    {/* Rank 1 */}
                    <div className="glass-card p-4 flex flex-col items-center border-[1px] border-yellow-400/40 bg-gradient-to-t from-yellow-500/20 to-transparent pb-10 relative shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                        <div className="absolute -top-8 w-16 h-16 rounded-full border-4 border-background bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-2xl shadow-xl">A</div>
                        <Trophy className="w-8 h-8 text-yellow-400 mt-6 mb-1" />
                        <p className="font-semibold text-foreground text-base truncate w-full text-center mt-1">{leaderboardData[0].name}</p>
                        <p className="text-sm font-bold text-primary mt-1">{leaderboardData[0].xp} XP</p>
                    </div>

                    {/* Rank 3 */}
                    <div className="glass-card p-4 flex flex-col items-center border-[1px] border-amber-600/30 bg-gradient-to-t from-amber-700/10 to-transparent pb-4 relative translate-y-8">
                        <div className="absolute -top-5 w-10 h-10 rounded-full border-4 border-background bg-amber-600 flex items-center justify-center text-amber-100 font-bold text-base shadow-lg cursor-pointer hover:scale-110 transition-transform">C</div>
                        <Medal className="w-5 h-5 text-amber-600 mt-4 mb-1" />
                        <p className="font-semibold text-foreground text-xs truncate w-full text-center">{leaderboardData[2].name}</p>
                        <p className="text-xs font-bold text-primary mt-1">{leaderboardData[2].xp} XP</p>
                    </div>
                </div>

                {/* Full List */}
                <div className="glass-card border border-white/5 overflow-hidden animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                    {/* Table Header */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <div className="w-12 text-center">Rank</div>
                        <div>Student</div>
                        <div className="hidden sm:block w-32 text-center">Level</div>
                        <div className="w-24 text-right pr-4">XP</div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col">
                        {leaderboardData.map((user) => (
                            <div
                                key={user.id}
                                className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 border-b border-white/5 transition-colors hover:bg-white/5 ${user.isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                            >
                                {/* Rank & Trend */}
                                <div className="w-12 flex flex-col items-center justify-center gap-1">
                                    {getRankIcon(user.rank)}
                                    {getTrendIcon(user.trend)}
                                </div>

                                {/* Name & Avatar */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-10 h-10 rounded-full flex gap-2 items-center justify-center text-sm font-bold shrink-0 shadow-inner ${user.rank === 1 ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-200' :
                                        user.rank === 2 ? 'bg-gray-300 text-gray-900 border-2 border-white' :
                                            user.rank === 3 ? 'bg-amber-600 text-amber-100 border-2 border-amber-400' :
                                                user.isCurrentUser ? 'bg-primary text-primary-foreground border-2 border-primary-foreground/20' :
                                                    'bg-muted text-foreground'
                                        }`}>
                                        {user.avatar}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className={`font-semibold text-sm sm:text-base truncate ${user.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                                            {user.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground sm:hidden">{user.level}</span>
                                    </div>
                                </div>

                                {/* Level (Desktop only) */}
                                <div className="hidden sm:flex w-32 items-center justify-center">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.level === 'Proficient' ? 'bg-accent/10 text-accent border border-accent/20' :
                                        user.level === 'Intermediate' ? 'bg-info/10 text-info border border-info/20' :
                                            'bg-muted/50 text-muted-foreground'
                                        }`}>
                                        {user.level}
                                    </span>
                                </div>

                                {/* XP */}
                                <div className="w-24 flex items-center justify-end gap-1.5 pr-2">
                                    <Star className={`w-4 h-4 ${user.isCurrentUser ? 'text-primary fill-primary/50' : 'text-primary/70'}`} />
                                    <span className={`font-heading font-bold ${user.isCurrentUser ? 'text-primary text-lg' : 'text-foreground'}`}>
                                        {user.xp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Leaderboard;
