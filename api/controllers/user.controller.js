import User from "../models/user.model.js";

export async function updateProfile(req, res) {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;

    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.error("error in uploading image : ", error);
          return res.status(500).json({
            success: false,
            message: "Error Uploading Image. Profile update aborted",
          });
        }
      }
    }

    const updatedUser = await User.findById(req.user.userId, updatedData, {
      new: true,
    });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("error in updateProfile controller : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
