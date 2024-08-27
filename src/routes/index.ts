import { Router } from "express";
import schoolRouter from "./school.route";

const routes = Router();
routes.use('/school', schoolRouter)

export default routes;
