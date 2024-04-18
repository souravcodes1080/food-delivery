import express from "express";
import {
  addFood,
  getFoods,
  removeFood,
  updateFoodPrice,
  updateFoodStatus,
} from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", getFoods);
foodRouter.patch("/update/available/:id", updateFoodStatus);
foodRouter.patch("/update/price/:id", updateFoodPrice);
foodRouter.post("/remove", removeFood);

export default foodRouter;
