import logo from "../../assets/icons/logo.webp";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <img src={logo} alt="Finora" className="h-12 w-12 object-contain" />

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Finora</h1>

        <p className="text-xs text-zinc-400">Personal Finance</p>
      </div>
    </div>
  );
};

export default Logo;
