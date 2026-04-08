import express from "express";
import { getReviews, addReview , deleteReview, updateReview} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;