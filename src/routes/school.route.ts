import { Router } from "express";
import { addSchool, getAllSchools } from "../controllers/school.controller";

const schoolRouter = Router();
schoolRouter.get("/listSchools", getAllSchools);
schoolRouter.post("/addSchool", addSchool);

export default schoolRouter;
