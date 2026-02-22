import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-education.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="animate-slide-up text-center max-w-lg">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center animate-float">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">
            Adaptive Learning{" "}
            <span className="gradient-text">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-12 font-light">
            Your Personalized Learning Journey
          </p>

          <button
            onClick={() => navigate("/domain-selection")}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-heading font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span className="text-primary-foreground">Get Started</span>
            <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-6 text-sm text-primary-foreground/40">
            No account needed • Start learning instantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
