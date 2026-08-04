import { animate } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  startValue?: number;
}

const AnimatedNumber = ({
  value,
  duration = 1.2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 2,
  startValue = 0,
}: AnimatedNumberProps) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    const controls = animate(startValue, value, {
      duration,
      delay,
      ease: "easeOut",

      onUpdate(latest) {
        setCount(latest);
      },
    });

    return () => controls.stop();
  }, [value, duration, delay, startValue]);

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
