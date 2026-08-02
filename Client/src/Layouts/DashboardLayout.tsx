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
        bg-[var(--bg)]
      "
    >
      {/* Left Glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-green-500/20
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          bottom-0
          right-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-500/10
          blur-[180px]
          pointer-events-none
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
    pt-4
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
