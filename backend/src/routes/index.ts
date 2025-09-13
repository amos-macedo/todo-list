import { Router } from "express";
import { taskRouter } from "./taskRouter";

const routes = Router();

routes.use("/tasks", taskRouter);

export default routes;