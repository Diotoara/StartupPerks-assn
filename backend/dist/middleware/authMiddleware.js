//checks jwt
//attach user verification to jwt
//sends back user.
import jwt from "jsonwebtoken";
export const authCheck = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(500).json({
            message: "Not Authorized"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Token Failed"
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map