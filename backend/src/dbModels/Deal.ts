import mongoose, { Schema } from "mongoose";

export interface dealInterface {
    title : string,
    description : string,
    brand :string,
    isLocked : boolean,
    category:string,
    eligiblityCriteria?:string,
}

const dealSchema = new Schema<dealInterface>({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    isLocked:{
        type:Boolean,
        default:false
    },
    eligiblityCriteria:{
        type:String,
    }
},{timestamps:true});

export const deals = mongoose.model<dealInterface>("Deals",dealSchema)