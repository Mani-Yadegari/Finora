import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Start managing your finances with Finora.
        </p>
      </div>

      {/* Card */}
      <div
        className="
          rounded-3xl
          border border-white/[0.07]
          bg-white/[0.025]
          p-6
          shadow-[0_20px_80px_rgba(0,0,0,0.35)]
          backdrop-blur-2xl
          sm:p-7
        "
      >
        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Full name
            </label>

            <div className="group relative">
              <User
                size={18}
                strokeWidth={1.8}
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/25
                  transition-colors duration-200
                  group-focus-within:text-[#22c55e]/70
                "
              />

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className="
                  h-12 w-full
                  rounded-2xl
                  border border-white/[0.08]
                  bg-black/20
                  pl-11 pr-4
                  text-sm text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all duration-200
                  focus:border-[#22c55e]/30
                  focus:bg-[#22c55e]/[0.02]
                  focus:ring-4
                  focus:ring-[#22c55e]/[0.04]
                "
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Email
            </label>

            <div className="group relative">
              <Mail
                size={18}
                strokeWidth={1.8}
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/25
                  transition-colors duration-200
                  group-focus-within:text-[#22c55e]/70
                "
              />

              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="
                  h-12 w-full
                  rounded-2xl
                  border border-white/[0.08]
                  bg-black/20
                  pl-11 pr-4
                  text-sm text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all duration-200
                  focus:border-[#22c55e]/30
                  focus:bg-[#22c55e]/[0.02]
                  focus:ring-4
                  focus:ring-[#22c55e]/[0.04]
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Password
            </label>

            <div className="group relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.8}
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/25
                  transition-colors duration-200
                  group-focus-within:text-[#22c55e]/70
                "
              />

              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                className="
                  h-12 w-full
                  rounded-2xl
                  border border-white/[0.08]
                  bg-black/20
                  pl-11 pr-12
                  text-sm text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all duration-200
                  focus:border-[#22c55e]/30
                  focus:bg-[#22c55e]/[0.02]
                  focus:ring-4
                  focus:ring-[#22c55e]/[0.04]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="
                  absolute right-3 top-1/2
                  flex h-8 w-8
                  -translate-y-1/2
                  items-center justify-center
                  rounded-xl
                  border border-transparent
                  bg-white/[0.015]
                  text-white/25
                  transition-all duration-200
                  hover:border-white/[0.06]
                  hover:bg-white/[0.045]
                  hover:text-white/60
                "
              >
                {showPassword ? (
                  <EyeOff size={17} strokeWidth={1.8} />
                ) : (
                  <Eye size={17} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Confirm password
            </label>

            <div className="group relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.8}
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-white/25
                  transition-colors duration-200
                  group-focus-within:text-[#22c55e]/70
                "
              />

              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="
                  h-12 w-full
                  rounded-2xl
                  border border-white/[0.08]
                  bg-black/20
                  pl-11 pr-12
                  text-sm text-white
                  outline-none
                  placeholder:text-white/20
                  transition-all duration-200
                  focus:border-[#22c55e]/30
                  focus:bg-[#22c55e]/[0.02]
                  focus:ring-4
                  focus:ring-[#22c55e]/[0.04]
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="
                  absolute right-3 top-1/2
                  flex h-8 w-8
                  -translate-y-1/2
                  items-center justify-center
                  rounded-xl
                  border border-transparent
                  bg-white/[0.015]
                  text-white/25
                  transition-all duration-200
                  hover:border-white/[0.06]
                  hover:bg-white/[0.045]
                  hover:text-white/60
                "
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} strokeWidth={1.8} />
                ) : (
                  <Eye size={17} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreeToTerms}
              onClick={() => setAgreeToTerms((prev) => !prev)}
              className={`
                mt-0.5
                flex h-4 w-4 shrink-0
                items-center justify-center
                rounded-[5px]
                border
                transition-all duration-200
                ${
                  agreeToTerms
                    ? "border-[#22c55e]/40 bg-[#22c55e]/[0.12]"
                    : "border-white/10 bg-white/[0.025]"
                }
              `}
            >
              <Check
                size={11}
                strokeWidth={2.5}
                className={`
                  text-[#22c55e]
                  transition-all duration-200
                  ${
                    agreeToTerms
                      ? "scale-100 opacity-100"
                      : "scale-50 opacity-0"
                  }
                `}
              />
            </button>

            <span className="text-xs leading-5 text-white/35">
              I agree to the{" "}
              <button
                type="button"
                className="
                  text-[#22c55e]/75
                  transition-colors
                  hover:text-[#16a34a]
                "
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="
                  text-[#22c55e]/75
                  transition-colors
                  hover:text-[#16a34a]
                "
              >
                Privacy Policy
              </button>
              .
            </span>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            className="
              group
              relative
              flex h-12 w-full
              items-center justify-center gap-2
              overflow-hidden
              rounded-2xl
              border border-[#22c55e]/20
              bg-[#22c55e]
              text-sm font-semibold
              text-black
              shadow-[0_8px_30px_rgba(34,197,94,0.10)]
              transition-all duration-300
              hover:bg-[#16a34a]
              hover:shadow-[0_10px_35px_rgba(34,197,94,0.16)]
            "
          >
            <span className="relative z-10">Create account</span>

            <ArrowRight
              size={17}
              strokeWidth={2}
              className="
                relative z-10
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />

            <span
              className="
                absolute inset-0
                -translate-x-full
                bg-white/[0.08]
                transition-transform duration-500
                group-hover:translate-x-0
              "
            />
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
          className="
            flex h-12 w-full
            items-center justify-center gap-3
            rounded-2xl
            border border-white/[0.08]
            bg-white/[0.025]
            text-sm font-medium
            text-white/70
            backdrop-blur-xl
            transition-all duration-200
            hover:border-white/[0.12]
            hover:bg-white/[0.045]
            hover:text-white
          "
        >
          <span
            className="
              flex h-5 w-5
              items-center justify-center
              rounded-md
              border border-white/[0.06]
              bg-white/[0.025]
              text-sm font-semibold
            "
          >
            G
          </span>
          Continue with Google
        </motion.button>
      </div>

      {/* Login */}
      <div className="mt-6 text-center text-sm">
        <span className="text-white/30">Already have an account?</span>{" "}
        <Link
          to="/login"
          className="
            font-medium
            text-[#22c55e]/75
            transition-colors duration-200
            hover:text-[#16a34a]
          "
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
