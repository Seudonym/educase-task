import { Router } from "express";
import { addSchool, getAllSchools } from "../controllers/school.controller";
import validateData from "../middleware/validateData";
import SchoolSchema from "../models/school.model";
import CoordinateSchema from "../models/coordinate.model";

const schoolRouter = Router();
schoolRouter.get("/listSchools", validateData(CoordinateSchema), getAllSchools);
schoolRouter.post("/addSchool", validateData(SchoolSchema), addSchool);

export default schoolRouter;
