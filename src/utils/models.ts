import mongoose, { Document, Model } from 'mongoose';

// Check if the models are already defined to prevent OverwriteModelError
// when the API routes are called multiple times in development

// Define interface for Testimonial document
interface ITestimonial extends Document {
  name: string;
  position: string;
  review: string;
  image: {
    public_id: string;
    url: string;
  };
  enabled: boolean;
  createdAt: Date;
}

// Define the testimonial schema
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required']
  },
  review: {
    type: String,
    required: [true, 'Review is required']
  },
  image: {
    public_id: String,
    url: String
  },
  enabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Initialize the models with proper typing
export const Testimonial: Model<ITestimonial> = 
  mongoose.models.Testimonial || 
  mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

// Helper function to connect to MongoDB
export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  return mongoose.connect(uri);
} 