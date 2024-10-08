import { Router } from "express";
import { fetchUsers } from "../Controller/UserController.js";

const router = Router();

router.get("/", fetchUsers);

export default router;