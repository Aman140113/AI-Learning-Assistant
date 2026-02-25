import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock, ArrowRight, ClipboardCheck } from "lucide-react";
import { getDailyTasks, completeDailyTask } from "@/services/api";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
    xp_reward: number;
}

const DailyTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId") || "";
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            getDailyTasks(userId)
                .then((res) => setTasks(res.tasks || []))
                .catch((err) => console.error("Error fetching tasks:", err))
                .finally(() => setLoading(false));
        }
    }, [userId]);

    const handleAction = async (task: Task) => {
        if (task.completed) return;

        // If it's a quiz task, direct to quiz
        if (task.title.toLowerCase().includes("quiz")) {
            navigate("/quiz?mode=daily");
            return;
        }

        // Otherwise, mark it as completed simply
        try {
            await completeDailyTask(task._id);
            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? { ...t, completed: true } : t))
            );
            toast.success("Task completed! XP earned.");
        } catch (err) {
            toast.error("Failed to complete task");
        }
    };

    const todayCompleted = tasks.every((t) => t.completed) && tasks.length > 0;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-3xl pb-16">
                <div className="text-center mb-12 animate-slide-up">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <ClipboardCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
                        Your Daily Timeline
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Keep up the momentum to build consistency
                    </p>
                </div>

                <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12 pb-8">

                    {/* Yesterday (Static) */}
                    <div className="relative pl-8 animate-slide-up stagger-1" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <div className="absolute -left-[17px] top-1 bg-background border-2 border-success rounded-full w-8 h-8 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-1">Yesterday</h3>
                        <p className="text-muted-foreground text-sm mb-4">All tasks completed successfully</p>
                        <div className="glass-card p-5 opacity-70">
                            <p className="text-sm font-medium text-foreground">Earned +85 XP across 5 tasks</p>
                        </div>
                    </div>

                    {/* Today (Dynamic) */}
                    <div className="relative pl-8 animate-slide-up stagger-2" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <div className={`absolute -left-[17px] top-1 bg-background border-2 rounded-full w-8 h-8 flex items-center justify-center ${todayCompleted ? 'border-success' : 'border-primary'}`}>
                            {todayCompleted ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Circle className="w-5 h-5 text-primary fill-primary/20" />}
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-foreground mb-1 text-primary">Today</h3>
                        <p className="text-muted-foreground text-sm mb-6">Complete these to keep your streak</p>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-muted-foreground animate-pulse">Loading today's tasks...</div>
                            ) : tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div key={task._id} className={`glass-card p-4 flex items-center justify-between transition-all ${task.completed ? 'opacity-60 bg-muted/30 border-success/30' : 'hover:border-primary/50'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${task.completed ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'}`}>
                                                {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.title}</p>
                                                <p className="text-xs font-bold text-accent">+{task.xp_reward} XP</p>
                                            </div>
                                        </div>
                                        {!task.completed && (
                                            <button
                                                onClick={() => handleAction(task)}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                                            >
                                                {task.title.toLowerCase().includes("quiz") ? "Take Quiz" : "Complete"}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                        {task.completed && (
                                            <span className="text-sm font-bold text-success pr-4">Done</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No tasks generated for today.</p>
                            )}
                        </div>
                    </div>

                    {/* Tomorrow (Static) */}
                    <div className="relative pl-8 animate-slide-up stagger-3" style={{ opacity: 0, animationFillMode: "forwards" }}>
                        <div className="absolute -left-[17px] top-1 bg-background border-2 border-border rounded-full w-8 h-8 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-muted-foreground mb-1">Tomorrow</h3>
                        <p className="text-muted-foreground/70 text-sm mb-4">Upcoming curated activities</p>
                        <div className="glass-card p-5 border-dashed border-border/50 bg-background/50">
                            <p className="text-sm font-medium text-muted-foreground">Check back tomorrow for a new set of adaptive tasks</p>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default DailyTasks;
