import connectDB from "./config/db.js";
import { deals } from "./dbModels/Deal.js";
import dotenv from "dotenv";
dotenv.config();
const seedDeals = [
    {
        title: "AWS Activate",
        description: "Get $5,000 in free AWS credits for 2 years.",
        brand: "Amazon Web Services",
        category: "Cloud",
        isLocked: true,
        eligiblityCriteria: "Must have raised less than $1M in funding."
    },
    {
        title: "Notion for Startups",
        description: "6 months of Notion Plus for free, including unlimited AI.",
        brand: "Notion",
        category: "Productivity",
        isLocked: false,
        eligiblityCriteria: "Available for all new users."
    },
    {
        title: "Stripe Atlas Discount",
        description: "50% off your incorporation fees.",
        brand: "Stripe",
        category: "Finance",
        isLocked: true,
        eligiblityCriteria: "Early-stage teams only."
    },
    {
        title: "HubSpot for Startups",
        description: "90% off HubSpot for your first year.",
        brand: "HubSpot",
        category: "Marketing",
        isLocked: false,
        eligiblityCriteria: "Valid for first-time HubSpot customers."
    }
];
const runSeeDeals = async () => {
    try {
        await connectDB();
        await deals.insertMany(seedDeals);
        console.log("Database Seeded Successfully");
        process.exit;
    }
    catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};
runSeeDeals();
//# sourceMappingURL=seed.js.map