import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface CompletedDate {
    _id: string; // "YYYY-MM-DD"
    completedCount: number;
    totalXp: number;
}

interface CalendarCardProps {
    completedDates: CompletedDate[];
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarCard = ({ completedDates }: CalendarCardProps) => {
    const today = new Date();
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear] = useState(today.getFullYear());

    // Build a set of completed dates for fast lookup
    const completedSet = new Map<string, CompletedDate>();
    completedDates.forEach((d) => completedSet.set(d._id, d));

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const todayStr = today.toISOString().split("T")[0];

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else {
            setViewMonth((m) => m - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else {
            setViewMonth((m) => m + 1);
        }
    };

    const canGoNext = viewYear < today.getFullYear() || (viewYear === today.getFullYear() && viewMonth < today.getMonth());

    // Generate calendar grid
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const getDateStr = (day: number) => {
        const m = String(viewMonth + 1).padStart(2, "0");
        const d = String(day).padStart(2, "0");
        return `${viewYear}-${m}-${d}`;
    };

    // Count streak
    let streak = 0;
    const checkDate = new Date(today);
    while (true) {
        const dateStr = checkDate.toISOString().split("T")[0];
        if (completedSet.has(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return (
        <div className="glass-card p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Activity
                </h3>
                {streak > 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/20">
                        🔥 {streak} day streak
                    </span>
                )}
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="font-heading font-semibold text-sm text-foreground">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
                >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1">
                {DAY_NAMES.map((name) => (
                    <div key={name} className="text-center text-[10px] font-semibold text-muted-foreground uppercase">
                        {name}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                    if (day === null) {
                        return <div key={`empty-${i}`} className="aspect-square" />;
                    }

                    const dateStr = getDateStr(day);
                    const isToday = dateStr === todayStr;
                    const completed = completedSet.get(dateStr);
                    const isFuture = new Date(dateStr) > today;

                    // Color intensity based on how many tasks were completed
                    let bgClass = "bg-muted/40";
                    if (completed) {
                        const count = completed.completedCount;
                        if (count >= 5) bgClass = "bg-success text-success-foreground";
                        else if (count >= 3) bgClass = "bg-success/60 text-success-foreground";
                        else if (count >= 1) bgClass = "bg-success/30";
                    }

                    return (
                        <div
                            key={dateStr}
                            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all relative ${isFuture
                                    ? "text-muted-foreground/30"
                                    : bgClass
                                } ${isToday ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}`}
                            title={
                                completed
                                    ? `${completed.completedCount} tasks, +${completed.totalXp} XP`
                                    : undefined
                            }
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-3 pt-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-muted/40" />
                    <span className="text-[10px] text-muted-foreground">None</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-success/30" />
                    <span className="text-[10px] text-muted-foreground">1-2</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-success/60" />
                    <span className="text-[10px] text-muted-foreground">3-4</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-success" />
                    <span className="text-[10px] text-muted-foreground">5+</span>
                </div>
            </div>
        </div>
    );
};

export default CalendarCard;
