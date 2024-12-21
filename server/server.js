import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow specific frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// app.get("/api/auth/is-auth", (req, res) => {
//   res.json({ success: true, message: "CORS enabled" });
// });

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
