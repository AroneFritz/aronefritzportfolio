"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { SlideIn, Transition } from "./ui/Transitions";
import { Input, Textarea } from "./ui/Input";
import { SectionHeading, TextReveal } from "./ui/Typography";
import { cn } from "../utils/cn";
import Link from "next/link";
import Image from "next/image";

const TestimonialForm = () => {
  const [status, setStatus] = useState<"SENDING" | "DONE" | "ERROR" | "IDLE">(
    "IDLE"
  );
  const [statusText, setStatusText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    review: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("review", formData.review);
      
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch('/api/submit-testimonial', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit testimonial');
      }

      setStatus("DONE");
      setFormData({
        name: "",
        position: "",
        review: "",
      });
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatusText("Thank you for your testimonial! It will be reviewed before being published.");
    } catch (error: any) {
      setStatus("ERROR");
      setStatusText("Error submitting testimonial: " + error.message);
      console.error("Error submitting testimonial:", error.message);
    }
  };

  useEffect(() => {
    if (status === "DONE" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <motion.section className="relative py-16" id="add-testimonial">
      <AnimatePresence initial={false}>
        {status !== "IDLE" && (
          <motion.li
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              "fixed top-4 right-4 p-2 px-4 w-[300px] z-50 h-auto min-h-16 rounded-xl bg-white flex items-center",
              status === "ERROR"
                ? "bg-red-500"
                : status === "DONE"
                ? "bg-green-400"
                : ""
            )}
          >
            <p className="text-black font-semibold">{statusText}</p>
          </motion.li>
        )}
      </AnimatePresence>
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <SectionHeading className="text-center mb-10">
          <SlideIn className="text-white/40">Share Your</SlideIn> <br />
          <SlideIn className="">Experience</SlideIn>
        </SectionHeading>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <Transition className="w-full">
              <div className="relative group">
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="border-0 border-b border-white/30 rounded-none pb-2 pl-0 focus:border-primary transition-colors duration-300 bg-transparent"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: formData.name ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Transition>
            <Transition className="w-full">
              <div className="relative group">
                <Input
                  id="position"
                  name="position"
                  placeholder="Your Position/Role"
                  className="border-0 border-b border-white/30 rounded-none pb-2 pl-0 focus:border-primary transition-colors duration-300 bg-transparent"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: formData.position ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Transition>
          </div>
          
          {/* Image Upload */}
          <Transition>
            <div className="flex flex-col items-center space-y-4">
              {imagePreview ? (
                <div className="relative group">
                  <Image 
                    src={imagePreview} 
                    alt="Profile preview" 
                    width={100} 
                    height={100} 
                    className="rounded-full object-cover border-2 border-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div 
                  className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="text-white/50 text-2xl">+</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="text-white/50 text-sm">
                {imagePreview ? "Change profile picture" : "Add profile picture"}
              </p>
            </div>
          </Transition>

          <div className="space-y-2">
            <Transition>
              <div className="relative group">
                <Textarea
                  className="min-h-[150px] rounded-none border-0 border-b border-white/30 resize-none pb-2 pl-0 focus:border-primary transition-colors duration-300 bg-transparent"
                  id="review"
                  name="review"
                  placeholder="Share your experience working with me"
                  required
                  value={formData.review}
                  onChange={handleInputChange}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: formData.review ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Transition>
          </div>
          <div className="flex justify-center">
            <Transition>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0.9 }}
                animate={{ 
                  opacity: status === "SENDING" ? 0.7 : 1,
                  y: [0, status === "SENDING" ? -2 : 0, 0],
                  transition: {
                    y: { repeat: status === "SENDING" ? Infinity : 0, duration: 0.3 }
                  }
                }}
                className="border-2 border-primary text-white px-8 py-3 rounded-full relative overflow-hidden bg-primary/10 hover:bg-primary/20 transition-colors duration-300 shadow-lg hover:shadow-primary/20"
                type="submit"
                disabled={status === "SENDING"}
              >
                <TextReveal className="uppercase font-medium">
                  {status === "SENDING" ? "Submitting..." : "Submit Testimonial"}
                </TextReveal>
              </motion.button>
            </Transition>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default TestimonialForm; 