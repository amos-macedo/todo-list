import { Router } from "express";
import { categoryController } from "../controllers/categoryController";


const router = Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

export const taskRouter = router