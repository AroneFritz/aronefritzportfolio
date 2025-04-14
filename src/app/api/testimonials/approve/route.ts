import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, Testimonial } from '@/utils/models';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    // Find and update the testimonial in MongoDB
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { enabled: true },
      { new: true } // Return the updated document
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Testimonial approved successfully',
        testimonial: updatedTestimonial
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to approve testimonial' },
      { status: 500 }
    );
  }
} 