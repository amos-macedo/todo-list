import { Router } from "express";
import { taskRouter } from "./taskRouter";

const routes = Router();

routes.use("/tasks", taskRouter);
routes.use("/categories", taskRouter);

export default routes;