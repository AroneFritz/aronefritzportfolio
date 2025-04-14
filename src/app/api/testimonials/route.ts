import { NextResponse } from 'next/server';
import { connectToDatabase, Testimonial } from '@/utils/models';

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Fetch testimonials from MongoDB - add empty filter object {}
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { testimonials },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}