import { Check, Lock, Play, Clock, Star, ExternalLink, ListChecks } from "lucide-react";

interface RoadmapItemProps {
  week: number;
  course_title: string;
  course_url: string;
  objective: string;
  focus_topics: string[];
  practical_tasks: string[];
  estimated_hours: number;
  xp_target: number;
  status: "Completed" | "Current" | "Locked";
  isLast?: boolean;
}

const RoadmapItem = ({
  week,
  course_title,
  course_url,
  objective,
  focus_topics,
  practical_tasks,
  estimated_hours,
  xp_target,
  status,
  isLast,
}: RoadmapItemProps) => {
  const iconMap = {
    Completed: <Check className="w-5 h-5" />,
    Current: <Play className="w-5 h-5" />,
    Locked: <Lock className="w-4 h-4" />,
  };

  const nodeStyle = {
    Completed: "bg-success text-success-foreground",
    Current: "bg-primary text-primary-foreground animate-pulse-glow",
    Locked: "bg-muted text-muted-foreground",
  };

  const lineStyle = {
    Completed: "bg-success",
    Current: "bg-gradient-to-b from-primary to-muted",
    Locked: "bg-muted",
  };

  const cardStyle = {
    Completed: "border-success/20 bg-success/5",
    Current: "border-primary/30 bg-primary/5 glow-border",
    Locked: "border-border bg-muted/30 opacity-60",
  };

  const topicBadgeStyle = {
    Completed: "bg-success/10 text-success border-success/20",
    Current: "bg-primary/10 text-primary border-primary/20",
    Locked: "bg-muted/50 text-muted-foreground border-border/50",
  };

  return (
    <div className="flex gap-6">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${nodeStyle[status]}`}
        >
          {iconMap[status]}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[40px] ${lineStyle[status]}`} />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-8 ${isLast ? "" : ""}`}>
        <div className={`rounded-xl border p-5 ${cardStyle[status]}`}>
          {/* Week + Course Title */}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Week {week}
          </p>
          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
            {course_title}
          </h3>

          {/* Objective */}
          <p className="text-sm text-muted-foreground mb-3">{objective}</p>

          {/* Focus Topics */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {focus_topics.map((topic) => (
              <span
                key={topic}
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${topicBadgeStyle[status]}`}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Practical Tasks */}
          <div className="mb-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
              <ListChecks className="w-3.5 h-3.5" />
              Practical Tasks
            </p>
            <ul className="space-y-1">
              {practical_tasks.map((task, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${status === "Completed" ? "bg-success" : status === "Current" ? "bg-primary" : "bg-muted-foreground/40"
                      }`}
                  />
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 pt-2 border-t border-border/30">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {estimated_hours}h
            </span>
            <span className="flex items-center gap-1 text-xs text-accent font-semibold">
              <Star className="w-3.5 h-3.5" />
              {xp_target} XP
            </span>
            {status !== "Locked" && (
              <a
                href={course_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
              >
                <ExternalLink className="w-3 h-3" />
                Open Course
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapItem;
