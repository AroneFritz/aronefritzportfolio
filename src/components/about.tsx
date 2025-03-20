"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { About as IAbout, Timeline } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { OpacityTextReveal } from "./ui/Transitions";

interface AboutProps {
  about: IAbout;
  timeline: Timeline[];
}

interface TimelineCardProps {
  timeline: Timeline;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  index: number;
}

const TimelineCard = ({
  timeline,
  activeIndex,
  setActiveIndex,
  index,
}: TimelineCardProps) => {
  // Toggle timeline item
  const handleToggle = () => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  
  const isActive = activeIndex === index;
  
  // Advanced typing animation component
  const TypewriterText = ({ text, delay = 0, speed = 0.01, showCursor = true }: { 
    text: string, 
    delay?: number, 
    speed?: number,
    showCursor?: boolean 
  }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    
    useEffect(() => {
      if (!isActive) {
        setDisplayedText("");
        return;
      }
      
      let currentIndex = 0;
      const textLength = text.length;
      
      // Reset state when animation starts
      setDisplayedText("");
      setIsComplete(false);
      
      // Delay before starting
      const initialTimeout = setTimeout(() => {
        // Type out text character by character
        const typingInterval = setInterval(() => {
          if (currentIndex < textLength) {
            setDisplayedText(text.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsComplete(true);
          }
        }, speed * 1000);
        
        return () => clearInterval(typingInterval);
      }, delay * 1000);
      
      return () => clearTimeout(initialTimeout);
    }, [text, delay, speed]);
    
    // Blinking cursor effect
    useEffect(() => {
      if (!showCursor) return;
      
      const cursorInterval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 530);
      
      return () => clearInterval(cursorInterval);
    }, [showCursor]);
    
    return (
      <>
        <span>{displayedText}</span>
        {showCursor && !isComplete && (
          <motion.span 
            className="inline-block w-[2px] h-[1em] bg-primary ml-[1px] align-middle"
            animate={{ opacity: cursorVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </>
    );
  };
  
  return (
    <motion.section 
      id="about" 
      className="border-b border-primary/20 py-4 hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
      animate={{
        backgroundColor: isActive ? "rgba(var(--primary), 0.03)" : "transparent",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Background highlight when active */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: isActive ? 0.5 : 0,
          x: isActive ? 0 : -100
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div
        className="flex items-center justify-between gap-4 cursor-pointer select-none relative z-10"
        onClick={handleToggle}
      >
        <motion.span 
          className="text-white/60"
          animate={{ 
            scale: isActive ? 1.2 : 1,
            color: isActive ? "rgb(var(--primary))" : "rgb(255 255 255 / 0.6)"
          }}
          transition={{ duration: 0.3 }}
        >
          0{index + 1}
        </motion.span>
        <motion.span 
          className="text-xl md:text-3xl font-bold flex-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          animate={{ 
            scale: isActive ? 1.05 : 1,
            originX: 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {timeline.jobTitle}
        </motion.span>
        <motion.div 
          className="relative size-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            backgroundColor: isActive ? "rgba(var(--primary), 0.2)" : "rgba(255, 255, 255, 0.05)",
            boxShadow: isActive ? "0 0 12px rgba(var(--primary), 0.5)" : "none"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="bg-primary w-4 md:w-5 h-0.5 absolute"
            animate={{ 
              width: isActive ? "60%" : "50%",
            }}
          />
          <motion.span
            initial={{ rotate: 90 }}
            animate={{
              rotate: isActive ? 0 : 90,
              width: isActive ? "60%" : "50%",
            }}
            transition={{ 
              duration: 0.4, 
              type: "spring", 
              stiffness: 300 
            }}
            className="absolute bg-primary w-4 md:w-5 h-0.5"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ 
          height: { 
            duration: 0.5, 
            type: "spring", 
            bounce: 0.2,
            stiffness: 100, 
            damping: 15
          },
          opacity: { duration: 0.3, delay: isActive ? 0.1 : 0 }
        }}
        className="overflow-hidden relative z-10"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="pl-4 pr-2 pt-2"
        >
          <motion.p 
            className="text-foreground/80 py-4 max-md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isActive ? 
              <TypewriterText text={timeline.summary} delay={0.3} speed={0.008} /> 
              : timeline.summary
            }
          </motion.p>
          <motion.div 
            className="flex justify-between items-center pb-3 text-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <div className="max-md:text-sm flex flex-col md:flex-row md:gap-4">
              <motion.span 
                className="font-medium"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {isActive ? 
                  <TypewriterText text={timeline.company_name} delay={0.35} speed={0.01} showCursor={false} /> 
                  : timeline.company_name
                }
              </motion.span>
              <motion.span 
                className="text-foreground/60 italic text-sm"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                {isActive ? 
                  <TypewriterText text={timeline.jobLocation} delay={0.4} speed={0.01} showCursor={false} /> 
                  : timeline.jobLocation
                }
              </motion.span>
            </div>
          </motion.div>
          <ul className="list-disc list-inside space-y-1 pb-2">
            {timeline.bulletPoints.map((point, idx) => (
              <motion.li 
                key={idx} 
                className="text-foreground/80 max-md:text-sm"
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.4 + idx * 0.08,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {isActive ? 
                  <TypewriterText 
                    text={point} 
                    delay={0.5 + idx * 0.2} 
                    speed={0.005} 
                    showCursor={idx === timeline.bulletPoints.length - 1} 
                  /> 
                  : point
                }
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const About = ({ about, timeline }: AboutProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);
  
  return (
    <section
      className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-8 relative"
      id="about"
    >
      <div>
        <h3 className="md:text-5xl text-2xl font-bold overflow-hidden uppercase pb-8">
          <SlideIn>
            <OpacityTextReveal>{about.quote}</OpacityTextReveal>
          </SlideIn>
        </h3>
        <Transition
          viewport={{ once: true }}
          className="md:text-4xl tracking-tighter"
        >
          <OpacityTextReveal>{about.description}</OpacityTextReveal>
        </Transition>
        <div className="pt-10">
          <div className="py-10 overflow-hidden grid w-full">
            {education.map((edu, idx) => (
              <Transition key={edu._id}>
                <TimelineCard
                  index={idx}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  timeline={edu}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="sticky top-6">
          <Transition>
            <Image
              src={about.avatar.url}
              width={400}
              height={400}
              alt={about.name}
              className="rounded-xl max-md:aspect-square object-cover"
            />
          </Transition>
        </div>
      </div>
    </section>
  );
};

export default About;
