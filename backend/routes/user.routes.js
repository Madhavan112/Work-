import express from  "express"
import { getUserSideBar } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();
router.get("/",protectRoute,getUserSideBar);



export default router;