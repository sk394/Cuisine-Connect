import { Router } from "express";
import { fetchUserBookmarks, removeBookmark, setBookmark } from "../Controller/BookmarkController.js";


const router = Router();

router.post("/create", setBookmark);
router.delete("/remove", removeBookmark);
router.get("/users/:userId", fetchUserBookmarks);

export default router;