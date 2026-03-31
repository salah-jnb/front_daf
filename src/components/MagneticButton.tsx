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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull (max 20px)
    const pullX = (clientX - centerX) * 0.3;
    const pullY = (clientY - centerY) * 0.3;
    
    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? "a" : "button";

  return React.createElement(
    Component,
    {
      ref: buttonRef,
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
