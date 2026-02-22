import ProgressBar from "./ProgressBar";

interface SkillCardProps {
  name: string;
  status: "Proficient" | "Intermediate" | "Beginner";
  progress: number;
}

const SkillCard = ({ name, status, progress }: SkillCardProps) => {
  const badgeClass = {
    Proficient: "badge-proficient",
    Intermediate: "badge-intermediate",
    Beginner: "badge-beginner",
  };

  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-semibold text-foreground">{name}</h4>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass[status]}`}>
          {status}
        </span>
      </div>
      <ProgressBar value={progress} max={100} showValue={false} size="sm" variant="skill" />
    </div>
  );
};

export default SkillCard;
