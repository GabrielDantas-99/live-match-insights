import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Zap, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
      if (!username.trim()) {
        setError("Username is required");
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, username);
      if (error) {
        setError(error);
      } else {
        setSignupSuccess(true);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  if (signupSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void px-4 relative overflow-hidden">
        <BackgroundEffects />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md rounded-xl border border-border bg-surface/80 backdrop-blur-xl p-10 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--gold-primary) / 0.15), hsl(var(--gold-glow) / 0.08))", border: "1px solid hsl(var(--gold-primary) / 0.2)" }}
          >
            <Mail className="h-9 w-9 text-gold" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-foreground tracking-wide">CHECK YOUR EMAIL</h2>
          <p className="mt-4 font-body text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to{" "}
            <span className="font-mono text-gold">{email}</span>.
            <br />Click the link to activate your account.
          </p>
          <button
            onClick={() => { setSignupSuccess(false); setMode("login"); }}
            className="mt-8 inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-glow transition-colors duration-200"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Back to login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Background */}
      <BackgroundEffects />

      {/* Left panel — branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] relative z-10 flex-col justify-between p-12">
        <div>
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 group">
            <h1 className="font-display text-2xl font-bold tracking-widest text-gold">
              LIVEMATCH<span className="text-muted-foreground">·TRACKER</span>
            </h1>
          </button>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-bold text-foreground leading-tight">
              EVERY STAT.<br />
              <span className="text-gold" style={{ textShadow: "0 0 40px hsl(var(--gold-primary) / 0.3)" }}>
                EVERY SECOND.
              </span>
            </h2>
            <p className="mt-6 font-body text-base text-muted-foreground max-w-md leading-relaxed">
              Real-time League of Legends match tracking with professional-grade analytics. Monitor KDA, gold, vision, and objectives as they happen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Zap, text: "Live updates every 5 seconds" },
              { icon: Activity, text: "Track up to 10 matches simultaneously" },
              { icon: Shield, text: "Secure data with end-to-end encryption" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "hsl(var(--gold-primary) / 0.1)", border: "1px solid hsl(var(--gold-primary) / 0.15)" }}>
                  <item.icon className="h-4 w-4 text-gold" />
                </div>
                <span className="font-body text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="font-body text-xs text-text-muted">
          Not affiliated with Riot Games. LiveMatch Tracker © 2026
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center relative z-10 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="mb-10 text-center lg:hidden">
            <h1 className="font-display text-2xl font-bold tracking-widest text-gold">
              LIVEMATCH<span className="text-muted-foreground">·TRACKER</span>
            </h1>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-xl p-8 shadow-2xl" style={{ boxShadow: "0 0 80px hsl(var(--gold-primary) / 0.03), 0 25px 50px -12px rgb(0 0 0 / 0.5)" }}>
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground tracking-wide">
                {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
              </h2>
              <p className="mt-1.5 font-body text-sm text-muted-foreground">
                {mode === "login" ? "Sign in to access your dashboard" : "Join the tracker and start monitoring"}
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-7 flex rounded-lg bg-elevated p-1 border border-border">
              {(["login", "signup"] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); }}
                  className={`relative flex-1 py-2.5 font-body text-sm font-medium transition-all duration-200 rounded-md ${
                    mode === m
                      ? "text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === m && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 uppercase tracking-wider text-xs font-semibold">
                    {m === "login" ? "Login" : "Sign Up"}
                  </span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="username"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-gold" />
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-border bg-elevated/60 py-3.5 pl-11 pr-4 font-mono text-sm text-foreground placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all duration-200"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-gold" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-elevated/60 py-3.5 pl-11 pr-4 font-mono text-sm text-foreground placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all duration-200"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-gold" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-border bg-elevated/60 py-3.5 pl-11 pr-11 font-mono text-sm text-foreground placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-muted-foreground transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3"
                  >
                    <p className="font-mono text-xs text-destructive">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold-primary)), hsl(var(--gold-glow)))",
                  boxShadow: "0 4px 24px hsl(var(--gold-primary) / 0.25)",
                }}
              >
                {loading ? (
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Enter Dashboard" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <p className="mt-7 text-center font-body text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
                className="text-gold hover:text-gold-glow font-medium transition-colors duration-200"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 bg-void" />
    {/* Grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(hsl(var(--text-primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--text-primary)) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />
    {/* Gradient blobs */}
    <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(var(--blue-team)), transparent 70%)", filter: "blur(120px)" }} />
    <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(var(--red-team)), transparent 70%)", filter: "blur(120px)" }} />
    {/* Gold accent on right panel */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(var(--gold-primary)), transparent 70%)", filter: "blur(100px)" }} />
  </>
);

export default AuthPage;
