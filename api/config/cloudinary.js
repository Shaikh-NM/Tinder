import { v2 as cloudinary } from "cloudinary";
import { ENV_VARS } from "../utils/envVars";

cloudinary.config({
  cloud_name: ENV_VARS.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_VARS.CLOUDINARY_API_KEY,
  secret_key: ENV_VARS.CLOUDINARY_API_SECRET,
});

export default cloudinary;
