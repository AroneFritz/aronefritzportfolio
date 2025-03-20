"use client";

import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "../utils/cn";
import { Project } from "../utils/interface";
import { Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";

interface FilterProps {
  projects: Project[];
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

const Filters = ({ projects, filterValue, setFilterValue }: FilterProps) => {
  const techStack = projects.flatMap((filter) =>
    filter.techStack.map((val) => val.trim())
  );
  const filters = Array.from(new Set(techStack));
  
  // Create an array with filters repeated 3 times for continuity
  const repeatedFilters = [...filters, ...filters, ...filters];

  return (
    <div className="py-8 overflow-hidden relative">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10"></div>
      
      <div className="flex items-center overflow-hidden px-4 py-2">
        <div className="flex animate-scroll gap-4">
          {/* First "All" button */}
          <Transition viewport={{ once: true }}>
            <button
              className={cn(
                "border border-white/30 px-6 py-2 rounded-full relative whitespace-nowrap",
                filterValue === "all" && "text-black border-transparent"
              )}
              onClick={() => setFilterValue("all")}
            >
              {filterValue === "all" && (
                <motion.span
                  transition={{ type: "spring", bounce: 0.3 }}
                  exit={{ type: "spring" }}
                  layoutId="active-filter"
                  className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
                />
              )}
              <TextReveal>All</TextReveal>
            </button>
          </Transition>
          
          {/* Repeated filters for continuous scrolling */}
          {repeatedFilters.map((filter, index) => (
            <Transition
              key={`filter-${index}`}
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setFilterValue(filter)}
                animate={{ color: filterValue === filter ? "black" : "" }}
                transition={{ delay: 0.4 }}
                className="relative border border-white/20 px-3 py-2 rounded-full whitespace-nowrap"
              >
                {filterValue === filter && (
                  <motion.span
                    transition={{ type: "spring", bounce: 0.3 }}
                    exit={{ type: "spring" }}
                    layoutId="active-filter"
                    className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
                  />
                )}
                <TextReveal>{filter}</TextReveal>
              </motion.button>
            </Transition>
          ))}
          
          {/* Second "All" button for continuity */}
          <Transition viewport={{ once: true }}>
            <button
              className={cn(
                "border border-white/30 px-6 py-2 rounded-full relative whitespace-nowrap",
                filterValue === "all" && "text-black border-transparent"
              )}
              onClick={() => setFilterValue("all")}
            >
              {filterValue === "all" && (
                <motion.span
                  transition={{ type: "spring", bounce: 0.3 }}
                  exit={{ type: "spring" }}
                  layoutId="active-filter"
                  className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
                />
              )}
              <TextReveal>All</TextReveal>
            </button>
          </Transition>
        </div>
      </div>
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10"></div>
    </div>
  );
};

export default Filters;
