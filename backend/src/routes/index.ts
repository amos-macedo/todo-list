import { Router } from "express";
import { taskRouter } from "./taskRouter";
import { categoryRouter } from "./categoryRouter";

const routes = Router();

routes.use("/tasks", taskRouter);
routes.use("/categories", categoryRouter);

export default routes;