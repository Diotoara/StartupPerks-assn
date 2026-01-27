import mongoose, { Schema, Types } from "mongoose";

export interface claimInterface{
    user : Types.ObjectId,
    deal : Types.ObjectId,
    status : "pending" |"completed" | "failed",
    createdAt?:Date,
}

const claimSchema = new Schema<claimInterface>({
    user:{
        type : Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    deal:{
        type:Schema.Types.ObjectId,
        ref:"Deals",
        required:true,
    },
    status:{
        type: String,
        enum:["pending", "completed" , "failed" ],
        default:"pending",
    },
},{timestamps:true})

export const claims = mongoose.model<claimInterface>("Claims", claimSchema);