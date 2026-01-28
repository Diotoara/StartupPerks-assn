import mongoose from "mongoose";
export interface dealInterface {
    title: string;
    description: string;
    brand: string;
    isLocked: boolean;
    category: string;
    eligiblityCriteria?: string;
}
export declare const deals: mongoose.Model<dealInterface, {}, {}, {}, mongoose.Document<unknown, {}, dealInterface, {}, mongoose.DefaultSchemaOptions> & dealInterface & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, dealInterface>;
//# sourceMappingURL=Deal.d.ts.map