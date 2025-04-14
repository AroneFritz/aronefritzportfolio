"use client";

import { useEffect, useState } from "react";
import { Testimonial } from "@/utils/interface";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, Home, Search, Filter, ArrowUpDown } from "lucide-react";

const TestimonialCard = ({ testimonial, onApprove, onDelete }: { 
  testimonial: Testimonial; 
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`bg-secondary/50 p-6 rounded-xl border ${
        testimonial.enabled 
          ? "border-white/5" 
          : "border-l-4 border-l-yellow-500 border-t border-r border-b border-white/5"
      } transition-all hover:bg-secondary/70`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={imageError ? "/profile-icon.png" : testimonial.image.url}
            alt={testimonial.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
          <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-secondary rounded-full ${
            testimonial.enabled ? "bg-green-500" : "bg-yellow-500"
          }`} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-sm text-white/60">{testimonial.position}</p>
        </div>
      </div>
      <p className="mb-6 text-white/80 line-clamp-3">{testimonial.review}</p>
      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          testimonial.enabled
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
        }`}>
          {testimonial.enabled ? "Approved" : "Pending"}
        </span>
        <div className="space-x-2">
          {!testimonial.enabled && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onApprove(testimonial._id)}
              className="px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors border border-primary/20"
            >
              Approve
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(testimonial._id)}
            className="px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors border border-red-500/20"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "pending" | "approved">("newest");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setMessage({ text: "Failed to load testimonials", type: "error" });
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("/api/testimonials/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve testimonial");
      }

      setTestimonials(prevTestimonials =>
        prevTestimonials.map(testimonial =>
          testimonial._id === id ? { ...testimonial, enabled: true } : testimonial
        )
      );

      setMessage({ text: "Testimonial approved successfully", type: "success" });
    } catch (error) {
      console.error("Error approving testimonial:", error);
      setMessage({ text: "Failed to approve testimonial", type: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/testimonials/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      setTestimonials(prevTestimonials =>
        prevTestimonials.filter(testimonial => testimonial._id !== id)
      );

      setMessage({ text: "Testimonial deleted successfully", type: "success" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setMessage({ text: "Failed to delete testimonial", type: "error" });
    }
  };

  // Filter and sort testimonials based on user selections
  const filteredAndSortedTestimonials = [...testimonials]
    .filter(testimonial => {
      if (filterStatus === "pending" && testimonial.enabled) return false;
      if (filterStatus === "approved" && !testimonial.enabled) return false;
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          testimonial.name.toLowerCase().includes(searchLower) ||
          testimonial.position.toLowerCase().includes(searchLower) ||
          testimonial.review.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "pending") return a.enabled === b.enabled ? 0 : a.enabled ? 1 : -1;
      if (sortBy === "approved") return a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1;
      const aIndex = testimonials.findIndex(t => t._id === a._id);
      const bIndex = testimonials.findIndex(t => t._id === b._id);
      return sortBy === "newest" ? aIndex - bIndex : bIndex - aIndex;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Testimonial Management
              </h1>
              <Link 
                href="/" 
                className="mt-2 inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  const response = await fetch('/api/admin/logout', { method: 'POST' });
                  if (response.ok) window.location.href = '/admin/login';
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
              className="px-6 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2 border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-secondary/50 p-4 rounded-xl border border-white/5"
            >
              <p className="text-white/60 text-sm">Total Testimonials</p>
              <p className="text-2xl font-bold">{testimonials.length}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/50 p-4 rounded-xl border border-white/5"
            >
              <p className="text-yellow-500/60 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-500">
                {testimonials.filter(t => !t.enabled).length}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/50 p-4 rounded-xl border border-white/5"
            >
              <p className="text-green-500/60 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-500">
                {testimonials.filter(t => t.enabled).length}
              </p>
            </motion.div>
          </div>
        </header>

        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 mb-6 rounded-xl border ${
                message.type === "error" 
                  ? "bg-red-500/10 border-red-500/20 text-red-400" 
                  : "bg-green-500/10 border-green-500/20 text-green-400"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter and Sort Controls */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 bg-secondary/30 p-4 rounded-xl border border-white/5">
          <div className="md:w-1/2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/80 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-4 md:w-1/2">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "approved")}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/80 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Only</option>
                <option value="approved">Approved Only</option>
              </select>
            </div>
            <div className="relative flex-1">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "pending" | "approved")}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/80 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="pending">Pending First</option>
                <option value="approved">Approved First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="relative">
              <div className="w-12 h-12 border-t-2 border-primary border-r-2 rounded-full animate-spin"></div>
              <div className="w-12 h-12 border-b-2 border-primary/30 border-l-2 rounded-full absolute top-0"></div>
            </div>
          </div>
        ) : filteredAndSortedTestimonials.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-secondary/20 rounded-xl border border-white/5"
          >
            <p className="text-xl text-white/60">
              {searchTerm || filterStatus !== "all" 
                ? "No testimonials match your filters" 
                : "No testimonials found"}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  onApprove={handleApprove}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
} 