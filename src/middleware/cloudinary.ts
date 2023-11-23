import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

export default new (class ClaudinaryConfig {
  upload() {
    dotenv.config();
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
  }

  async destination(image: any) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "src/upload/" + image
      );
      return cloudinaryResponse.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
