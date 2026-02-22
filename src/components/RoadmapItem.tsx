import { Check, Lock, Play } from "lucide-react";

interface RoadmapItemProps {
  week: number;
  title: string;
  description: string;
  status: "Completed" | "Current" | "Locked";
  isLast?: boolean;
}

const RoadmapItem = ({ week, title, description, status, isLast }: RoadmapItemProps) => {
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

  return (
    <div className="flex gap-6">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${nodeStyle[status]}`}>
          {iconMap[status]}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 min-h-[40px] ${lineStyle[status]}`} />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-8 ${isLast ? "" : ""}`}>
        <div className={`rounded-xl border p-5 ${cardStyle[status]}`}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Week {week}
          </p>
          <h3 className="font-heading font-bold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapItem;
