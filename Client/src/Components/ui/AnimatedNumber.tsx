import { animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedNumber = ({
  value,
  duration = 1.2,
  prefix = "",
  suffix = "",
  decimals = 2,
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setCount(latest);
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
};

export default AnimatedNumber;
