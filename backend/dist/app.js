import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.get("/", (req, res) => {
    res.send("Api is running...");
});
export default app;
//# sourceMappingURL=app.js.map