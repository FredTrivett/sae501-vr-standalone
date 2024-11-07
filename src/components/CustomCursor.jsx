import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.closest("input") ||
        e.target.closest("label")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full bg-white"
        animate={{
          x: mousePosition.x - (isHovering ? 16 : 4),
          y: mousePosition.y - (isHovering ? 16 : 4),
          scale: isHovering ? 1.5 : 1,
          opacity: 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          width: 8,
          height: 8,
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full border-2 border-white"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.4 : 1,
          opacity: 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          width: 32,
          height: 32,
        }}
      />
    </>
  );
}
