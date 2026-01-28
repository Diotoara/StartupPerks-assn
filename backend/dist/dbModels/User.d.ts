import mongoose from "mongoose";
export interface UserInterface {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: Date;
}
export declare const users: mongoose.Model<UserInterface, {}, {}, {}, mongoose.Document<unknown, {}, UserInterface, {}, mongoose.DefaultSchemaOptions> & UserInterface & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, UserInterface>;
//# sourceMappingURL=User.d.ts.map