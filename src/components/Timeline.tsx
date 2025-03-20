"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Timeline as ITimeline } from "../utils/interface";
import { SectionHeading } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";

interface ExperienceProps {
  timeline: ITimeline[];
}

const Timeline = ({ timeline }: ExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative pb-20">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <SectionHeading className="pl-4 md:px-12 py-20">
        <SlideIn className="text-white/40">Experience</SlideIn>
        <br />
        <SlideIn>History</SlideIn>
      </SectionHeading>
      
      {/* Timeline vertical bar */}
      <div className="absolute left-[20px] md:left-[120px] top-[250px] bottom-10 w-[2px] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"></div>
      
      <div>
        {experience.map((exp, index) => (
          <Transition
            key={exp._id}
            className="py-4 md:py-8 border-b border-white/10 hover:bg-white/5 px-2 md:px-12 relative group"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {/* Timeline dot indicator */}
            <motion.div 
              className="absolute left-[20px] md:left-[120px] w-4 h-4 bg-primary rounded-full -ml-[7px] mt-6"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="absolute inset-0 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
            
            <div className="flex items-center justify-between md:gap-8 pl-8 md:pl-16">
              <span className="max-md:hidden text-white/40">0{index + 1}</span>
              <div className="md:text-5xl text-xl md:font-semibold flex-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-white transition-all duration-300">
                {exp.jobTitle}
              </div>
            </div>
            <div className="md:pl-20 pl-8 py-2 text-foreground/50 max-md:text-sm flex items-center justify-between">
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
              >
                {exp.company_name}
              </motion.span>
              <motion.span 
                className="italic text-sm"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
              >
                {exp.jobLocation}
              </motion.span>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: hover === index ? "auto" : 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden md:pl-20 pl-8"
            >
              <motion.p 
                className="text-foreground/60 py-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: hover === index ? 0 : 10, opacity: hover === index ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {exp.summary}
              </motion.p>
              <motion.ul className="list-disc list-inside space-y-1">
                {exp.bulletPoints.map((point, idx) => (
                  <motion.li 
                    key={idx} 
                    className="text-foreground/80 max-md:text-sm"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: hover === index ? 0 : -10, opacity: hover === index ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
