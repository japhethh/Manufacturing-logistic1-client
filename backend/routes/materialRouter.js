import express from 'express';
import { getAllMaterial,createMaterial,appendMaterial } from '../controllers/materialController.js';
import { authMiddleware } from '../middleware/Auth.js';

const materialRouter = express.Router();


materialRouter.get("/getAllMaterial",getAllMaterial);
materialRouter.post("/addMaterial",createMaterial)
materialRouter.put("/appendMaterial/:id",appendMaterial)


export default materialRouter;