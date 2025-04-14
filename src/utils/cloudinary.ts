import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param file Image file buffer
 * @param folder Folder name in Cloudinary
 * @returns Cloudinary upload result
 */
export async function uploadImage(file: ArrayBuffer, options: { folder?: string; public_id?: string } = {}) {
  // Convert ArrayBuffer to base64
  const base64 = Buffer.from(file).toString('base64');
  const dataURI = `data:image/jpeg;base64,${base64}`;
  
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: options.folder || 'testimonials',
      public_id: options.public_id,
      overwrite: true,
    });
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

export default cloudinary; 
