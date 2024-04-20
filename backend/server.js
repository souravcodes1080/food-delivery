import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();
// app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
connectDb();

//api endpoints
//food api
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

//user api
app.use("/api/user", userRouter);

//cart api
app.use("/api/cart", cartRouter);

//order api
app.use("/api/order", orderRouter)

app.get("/", (req,res)=>{
  res.send("Hello")
  console.log("hello")
})

app.listen(process.env.PORT, () => {
  console.log("Server is running in:-> " + process.env.DOMAIN);
});
