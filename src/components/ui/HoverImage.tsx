"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

import { TextReveal } from "./Typography";

interface HoverImageProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  price: string;
}

export const HoverImage = ({
  heading,
  imgSrc,
  subheading,
  price,
}: HoverImageProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const MotionLink = motion.create(Link);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);
  
  // Add rotation effect based on mouse position
  const rotateX = useTransform(mouseYSpring, [0.5, -0.5], ["-5deg", "5deg"]);
  const rotateY = useTransform(mouseXSpring, [0.5, -0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <MotionLink
      href={"#contact"}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/10 py-6 transition-all duration-500 md:py-8 md:px-16 hover:bg-white/5 hover:border-white/20 overflow-hidden"
    >
      {/* Background gradient that follows mouse */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"]),
        }}
      />
      
      <div className="z-10">
        <div className="flex items-center justify-between">
          <motion.h4 
            className="relative z-10 block text-2xl sm:text-4xl font-semibold md:font-bold text-neutral-300 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl tracking-tighter"
            variants={{
              initial: { y: 0 },
              whileHover: { y: -5 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {heading}
          </motion.h4>
          <span className="md:text-2xl text-foreground/50 md:hidden font-semibold">
            {price}
          </span>
        </div>
        <motion.p 
          className="relative z-10 mt-2 block md:text-base text-sm text-foreground/60 transition-colors duration-500 group-hover:text-neutral-50 pt-2 max-w-3xl"
          variants={{
            initial: { y: 0, opacity: 0.8 },
            whileHover: { y: 0, opacity: 1 },
          }}
        >
          {subheading}
        </motion.p>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
          rotateX,
          rotateY,
          filter: "drop-shadow(0 0 15px rgba(0,0,0,0.5))",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring", damping: 15 }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 max-md:hidden"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="z-10 md:p-4 grid justify-items-end gap-2 max-md:hidden"
      >
        <span className="md:text-2xl text-neutral-50 pr-1 font-semibold">{price}</span>
        <motion.div 
          className="border border-white/50 rounded-full py-2 px-6 text-white hover:bg-white/10 transition-colors duration-300"
          whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          <TextReveal>Discuss the project</TextReveal>
        </motion.div>
      </motion.div>
    </MotionLink>
  );
};
