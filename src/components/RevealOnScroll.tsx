import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  scale?: number;
}

export function RevealOnScroll({ children, delay = 0, className = "", threshold = 0.15, scale = 1 }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16"
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`, 
        willChange: "opacity, transform",
        transform: !isVisible ? `translateY(4rem) scale(${scale})` : undefined
      }}
    >
      {children}
    </div>
  );
}
