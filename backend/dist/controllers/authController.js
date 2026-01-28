import { users } from "../dbModels/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userExists = await users.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "user alreadye exists."
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await users.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            message: "Signup successfull",
            userId: user._id
        });
    }
    catch (error) {
        console.log("error in registration", error);
        res.status(401).json({
            message: "Registration Failed.",
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({
            email,
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                id: user._id, verified: user.isVerified
            }, process.env.JWT_SECRET);
            res.status(200).json({
                message: "LOGGED IN SUCCESSFULLY",
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    isVerified: user.isVerified
                }
            });
        }
        else {
            res.status(401).json({
                message: "Invalid email or password"
            });
        }
    }
    catch (error) {
        res.status(401).json({
            mesasge: "error while signing in"
        });
    }
};
//# sourceMappingURL=authController.js.map