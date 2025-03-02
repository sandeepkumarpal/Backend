import { Router } from "express";
import { createTweet } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
router.use(verifyJWT)

router.route("/").post(createTweet)

export default router;