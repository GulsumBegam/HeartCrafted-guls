import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadImage(
  file: string,
  folder = "heartcrafted"
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });
  return result.secure_url;
}

export async function uploadAudio(
  file: string,
  folder = "heartcrafted/voices"
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "video",
  });
  return result.secure_url;
}
