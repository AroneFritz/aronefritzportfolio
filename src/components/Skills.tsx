"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Skill } from "../utils/interface";
import { ParallaxText } from "./ui/ParallaxText";

interface SkillsProps {
  skills: Skill[];
}

// Define primary skills to highlight
const primarySkills = ["PHP", "Laravel", "React.js", "Next.js", "JavaScript", "TypeScript", "Node.js", "MongoDB", "MySQL", "Docker", "AWS", "Git", "GitHub", "Redux", "Three.js", "Figma", "Sass"];

// Define skill colors for visual variety
const skillColors = {
  "PHP": "from-purple-500 to-blue-600",
  "Laravel": "from-red-500 to-pink-600",
  "React.js": "from-cyan-400 to-blue-500",
  "Next.js": "from-neutral-200 to-zinc-400",
  "JavaScript": "from-yellow-400 to-amber-500",
  "TypeScript": "from-blue-400 to-indigo-500",
  "Node.js": "from-green-500 to-emerald-600",
  "MongoDB": "from-green-600 to-lime-500",
  "MySQL": "from-blue-600 to-cyan-500",
  "Docker": "from-blue-500 to-blue-700",
  "AWS": "from-orange-500 to-amber-600",
  "Git": "from-red-600 to-orange-500",
  "GitHub": "from-zinc-400 to-slate-600",
  "Redux": "from-purple-600 to-indigo-500",
  "Three.js": "from-blue-300 to-cyan-500",
  "Figma": "from-purple-400 to-pink-500",
  "Sass": "from-pink-500 to-rose-600",
  "GraphQL": "from-pink-600 to-rose-400",
  "REST API": "from-sky-500 to-blue-600",
  "C++": "from-blue-700 to-indigo-600",
  "Python": "from-blue-500 to-green-500"
};

function Skills({ skills }: SkillsProps) {
  // Function to normalize skill names for comparison (case-insensitive, trim spaces)
  const normalizeSkillName = (name: string): string => {
    return (name || "").toLowerCase().trim();
  };
  
  // Function to determine if a skill is primary with improved matching
  const isPrimary = (skillName: string) => {
    if (!skillName) return false;
    const normalizedName = normalizeSkillName(skillName);
    return primarySkills.some(primary => 
      normalizeSkillName(primary) === normalizedName || 
      normalizedName.includes(normalizeSkillName(primary)) ||
      normalizeSkillName(primary).includes(normalizedName)
    );
  };
  
  // Function to add special emphasis to PHP and Laravel
  const isPHPOrLaravel = (skillName: string) => {
    if (!skillName) return false;
    const normalizedName = normalizeSkillName(skillName);
    return normalizedName === "php" || normalizedName === "laravel";
  };
  
  // Get color gradient for a skill with improved matching
  const getSkillColor = (skillName: string) => {
    if (!skillName) return "from-white/70 to-white/90";
    
    // Try exact match first
    if (skillColors[skillName]) {
      return skillColors[skillName];
    }
    
    // Try case-insensitive match
    const normalizedName = normalizeSkillName(skillName);
    const skillColorKey = Object.keys(skillColors).find(key => 
      normalizeSkillName(key) === normalizedName ||
      normalizedName.includes(normalizeSkillName(key)) ||
      normalizeSkillName(key).includes(normalizedName)
    );
    
    return skillColorKey ? skillColors[skillColorKey] : "from-white/70 to-white/90";
  };
  
  // Ensure skills is an array to prevent errors
  const safeSkills = Array.isArray(skills) ? skills : [];
  
  return (
    <section id="skills" className="py-10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[100px] -z-10" />
      <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] -z-10" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-purple-500/10 blur-[150px] -z-10" />
      
      <motion.div 
        className="w-full mx-auto text-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Specialized in full-stack web development with expertise in PHP, Laravel, and modern JavaScript frameworks
        </p>
      </motion.div>
      
      {/* Fixed highlight for PHP and Laravel */}
      <div className="flex justify-center gap-6 mb-10">
        {["PHP", "Laravel"].map((skillName, idx) => (
          <motion.div
            key={skillName}
            className="relative"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10,
              delay: idx * 0.2
            }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className={`md:text-8xl text-4xl font-extrabold uppercase tracking-tighter px-2 
                bg-gradient-to-br ${getSkillColor(skillName)} bg-clip-text text-transparent
                drop-shadow-[0_2px_8px_rgba(var(--primary),0.5)]`}
            >
              {skillName}
            </motion.span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0"
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                x: [100, 0, -100],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                delay: skillName === "PHP" ? 0 : 1
              }}
            />
          </motion.div>
        ))}
      </div>
      
      <ParallaxText baseVelocity={-4}>
        {safeSkills
          .filter(skill => skill?.enabled && skill?.name && skill.name !== "PHP" && skill.name !== "Laravel")
          .map((skill) => (
            <motion.span
              key={skill._id || Math.random()}
              className={`md:text-7xl text-xl font-semibold uppercase tracking-tighter px-3 mx-1
                ${isPrimary(skill.name)
                  ? `bg-gradient-to-r ${getSkillColor(skill.name)} bg-clip-text text-transparent font-bold drop-shadow-sm`
                  : `text-white/50 hover:text-white/80 transition-colors duration-300`
                }`}
              whileHover={{ 
                scale: isPrimary(skill.name) ? 1.08 : 1.05,
                filter: isPrimary(skill.name) ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))" : "brightness(1.1)",
                transition: { duration: 0.2 } 
              }}
            >
              {skill.name}
              <span className="text-white/30 mx-2">•</span>
            </motion.span>
          ))}
      </ParallaxText>
      <ParallaxText baseVelocity={4}>
        {safeSkills
          .filter(skill => skill?.enabled && skill?.name && skill.name !== "PHP" && skill.name !== "Laravel")
          .map((skill) => (
            <motion.span
              key={skill._id || Math.random()}
              className={`md:text-7xl text-xl font-semibold uppercase tracking-tighter px-3 mx-1
                ${isPrimary(skill.name)
                  ? `bg-gradient-to-r ${getSkillColor(skill.name)} bg-clip-text text-transparent font-bold drop-shadow-sm`
                  : `text-white/50 hover:text-white/80 transition-colors duration-300`
                }`}
              whileHover={{ 
                scale: isPrimary(skill.name) ? 1.08 : 1.05,
                filter: isPrimary(skill.name) ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))" : "brightness(1.1)",
                transition: { duration: 0.2 } 
              }}
            >
              {skill.name}
              <span className="text-white/30 mx-2">•</span>
            </motion.span>
          ))}
      </ParallaxText>
      <ParallaxText baseVelocity={-5}>
        {safeSkills
          .filter(skill => skill?.enabled && skill?.name && skill.name !== "PHP" && skill.name !== "Laravel")
          .map((skill) => (
            <motion.span
              key={skill._id || Math.random()}
              className={`md:text-7xl text-xl font-semibold uppercase tracking-tighter px-3 mx-1
                ${isPrimary(skill.name)
                  ? `bg-gradient-to-r ${getSkillColor(skill.name)} bg-clip-text text-transparent font-bold drop-shadow-sm`
                  : `text-white/50 hover:text-white/80 transition-colors duration-300`
                }`}
              whileHover={{ 
                scale: isPrimary(skill.name) ? 1.08 : 1.05,
                filter: isPrimary(skill.name) ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))" : "brightness(1.1)",
                transition: { duration: 0.2 } 
              }}
            >
              {skill.name}
              <span className="text-white/30 mx-2">•</span>
            </motion.span>
          ))}
      </ParallaxText>
    </section>
  );
}

export default Skills;
