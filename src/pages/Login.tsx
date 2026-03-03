import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, User, Mail, Eye, EyeOff, Plus, X, Shield } from "lucide-react";
import { login, signup, adminLogin } from "@/services/api";

const avatars = [
  "boy_6247196.png", "boy_6453081.png", "boy_706836.png",
  "beard_5184768.png", "clown_1589797.png", "dracula_1224011.png",
  "man_4323002.png", "man_945230.png", "merchant_1090567.png",
  "pirate_1999508.png", "rockabilly_9600935.png", "woman_706803.png", "woman_706806.png"
];

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    setIsLogin(true);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Admin login flow
      if (isAdminMode) {
        if (!email || !password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        await adminLogin(email, password);
        navigate("/admin");
        return;
      }

      // Regular user flow
      if (isLogin) {
        if (!email || !password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        const data = await login(email, password);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        if (data.user.avatar) localStorage.setItem("userAvatar", data.user.avatar);
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
        const data = await signup(name, email, password, selectedAvatar);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        if (data.user.avatar) localStorage.setItem("userAvatar", data.user.avatar);
        navigate("/domain-selection");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic accent color based on mode
  const accentRgb = isAdminMode ? "168,85,247" : "0,245,212";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-slate-200 font-sans selection:bg-[#00F5D4] selection:text-black overflow-hidden relative">
      {/* Background visual effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700" style={{ backgroundColor: `rgba(${accentRgb}, 0.1)` }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[30%] h-[30%] rounded-full blur-[150px] transition-colors duration-700" style={{ backgroundColor: isAdminMode ? "rgba(88,28,135,0.08)" : "rgba(88,28,135,0.05)" }} />
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowAvatarModal(false)}>
          <div
            className="bg-[#121212] border border-white/10 rounded-3xl p-6 w-[90%] max-w-sm shadow-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Choose Avatar</h3>
              <button onClick={() => setShowAvatarModal(false)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((av) => (
                <div
                  key={av}
                  onClick={() => {
                    setSelectedAvatar(av);
                    setShowAvatarModal(false);
                  }}
                  className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 border-2 p-2 ${selectedAvatar === av
                    ? 'border-[#00F5D4] bg-[#00F5D4]/10 scale-105 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                    : 'border-white/5 bg-[#0A0A0A] hover:border-white/20 hover:bg-white/5'
                    }`}
                >
                  <img src={`/src/assets/avatars/${av}`} alt="avatar" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="animate-slide-up text-center w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6 cursor-pointer" onClick={() => navigate('/')}>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-[1px] transition-all duration-500"
              style={{
                background: isAdminMode
                  ? "linear-gradient(to top right, #A855F7, #6366F1)"
                  : "linear-gradient(to top right, #00F5D4, #3B82F6)",
                boxShadow: `0 0 20px rgba(${accentRgb}, 0.3)`,
              }}
            >
              <div className="w-full h-full bg-[#121212] rounded-2xl overflow-hidden flex items-center justify-center">
                {isAdminMode ? (
                  <Shield className="w-6 h-6 text-purple-400" />
                ) : (
                  <img src="/src/assets/koshishLogo.png" alt="Logo" className="w-full h-full object-cover scale-150" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                )}
              </div>
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            {isAdminMode ? "Admin Access" : isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-sm text-slate-400 mb-6 font-light">
            {isAdminMode ? "Sign in with admin credentials" : isLogin ? "Sign in to continue your journey" : "Join SkillSpark today"}
          </p>

          {error && (
            <div className="mb-4 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`space-y-4 bg-[#121212] border p-6 rounded-3xl shadow-2xl text-left transition-colors duration-500 ${isAdminMode ? "border-purple-500/20" : "border-white/5"}`}>

            {/* Admin Mode Badge */}
            {isAdminMode && (
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2.5 mb-2 animate-in fade-in slide-in-from-top-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Admin Login</span>
              </div>
            )}

            {/* Avatar Circle at top of Signup form */}
            {!isLogin && !isAdminMode && (
              <div className="flex flex-col items-center mb-2 animate-in fade-in slide-in-from-top-2">
                <div
                  onClick={() => setShowAvatarModal(true)}
                  className="relative w-20 h-20 rounded-full bg-[#0A0A0A] border-2 border-dashed border-white/20 hover:border-[#00F5D4]/50 cursor-pointer flex items-center justify-center transition-all duration-300 group overflow-hidden"
                >
                  {selectedAvatar ? (
                    <>
                      <img
                        src={`/src/assets/avatars/${selectedAvatar}`}
                        alt="Selected Avatar"
                        className="w-16 h-16 object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                        <Plus className="w-6 h-6 text-[#00F5D4]" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-[#00F5D4]" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  {selectedAvatar ? "Tap to change" : "Select profile picture"}
                </p>
              </div>
            )}

            {/* Name field (signup only, not admin) */}
            {!isLogin && !isAdminMode && (
              <div className="relative group animate-in fade-in slide-in-from-top-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#00F5D4] transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 text-white placeholder:text-slate-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00F5D4] focus:border-[#00F5D4] transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 transition-colors ${isAdminMode ? "group-focus-within:text-purple-400" : "group-focus-within:text-[#00F5D4]"}`}>
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdminMode ? "Admin Email" : "Email Address"}
                required
                className={`w-full bg-[#0A0A0A] border border-white/10 text-white placeholder:text-slate-500 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 transition-all ${isAdminMode ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-[#00F5D4] focus:border-[#00F5D4]"}`}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 transition-colors ${isAdminMode ? "group-focus-within:text-purple-400" : "group-focus-within:text-[#00F5D4]"}`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAdminMode ? "Admin Password" : "Password"}
                required
                className={`w-full bg-[#0A0A0A] border border-white/10 text-white placeholder:text-slate-500 rounded-2xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1 transition-all ${isAdminMode ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-[#00F5D4] focus:border-[#00F5D4]"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-white transition-colors outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password (signup only, not admin) */}
            {!isLogin && !isAdminMode && (
              <div className="relative group animate-in fade-in slide-in-from-top-2">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#00F5D4] transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 text-white placeholder:text-slate-500 rounded-2xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00F5D4] focus:border-[#00F5D4] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-white transition-colors outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50 ${isAdminMode
                  ? "bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                  : "bg-[#00F5D4] text-black hover:bg-white shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_30px_rgba(0,245,212,0.4)]"
                }`}
            >
              <span className="relative z-10">
                {loading ? "Please wait..." : isAdminMode ? "Access Admin Panel" : isLogin ? "Sign In" : "Sign Up"}
              </span>
              {!loading && <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-sm flex flex-col gap-2">
            {!isAdminMode && isLogin && (
              <p className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                Forgot your password?
              </p>
            )}
            {!isAdminMode && (
              <p className="text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="text-[#00F5D4] hover:text-white font-bold cursor-pointer transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </span>
              </p>
            )}

            {/* Admin Toggle */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <button
                onClick={toggleAdminMode}
                className={`flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${isAdminMode
                    ? "bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25"
                    : "bg-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10 border border-transparent"
                  }`}
              >
                <Shield className="w-3.5 h-3.5" />
                {isAdminMode ? "Switch to User Login" : "Admin Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
