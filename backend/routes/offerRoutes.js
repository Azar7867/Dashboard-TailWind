import express from "express";
import {
  applyOffer,
  getOffers,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = express.Router();

router.post("/", applyOffer);
router.get("/", getOffers);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

export default router;