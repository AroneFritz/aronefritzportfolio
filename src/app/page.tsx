import About from "@/components/about";
import Contact from "@/components/Contact";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/testimonials";
import TestimonialForm from "@/components/TestimonialForm";
import Timeline from "@/components/Timeline";
import { Portfolio, Testimonial } from "@/utils/interface";
import { connectToDatabase, Testimonial as TestimonialModel } from "@/utils/models";

export default async function Home() {
  const portfolio = (await import("@/dummy.json")).default;

  const {
    about,
    testimonials: dummyTestimonials,
    services,
    skills = [],
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio as Portfolio;

  // Fetch real testimonials from MongoDB
  let dbTestimonials: Testimonial[] = [];
  try {
    await connectToDatabase();
    const dbResults = await TestimonialModel.find({ enabled: true }).lean();
    
    // Convert MongoDB documents to plain objects
    dbTestimonials = dbResults.map(doc => ({
      _id: doc._id.toString(),
      name: doc.name,
      position: doc.position,
      review: doc.review,
      image: doc.image,
      enabled: doc.enabled
    }));
    
    console.log('Fetched testimonials from database:', dbTestimonials.length);
  } catch (error) {
    console.error('Error fetching testimonials from database:', error);
    // Fall back to dummy data if database fetch fails
  }

  // Combine dummy testimonials with real ones from database, prioritizing real ones
  const allTestimonials = [...dbTestimonials, ...dummyTestimonials];
  
  // Ensure skills is an array to prevent errors
  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} timeline={timeline} />
      <Skills skills={safeSkills} />
      <Projects projects={projects} />
      <Services services={services} />
      <Timeline timeline={timeline} />
      <Testimonials testimonials={allTestimonials} />
      <TestimonialForm />
      <Contact email={email} social_handle={social_handles} about={about} />
    </main>
  );
}
