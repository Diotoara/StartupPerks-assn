import mongoose, { Types } from "mongoose";
export interface claimInterface {
    user: Types.ObjectId;
    deal: Types.ObjectId;
    status: "pending" | "completed" | "failed";
    createdAt?: Date;
}
export declare const claims: mongoose.Model<claimInterface, {}, {}, {}, mongoose.Document<unknown, {}, claimInterface, {}, mongoose.DefaultSchemaOptions> & claimInterface & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, claimInterface>;
//# sourceMappingURL=Claim.d.ts.map