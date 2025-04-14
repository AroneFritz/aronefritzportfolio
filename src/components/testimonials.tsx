"use client";

import { Testimonial as ITestimonial } from "../utils/interface";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import Image from "next/image";
import { useState } from "react";

const Testimonials = ({ testimonials }: { testimonials: ITestimonial[] }) => {
  const filteredTestimonials = testimonials.filter(t => t.enabled);
  
  // If no testimonials, show a message
  if (filteredTestimonials.length === 0) {
    return (
      <section className="py-20 relative" id="testimonials">
        <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
        <SectionHeading className="md:pl-28">
          <SlideIn className="text-white/40">What Our</SlideIn> <br />
          <SlideIn className="">Clients Say</SlideIn>
        </SectionHeading>
        <div className="text-center mt-8 text-white/70">
          No testimonials yet. Be the first to share your experience!
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative" id="testimonials">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <SectionHeading className="md:pl-28">
        <SlideIn className="text-white/40">What Our</SlideIn> <br />
        <SlideIn className="">Clients Say</SlideIn>
      </SectionHeading>
      <Testimonial testimonials={filteredTestimonials} speed="slow" pauseOnHover />
    </section>
  );
};

export default Testimonials;

interface TestimonialProps {
  testimonials: ITestimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const TestimonialImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
      <Image
        src={imageError ? "/profile-icon.png" : src}
        width={80}
        height={80}
        alt={alt}
        className="object-cover w-full h-full"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

const Testimonial = ({
  testimonials,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
}: TestimonialProps) => {
  return (
    <Transition viewport={{ once: true }}>
      <InfiniteScroll
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        className="pb-4"
      >
        {testimonials.map((val) => (
          <li
            key={val._id}
            className="md:p-8 p-6 bg-secondary/80 md:w-[450px] w-[320px] rounded-2xl space-y-4 relative overflow-hidden z-0 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all shadow-lg hover:shadow-primary/5"
          >
            <div className="relative">
              <span className="text-9xl absolute -top-9 -left-3 size-10 text-primary/30">
                &quot;
              </span>
              <p className="md:line-clamp-5 line-clamp-4 opacity-90 md:text-lg leading-relaxed pl-4">
                {val.review}
              </p>
              <span className="text-9xl absolute -bottom-24 -right-3 size-10 rotate-180 text-primary/30">
                &quot;
              </span>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-6">
              <TestimonialImage src={val.image.url} alt={val.name} />
              <div>
                <h4 className="font-semibold text-lg text-white">{val.name}</h4>
                <h5 className="text-sm text-white/60">
                  {val.position}
                </h5>
              </div>
            </div>
            <span className="absolute -bottom-6 -z-10 -right-0 opacity-30">
              <svg
                width="80"
                height="176"
                viewBox="0 0 80 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80 0.311005L80 75.7528L66.8466 87.9639L79.9853 100.869L79.9853 176H57.5783L57.5783 123.751L22.9432 157.376L6.80805 142.143L50.6601 99.1772L0 99.1772L0 77.0325L49.6613 77.0325L6.90351 34.3051L22.7082 18.7178L56.9467 52.1552L56.9467 0H80"
                  fill="#34363C"
                />
              </svg>
            </span>
          </li>
        ))}
      </InfiniteScroll>
    </Transition>
  );
};
