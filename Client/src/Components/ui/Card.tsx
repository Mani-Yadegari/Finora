type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
        p-6

        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        shadow-white/[0.02]

        before:absolute
        before:inset-0
        before:rounded-3xl
        before:bg-gradient-to-br
        before:from-white/[0.08]
        before:via-transparent
        before:to-transparent
        before:pointer-events-none

        transition-all
        duration-300
        hover:bg-white/[0.05]
        hover:border-white/15
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]

        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
