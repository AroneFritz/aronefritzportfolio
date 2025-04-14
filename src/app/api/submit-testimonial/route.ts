import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase, Testimonial } from '@/utils/models';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const review = formData.get('review') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name || !position || !review) {
      return NextResponse.json(
        { error: 'Name, position, and review are required' },
        { status: 400 }
      );
    }
    
    // Use default profile icon for all testimonials for now
    const imageUrl = "/profile-icon.png";
    const publicId = `default_${uuidv4()}`;
    
    // Create a new testimonial in the database
    const newTestimonial = await Testimonial.create({
      name,
      position,
      review,
      image: {
        public_id: publicId,
        url: imageUrl
      },
      enabled: false // Disabled by default until approved
    });

    return NextResponse.json(
      { message: 'Testimonial submitted successfully', testimonial: newTestimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
