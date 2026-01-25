import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import { getAllBlogsAdmin, getAllCommentsAdmin, deleteComment, toggleCommentApproval, getDashboard } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/all", auth ,getAllBlogsAdmin)
adminRouter.get("/comments", auth ,getAllCommentsAdmin)
adminRouter.delete("/comment/:commentId", auth ,deleteComment)
adminRouter.post("/comment/:commentId/toggle-approval", auth ,toggleCommentApproval)
adminRouter.get("/dashboard", auth ,getDashboard)



export default adminRouter;