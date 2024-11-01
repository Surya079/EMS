import express from "express";
import env from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import connectDB from "./Database/Db.js";

env.config();
const app = express();
const port = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);

app.listen(port, (req, res) => {
  console.log("Server listening", port);
});
