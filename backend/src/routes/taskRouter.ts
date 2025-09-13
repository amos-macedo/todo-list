import { Router } from "express";
import { taskController } from "../controllers/taskController";


const router = Router();

router.get("/", taskController.getAll);
router.get("/:id", taskController.getOne);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

export const taskRouter = router