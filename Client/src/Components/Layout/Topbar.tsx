const Topbar = () => {
  return (
    <header
      className="
        h-20
        border-b
        border-[var(--border)]
        flex
        items-center
        justify-between
        px-8
      "
    >
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div
        className="
          w-10
          h-10
          rounded-full
          bg-white/10
          flex
          items-center
          justify-center
          font-medium
        "
      >
        M
      </div>
    </header>
  );
};

export default Topbar;
