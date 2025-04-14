// src/utils/cloudinary.ts
let cloudinary: any = null;

// Try to load cloudinary, but don't fail if it's not available
try {
  cloudinary = require('cloudinary').v2;
  
  // Configure Cloudinary
  if (cloudinary) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
} catch (error) {
  console.warn('Cloudinary module not available:', error);
}

/**
 * Upload an image to Cloudinary (or return a placeholder if Cloudinary is not available)
 */
export async function uploadImage(file: ArrayBuffer, options: { folder?: string; public_id?: string } = {}) {
  try {
    if (!cloudinary) {
      // If Cloudinary is not available, return a placeholder image
      return {
        secure_url: "/profile-icon.png",
        public_id: "default/profile-icon"
      };
    }
    
    // Convert ArrayBuffer to base64
    const base64 = Buffer.from(file).toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: options.folder || 'testimonials',
      public_id: options.public_id,
      overwrite: true,
    });
    
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    // Return a placeholder image on error
    return {
      secure_url: "/profile-icon.png",
      public_id: "default/profile-icon"
    };
  }
}

export default cloudinary;
