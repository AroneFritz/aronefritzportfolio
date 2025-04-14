import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase, Testimonial } from '@/utils/models';

// Dynamic import to prevent build errors
let uploadImage: any = null;
try {
  // We use a dynamic import to prevent build-time errors
  import('@/utils/cloudinary').then(module => {
    uploadImage = module.uploadImage;
  }).catch(err => {
    console.error('Error importing cloudinary module:', err);
  });
} catch (error) {
  console.warn('Error setting up cloudinary import:', error);
}

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
    
    // Set default profile icon path
    let imageUrl = "/profile-icon.png";
    let publicId = `default_${uuidv4()}`;
    
    // If an image was uploaded and uploadImage is available, try to process it
    if (imageFile && uploadImage) {
      try {
        // Convert the file to ArrayBuffer
        const bytes = await imageFile.arrayBuffer();
        
        // Try to upload to Cloudinary
        const result = await uploadImage(bytes, {
          folder: 'testimonials',
          public_id: uuidv4()
        });
        
        if (result && result.secure_url) {
          imageUrl = result.secure_url;
          publicId = result.public_id || publicId;
        }
      } catch (error) {
        console.error('Error processing image:', error);
        // Continue with default image
      }
    }

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
