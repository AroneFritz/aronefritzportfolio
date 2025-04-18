"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { About } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";
import { ArrowUpRight } from "./ui/Icons";
import LoaderWrapper from "./LoaderWrapper";

interface HeroProps {
  about: About;
}

const Hero = ({ about }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (0-1)
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate transforms based on mouse position (px values)
  const blob1X = (mousePosition.x - 0.5) * -40; // Move opposite to cursor
  const blob1Y = (mousePosition.y - 0.5) * -40;
  
  const blob2X = (mousePosition.x - 0.5) * 60; // Move with cursor but more dramatically
  const blob2Y = (mousePosition.y - 0.5) * 60;

  return (
    <section className="h-dvh w-dvw overflow-hidden relative">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/15 to-pink-900/20 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
        }}
      />
      <Transition>
        <motion.span 
          className="blob size-1/2 absolute top-20 left-0 blur-[100px]" 
          style={{
            transform: `translate(${blob1X}px, ${blob1Y}px)`,
            background: 'conic-gradient(from 2.35rad, rgba(236, 72, 153, 0.15), rgba(79, 70, 229, 0.25))'
          }}
        />
        <motion.span 
          className="blob-secondary size-1/3 absolute bottom-20 right-0 blur-[120px]" 
          style={{
            transform: `translate(${blob2X}px, ${blob2Y}px)`,
            background: 'conic-gradient(from 0.5rad, rgba(79, 70, 229, 0.2), rgba(236, 72, 153, 0.15))'
          }}
        />
      </Transition>
      <LoaderWrapper>
        <div className="relative h-full w-full flex flex-col md:flex-row items-center">
          {/* Left side with text content */}
          <div className="flex items-center justify-center flex-col h-full md:w-1/2 md:items-start md:justify-center md:pl-16 lg:pl-24">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.5
              }}
              className="mb-6 md:self-start md:ml-72"
            >
              <motion.img
                src={about.avatar.url}
                alt={about.name}
                className="rounded-full size-28 object-cover border-4 border-white/20"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.4)' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="flex flex-col items-center md:items-start mb-6">
              <h2 className="md:text-7xl text-4xl font-bold overflow-hidden text-center md:text-left">
                <SlideIn>Hello! I&apos;m {about.name}</SlideIn>
              </h2>
              <h1 className="md:text-7xl text-3xl overflow-hidden bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent text-center md:text-left">
                <SlideIn>{about.title}</SlideIn>
              </h1>
            </div>
            <Transition viewport={{ once: true }} className="w-full">
              <p className="opacity-70 md:text-xl py-4 w-10/12 md:w-4/5 text-center md:text-left">
                {about.subTitle.split(" ").map((word, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.03, duration: 0.5 }}
                    className="relative mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </Transition>
            <Transition viewport={{ once: true }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-4"
              >
                <Link
                  href={"#contact"}
                  className="px-5 py-3 rounded-full border border-white/50 flex items-center gap-2 group bg-white/5 hover:bg-white/10 transition-colors duration-300"
                >
                  <TextReveal>Let&apos;s talk</TextReveal>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight />
                  </motion.div>
                </Link>
              </motion.div>
            </Transition>
          </div>
          
          {/* Right side with Spline 3D Robot */}
          <div className="hidden md:flex items-center justify-center h-full md:w-1/2 relative">
            <motion.div 
              className="w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* The overflow-hidden container to hide the watermark */}
              <div className="w-full h-full overflow-hidden relative">
                {/* Position iframe to hide the bottom watermark */}
                <div className="absolute inset-0" style={{ height: 'calc(100% + 200px)', transform: 'translateY(-140px)' }}>
                  <iframe 
                    src='https://my.spline.design/robotfollowcursorforlandingpagemc-qYp8ZWk5rP1e4fwp3yXbVGZo/' 
                    frameBorder='0' 
                    width='100%' 
                    height='100%'
                    title="3D Robot"
                    onLoad={() => setIframeLoaded(true)}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
              </div>
              
              {/* Loading placeholder */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Animated down arrow indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white/50 hover:text-white transition-colors duration-300"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </div>
      </LoaderWrapper>
    </section>
  );
};

export default Hero;
