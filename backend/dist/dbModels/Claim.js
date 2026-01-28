import mongoose, { Schema } from "mongoose";
const claimSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    deal: {
        type: Schema.Types.ObjectId,
        ref: "Deals",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
}, { timestamps: true });
export const claims = mongoose.model("Claims", claimSchema);
//# sourceMappingURL=Claim.js.map