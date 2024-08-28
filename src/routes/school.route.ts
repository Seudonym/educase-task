import { Router } from "express";
import { addSchool, getAllSchools } from "../controllers/school.controller";
import validateData from "../middleware/validateData";
import SchoolSchema from "../models/school";

const schoolRouter = Router();
schoolRouter.get("/listSchools", getAllSchools);
schoolRouter.post("/addSchool", validateData(SchoolSchema), addSchool);

export default schoolRouter;
