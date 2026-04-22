const Logo = require("../models/Logo");
const cloudinary = require("../config/cloudinary");
const getLogo = async (req, res) => {
  const logo = await Logo.findOne();

  res.json({
    success: true,
    data: {
      url: logo?.url || null,
    },
  });
};

const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = req.file.path;
    const publicId = req.file.filename; // 🔥 important

    let logo = await Logo.findOne();

    // ✅ DELETE OLD IMAGE FROM CLOUDINARY
    if (logo && logo.public_id) {
      await cloudinary.uploader.destroy(logo.public_id);
    }

    if (logo) {
      logo.url = imageUrl;
      logo.public_id = publicId; // 🔥 save public_id
      await logo.save();
    } else {
      logo = await Logo.create({
        url: imageUrl,
        public_id: publicId, // 🔥 save public_id
      });
    }

    res.json({
      success: true,
      data: {
        url: imageUrl,
      },
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getLogo,
  uploadLogo,
};