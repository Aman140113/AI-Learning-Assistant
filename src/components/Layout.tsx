import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Map,
    ClipboardCheck,
    Users,
    LineChart,
    Trophy,
    User,
    LogOut,
    Zap,
    Star,
    Menu
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { userData } from "@/data/dummyData";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const userAvatar = localStorage.getItem("userAvatar") || null;

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/learning-path", label: "Learning Path", icon: Map },
        { to: "/daily-tasks", label: "Daily Tasks", icon: ClipboardCheck },
        { to: "/interview", label: "Interview", icon: Users },
        { to: "/performance", label: "Performance", icon: LineChart },
        { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            {/* Sidebar */}
            <aside
                onMouseEnter={() => setCollapsed(false)}
                onMouseLeave={() => setCollapsed(true)}
                className={`relative flex flex-col transition-all duration-300 ease-in-out border-r border-border bg-card/30 backdrop-blur-md z-40 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                {/* Menu Icon */}
                <div className="flex items-center h-16 w-full px-7 shrink-0">
                    <Menu className="w-6 h-6 text-foreground shrink-0" />
                </div>

                {/* Navigation */}
                <div className="flex-1 flex flex-col gap-2 px-3 py-6 overflow-y-auto custom-scrollbar">
                    {links.map((link, idx) => {
                        const isActive = link.to ? location.pathname === link.to : false;

                        const btnClass = `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? "bg-primary/10 text-primary font-semibold shadow-inner"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium"
                            } ${collapsed ? "justify-center" : ""}`;

                        const Content = () => (
                            <>
                                <link.icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? "text-primary scale-110" : "group-hover:text-foreground group-hover:scale-110"}`} />
                                {!collapsed && <span className="whitespace-nowrap">{link.label}</span>}
                            </>
                        );

                        return (
                            <Link key={idx} to={link.to} className={btnClass} title={collapsed ? link.label : undefined}>
                                <Content />
                            </Link>
                        );
                    })}
                </div>

            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Top Bar */}
                <header className="h-16 border-b border-border bg-card/30 backdrop-blur-md flex items-center justify-between px-6 z-30 shrink-0">
                    {/* Logo (Static in Top Bar) */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                            <Zap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-heading font-bold text-xl text-foreground whitespace-nowrap">
                            SkillSpark<span className="text-primary">AI</span>
                        </span>
                    </div>

                    {/* Right side group */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* XP & Level */}
                        <div className="flex items-center gap-4 pl-2">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none mb-1">Level</span>
                                <span className="text-sm font-bold text-foreground leading-none">{userData.level}</span>
                            </div>
                            <div className="h-8 w-px bg-border hidden md:block"></div>
                            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <span className="text-sm font-bold text-primary">{userData.xp} <span className="text-xs font-semibold text-primary/70">/ {userData.maxXp} XP</span></span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-border hidden md:block"></div>

                        {/* User Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <ThemeToggle />

                            <button
                                onClick={() => navigate("/profile")}
                                title="Profile"
                                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors border border-border overflow-hidden"
                            >
                                {userAvatar ? (
                                    <img src={`/src/assets/avatars/${userAvatar}`} alt="Avatar" className="w-8 h-8 object-contain" />
                                ) : (
                                    <User className="w-5 h-5 text-foreground" />
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("userId");
                                    localStorage.removeItem("userName");
                                    localStorage.removeItem("userAvatar");
                                    localStorage.removeItem("userEmail");
                                    navigate("/");
                                }}
                                title="Logout"
                                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
