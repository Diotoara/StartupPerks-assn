import {Router} from "express"
import { claimDeal, getAllDeals, getSingleDeal, getUserClaims } from "../controllers/dealController.js";
import { authCheck } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/health", (req, res) => res.json({ message: "healthy" }));
router.get("/my-claims", authCheck, getUserClaims);

router.get("/:id", getSingleDeal); 
router.get("/", getAllDeals);

router.post("/claim", authCheck, claimDeal);

export default router;