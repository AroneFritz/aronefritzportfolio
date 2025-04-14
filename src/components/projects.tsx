"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { SectionHeading, TextReveal } from "./ui/Typography";
import { Project } from "../utils/interface";
import ProjectDialog from "./ProjectDialog";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "./ui/Icons";
import Filters from "./filters";
import { useVariants } from "../utils/hooks";
import { SlideIn, Transition } from "./ui/Transitions";

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects.filter(project => project.enabled === true));
  const [filterValue, setFilterValue] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const numProjectToShow = 6;

  useEffect(() => {
    const applyFilters = (data: Project[], filterValues: string) => {
      // First filter only enabled projects
      const enabledProjects = data.filter(project => project.enabled === true);
      
      if (!filterValues || filterValues === "all") {
        return enabledProjects;
      }

      return enabledProjects.filter((project) =>
        project.techStack.some((tech) => filterValues === tech.trim())
      );
    };

    const filtered = applyFilters(projects, filterValue);
    setFilteredProjects(filtered);
  }, [filterValue, projects]);

  return (
    <section className="md:p-8 p-4 mt-10 relative" id="projects">
      <SectionHeading className="md:pl-12">
        <SlideIn className="text-white/40">Selected</SlideIn>
        <br />
        <SlideIn>works</SlideIn>
      </SectionHeading>
      <Filters
        projects={projects.filter(project => project.enabled === true)}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      <motion.div className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3 relative">
        {filteredProjects
          .slice(0, showMore ? filteredProjects.length : numProjectToShow)
          .map((project, index) => (
            <Transition
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              key={project._id}
              layoutId={project._id}
              onClick={() => {
                setSelectedProject(project);
              }}
            >
              <Card {...project} />
            </Transition>
          ))}
        <AnimatePresence>
          {selectedProject && (
            <div className="rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col">
              <ProjectDialog
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="grid place-items-center py-8">
        {filteredProjects.length > numProjectToShow && (
          <button
            className="flex items-center justify-center gap-4 py-3 px-6 rounded-full border mt-6 group relative overflow-hidden"
            onClick={() => setShowMore(!showMore)}
          >
            <TextReveal>{showMore ? "Show less" : "Show more"}</TextReveal>
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;

const Card = ({ title, image, images, description }: Project) => {
  const [hover, setHover] = useState(false);
  const { setVariant } = useVariants();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = images && images.length > 1;

  const mouseEnter = () => {
    setHover(true);
    setVariant("PROJECT");
  };
  const mouseLeave = () => {
    setHover(false);
    setVariant("DEFAULT");
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Get the current image URL
  const currentImageUrl = hasMultipleImages 
    ? images[currentImageIndex].url 
    : image.url;

  return (
    <motion.div
      layout
      className="relative rounded-xl md:rounded-3xl overflow-hidden aspect-square bg-secondary/30 md:px-4 cursor-pointer transition-all duration-300 group"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" 
      }}
    >
      <div className="absolute top-2 right-2 w-full h-full flex justify-end md:hidden z-10">
        <div className="bg-white size-8 rounded-full text-black grid place-items-center">
          <ArrowUpRight />
        </div>
      </div>
      <div className="md:py-8 relative z-10">
        <motion.div
          animate={{ y: hover ? -10 : 0 }}
          className="flex justify-between items-center max-md:hidden"
        >
          <p className="text-sm md:text-xl font-semibold max-md:opacity-0">
            {title}
          </p>
          <button className="flex gap-2 items-center justify-center max-md:px-4 transition-all duration-300 group-hover:bg-white/10 rounded-full group-hover:px-3 group-hover:py-1">
            <TextReveal className="max-md:text-sm">Visit</TextReveal>
            <motion.span 
              className="bg-black text-white/80 rounded-full p-1"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight />
            </motion.span>
          </button>
        </motion.div>
        <div className="overflow-hidden max-md:hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: hover ? 0 : 20, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-white/80 text-sm line-clamp-3 bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm px-3 py-2 rounded-lg mt-2"
          >
            {description}
          </motion.p>
        </div>
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      
      {/* Image */}
      <motion.img
        src={currentImageUrl}
        width={500}
        height={500}
        alt={title}
        className="object-cover h-full w-full object-center rounded-xl md:rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
        whileHover={{ scale: 1.05 }}
      />
      
      {/* Image navigation arrows - show only if project has multiple images */}
      {hasMultipleImages && (
        <>
          <div 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </div>
          <div 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          
          {/* Image indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <motion.div 
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
