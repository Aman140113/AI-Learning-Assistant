import { useNavigate } from "react-router-dom";
import { Coffee, Bug, Server, Brain } from "lucide-react";
import { domains } from "@/data/dummyData";

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  Bug,
  Server,
  Brain,
};

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(174_72%_40%/0.2)]",
  accent: "bg-accent/10 text-accent border-accent/20 hover:border-accent/50 hover:shadow-[0_0_20px_hsl(25_95%_55%/0.2)]",
  info: "bg-info/10 text-info border-info/20 hover:border-info/50 hover:shadow-[0_0_20px_hsl(217_91%_60%/0.2)]",
  success: "bg-success/10 text-success border-success/20 hover:border-success/50 hover:shadow-[0_0_20px_hsl(142_71%_45%/0.2)]",
};

const iconBgMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  info: "bg-info text-info-foreground",
  success: "bg-success text-success-foreground",
};

const DomainSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
            What do you want to learn?
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a domain to begin your personalized journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain, i) => {
            const Icon = iconMap[domain.icon];
            return (
              <button
                key={domain.id}
                onClick={() => {
                localStorage.setItem("selectedDomain", domain.id); // e.g. "java", "qa", "devops", "genai"
                navigate("/dashboard");
              }}
                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up ${
                  colorMap[domain.color]
                } stagger-${i + 1}`}
                style={{ opacity: 0, animationFillMode: "forwards" }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${iconBgMap[domain.color]}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {domain.name}
                </h3>
                <p className="text-sm text-muted-foreground">{domain.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainSelection;
