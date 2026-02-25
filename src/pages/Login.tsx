import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import { login, signup } from "@/services/api";
import heroImage from "@/assets/hero-education.png";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        if (!email || !password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        const data = await login(email, password);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        navigate("/dashboard");
      } else {
        if (!name || !email || !password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        const data = await signup(name, email, password);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        navigate("/domain-selection");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/90 via-[#0b1120]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="animate-slide-up text-center max-w-sm w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center animate-float shadow-lg shadow-primary/20">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-2 tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-sm text-primary-foreground/70 mb-6 font-light">
            {isLogin ? "Sign in to continue your journey" : "Join SkillSpark today"}
          </p>

          {error && (
            <div className="mb-4 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 bg-background/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl text-left">
            {!isLogin && (
              <div className="relative group animate-in fade-in slide-in-from-top-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-foreground/50 group-focus-within:text-primary-foreground transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required={!isLogin}
                  className="w-full bg-background/20 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/40 transition-all font-medium"
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-foreground/50 group-focus-within:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full bg-background/20 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/40 transition-all font-medium"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-foreground/50 group-focus-within:text-primary-foreground transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-background/20 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-2xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/40 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-primary-foreground/50 hover:text-primary-foreground transition-colors outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative group animate-in fade-in slide-in-from-top-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary-foreground/50 group-focus-within:text-primary-foreground transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required={!isLogin}
                  className="w-full bg-background/20 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-2xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background/40 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-primary-foreground/50 hover:text-primary-foreground transition-colors outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-heading font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50"
              style={{ background: "var(--gradient-primary)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-primary-foreground">
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
              </span>
              {!loading && <ArrowRight className="relative w-4 h-4 text-primary-foreground group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-sm flex flex-col gap-2">
            {isLogin && (
              <p className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors cursor-pointer">
                Forgot your password?
              </p>
            )}
            <p className="text-primary-foreground/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="text-primary hover:text-primary/80 font-semibold cursor-pointer transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
