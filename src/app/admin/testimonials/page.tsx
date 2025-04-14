"use client";

import { useEffect, useState } from "react";
import { Testimonial } from "@/utils/interface";
import Link from "next/link";
import Image from "next/image";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Testimonial Management</h1>
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/admin/logout', {
                  method: 'POST',
                });
                if (response.ok) {
                  window.location.href = '/admin/login';
                }
              } catch (error) {
                console.error('Error logging out:', error);
              }
            }}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
        <Link href="/" className="text-primary hover:underline mt-2 inline-block">
          Back to Home
        </Link>
      </header>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === "error" ? "bg-red-500/20" : "bg-green-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-white/60">No testimonials found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className={`bg-secondary p-6 rounded-lg shadow-md ${
                !testimonial.enabled ? "border-l-4 border-yellow-500" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image.url}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-white/60">{testimonial.position}</p>
                </div>
              </div>
              <p className="mb-6 text-white/80">{testimonial.review}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    testimonial.enabled
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {testimonial.enabled ? "Approved" : "Pending"}
                </span>
                <div className="space-x-2">
                  {!testimonial.enabled && (
                    <button
                      onClick={() => handleApprove(testimonial._id)}
                      className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-md text-sm transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 