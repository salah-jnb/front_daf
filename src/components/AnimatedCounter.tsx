import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Extract prefix, number, and suffix. Fixed to support suffixes with numbers (like ' m2')
  const match = value.match(/^([^0-9]*)([0-9][0-9\s,.]*[0-9]|[0-9])(.*)$/);
  const prefix = match ? match[1] : "";
  const numericRaw = match ? match[2] : "";
  const suffix = match ? match[3] : "";

  // Clean the number string from spaces and commas to parse it
  const cleanNumberStr = numericRaw.replace(/[\s,]/g, '');
  const targetNumber = cleanNumberStr ? parseFloat(cleanNumberStr) : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || targetNumber === null || isNaN(targetNumber)) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutExpo for a fast initial speed slowing down elegantly)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, targetNumber, duration]);

  if (targetNumber === null || isNaN(targetNumber)) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
