import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, Bug, Server, Brain } from "lucide-react";
import { getDomains, selectDomain } from "@/services/api";

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  Bug,
  Server,
  Brain,
};

const colorClasses = [
  "bg-primary/10 text-primary border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
  "bg-accent/10 text-accent border-accent/20 hover:border-accent/50 hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)]",
  "bg-info/10 text-info border-info/20 hover:border-info/50 hover:shadow-[0_0_20px_hsl(var(--info)/0.2)]",
  "bg-success/10 text-success border-success/20 hover:border-success/50 hover:shadow-[0_0_20px_hsl(var(--success)/0.2)]",
];

const iconBgClasses = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground",
  "bg-info text-info-foreground",
  "bg-success text-success-foreground",
];

interface DomainData {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

const DomainSelection = () => {
  const navigate = useNavigate();
  const [domains, setDomains] = useState<DomainData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [selectedDomainObj, setSelectedDomainObj] = useState<DomainData | null>(null);

  useEffect(() => {
    // Clear legacy string domain IDs from localStorage (e.g. "java", "devops")
    const currentDomain = localStorage.getItem("selectedDomain");
    if (currentDomain && currentDomain.length !== 24) {
      localStorage.removeItem("selectedDomain");
      localStorage.removeItem("selectedDomainName");
    }

    getDomains()
      .then((data) => {
        setDomains(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load domains:", err);
        setLoading(false);
      });
  }, []);

  const handleSelect = async (domain: DomainData) => {
    setSelecting(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await selectDomain(userId, domain._id);
      } catch (err) {
        console.error("Failed to select domain:", err);
      }
    }
    localStorage.setItem("selectedDomain", domain._id);
    localStorage.setItem("selectedDomainName", domain.name);
    setSelectedDomainObj(domain);
    setSelecting(false);
  };

  const handleStartAdaptiveQuiz = () => {
    navigate("/quiz?mode=adaptive");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg animate-pulse">Loading domains...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12 animate-slide-up">
          {selectedDomainObj ? (
            <>
              <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
                Great choice!
              </h1>
              <p className="text-lg text-muted-foreground">
                You selected <strong className="text-foreground">{selectedDomainObj.name}</strong>.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-heading text-4xl font-bold text-foreground mb-3">
                What do you want to learn?
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose a domain to begin your personalized journey
              </p>
            </>
          )}
        </div>

        {selectedDomainObj ? (
          <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 max-w-lg mx-auto text-center glass-card p-10 rounded-3xl border-primary/20 bg-primary/5">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Are you ready to take an adaptive quiz?
            </h2>
            <p className="text-muted-foreground mb-8">
              This quick 10-question quiz will help us assess your current level and generate a personalized Learning Path tailored just for you.
            </p>
            <button
              onClick={handleStartAdaptiveQuiz}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-semibold transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            >
              Start Adaptive Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((domain, i) => {
              const Icon = iconMap[domain.icon] || Coffee;
              return (
                <button
                  key={domain._id}
                  disabled={selecting}
                  onClick={() => handleSelect(domain)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-slide-up ${colorClasses[i % colorClasses.length]} stagger-${i + 1}`}
                  style={{ opacity: 0, animationFillMode: "forwards" }}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${iconBgClasses[i % iconBgClasses.length]}`}>
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
        )}
      </div>
    </div>
  );
};

export default DomainSelection;
