import mongoose, { Schema } from "mongoose";
const dealSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    eligiblityCriteria: {
        type: String,
    }
}, { timestamps: true });
export const deals = mongoose.model("Deals", dealSchema);
//# sourceMappingURL=Deal.js.map