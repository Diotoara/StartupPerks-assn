import mongoose, {Schema} from "mongoose";

export interface UserInterface {
    name : string,
    email : string,
    password : string,
    isVerified : boolean,
    createdAt : Date,
}

const userSchema = new Schema<UserInterface>({
    name : {
        type : String,
        required:true,
    },
    email : {
        type : String,
        required : true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export const users = mongoose.model<UserInterface>("Users", userSchema);