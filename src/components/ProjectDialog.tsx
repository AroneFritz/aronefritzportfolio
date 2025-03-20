"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";

import { Project } from "../utils/interface";
import { ExternalLink, Github, XMark } from "./ui/Icons";

interface DialogProps {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
}

const ProjectDialog = ({
  selectedProject,
  setSelectedProject,
}: DialogProps) => {
  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <motion.div
      layoutId={selectedProject._id}
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-black/90 w-11/12 md:w-1/2 h-4/5 md:h-[90%] overflow-hidden rounded-xl border border-white/10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative">
          <motion.button
            className="absolute top-4 right-4 bg-black/80 size-10 rounded-full border border-white/40 grid place-items-center text-white z-50 hover:bg-white hover:text-black transition-colors duration-300"
            onClick={handleClose}
            type="button"
            aria-label="Close dialog"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <XMark />
          </motion.button>
          <motion.img
            src={selectedProject.image.url}
            width={300}
            height={300}
            alt={selectedProject.title}
            className="w-full h-full aspect-video md:aspect-[12/6] object-cover object-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h5 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {selectedProject.title}
              </h5>
              <div className="flex items-center gap-4">
                <Link href={selectedProject.githuburl} target="_blank">
                  <motion.div
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github />
                  </motion.div>
                </Link>
                <Link href={selectedProject.liveurl} target="_blank">
                  <motion.div
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink />
                  </motion.div>
                </Link>
              </div>
            </div>
            <div className="py-4 flex flex-wrap items-center gap-2">
              {selectedProject.techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 border border-white/20 rounded-full text-sm bg-white/5 hover:bg-white/10 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <motion.p 
              className="text-white/70 md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {selectedProject.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDialog;
