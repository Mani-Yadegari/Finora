const Topbar = () => {
  return (
    <header
      className="
        h-20
        px-8
        flex
        items-center
        justify-between
        border-b
        border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <p className="text-sm text-zinc-400">Track your financial growth</p>
      </div>

      <button
        className="
          w-10
          h-10
          rounded-full
          bg-white/10
          hover:bg-white/20
          transition
        "
      >
        M
      </button>
    </header>
  );
};

export default Topbar;
