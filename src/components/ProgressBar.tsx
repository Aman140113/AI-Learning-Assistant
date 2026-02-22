interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "xp" | "quiz" | "skill";
}

const ProgressBar = ({
  value,
  max,
  label,
  showValue = true,
  size = "md",
  variant = "xp",
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const barStyles = {
    xp: "bg-[image:var(--gradient-xp)]",
    quiz: "bg-primary",
    skill: percentage >= 80 ? "bg-success" : percentage >= 50 ? "bg-warning" : "bg-destructive",
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-muted-foreground">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full rounded-full bg-muted overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full ${barStyles[variant]} animate-progress-fill transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
