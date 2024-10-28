import express from "express";
import { deleteDefect, getAllDefect } from "../controllers/defectController.js";
import { authMiddleware } from "../middleware/Auth.js";

const defectRouter = express.Router();

defectRouter.get("/vendor", authMiddleware, getAllDefect);
defectRouter.delete("/vendor/delete/:id", authMiddleware, deleteDefect);

export default defectRouter;
