import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// buffer (memory se aayi file) ko Cloudinary pe upload karke URL deta hai
export const uploadToCloudinary = (buffer) =>
   new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
         { folder: "doctor-booking" },
         (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
         }
      );
      stream.end(buffer);
   });