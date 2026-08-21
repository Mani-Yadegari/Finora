import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Sign in to continue to your Finora account.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7">
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Email
            </label>

            <div className="group relative">
              <Mail
                size={18}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors duration-200 group-focus-within:text-emerald-400/70"
              />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 focus:border-emerald-400/30 focus:bg-emerald-400/[0.025] focus:ring-4 focus:ring-emerald-400/[0.05]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/70"
              >
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-emerald-400/70 transition-colors duration-200 hover:text-emerald-400"
              >
                Forgot password?
              </button>
            </div>

            <div className="group relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25 transition-colors duration-200 group-focus-within:text-emerald-400/70"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-black/20 pl-11 pr-12 text-sm text-white outline-none placeholder:text-white/20 transition-all duration-200 focus:border-emerald-400/30 focus:bg-emerald-400/[0.025] focus:ring-4 focus:ring-emerald-400/[0.05]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-white/25 transition-all duration-200 hover:bg-white/[0.05] hover:text-white/60"
              >
                {showPassword ? (
                  <EyeOff size={17} strokeWidth={1.8} />
                ) : (
                  <Eye size={17} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="group flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />

            <span
              className={`flex h-4 w-4 items-center justify-center rounded-[5px] border transition-all duration-200 ${
                rememberMe
                  ? "border-emerald-400/40 bg-emerald-400/15"
                  : "border-white/10 bg-white/[0.025]"
              }`}
            >
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 text-emerald-400 transition-all duration-200 ${
                  rememberMe ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M2.5 6.2 5 8.5 9.5 3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="text-xs text-white/40 transition-colors duration-200 group-hover:text-white/55">
              Remember me
            </span>
          </label>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-shadow duration-300 hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]"
          >
            <span className="relative z-10">Sign in</span>

            <ArrowRight
              size={17}
              strokeWidth={2}
              className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
            />

            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.07]" />

          <span className="text-[11px] uppercase tracking-wider text-white/25">
            or
          </span>

          <div className="h-px flex-1 bg-white/[0.07]" />
        </div>

        {/* Google */}
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.045] hover:text-white"
        >
          <span className="flex h-5 w-5 items-center justify-center text-sm font-semibold">
            G
          </span>
          Continue with Google
        </motion.button>
      </div>

      {/* Sign Up */}
      <div className="mt-6 text-center text-sm">
        <span className="text-white/30">Don't have an account?</span>{" "}
        <Link
          to="/signup"
          className="font-medium text-emerald-400/80 transition-colors duration-200 hover:text-emerald-400"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
