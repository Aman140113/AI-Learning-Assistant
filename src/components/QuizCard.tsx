interface QuizCardProps {
  option: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const QuizCard = ({ option, index, selected, onSelect, disabled }: QuizCardProps) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left py-2.5 px-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 group ${selected
          ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-xs shrink-0 transition-colors ${selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          }`}
      >
        {letters[index]}
      </span>
      <span className="font-medium text-sm text-foreground">{option}</span>
    </button>
  );
};

export default QuizCard;
