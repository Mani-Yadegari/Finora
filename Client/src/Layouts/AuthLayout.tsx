import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

import Logo from "../assets/Icons/Logo.webp";

const AuthLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  const isSignUp = location.pathname === "/signup";

  return (
    <div className="h-[100dvh] overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top Left Glow */}
        <motion.div
          className="
            absolute
            -left-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--primary)]/[0.055]
            blur-[120px]
          "
          animate={{
            x: isSignUp ? 80 : 0,
            y: isSignUp ? 40 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Bottom Right Glow */}
        <motion.div
          className="
            absolute
            -bottom-40
            -right-32
            h-[500px]
            w-[500px]
            rounded-full
            bg-[var(--primary)]/[0.035]
            blur-[140px]
          "
          animate={{
            x: isSignUp ? -60 : 0,
            y: isSignUp ? -30 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Center Glow */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.018),transparent_55%)]
          "
        />

        {/* Subtle Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.22)_100%)]
          "
        />
      </div>

      {/* Main */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex shrink-0 items-center justify-center px-6 pt-6 sm:pt-8"
        >
          <div className="flex items-center gap-2.5">
            <img src={Logo} alt="Finora" className="h-9 w-9 object-contain" />

            <span className="text-lg font-semibold tracking-tight">Finora</span>
          </div>
        </motion.header>

        {/* Auth Content */}
        <main className="min-h-0 flex-1 overflow-hidden px-4">
          <div className="flex h-full items-center justify-center">
            <motion.div
              layout
              className="w-full max-w-[440px]"
              transition={{
                layout: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  className="w-full"
                  initial={{
                    opacity: 0,
                    x: isSignUp ? 35 : -35,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: isSignUp ? -35 : 35,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {outlet}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
          className="shrink-0 px-6 pb-4 pt-2 text-center sm:pb-6"
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Finora. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default AuthLayout;
