import express from "express";
import {
  addFood,
  getFoodById,
  getFoods,
  removeFood,
  updateFoodStatus,
} from "../controllers/food.controller.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../middleware/cloudinary.config.js";

const foodRouter = express.Router();

//image storage engine

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tomato", 
    format: async (req, file) => "png", 
    public_id: (req, file) => Date.now().toString() + "-" + file.originalname,
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/getFoodById/:id", getFoodById);
foodRouter.get("/list", getFoods);
foodRouter.patch("/update/available/:id", updateFoodStatus);

foodRouter.post("/remove", removeFood);

export default foodRouter;
