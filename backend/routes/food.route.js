import express from "express";
import {
  addFood,
  getFoodById,
  getFoods,
  removeFood,
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
foodRouter.get('/getFoodById/:id', getFoodById)
foodRouter.get("/list", getFoods);
foodRouter.patch("/update/available/:id", updateFoodStatus);

foodRouter.post("/remove", removeFood);

export default foodRouter;
