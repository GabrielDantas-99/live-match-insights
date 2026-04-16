import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center bg-void px-4">
        <div className="w-full max-w-md rounded-lg border border-border bg-surface p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-elevated">
            <Mail className="h-8 w-8 text-gold-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-text-primary">CHECK YOUR EMAIL</h2>
          <p className="mt-3 font-body text-sm text-text-secondary">
            We sent a verification link to <span className="font-mono text-gold-primary">{email}</span>.
            Click the link to activate your account.
          </p>
          <button
            onClick={() => { setSignupSuccess(false); setMode("login"); }}
            className="mt-6 font-body text-sm text-gold-primary hover:text-gold-glow transition-colors"
          >
            ← Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold tracking-widest text-gold-primary">
            LIVEMATCH<span className="text-text-secondary">·TRACKER</span>
          </h1>
          <p className="mt-2 font-mono text-xs text-text-muted">
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-md border border-border bg-elevated">
          <button
            onClick={() => { setMode("login"); setError(null); }}
            className={`flex-1 py-2.5 font-body text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-gold-primary text-void rounded-l-md"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => { setMode("signup"); setError(null); }}
            className={`flex-1 py-2.5 font-body text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-gold-primary text-void rounded-r-md"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-border bg-elevated py-3 pl-10 pr-4 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/30 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-border bg-elevated py-3 pl-10 pr-4 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/30 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-md border border-border bg-elevated py-3 pl-10 pr-10 font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <div className="rounded-md border border-status-danger/30 bg-status-danger/10 px-4 py-2.5">
              <p className="font-mono text-xs text-status-danger">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gold-primary py-3 font-display text-sm font-bold uppercase tracking-widest text-void transition-colors hover:bg-gold-glow disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "ENTER DASHBOARD" : "CREATE ACCOUNT"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-xs text-text-muted">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
            className="text-gold-primary hover:text-gold-glow transition-colors"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
