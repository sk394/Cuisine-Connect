import { Router } from "express";
import { fetchUsers, getUserProfile, updateProfile } from "../Controller/UserController.js";

const router = Router();

router.get("/", fetchUsers);
router.get("/:userId", getUserProfile);
router.put("/:userId", updateProfile);

export default router;