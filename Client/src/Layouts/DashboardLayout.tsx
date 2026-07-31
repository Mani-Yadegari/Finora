import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const DashboardLayout = () => {
  return (
    <div
      className="
      min-h-screen
      bg-[var(--bg)]
      relative
      overflow-hidden
    "
    >
      {/* Green Glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          w-96
          h-96
          bg-green-500/20
          rounded-full
          blur-[120px]
          pointer-events-none
        "
      />

      <div className="flex min-h-screen relative z-10">
        <Sidebar />

        <main className="flex-1">
          <Topbar />

          <section className="p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
