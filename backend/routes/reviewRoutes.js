import express from "express";
import { getReviews, addReview , deleteReview, updateReview} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/",verifyToken, getReviews);
router.post("/", verifyToken,addReview);
router.delete("/:id",verifyToken, deleteReview);
router.put("/:id",verifyToken, updateReview);

export default router;