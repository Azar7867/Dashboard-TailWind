const express = require("express");
const {
  applyOffer,
  getOffers,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");

const router = express.Router();

router.post("/", applyOffer);
router.get("/", getOffers);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

module.exports = router;