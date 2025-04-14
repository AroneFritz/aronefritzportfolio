import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, Testimonial } from '@/utils/models';

export async function DELETE(req: NextRequest) {
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

    // Find and delete the testimonial from MongoDB
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Testimonial deleted successfully',
        testimonial: deletedTestimonial
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
} 