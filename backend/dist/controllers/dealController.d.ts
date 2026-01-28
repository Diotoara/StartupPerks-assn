import { Request, Response } from "express";
export declare const getAllDeals: (req: Request, res: Response) => Promise<void>;
export declare const claimDeal: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSingleDeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserClaims: (req: any, res: Response) => Promise<void>;
//# sourceMappingURL=dealController.d.ts.map