//1. get all deals localhost:8000/deals?category=electricals&isLocked=true
//2.claim a single deal (if deal locked and user verified || deal unlocked)
//3. user's all deals.

import { Request, Response } from "express";
import { deals } from "../dbModels/Deal.js";
import { claims } from "../dbModels/Claim.js";
import { users } from "../dbModels/User.js";

export const getAllDeals = async(req:Request,res:Response) => {
    try {
        const {category, isLocked } = req.query;
        let query:any = {}
        if(category) query.category = new RegExp(`^${category}$`, "i")
        if(isLocked) query.isLocked = isLocked === "true"
        const AllDeals = await deals.find(query)
        res.status(200).json({
            AllDeals
        })

    } catch (error) {
        console.log("Error while getting all the deals : ", error)
        res.status(401).json({
            message : "Error fetching data"
        })
    }
}

export const claimDeal = async(req:any,res:Response)=>{
    try {
        const {dealId} = req.body;
        const userId = req.user.id
        const userVerified = req.user.verified;

        const deal = await deals.findById(dealId);
        if(!deal) return res.status(404).json({message : "No Deals Found"})

        if(deal.isLocked && !userVerified){
            return res.status(401).json({
                messagee : "Not verified to claim Locked Deals."
            })
        }

        const alreadyClaimed = await claims.findOne({
            user:userId,
            deal:dealId
        })
        if(alreadyClaimed) return res.status(401).json({
            message : "Deal Already claimed."
        })

        const newClaim = await claims.create({
            user:userId,
            deal:dealId,
            status: "pending",
        });

        res.status(201).json({
            message : "Deal claimed successfully",
            claim : newClaim
        })

    } catch (error) {
        console.log("error while claiming", error)
        res.status(401).json({
            message : "error in processing claims"
        })   
    }
}


export const getSingleDeal = async (req: Request, res: Response) => {
    try {
        const deal = await deals.findById(req.params.id);
        if (!deal) return res.status(404).json({ message: "Deal not found" });
        res.status(200).json(deal); // Sending the deal directly
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const getUserClaims = async(req:any,res:Response) => {
    try {
        const userId = req.user.id;
        const userRecord = await users.findById(userId).select('name')
        const userCLaims = await claims.find({user : userId}).populate('deal')
        res.status(201).json({
            userCLaims,
            userName : userRecord ? userRecord.name : "Unknown"

        })
    } catch (error) {
        console.log("error while showing user claims :", error)
        res.status(401).json({message : "error fetching your claims"})
    }

}