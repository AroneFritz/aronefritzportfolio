import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase, Testimonial } from '@/utils/models';
import { uploadImage } from '@/utils/cloudinary';

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
    let publicId = "default/profile-icon";
    
    // If an image was uploaded, process it with Cloudinary
    if (imageFile) {
      try {
        // Convert the file to ArrayBuffer
        const bytes = await imageFile.arrayBuffer();
        
        // Generate a unique ID for the image
        const imageId = uuidv4();
        
        // Upload to Cloudinary
        const result = await uploadImage(bytes, {
          folder: 'testimonials',
          public_id: imageId
        });
        
        // Update image info with Cloudinary URLs
        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (error) {
        console.error('Error uploading image:', error);
        // Continue with default image if upload fails
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
