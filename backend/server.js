import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
dotenv.config();
// app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
connectDb();

//api endpoints
app.use("/api/food", foodRouter);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running in:-> " + process.env.DOMAIN);
});
