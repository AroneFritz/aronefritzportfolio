import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
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

    // Generate ID for the testimonial
    const testimonialId = uuidv4();
    
    // Set default profile icon path
    let imageUrl = "/profile-icon.png";
    let publicId = "default/profile-icon";
    
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      // Create a unique filename
      const imageId = uuidv4();
      const fileExtension = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${imageId}.${fileExtension}`;
      const filePath = path.join(uploadsDir, fileName);
      
      // Save the file
      await writeFile(filePath, buffer);
      
      // Set the image URL and public ID
      imageUrl = `/uploads/${fileName}`;
      publicId = `portfolio3/${fileName}`;
    }

    // Read the current dummy.json file
    const jsonFilePath = path.join(process.cwd(), 'src', 'dummy.json');
    const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    // Create a new testimonial object
    const newTestimonial = {
      image: {
        public_id: publicId,
        url: imageUrl
      },
      name,
      review,
      position,
      enabled: false, // Disabled by default until approved
      _id: testimonialId // Use the generated ID
    };

    // Add the new testimonial to the array
    jsonData.testimonials.push(newTestimonial);

    // Write the updated data back to the file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

    return NextResponse.json(
      { message: 'Testimonial submitted successfully' },
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