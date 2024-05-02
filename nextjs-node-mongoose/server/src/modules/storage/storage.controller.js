const { uploadToCloudinary } = require("../../helpers/cloudinary");
const Storage = require("./storage.model");

const createFile = async (req, res) => {
  try {
    const uploaded = await uploadToCloudinary(req.body.file);
    const newData = new Storage({
      file: uploaded?.url,
      name: req.body?.name,
      size: req.body.size,
    });
    const result = newData.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "File Save Successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: 201,
      success: false,
      message: "File Save Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createFile,
};
