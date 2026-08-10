import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const DashboardLayout = () => {
  return (
    <div
      className="
        relative
        h-screen
        overflow-hidden
        bg-[#050706]
      "
    >
      {/* Ambient Background Glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.06),transparent_35%),linear-gradient(135deg,#030403_0%,#050706_50%,#020302_100%)]
        "
      />

      {/* Top Green Glow */}
      <div
        className="
          absolute
          -top-52
          left-1/3
          h-[600px]
          w-[600px]
          rounded-full
          bg-green-500/5
          blur-[180px]
          pointer-events-none
        "
      />

      {/* Bottom Right Glow */}
      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-400/5
          blur-[170px]
          pointer-events-none
        "
      />

      {/* Noise Layer */}
      <div
        className="
          absolute
          inset-0
          opacity-[13]
          pointer-events-none
          bg-[url('/noise.svg')]
        "
      />

      <div className="relative z-10 flex h-full">
        <Sidebar />

        <main
          className="
            flex
            flex-1
            flex-col
            overflow-hidden
          "
        >
          <Topbar />

          <section
            className="
              flex-1
              overflow-y-auto
              py-2
              px-4
            "
          >
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
