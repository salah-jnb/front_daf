import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick, href }) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      rectRef.current = buttonRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !rectRef.current) return;
    const { clientX, clientY } = e;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = rectRef.current!;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Magnetic pull (max 20px)
      const pullX = (clientX - centerX) * 0.3;
      const pullY = (clientY - centerY) * 0.3;
      
      setPosition({ x: pullX, y: pullY });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPosition({ x: 0, y: 0 });
    rectRef.current = null;
  };

  const Component = href ? "a" : "button";

  return React.createElement(
    Component,
    {
      ref: buttonRef,
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onClick: onClick,
      href: href,
      className: `inline-block ease-out ${className}`,
      style: {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
      },
    },
    children
  );
};

export default MagneticButton;
