const express = require("express");
const upload = require("../config/multer");
const { getLogo, uploadLogo } = require("../controllers/logoController");

const router = express.Router();

router.get("/", getLogo);
router.post("/", upload.single("image"), uploadLogo);

module.exports = router;