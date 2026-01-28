//checks jwt
//attach user verification to jwt
//sends back user.

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const authCheck = (req:Request,res:Response,next:NextFunction)=>{
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(500).json({
            message : "Not Authorized"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({
            message : "Token Failed"
        })
    }

}