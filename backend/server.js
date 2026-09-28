import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// serve uploaded doctor / user images statically so <img src="http://localhost:4000/uploads/xyz.png">
// works directly from both the patient frontend and the admin/doctor panel
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// api endpoints - three completely separate route groups / logins
app.use("/api/user", userRouter); // patient signup/login + booking + payment
app.use("/api/doctor", doctorRouter); // doctor's own login + dashboard
app.use("/api/admin", adminRouter); // admin login + doctor management

app.get("/", (req, res) => {
  res.send("Doctor Booking API is working");
});

app.listen(port, () => console.log(`🚀 Server started on http://localhost:${port}`));
