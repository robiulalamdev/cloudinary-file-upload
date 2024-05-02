const cloudinary = require("cloudinary").v2;
const VARIABLES = require("../config");

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: VARIABLES.CLOUD_NAME,
  api_key: VARIABLES.API_KEY,
  api_secret: VARIABLES.API_SECRET,
});

// Function to upload any file to Cloudinary
async function uploadToCloudinary(filePath) {
  const response = cloudinary.uploader.upload(filePath);
  return response;
}

module.exports = {
  uploadToCloudinary,
};
