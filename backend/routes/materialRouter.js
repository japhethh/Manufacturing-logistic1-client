import express from 'express';
import { getAllMaterial,createMaterial } from '../controllers/materialController.js';

const materialRouter = express.Router();


materialRouter.get("/getAllMaterial",getAllMaterial);
materialRouter.post("/addMaterial",createMaterial)


export default materialRouter;