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
              className="absolute left-[20px] md:left-[120px] w-4 h-4 bg-primary rounded-full -ml-[7px] mt-10"
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
            
            <div className="pl-12 md:pl-24">
              <div className="md:text-6xl text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-white transition-all duration-300">
                {exp.jobTitle}
              </div>
              <div className="text-white/60 text-lg mt-2">
                {exp.company_name}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: hover === index ? "auto" : 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mt-3"
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
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
