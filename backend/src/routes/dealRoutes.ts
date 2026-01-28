import {Router} from "express"
import { claimDeal, getAllDeals, getUserClaims } from "../controllers/dealController.js";
import { authCheck } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllDeals);
router.post("/claim",authCheck ,claimDeal);
router.get("/my-claims",authCheck,getUserClaims);

router.get("/health",(req,res)=>{
    res.json({
        message : "deals enpoint is healhty."
    })
})

export default router;