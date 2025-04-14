import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    // Read the current dummy.json file
    const filePath = path.join(process.cwd(), 'src', 'dummy.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    // Find and update the testimonial
    const testimonialIndex = jsonData.testimonials.findIndex(
      (t: any) => t._id === id
    );

    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    // Update the enabled status
    jsonData.testimonials[testimonialIndex].enabled = true;

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

    return NextResponse.json(
      { message: 'Testimonial approved successfully' },
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